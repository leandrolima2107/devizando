import { principles } from '@/lib/site';
import styles from './About.module.css';

export default function About() {
  return (
    <section className="section" id="sobre">
      <div className={`container ${styles.grid}`}>
        <div className="reveal">
          <p className="eyebrow">Sobre a Devizando</p>
          <h2 className="section-title">Tecnologia é meio. O que importa é o problema resolvido.</h2>
          <p className={styles.lead}>
            A Devizando é um estúdio de desenvolvimento que trabalha lado a lado com quem decide.
            A premissa é simples: entender o negócio antes de escrever a primeira linha de código,
            escolher a tecnologia que faz sentido para o momento da empresa e entregar algo que a
            sua equipe consiga usar e manter.
          </p>
          <p className={styles.lead}>
            Sem jargão e sem promessa vaga: você sabe o que está sendo feito, quanto custa, qual é
            o prazo e o que acontece depois da publicação.
          </p>
          <div className={styles.actions}>
            <a className="btn btn--primary" href="#contato">
              Conversar sobre um projeto
            </a>
            <a className="btn btn--ghost" href="#processo">
              Ver como trabalhamos
            </a>
          </div>
        </div>

        <ul className={styles.principles}>
          {principles.map((principle, index) => (
            <li key={principle.title} className={`reveal ${styles.principle}`}>
              <h3 className={styles.principleTitle}>
                <span>0{index + 1}</span>
                {principle.title}
              </h3>
              <p className={styles.principleText}>{principle.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
