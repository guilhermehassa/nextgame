'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type LoadingState = 'none' | 'loading' | 'finished';

export type GameResult = {
  id?: number;
  title?: string;
  thumbnail?: string;
  status?: string;
  short_description?: string;
  description?: string;
  game_url?: string;
  genre?: string;
  platform?: string;
  publisher?: string;
  developer?: string;
  release_date?: string;
  freetogame_profile_url?: string;
  minimum_system_requirements?: {
    os?: string;
    processor?: string;
    memory?: string;
    graphics?: string;
    storage?: string;
  };
  screenshots?: Array<{ 
    id: number;
    image: string;
  }>;
} | null; 

type AppContextType = {
  loading: LoadingState; 
  setLoading: (value: LoadingState) => void;
  result: GameResult;
  setResult: (value: GameResult) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function Provider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<LoadingState>('none');
  const [result, setResult] = useState<GameResult>(null); 

  return (
    <AppContext.Provider value={{ loading, setLoading, result, setResult }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um Provider');
  }
  return context;
}