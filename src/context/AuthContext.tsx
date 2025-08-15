'use client'

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import Cookies from 'js-cookie'
import app from '@/lib/firebase'

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(app)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        try {
          const t = await u.getIdToken()
          Cookies.set('auth-token', t, { sameSite: 'lax' })
        } catch {}
      } else {
        Cookies.remove('auth-token')
      }
      setLoading(false)
    })
    return () => unsub()
  }, [auth])

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const t = await cred.user.getIdToken()
    Cookies.set('auth-token', t, { sameSite: 'lax' })
    setUser(cred.user)
  }

  const logout = async () => {
    await signOut(auth)
    Cookies.remove('auth-token')
    setUser(null)
  }

  const getToken = async () => {
    try {
      const u = auth.currentUser
      if (!u) return null
      return await u.getIdToken()
    } catch {
      return null
    }
  }

  const value = useMemo(() => ({ user, loading, login, logout, getToken }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
