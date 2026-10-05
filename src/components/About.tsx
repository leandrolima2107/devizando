import { principles, site } from '@/lib/site';
import styles from './About.module.css';

export default function About() {
  return (
    <section className="section" id="sobre">
      <div className={`container ${styles.grid}`}>
        <div className={styles.manifesto}>
          <p className="eyebrow">Sobre a Devizando</p>
          <h2 className={styles.headline}>
            Menos promessa.
            <br />
            <span className="serif grad-text">Mais engenharia.</span>
          </h2>
          <p className={styles.lead}>
            {site.description} Cada projeto começa pelo problema real da operação — e
            termina com algo publicado, testado e documentado.
          </p>
          <p className={styles.quote}>
            “Um projeto bonito que confunde quem usa não entrega resultado. O acabamento
            importa tanto quanto a engenharia que existe por trás.”
          </p>
        </div>

        <div className={styles.cards}>
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className={`reveal ${styles.card}`}
              style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties}
            >
              <span className={styles.cardIndex}>0{index + 1}</span>
              <h3 className={styles.cardTitle}>{principle.title}</h3>
              <p className={styles.cardText}>{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
