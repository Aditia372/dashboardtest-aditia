import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

const EXTERNAL_API_URL =
  process.env.EXTERNAL_API_URL || 'http://localhost:8001/api/web/v1'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const product_id = url.searchParams.get('product_id')
    if (!product_id) {
      return NextResponse.json({ message: 'product_id is required' }, { status: 400 })
    }

    // Ambil token dari cookie
    const token = request.cookies.get('auth-token')?.value || ''

    const resp = await axios.get(`${EXTERNAL_API_URL}/product`, {
      params: { product_id },
      headers: token ? { Authorization: token } : undefined,
    })
    return NextResponse.json(resp.data)
  } catch (err: any) {
    const status = err?.response?.status || 500
    const message = err?.response?.data?.message || 'Failed to fetch product'
    return NextResponse.json({ message }, { status })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const token = request.cookies.get('auth-token')?.value || ''

    const resp = await axios.post(`${EXTERNAL_API_URL}/product`, body, {
      headers: token ? { Authorization: token } : undefined,
    })
    return NextResponse.json(resp.data)
  } catch (err: any) {
    const status = err?.response?.status || 500
    const message = err?.response?.data?.message || 'Failed to create product'
    return NextResponse.json({ message }, { status })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Ambil token dari cookie
    const token = request.cookies.get('auth-token')?.value || ''

    const resp = await axios.put(`${EXTERNAL_API_URL}/product`, body, {
      headers: token ? { Authorization: token } : undefined,
    })
    return NextResponse.json(resp.data)
  } catch (err: any) {
    const status = err?.response?.status || 500
    const message = err?.response?.data?.message || 'Failed to update product'
    return NextResponse.json({ message }, { status })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const product_id = url.searchParams.get('product_id')
    if (!product_id) {
      return NextResponse.json({ message: 'product_id is required' }, { status: 400 })
    }

    const token = request.cookies.get('auth-token')?.value || ''

    const resp = await axios.delete(`${EXTERNAL_API_URL}/product`, {
      params: { product_id },
      headers: token ? { Authorization: token } : undefined,
    })
    return NextResponse.json(resp.data)
  } catch (err: any) {
    const status = err?.response?.status || 500
    const message = err?.response?.data?.message || 'Failed to delete product'
    return NextResponse.json({ message }, { status })
  }
}
