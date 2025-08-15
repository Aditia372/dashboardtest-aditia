"use client";

import { useState } from 'react';
import { Button, Input, Typography, message } from 'antd';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const onFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      message.success('Login berhasil!');
      router.push('/products');
    } catch (error: any) {
      let errorMessage = 'Login gagal. Periksa kembali email dan password Anda.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email atau password yang Anda masukkan salah.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Format email tidak valid.';
      }
      message.error(errorMessage);
      console.error("Firebase login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <div style={{ width: 400, padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Login</Title>
        <form onSubmit={onFinish}>
          <div style={{ marginBottom: '16px' }}>
            <Input
              placeholder="Email"
              size="large"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <Input.Password
              placeholder="Password"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
