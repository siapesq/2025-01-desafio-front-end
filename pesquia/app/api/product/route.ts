import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { productSchema } from '@/schemas/product-schema';

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

    const products = await prisma.product.findMany({
      where: {
        enterpriseId: enterprise.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' }, 
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
    
    const validationResult = productSchema.safeParse(data);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos', 
          details: validationResult.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    const validatedData = validationResult.data;
    
    // transaction não é muito necessario mas vou deixar pra manter a consistência...
    const product = await prisma.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          name: validatedData.name,
          sku: validatedData.sku,
          category: validatedData.category,
          price: validatedData.price,
          stock: validatedData.stock,
          description: validatedData.description || null,
          brand: validatedData.brand || null,
          supplier: validatedData.supplier || null,
          enterpriseId: enterprise.id,
        },
      });
      
      return await tx.product.findUnique({
        where: { id: newProduct.id }
      });
    });
    
    return NextResponse.json(
      { message: 'Produto criado com sucesso', product }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar produto' }, 
      { status: 500 }
    );
  }
}

