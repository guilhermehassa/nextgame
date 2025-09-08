'use client';
import { GameResult, useAppContext } from '@/context/Context';
import { useState } from 'react';
import { useGameSearch } from '@/hooks/useGameSearch';
import styles from './styles.module.scss';

const genres = [
  { label: "2D", value: "2d" },
  { label: "3D", value: "3d" },
  { label: "Action RPG", value: "action-rpg" },
  { label: "Ação", value: "action" },
  { label: "Anime", value: "anime" },
  { label: "Artes Marciais", value: "martial-arts" },
  { label: "Battle Royale", value: "battle-royale" },
  { label: "Cartas", value: "card" },
  { label: "Corrida", value: "racing" },
  { label: "Espaço", value: "space" },
  { label: "Esportes", value: "sports" },
  { label: "Estratégia", value: "strategy" },
  { label: "Fantasia", value: "fantasy" },
  { label: "Low Spec", value: "low-spec" },
  { label: "Luta", value: "fighting" },
  { label: "Militar", value: "military" },
  { label: "MMO", value: "mmo" },
  { label: "MMOFPS", value: "mmofps" },
  { label: "MMORPG", value: "mmorpg" },
  { label: "MMORTS", value: "mmorts" },
  { label: "MMOTPS", value: "mmotps" },
  { label: "MOBA", value: "moba" },
  { label: "Mundo Aberto", value: "open-world" },
  { label: "Náutico", value: "sailing" },
  { label: "Permadeath", value: "permadeath" },
  { label: "Pixel", value: "pixel" },
  { label: "Primeira Pessoa", value: "first-person" },
  { label: "PvE", value: "pve" },
  { label: "PvP", value: "pvp" },
  { label: "Sandbox", value: "sandbox" },
  { label: "Sci-Fi", value: "sci-fi" },
  { label: "Side Scroller", value: "side-scroller" },
  { label: "Social", value: "social" },
  { label: "Sobrevivência", value: "survival" },
  { label: "Super-herói", value: "superhero" },
  { label: "Tanque", value: "tank" },
  { label: "Terceira Pessoa", value: "third-person" },
  { label: "Terror", value: "horror" },
  { label: "Tiro", value: "shooter" },
  { label: "Topo", value: "top-down" },
  { label: "Tower Defense", value: "tower-defense" },
  { label: "Turnos", value: "turn-based" },
  { label: "Voxel", value: "voxel" },
  { label: "Voo", value: "flight" },
  { label: "Zumbi", value: "zombie" }
];

const platforms = [
  { label: 'Computador', value: 'pc' },
  { label: 'Navegador', value: 'browser' }
];

interface SearchFormProps {
  genres: {
    label: string;
    value: string
  }[];
  platforms: {
    label?: string;
    value: string;
  }[];
  ramSize: string;
}

