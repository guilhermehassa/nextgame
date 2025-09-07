import React, { useState, useEffect } from 'react';
import { FaGamepad, FaSearch, FaLightbulb, FaRocket } from 'react-icons/fa';
import styles from './styles.module.scss';

const loadingMessages = [
  {
    icon: FaSearch,
    message: "Explorando o universo dos jogos...",
    detail: "Analisando milhares de títulos para encontrar o ideal para você"
  },
  {
    icon: FaLightbulb,
    message: "Processando suas preferências...",
    detail: "Matching com os melhores jogos do seu estilo"
  },
  {
    icon: FaRocket,
    message: "Preparando sua próxima aventura...",
    detail: "Quase lá! Sua recomendação está chegando"
  }
];

export default function LoadingScreen() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3400);

    const progressInterval = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const currentMessage = loadingMessages[currentMessageIndex];
  const Icon = currentMessage.icon;

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingScreen__content}>
        <div className={styles.loadingScreen__iconWrapper}>
          <Icon 
            key={currentMessageIndex}
            className={styles.loadingScreen__iconWrapper___icon} 
          />
        </div>
          
        <div key={currentMessageIndex}>
          <h2 className={styles.loadingScreen__title}>
            {currentMessage.message}
          </h2>
          <p className={styles.loadingScreen__subtitle}>
            {currentMessage.detail}
          </p>
        </div>

        <div className={styles.loadingScreen__progressContainer}>
          <div 
            className={styles.loadingScreen__progressBar} 
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
};