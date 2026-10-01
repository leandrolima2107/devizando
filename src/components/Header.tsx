'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.css';

const links = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#processo', label: 'Processo' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.logo} href="#inicio" aria-label="Devizando — início">
          <span className={styles.logoMark} aria-hidden="true">
            D
          </span>
          <span className={styles.logoText}>Devizando</span>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          {links.map((link) => (
            <a key={link.href} className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className={`btn btn--primary ${styles.cta}`} href="#contato">
          Solicitar orçamento
        </a>

        <button
          type="button"
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" className={styles.mobileMenu} aria-label="Navegação móvel">
          {links.map((link) => (
            <a
              key={link.href}
              className={styles.mobileLink}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className={`btn btn--primary ${styles.mobileCta}`}
            href="#contato"
            onClick={() => setOpen(false)}
          >
            Solicitar orçamento
          </a>
        </nav>
      )}
    </header>
  );
}
