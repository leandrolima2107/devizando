import styles from './Marquee.module.css';

const items = [
  'Sites e landing pages',
  'Sistemas web e SaaS',
  'Automações e integrações',
  'Inteligência artificial',
  'Infraestrutura e deploy',
];

export default function Marquee() {
  const row = [...items, ...items, ...items];

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className={styles.item}>
            {item}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
