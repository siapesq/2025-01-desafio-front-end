import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' }, 
        { status: 401 }
      );
    }
    const userId = session.user.id;

    const enterprise = await prisma.enterprise.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!enterprise) {
      return NextResponse.json(
        { error: 'Empresa não encontrada para o usuário' }, 
        { status: 404 }
      );
    }

    const sales = await prisma.sale.findMany({
      where: {
        enterpriseId: enterprise.id,

      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        partner: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ sales }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar vendas recentes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar vendas recentes' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
    try {
      const session = await auth();
      if (!session || !session.user || !session.user.id) {
        return NextResponse.json(
          { error: 'Usuário não autenticado' }, 
          { status: 401 }
        );
      }
      const userId = session.user.id;
  
      const enterprise = await prisma.enterprise.findFirst({
        where: {
          userId: userId,
        },
      });
  
      if (!enterprise) {
        return NextResponse.json(
          { error: 'Empresa não encontrada para o usuário' }, 
          { status: 404 }
        );
      }
  
      const data = await request.json();
      
      if (!data.partnerId || !data.items || !Array.isArray(data.items) || data.items.length === 0) {
        return NextResponse.json(
          { error: 'Dados de venda inválidos. Parceiro e itens são obrigatórios.' },
          { status: 400 }
        );
      }
      
      let totalValue = 0;
      for (const item of data.items) {
        if (!item.productId || !item.quantity || !item.unitPrice) {
          return NextResponse.json(
            { error: 'Dados de item inválidos. productId, quantity e unitPrice são obrigatórios.' },
            { status: 400 }
          );
        }
        totalValue += Number(item.unitPrice) * item.quantity;
      }
      
      const sale = await prisma.$transaction(async (tx) => {
        const newSale = await tx.sale.create({
          data: {
            userId: userId,
            enterpriseId: enterprise.id,
            partnerId: data.partnerId,
            name: data.name || null,
            totalValue: totalValue || null,
          },
        });
        
        for (const item of data.items) {
          await tx.saleProduct.create({
            data: {
              saleId: newSale.id,
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            },
          });
        }
        
        return await tx.sale.findUnique({
          where: { id: newSale.id },
          include: {
            items: {
              include: {
                product: true,
              },
            },
            partner: true,
          },
        });
      });
      
      return NextResponse.json(
        { message: 'Venda criada com sucesso', sale }, 
        { status: 201 }
      );
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      return NextResponse.json(
        { error: 'Erro ao criar venda' }, 
        { status: 500 }
      );
    }
  }