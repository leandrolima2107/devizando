import { projects } from '@/lib/site';
import styles from './Works.module.css';

const variants = ['erp', 'saas', 'webgl'] as const;

function WorkVisual({ variant, title }: { variant: (typeof variants)[number]; title: string }) {
  return (
    <div className={`${styles.visual} ${styles[`visual_${variant}`]}`} aria-hidden="true">
      <div className={styles.visualGlow} />
      <div className={styles.window}>
        <div className={styles.windowBar}>
          <span />
          <span />
          <span />
          <em>{title.toLowerCase().replace(/\s+/g, '-')}.app</em>
        </div>
        <div className={styles.windowBody}>
          <div className={styles.side}>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={styles.content}>
            <div className={styles.blockWide} />
            <div className={styles.row}>
              <div className={styles.block} />
              <div className={styles.block} />
            </div>
            <div className={styles.chart}>
              <b style={{ height: '38%' }} />
              <b style={{ height: '62%' }} />
              <b style={{ height: '48%' }} />
              <b style={{ height: '82%' }} />
              <b style={{ height: '58%' }} />
              <b style={{ height: '94%' }} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.floatCard}>
        <span className={styles.floatDot} />
        <span className={styles.floatLine} />
      </div>
    </div>
  );
}

export default function Works() {
  return (
    <section className="section" id="projetos">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Trabalhos realizados</p>
            <h2 className="section-title">
              Projetos que já saíram <span className="serif grad-text">do papel</span>
            </h2>
          </div>
          <p className="section-lead">
            Casos reais, apresentados como portfólio: o problema que existia, a solução
            construída e o resultado em produção. Sem vitrine de conceito.
          </p>
        </div>

        <div className={styles.list}>
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`reveal ${styles.work}`}
              style={{ '--reveal-delay': `${index * 60}ms` } as React.CSSProperties}
            >
              <div className={styles.meta}>
                <div className={styles.metaTop}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={styles.category}>{project.category}</p>
                    <h3 className={styles.title}>{project.title}</h3>
                  </div>
                </div>

                <ul className={styles.highlights}>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <div className={styles.chips}>
                  {project.tech.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.body}>
                <WorkVisual variant={variants[index % variants.length]} title={project.title} />

                <div className={styles.story}>
                  <div className={styles.storyBlock}>
                    <h4>O problema</h4>
                    <p>{project.problem}</p>
                  </div>
                  <div className={styles.storyBlock}>
                    <h4>A solução</h4>
                    <p>{project.solution}</p>
                  </div>
                  <div className={`${styles.storyBlock} ${styles.result}`}>
                    <h4>Resultado</h4>
                    <p>{project.result}</p>
                    <span className={styles.status}>
                      <i aria-hidden="true" />
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
