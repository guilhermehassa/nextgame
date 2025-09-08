import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get('id');
  try {
    let apiUrl;


    apiUrl = new URL(`https://www.freetogame.com/api/game`);
    apiUrl.searchParams.append('id', gameId ?? '');

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      throw new Error('Erro ao buscar os dados da API externa.');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro na API Proxy:', error);
    return NextResponse.json({ error: 'Erro ao buscar os dados da API externa.' }, { status: 500 });
  }
}