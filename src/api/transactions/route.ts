import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const tx = await prisma.transaction.create({
    data: {
      accountId: body.accountId,
      date: new Date(body.date),
      description: body.description,
      category: body.category,
      amount: body.amount,
    },
  });
  return NextResponse.json(tx);
}
