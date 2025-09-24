import { NextResponse } from 'next/server';
import { generateMockData } from '@/lib/data-generator';

export async function GET() {
  const data = generateMockData();
  return NextResponse.json(data.categories);
}


