import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '../../../../../server/models/User.js'
import connectDB from '../../../../../server/utils/db.js'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ message: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
    }

    const users = await User.find().select('-password')
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ message: 'Token não fornecido' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
    }

    const { id } = await request.json().catch(() => ({}))
    const url = new URL(request.url)
    const userId = url.pathname.split('/').pop()

    if (!userId) {
      return NextResponse.json({ message: 'ID do usuário não fornecido' }, { status: 400 })
    }

    const { role } = await request.json()
    if (!['user', 'admin'].includes(role)) {
      return NextResponse.json({ message: 'Role inválido' }, { status: 400 })
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true }).select('-password')
    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
