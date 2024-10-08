import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    id: string;
    // ... autres propriétés
  };
}

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions) as CustomSession;

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  if (!session.user?.id) {
    throw new Error("Utilisateur non authentifié");
  }

  try {
    const activity = await prisma.activity.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' },
      take: 10
    });

    return NextResponse.json({ activity });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'activité récente:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération de l'activité récente." }, { status: 500 });
  }
}