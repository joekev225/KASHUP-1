import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = searchParams.get('days');
  const type = searchParams.get('type');

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days || '7'));

  try {
    const activities = await prisma.activity.findMany({
      where: {
        userId: (session?.user as { id: string })?.id,
        date: {
          gte: new Date(),
        },
        type: {
          not: undefined
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Erreur lors de la récupération des activités:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de la récupération des activités." }, { status: 500 });
  }
}
