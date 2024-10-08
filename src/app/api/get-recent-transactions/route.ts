import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    id: string;
    // ... autres propriétés existantes ...
  };
}

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions) as CustomSession | null;

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
      take: 10
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions récentes:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération des transactions récentes." }, { status: 500 });
  }
}