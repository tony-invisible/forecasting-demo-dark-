import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // Simulate action logging
  console.log('Action logged:', body);
  
  return NextResponse.json({ 
    success: true, 
    actionId: Date.now().toString(),
    message: 'Action logged successfully' 
  });
}


