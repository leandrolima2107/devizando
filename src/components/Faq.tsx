'use client';

import { useState } from 'react';
import { faq } from '@/lib/site';
import styles from './Faq.module.css';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="section-title">
              O que costuma aparecer <span className="serif grad-text">antes de começar</span>
            </h2>
          </div>
          <p className="section-lead">
            Respostas diretas sobre contratação, prazos, manutenção e hospedagem. Se
            ficar qualquer dúvida, é só perguntar no contato.
          </p>
        </div>

        <div className={styles.faq}>
          {faq.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question} className={`reveal ${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </button>
                <div id={`faq-${index}`} className={styles.panel} role="region">
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
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
