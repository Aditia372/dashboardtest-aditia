import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || 'http://localhost:8001/api/web/v1'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams.entries())

    const token = request.cookies.get('auth-token')?.value || ''

    const resp = await axios.get(`${EXTERNAL_API_URL}/products`, {
      params,
      headers: token ? { Authorization: token } : undefined,
    })

    return NextResponse.json(resp.data)
  } catch (err: any) {
    const status = err?.response?.status || 500
    const message = err?.response?.data?.message || 'Failed to fetch products'
    return NextResponse.json({ message }, { status })
  }
}
