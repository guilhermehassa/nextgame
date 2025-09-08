import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const platform = searchParams.get('platform');
  const tag = searchParams.get('tag');

  try {
    let apiUrl;
    apiUrl = new URL('https://www.freetogame.com/api/filter');

    apiUrl.searchParams.append('tag', tag ?? '');
    

    if (platform && (platform != "browser.pc" && platform != "pc.browser")) {
      apiUrl.searchParams.append('platform', platform);
    }

    const response = await fetch(apiUrl.toString());
    console.log('URL',apiUrl.toString());

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