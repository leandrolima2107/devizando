'use client';

import { useState } from 'react';
import { services } from '@/lib/site';
import styles from './Services.module.css';

export default function Services() {
  const [open, setOpen] = useState<string | null>(services[0].id);

  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Especialidades</p>
            <h2 className="section-title">
              Tudo o que a sua operação <span className="serif grad-text">precisa</span>
            </h2>
          </div>
          <p className="section-lead">
            Cinco frentes que se conectam em uma única entrega: do site que apresenta o
            seu negócio ao sistema que organiza a operação — com a infraestrutura para
            manter tudo no ar.
          </p>
        </div>

        <div className={styles.list}>
          {services.map((service, index) => {
            const isOpen = open === service.id;
            return (
              <div
                key={service.id}
                className={`reveal ${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                style={{ '--reveal-delay': `${index * 50}ms` } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={styles.head}
                  aria-expanded={isOpen}
                  aria-controls={`servico-${service.id}`}
                  onClick={() => setOpen(isOpen ? null : service.id)}
                >
                  <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.headText}>
                    <span className={styles.title}>{service.title}</span>
                    <span className={styles.headline}>{service.headline}</span>
                  </span>
                  <span className={styles.plus} aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>

                <div
                  id={`servico-${service.id}`}
                  className={styles.panel}
                  role="region"
                  aria-label={service.title}
                >
                  <div className={styles.panelInner}>
                    <div className={styles.panelGrid}>
                      <div>
                        <p className={styles.body}>{service.body}</p>
                        <p className={styles.ideal}>{service.idealFor}</p>
                        <div className="chip-row">
                          {service.tags.map((tag) => (
                            <span key={tag} className="chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ul className={styles.deliverables}>
                        {service.deliverables.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
