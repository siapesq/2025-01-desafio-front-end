import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { enterpriseSchema } from '@/schemas/enterprise-schema';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    const enterprise = await prisma.enterprise.findFirst({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
        cnpj: true,
        emailCommercial: true,
        phone: true,
        address: true,
        city: true,
        cep: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!enterprise) {
      return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 });
    }
    return NextResponse.json({ enterprise }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar empresa:', error);
    return NextResponse.json({ error: 'Erro ao buscar empresa' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = enterpriseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const existing = await prisma.enterprise.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 });
    }

    const updated = await prisma.enterprise.update({
      where: { id: existing.id },
      data: {
        name: parsed.data.name,
        cnpj: parsed.data.cnpj,
        emailCommercial: parsed.data.emailCommercial,
        phone: parsed.data.phone,
        address: parsed.data.address,
        city: parsed.data.city,
        cep: parsed.data.cep,
      },
      select: {
        id: true,
        name: true,
        cnpj: true,
        emailCommercial: true,
        phone: true,
        address: true,
        city: true,
        cep: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ message: 'Empresa atualizada', enterprise: updated }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    return NextResponse.json({ error: 'Erro ao atualizar empresa' }, { status: 500 });
  }
}