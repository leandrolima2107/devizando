import { site } from '@/lib/site';
import styles from './Footer.module.css';

const links = [
  { href: '#projetos', label: 'Trabalhos' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Processo' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contato', label: 'Contato' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div>
            <p className={styles.wordmark} aria-hidden="true">
              Devizando
            </p>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <div className={styles.columns}>
            <nav className={styles.nav} aria-label="Navegação do rodapé">
              {links.map((link) => (
                <a key={link.href} className={styles.link} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className={styles.contact}>
              <span className={styles.contactLabel}>Contato</span>
              <a className={styles.contactValue} href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {site.legalName}. Todos os direitos reservados.</span>
          <a className={styles.legal} href="/privacidade">
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
