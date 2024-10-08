import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Types pour TypeScript
interface Withdrawal {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  bankAccount: string;
}

// Données mockées
const mockWithdrawals: Withdrawal[] = [
  {
    id: '1',
    amount: 100000,
    status: 'completed',
    date: '2024-03-07T10:00:00Z',
    bankAccount: 'XXXX-1234'
  },
  {
    id: '2',
    amount: 50000,
    status: 'pending',
    date: '2024-03-08T14:30:00Z',
    bankAccount: 'XXXX-5678'
  },
  // Ajoutez d'autres exemples si nécessaire
];

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json({ withdrawals });
  } catch (error) {
    console.error("Erreur lors de la récupération des retraits:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération des retraits." }, { status: 500 });
  }
}