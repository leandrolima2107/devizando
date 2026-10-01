import { services } from '@/lib/site';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow">O que fazemos</p>
            <h2 className="section-title">Cinco frentes, um mesmo critério: funciona na prática</h2>
          </div>
          <p className="section-lead">
            Cada serviço é orçado e executado de forma independente — dá para começar por um e
            evoluir com calma. Abaixo, o que entra em cada entrega e para quem ela faz sentido.
          </p>
        </div>

        <ol className={styles.list}>
          {services.map((service, index) => (
            <li key={service.id} className={`reveal ${styles.item}`}>
              <div>
                <p className={styles.number}>{String(index + 1).padStart(2, '0')}</p>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.ideal}>{service.idealFor}</p>
              </div>

              <div>
                <p className={styles.body}>{service.body}</p>
                <ul className={styles.deliverables}>
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul className={styles.tags} aria-label={`Tecnologias de ${service.title}`}>
                  {service.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
