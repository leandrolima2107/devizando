import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Process from '@/components/Process';
import About from '@/components/About';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import { activeProvider } from '@/lib/contact';

// Renderizado em tempo real: o formulário é publicado apenas quando existe
// provedor de entrega configurado no servidor.
export const dynamic = 'force-dynamic';

export default function HomePage() {
  // O formulário só é publicado quando existe entrega real configurada.
  const formEnabled = Boolean(activeProvider());

  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <About />
      <Faq />
      <Contact formEnabled={formEnabled} />
    </>
  );
}
