import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as { role?: string })?.role !== 'admin') {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const pendingRegistrations = await prisma.pendingRegistration.findMany({
      orderBy: { registrationDate: 'desc' }
    });

    return NextResponse.json({ pendingRegistrations });
  } catch (error) {
    console.error("Erreur lors de la récupération des inscriptions en attente:", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
