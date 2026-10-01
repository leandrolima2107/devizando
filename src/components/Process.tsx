import { processSteps } from '@/lib/site';
import styles from './Process.module.css';

export default function Process() {
  return (
    <section className="section section--tint" id="processo">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">Como trabalhamos</p>
            <h2 className="section-title">Seis etapas, sem surpresa no meio do caminho</h2>
          </div>
          <p className="section-lead">
            Você acompanha cada etapa e aprova antes de avançar. O processo é o mesmo para uma
            landing page e para um sistema completo — só muda o tamanho de cada passo.
          </p>
        </div>

        <ol className={styles.steps}>
          {processSteps.map((item) => (
            <li key={item.step} className={`reveal ${styles.step}`}>
              <p className={styles.stepNumber}>{item.step}</p>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepText}>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