export default function SearchForm() {
  const { setLoading, setResult, setLastSearch } = useAppContext(); 
  const [formData, setFormData] = useState<SearchFormProps>({
    genres: [],
    platforms: [],
    ramSize: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenreChange = (genre: { label: string; value: string }) => {
    const updatedGenres = formData.genres.some(g => g.value === genre.value)
      ? formData.genres.filter(g => g.value !== genre.value)
      : [...formData.genres, genre];

    setFormData({ ...formData, genres: updatedGenres });
    setErrorMessage(null);
  };

  const handlePlatformChange = (platform: {label: string; value: string}) => {
    const updatedPlatforms = formData.platforms.includes(platform)
      ? formData.platforms.filter(p => p !== platform)
      : [...formData.platforms, platform];
    
    setFormData({ ...formData, platforms: updatedPlatforms });
    setErrorMessage(null);
  };
  
  const handleSelectAllGenres = () => {
    setFormData({ ...formData, genres: [...genres] });
    setErrorMessage(null);
  };
  
  const handleDeselectAllGenres = () => {
    setFormData({ ...formData, genres: [] });
    setErrorMessage(null);
  };
  const { searchGame, isLoading } = useGameSearch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.genres.length === 0) {
      setErrorMessage('Selecione pelo menos um gênero para continuar.');
      return;
    }
    
    if (formData.platforms.length === 0) {
      setErrorMessage('Selecione pelo menos uma plataforma de preferência.');
      return;
    }
    
    if (!formData.ramSize || formData.ramSize === '0') {
      setErrorMessage('Informe a quantidade de memória RAM disponível em sua máquina.');
      return;
    }
    
    setErrorMessage(null);
    setLoading('loading');

    const searchParams = {
      genres: formData.genres.map(g => g.value),
      platforms: formData.platforms.map(p => p.value),
      ramSize: formData.ramSize
    };
    
    setLastSearch(searchParams);
    const { error, game } = await searchGame(searchParams);

    if (error) {
      setErrorMessage(error);
    } else if (game) {
      setResult(game);
      setLoading('finished');
    }

  };

  return (
    <form onSubmit={handleSubmit} className={`mb-4 ${styles.searchForm}`}>
      <div className="row g-1 g-lg-3 justify-content-between">
        <div className="col-12 col-lg-9 mb-4">
          <div className={styles.searchForm__fieldsetContainer}>
            <div className={styles.searchForm__actionButtons}>
              <button 
                type="button" 
                className={`${styles.searchForm__actionButton} ${styles['searchForm__actionButton--primary']}`}
                onClick={handleSelectAllGenres}
              >
                Selecionar Todos
              </button>
              <button 
                type="button" 
                className={`${styles.searchForm__actionButton} ${styles['searchForm__actionButton--secondary']}`}
                onClick={handleDeselectAllGenres}
              >
                Limpar Seleção
              </button>
            </div>
            <fieldset className="pe-2 pb-0">
              <legend className="fs-4">GÊNERO</legend>

              <div className={`row g-3 ${styles.searchForm__checkboxGrid}`}>
                {genres.map((genre) => (
                  <div key={genre.value} className="col-6 col-md-3">
                    <div className={styles.searchForm__checkboxContainer}>
                      <input
                        type="checkbox"
                        className={styles.searchForm__checkbox}
                        id={`genre-${genre.value}`}
                        checked={formData.genres.some(g => g.value === genre.value)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      <label className={styles.searchForm__checkmark} htmlFor={`genre-${genre.value}`}>
                        {genre.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="col-12 col-lg-3 mb-3 align-item d-flex flex-column justify-content-between">
          <div className={styles.searchForm__fieldsetContainer}>
            
            <fieldset className="">
              <legend className="fs-4">Plataforma</legend>
              <div className="d-flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <div key={platform.value} className="flex-grow-1" style={{ maxWidth: '180px' }}>
                    <div className={styles.searchForm__checkboxContainer}>
                      <input
                        type="checkbox"
                        className={styles.searchForm__checkbox}
                        id={`platform-${platform.value}`}
                        checked={formData.platforms.includes(platform)}
                        onChange={() => handlePlatformChange(platform)}
                      />
                      <label className={styles.searchForm__checkmark} htmlFor={`platform-${platform.value}`}>
                        {platform.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>  

          <fieldset className="">
            <legend className="fs-4 mt-4">Memória RAM</legend>
            <div className="form-group d-flex flex-column">
              <div className={`input-group ${styles.searchForm__inputGroup}`}>
                <input
                  type="number"
                  className="form-control"
                  id="ramSize"
                  min="0"
                  placeholder="Ex: 8"
                  value={formData.ramSize}
                  onChange={(e) => {
                    setFormData({ ...formData, ramSize: e.target.value });
                    setErrorMessage(null);
                  }}
                />
                <span className="input-group-text">GB</span>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="col-12 col-lg-5 mb-3">
        </div>

        <div className="col-12">
          <button 
            type="submit" 
            className={`btn btn-primary btn-lg ${styles.submitButton}`}
          >
            PESQUISAR
          </button>
          
          {errorMessage && (
            <div className="alert alert-danger mt-3 rounded-0" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
