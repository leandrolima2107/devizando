import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import SkipLink from '@/components/SkipLink';
import { site } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Devizando — Sites, sistemas, automações e soluções com IA',
    template: '%s | Devizando',
  },
  description:
    'A Devizando desenvolve sites, sistemas web, automações e soluções com inteligência artificial para empresas que precisam de tecnologia que funcione na prática.',
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    'desenvolvimento de sites',
    'criação de site',
    'sistema web',
    'sob medida',
    'automação de processos',
    'inteligência artificial',
    'landing page',
    'SaaS',
  ],
  alternates: {
    canonical: '/',
    languages: { 'pt-BR': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.name,
    title: 'Devizando — Sites, sistemas, automações e soluções com IA',
    description:
      'Sites, sistemas web, automações e soluções com inteligência artificial, do diagnóstico à publicação.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Devizando' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devizando — Sites, sistemas, automações e soluções com IA',
    description:
      'Sites, sistemas web, automações e soluções com inteligência artificial, do diagnóstico à publicação.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#14171c',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organizacao`,
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      areaServed: 'BR',
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#site`,
      url: site.url,
      name: site.name,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${site.url}/#organizacao` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#servicos`,
      name: site.name,
      url: site.url,
      email: site.email,
      areaServed: 'BR',
      serviceType: [
        'Desenvolvimento de sites e landing pages',
        'Desenvolvimento de sistemas web e SaaS',
        'Automações e integrações',
        'Soluções com inteligência artificial',
        'Implantação e infraestrutura',
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SkipLink />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <Reveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
