import { NextResponse } from 'next/server';
import { generateMockData } from '@/lib/data-generator';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('category_id');
  
  const data = generateMockData();
  let skus = data.skus;
  
  if (categoryId) {
    skus = skus.filter(sku => sku.category_id === categoryId);
  }
  
  return NextResponse.json(skus);
}


