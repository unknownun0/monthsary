import { NextResponse } from 'next/server';

interface DatePlan {
  id: number;
  date: string | null;
  dateType: { title: string; emoji: string; description: string } | null;
  submittedAt: string;
}

const store: DatePlan[] = [];

export async function GET() {
  return NextResponse.json({ plans: store });
}

export async function POST(request: Request) {
  const body = await request.json();
  const plan: DatePlan = {
    id: store.length + 1,
    date: body.date || null,
    dateType: body.dateType || null,
    submittedAt: new Date().toLocaleString(),
  };
  store.push(plan);
  return NextResponse.json({ success: true, plan });
}
