import { faq } from '@/lib/site';
import styles from './Faq.module.css';

export default function Faq() {
  return (
    <section className="section section--dark" id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="section-title">O que costuma aparecer antes de começar</h2>
          </div>
          <p className="section-lead">
            Respostas diretas sobre contratação, prazos, manutenção e hospedagem. Se ficar
            qualquer dúvida, é só perguntar no contato.
          </p>
        </div>

        <div className={styles.faq}>
          {faq.map((item, index) => (
            <details key={item.question} className={`reveal ${styles.item}`} {...(index === 0 ? { open: true } : {})}>
              <summary className={styles.question}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
