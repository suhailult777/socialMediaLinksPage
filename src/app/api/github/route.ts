import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = 'https://github.com/users/suhailult777/contributions';
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
    }

    const html = await response.text();
    const matches = [...html.matchAll(/data-level="(\d)"/g)];
    const levels = matches.map(m => parseInt(m[1], 10));

    return NextResponse.json({ levels });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
