'use client';
import GameResult from '@/components/GameResult';
import SearchForm from '@/components/SearchForm';
import LoadingScreen from '@/components/LoadingScreen';
import { useAppContext } from '@/context/Context';

export default function Home() {
  const { result, loading } = useAppContext(); 
  return (
    <main>
      {loading === 'none' && (
        <div className="container mt-3 mt-lg-4">
          <h1 className="text-center fs-2 mb-3 fst-italic">
            encontre seu&nbsp;
            <span className="text-primary">
              próximo jogo 
            </span>
          </h1>
          <SearchForm />
        </div>
      )}
      
      {loading === 'loading' && (
        <LoadingScreen />
      )}
      
      {loading === 'finished' && result && (
        <GameResult game={result} />
      )}
    </main>
  );
}
