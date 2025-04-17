import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export const isServer = typeof window === "undefined";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//TODO: Procurar um melhor lugar para colocar (Erro do Prisma Client no lado do cliente)
// export async function RecentSales() {
//   const session = await auth();
//   if (!session || !session.user || !session.user.id) {
//     throw new Error('Usuário não autenticado');
//   }
//   const userId = session.user.id;

//   const enterprise = await prisma.enterprise.findFirst({
//     where: {
//       userId: userId,
//     },
//   });

//   if (!enterprise) {
//     throw new Error('Empresa não encontrada para o usuário');
//   }

//   const thirtyDaysAgo = new Date();
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

//   const sales = await prisma.sale.findMany({
//     where: {
//       enterpriseId: enterprise.id,
//       createdAt: {
//         gte: thirtyDaysAgo,
//       },
//     },
//     include: {
//       items: {
//         include: {
//           product: true,
//         },
//       },
//       partner: true,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });

//   return sales;
// }