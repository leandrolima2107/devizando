'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { services, type ServiceId } from '@/lib/site';
import SceneFallback from './SceneFallback';
import styles from './Hero.module.css';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => <SceneFallback />,
});

type Selection = ServiceId | 'geral';

const generalCaption = {
  title: 'Uma estação de trabalho, cinco frentes de atuação',
  text:
    'Selecione um serviço para ver como ele se conecta ao que a Devizando constrói. A cena responde ao mouse e ao toque — e desliga o movimento para quem prefere menos animação.',
};

export default function Hero() {
  const [selection, setSelection] = useState<Selection>('geral');
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [running, setRunning] = useState(true);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Suporte a WebGL: sem suporte, mostra a alternativa estática.
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
      setWebgl(Boolean(gl));
    } catch {
      setWebgl(false);
    }
  }, []);

  // Preferência por movimento reduzido.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Pausa a renderização quando a cena sai da área visível.
  useEffect(() => {
    const host = sceneRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry?.isIntersecting ?? true),
      { threshold: 0.05 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const activeService = services.find((s) => s.id === selection);
  const caption = activeService
    ? { title: activeService.headline, text: activeService.body }
    : generalCaption;

  return (
    <section className={`${styles.hero} section--dark`} id="inicio">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">Estúdio de desenvolvimento</p>
          <h1 className={styles.title}>
            Tecnologia que resolve <em>o problema certo</em>.
          </h1>
          <p className={styles.lead}>
            A Devizando cria sites, sistemas web, automações e soluções com inteligência
            artificial para empresas que precisam de resultados no dia a dia — do diagnóstico
            à publicação, com decisões explicadas e sem jargão.
          </p>

          <div className={styles.actions}>
            <a className="btn btn--primary" href="#contato">
              Solicitar orçamento
            </a>
            <a className="btn btn--ghost" href="#projetos">
              Conhecer projetos
            </a>
          </div>

          <ul className={styles.trust}>
            <li>Diagnóstico antes da proposta</li>
            <li>Prazos e custos por escrito</li>
            <li>Suporte depois da publicação</li>
          </ul>
        </div>

        <div>
          <div className={styles.sceneWrap}>
            <div className={styles.sceneHost} ref={sceneRef}>
              {webgl === false ? (
                <SceneFallback />
              ) : (
                <Scene3D
                  active={selection === 'geral' ? 'geral' : selection}
                  reduced={reduced}
                  running={running && !reduced}
                />
              )}
            </div>
            <p className={styles.sceneHint}>Cena interativa</p>
          </div>

          <div className={styles.selector}>
            <p className={styles.selectorLabel} id="seletor-servicos">
              Explore por serviço
            </p>
            <ul className={styles.chips} aria-labelledby="seletor-servicos">
              <li>
                <button
                  type="button"
                  className={`${styles.chip} ${selection === 'geral' ? styles.chipActive : ''}`}
                  aria-pressed={selection === 'geral'}
                  onClick={() => setSelection('geral')}
                >
                  Visão geral
                </button>
              </li>
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    className={`${styles.chip} ${selection === service.id ? styles.chipActive : ''}`}
                    aria-pressed={selection === service.id}
                    onClick={() => setSelection(service.id)}
                  >
                    {service.short}
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.caption} aria-live="polite">
              <p className={styles.captionTitle}>{caption.title}</p>
              <p className={styles.captionText}>{caption.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
