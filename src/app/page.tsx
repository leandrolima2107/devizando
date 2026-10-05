import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Works from '@/components/Works';
import Services from '@/components/Services';
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
      <Marquee />
      <Works />
      <Services />
      <Process />
      <About />
      <Faq />
      <Contact formEnabled={formEnabled} />
    </>
  );
}
