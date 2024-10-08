import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as { role?: string })?.role !== 'admin') {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const withdrawalRequests = await prisma.withdrawalRequest.findMany({
      orderBy: { requestDate: 'desc' }
    });

    return NextResponse.json({ withdrawalRequests });
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes de retrait:", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}
