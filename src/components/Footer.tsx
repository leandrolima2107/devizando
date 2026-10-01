import { site } from '@/lib/site';
import styles from './Footer.module.css';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <a className={styles.brand} href="#inicio">
              <span className={styles.mark} aria-hidden="true">
                D
              </span>
              <span className={styles.name}>Devizando</span>
            </a>
            <p className={styles.tagline}>{site.tagline}. Do diagnóstico à publicação, com decisões explicadas.</p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className={styles.columnTitle}>Navegação</p>
            <ul className={styles.links}>
              <li>
                <a href="#servicos">Serviços</a>
              </li>
              <li>
                <a href="#projetos">Projetos</a>
              </li>
              <li>
                <a href="#processo">Processo</a>
              </li>
              <li>
                <a href="#sobre">Sobre</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contato">Contato</a>
              </li>
            </ul>
          </nav>

          <div>
            <p className={styles.columnTitle}>Contato</p>
            <ul className={styles.links}>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href="/privacidade">Política de privacidade</a>
              </li>
              {site.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
          <p>Este site não usa cookies de rastreamento.</p>
        </div>
      </div>
    </footer>
  );
}
