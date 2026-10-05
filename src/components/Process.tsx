import { processSteps } from '@/lib/site';
import styles from './Process.module.css';

export default function Process() {
  return (
    <section className="section" id="processo">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Como trabalhamos</p>
            <h2 className="section-title">
              Um processo <span className="serif grad-text">transparente</span>,
              do primeiro contato ao suporte
            </h2>
          </div>
          <p className="section-lead">
            Sem caixa-preta e sem surpresa: cada etapa tem entrega combinada antes de
            começar, e você acompanha o projeto enquanto ele acontece.
          </p>
        </div>

        <ol className={styles.steps}>
          {processSteps.map((step, index) => (
            <li
              key={step.step}
              className={`reveal ${styles.step}`}
              style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
            >
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.number}>{step.step}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
