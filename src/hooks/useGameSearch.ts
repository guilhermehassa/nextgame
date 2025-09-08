import { GameResult } from '@/context/Context';
import { useState } from 'react';

interface SearchParams {
  genres: string[];
  platforms: string[];
  ramSize: string;
}

interface UseGameSearchReturn {
  searchGame: (params: SearchParams) => Promise<{
    error?: string;
    game?: GameResult;
  }>;
  isLoading: boolean;
}

export function useGameSearch(): UseGameSearchReturn {
  const [isLoading, setIsLoading] = useState(false);

  const searchGame = async (params: SearchParams) => {
    setIsLoading(true);
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('tag', params.genres.join('.'));
      if (params.platforms.length < 2) {
        searchParams.append('platform', params.platforms.join('.'));
      }

      const requestGamesList = await fetch(`/api/gameslist?${searchParams.toString()}`);

      if (!requestGamesList.ok) {
        throw new Error('Erro ao buscar os dados da API.');
      }

      const gamesList = await requestGamesList.json();

      if (gamesList?.status === 0) {
        return { error: 'Não encontramos nenhum jogo entre esse(s) gênero(s) e plataforma(s).' };
      }

      let validGame = false;
      let gameData;

      while (!validGame) {
        const randomGame = gamesList[Math.floor(Math.random() * gamesList.length)];
        const gameRequest = await fetch(`/api/game?id=${randomGame.id.toString()}`);

        if (!gameRequest.ok) {
          throw new Error('Erro ao buscar os dados do game, tente novamente');
        }

        gameData = await gameRequest.json();
        if (!gameData.minimum_system_requirements) {
          validGame = true;
        } else {
          let minimunMemory = gameData.minimum_system_requirements.memory.split(' ')[0];
          let minimunMemoryUnity = gameData.minimum_system_requirements.memory.split(' ')[1];

          if (minimunMemoryUnity != 'MB' || minimunMemoryUnity != 'mb') {
            validGame = true;
          } else {
            if (parseInt(params.ramSize) >= parseInt(minimunMemory)) {
              validGame = true;
            }
          }
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 10000));
      
      return { game: gameData as GameResult };
    } catch (error) {
      console.error('Erro na requisição:', error);
      return { error: 'Erro ao buscar os dados, tente novamente.' };
    } finally {
      setIsLoading(false);
    }
  };

  return { searchGame, isLoading };
}
