import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    const userId = session.user.id;

    const enterprise = await prisma.enterprise.findFirst({ where: { userId } });
    if (!enterprise) {
      return NextResponse.json({ error: 'Empresa não encontrada para o usuário' }, { status: 404 });
    }

    const { id: productId } = await params;
    if (!productId) {
      return NextResponse.json({ error: 'ID do produto não fornecido' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }
    if (product.enterpriseId !== enterprise.id) {
      return NextResponse.json({ error: 'Você não tem permissão para excluir este produto' }, { status: 403 });
    }

    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ message: 'Produto excluído com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 });
  }
}
