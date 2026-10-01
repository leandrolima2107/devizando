import { projects } from '@/lib/site';
import styles from './Portfolio.module.css';

export default function Portfolio() {
  return (
    <section className="section section--dark" id="projetos">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">Projetos</p>
            <h2 className="section-title">Trabalho real, apresentado com contexto</h2>
          </div>
          <p className="section-lead">
            Problema, solução, tecnologias e situação atual — sem número inventado e sem
            depoimento encomendado. Demonstrações aparecem marcadas como demonstração.
          </p>
        </div>

        <ul className={styles.grid}>
          {projects.map((project, index) => (
            <li
              key={project.title}
              className={`reveal ${styles.itemWide} ${index % 2 === 1 ? styles.itemNarrow : ''}`}
            >
              <article className={styles.card}>
                <span className={`${styles.kind} ${project.kind === 'Demonstração' ? styles.kindDemo : ''}`}>
                  {project.kind}
                </span>

                <h3 className={styles.title}>{project.title}</h3>

                <div className={styles.block}>
                  <p className={styles.blockLabel}>Problema</p>
                  <p className={styles.blockText}>{project.problem}</p>
                </div>

                <div className={styles.block}>
                  <p className={styles.blockLabel}>Solução</p>
                  <p className={styles.blockText}>{project.solution}</p>
                </div>

                <div className={`${styles.block} ${styles.blockResult}`}>
                  <p className={styles.blockLabel}>Situação</p>
                  <p className={styles.blockText}>{project.result}</p>
                </div>

                <ul className={styles.tech} aria-label={`Tecnologias de ${project.title}`}>
                  {project.tech.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                {project.link && (
                  <a className={styles.link} href={project.link.href} target="_blank" rel="noopener noreferrer">
                    {project.link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          Novos cases entram nesta página conforme os projetos forem liberados para divulgação.
          Se você quiser ver algo parecido com a sua necessidade, dá para conversar sobre
          exemplos durante o diagnóstico.
        </p>
      </div>
    </section>
  );
}
