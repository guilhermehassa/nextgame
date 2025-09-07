import { GameResult as GameResultType } from '@/context/Context';
import styles from './styles.module.scss';

export default function GameResult({ game }: { game: GameResultType }) {
  if (!game) return null;

  return (
    <div className={`container-fluid p-0 py-lg-5 ${styles.gameResult}`}>
      <div className="w-100 fluid">
        <img src={game.thumbnail} alt={game.title} className={`d-lg-none ${styles.thumbnail}`} />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 order-lg-1 order-2">
            <img src={game.thumbnail} alt={game.title} className={`d-none d-lg-block ${styles.thumbnail}`} />
            <a 
              href={game.game_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`btn ${styles.actionButton} text-white`}
            >
              Comprar e Jogar
            </a>
            <div className="mb-4">
              <h3 className={styles.sectionTitle}>Informações Gerais</h3>
              <ul className="list-unstyled">
                <li className="mb-2"><strong>Gênero:</strong> {game.genre}</li>
                <li className="mb-2"><strong>Plataforma:</strong> {game.platform}</li>
                <li className="mb-2"><strong>Desenvolvedor:</strong> {game.developer}</li>
                <li className="mb-2"><strong>Publicador:</strong> {game.publisher}</li>
                <li className="mb-2"><strong>Data de Lançamento:</strong> {game.release_date}</li>
                <li className="mb-2"><strong>Status:</strong> {game.status}</li>
              </ul>
            </div>

            {game.minimum_system_requirements && (
              <div className="mb-4">
                <h3 className={styles.sectionTitle}>Requisitos Mínimos</h3>
                <ul className="list-unstyled">
                  <li className="mb-2"><strong>Sistema Operacional:</strong> {game.minimum_system_requirements.os}</li>
                  <li className="mb-2"><strong>Processador:</strong> {game.minimum_system_requirements.processor}</li>
                  <li className="mb-2"><strong>Memória:</strong> {game.minimum_system_requirements.memory}</li>
                  <li className="mb-2"><strong>Placa de Vídeo:</strong> {game.minimum_system_requirements.graphics}</li>
                  <li className="mb-2"><strong>Armazenamento:</strong> {game.minimum_system_requirements.storage}</li>
                </ul>
              </div>
            )}
          </div>

          <div className="col-lg-8 order-lg-2 order-1">
            <h1 className={styles.title}>{game.title}</h1>
            <p className={styles.description}>{game.description}</p>

            {game.screenshots && game.screenshots.length > 0 && (
              <div className="mb-4">
                <h3 className={styles.sectionTitle}>Screenshots</h3>
                <div className="row g-3">
                  {game.screenshots.map(screenshot => (
                    <div key={screenshot.id} className="col-md-6">
                      <img 
                        src={screenshot.image} 
                        alt={`Screenshot ${screenshot.id}`} 
                        className={`img-fluid w-100 ${styles.screenshotImage}`}
                        data-bs-toggle="modal"
                        data-bs-target={`#screenshot-${screenshot.id}`}
                      />
                      
                      <div 
                        className="modal fade" 
                        id={`screenshot-${screenshot.id}`} 
                        tabIndex={-1}
                        aria-labelledby={`screenshot-${screenshot.id}-label`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-fullscreen">
                          <div className="modal-content bg-dark">
                            <div className="modal-header border-0">
                              <button 
                                type="button" 
                                className="btn-close btn-close-white" 
                                data-bs-dismiss="modal" 
                                aria-label="Fechar"
                              ></button>
                            </div>
                            <div className="modal-body d-flex align-items-center justify-content-center p-0">
                              <img 
                                src={screenshot.image} 
                                alt={`Screenshot ${screenshot.id}`} 
                                className={styles.fullscreenImage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
}