import { NextResponse } from 'next/server';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

interface DatePlan {
  id: number;
  date: string | null;
  dateType: { title: string; emoji: string; description: string } | null;
  submittedAt: string;
}

const MIN_DATE = new Date('2026-08-02T00:00:00');
const MAX_DATE = new Date('2026-08-10T23:59:59.999');
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'date-plans.json');

function isAllowedDate(dateValue: string | null | undefined) {
  if (!dateValue) return false;
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed >= MIN_DATE && parsed <= MAX_DATE;
}

async function readStore() {
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.plans) ? (parsed.plans as DatePlan[]) : [];
  } catch {
    return [];
  }
}

async function writeStore(plans: DatePlan[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify({ plans }, null, 2), 'utf8');
}

export async function GET() {
  const plans = await readStore();
  return NextResponse.json({ plans });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!isAllowedDate(body.date)) {
    return NextResponse.json(
      { success: false, error: 'Date must be between August 2, 2026 and August 10, 2026.' },
      { status: 400 }
    );
  }

  const store = await readStore();
  const plan: DatePlan = {
    id: store.length + 1,
    date: body.date || null,
    dateType: body.dateType || null,
    submittedAt: new Date().toLocaleString(),
  };
  store.push(plan);
  await writeStore(store);
  return NextResponse.json({ success: true, plan });
}
