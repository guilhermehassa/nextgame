'use client';
import { GameResult, useAppContext } from '@/context/Context';
import { useState } from 'react';
import styles from './styles.module.scss';

const genres = [
  { label: "MMORPG", value: "mmorpg" },
  { label: "Tiro", value: "shooter" },
  { label: "Estratégia", value: "strategy" },
  { label: "MOBA", value: "moba" },
  { label: "Corrida", value: "racing" },
  { label: "Esportes", value: "sports" },
  { label: "Social", value: "social" },
  { label: "Sandbox", value: "sandbox" },
  { label: "Mundo Aberto", value: "open-world" },
  { label: "Sobrevivência", value: "survival" },
  { label: "PvP", value: "pvp" },
  { label: "PvE", value: "pve" },
  { label: "Pixel", value: "pixel" },
  { label: "Voxel", value: "voxel" },
  { label: "Zumbi", value: "zombie" },
  { label: "Turnos", value: "turn-based" },
  { label: "Primeira Pessoa", value: "first-person" },
  { label: "Terceira Pessoa", value: "third-person" },
  { label: "Topo", value: "top-down" },
  { label: "Tanque", value: "tank" },
  { label: "Espaço", value: "space" },
  { label: "Náutico", value: "sailing" },
  { label: "Side Scroller", value: "side-scroller" },
  { label: "Super-herói", value: "superhero" },
  { label: "Permadeath", value: "permadeath" },
  { label: "Cartas", value: "card" },
  { label: "Battle Royale", value: "battle-royale" },
  { label: "MMO", value: "mmo" },
  { label: "MMOFPS", value: "mmofps" },
  { label: "MMOTPS", value: "mmotps" },
  { label: "3D", value: "3d" },
  { label: "2D", value: "2d" },
  { label: "Anime", value: "anime" },
  { label: "Fantasia", value: "fantasy" },
  { label: "Sci-Fi", value: "sci-fi" },
  { label: "Luta", value: "fighting" },
  { label: "Action RPG", value: "action-rpg" },
  { label: "Ação", value: "action" },
  { label: "Militar", value: "military" },
  { label: "Artes Marciais", value: "martial-arts" },
  { label: "Voo", value: "flight" },
  { label: "Low Spec", value: "low-spec" },
  { label: "Tower Defense", value: "tower-defense" },
  { label: "Terror", value: "horror" },
  { label: "MMORTS", value: "mmorts" }
];

const platforms = [
  'PC (Windows)',
  'Browser',
];

interface SearchFormProps {
  genres: {
    label: string;
    value: string
  }[];
  platforms: string[];
  ramSize: string;
}

export default function SearchForm() {
  const { setLoading, setResult, loading } = useAppContext(); 
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

  const handlePlatformChange = (platform: string) => {
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
  
  const handleSelectAllPlatforms = () => {
    setFormData({ ...formData, platforms: [...platforms] });
    setErrorMessage(null);
  };
  
  const handleDeselectAllPlatforms = () => {
    setFormData({ ...formData, platforms: [] });
    setErrorMessage(null);
  };

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
    console.log(formData);

    const apiCall = new Promise((resolve) => {
      setTimeout(() => {
        const mockResults = {
        "id": 581,
        "title": "XDefiant",
        "thumbnail": "https://www.freetogame.com/g/581/thumbnail.jpg",
        "status": "Offline",
        "short_description": "A free-to-play first-person arena shooter from Ubisoft.",
        "description": "XDefiant is a free-to-play, first-person arena shooter from Ubisoft. Players choose between five different factions from Ubisoft’s other games to play as. Each faction has its own set of skills: an ultra, a passive trait, and two abilities. Each is unique to the faction in question, So players will want to pay attention when building out their teams.\r\n\r\nPlayers can further customize their character to fit their playstyle using a wide selection of weapons with more than 40 attachments.\r\n\r\nThe game features two main map types: arena and progression. Under each of these is a wider selection of modes. Arena features ten different maps designed with Domination, Occupy, and Hot Shot modes in mind. Progression (or linear) features four maps designed around Escort and Zone Control modes.",
        "game_url": "https://www.freetogame.com/open/xdefiant",
        "genre": "Shooter",
        "platform": "Windows",
        "publisher": "Ubisoft",
        "developer": "Ubisoft",
        "release_date": "2024-05-21",
        "freetogame_profile_url": "https://www.freetogame.com/xdefiant",
        "minimum_system_requirements": {
          "os": "Windows 10",
          "processor": "Intel i3-10105F / AMD Ryzen 3 3100",
          "memory": "8 GB",
          "graphics": "Intel ARC A380 / Nvidia GTS 1050Ti / AMD RX 5500 XT",
          "storage": "35 GB"
        },
        "screenshots": [
          {
            "id": 1445,
            "image": "https://www.freetogame.com/g/581/xdefiant-1.jpg"
          },
          {
            "id": 1446,
            "image": "https://www.freetogame.com/g/581/xdefiant-2.jpg"
          },
          {
            "id": 1447,
            "image": "https://www.freetogame.com/g/581/xdefiant-3.jpg"
          }
        ]
      };
      
        resolve(mockResults);
      }, 1000); // Simula uma API rápida
    });

    
    const [result] = await Promise.all([
      apiCall,
      new Promise(resolve => setTimeout(resolve, 10000)) 
    ]);

    // Atualiza o estado com o resultado
    setResult(result as GameResult);
    setLoading('finished');
  };

  return (
    <form onSubmit={handleSubmit} className={`mb-4 ${styles.searchForm}`}>
      <div className="row g-1 g-lg-3">
        <div className="col-12 mb-4">
          <legend className="fs-4 px-3">GÊNERO</legend>
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
            <fieldset className="p-3 pe-2 pb-0">
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

        <div className="col-12 col-lg-7 mb-3">
          <legend className="fs-4 px-3">Plataforma</legend>
          <div className={styles.searchForm__fieldsetContainer}>
            <div className={styles.searchForm__actionButtons}>
              <button 
                type="button" 
                className={`${styles.searchForm__actionButton} ${styles['searchForm__actionButton--primary']}`}
                onClick={handleSelectAllPlatforms}
              >
                Selecionar Todas
              </button>
              <button 
                type="button" 
                className={`${styles.searchForm__actionButton} ${styles['searchForm__actionButton--secondary']}`}
                onClick={handleDeselectAllPlatforms}
              >
                Limpar Seleção
              </button>
            </div>
            <fieldset className="p-3 p-md-4">
              <div className="d-flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <div key={platform} className="flex-grow-1" style={{ maxWidth: '180px' }}>
                    <div className={styles.searchForm__checkboxContainer}>
                      <input
                        type="checkbox"
                        className={styles.searchForm__checkbox}
                        id={`platform-${platform}`}
                        checked={formData.platforms.includes(platform)}
                        onChange={() => handlePlatformChange(platform)}
                      />
                      <label className={styles.searchForm__checkmark} htmlFor={`platform-${platform}`}>
                        {platform}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>  
        </div>

        <div className="col-12 col-lg-5 mb-3">
          <legend className="fs-4 px-3">Memória RAM</legend>
          <fieldset className="p-3 p-md-4">
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
