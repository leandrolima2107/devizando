'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => <div className={styles.sceneGlow} aria-hidden="true" />,
});

export default function Hero() {
  const [reduced, setReduced] = useState(false);
  const [running, setRunning] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.02 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.hero} id="inicio" ref={heroRef}>
      <div className={styles.scene} aria-hidden="true">
        <Scene3D reduced={reduced} running={running} />
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Estúdio de tecnologia · Do diagnóstico à produção
        </p>

        <h1 className={styles.title}>
          Projetos digitais <span className={`serif grad-text`}>impecáveis</span>,
          <br />
          do primeiro pixel à produção.
        </h1>

        <p className={styles.lead}>
          A Devizando cria sites, sistemas, automações e soluções com inteligência
          artificial para empresas que precisam de tecnologia que funcione na prática —
          com acabamento de estúdio e entrega que você acompanha de perto.
        </p>

        <div className={styles.actions}>
          <a className="btn btn--primary" href="#projetos">
            Ver trabalhos realizados
          </a>
          <a className="btn btn--ghost" href="#contato">
            Iniciar um projeto
          </a>
        </div>

        <ul className={styles.tags} aria-label="Áreas de atuação">
          <li>Sites</li>
          <li>Sistemas web</li>
          <li>Automações</li>
          <li>Inteligência artificial</li>
          <li>Infraestrutura</li>
        </ul>
      </div>

      <a className={styles.scroll} href="#projetos" aria-label="Rolar para os trabalhos">
        <span className={styles.scrollLine} aria-hidden="true" />
        <span>Explore</span>
      </a>
    </section>
  );
}
