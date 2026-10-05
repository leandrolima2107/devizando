/**
 * Configuração central do site Devizando.
 *
 * Todo o conteúdo editável (textos, serviços, projetos, FAQ e contatos)
 * vive neste arquivo. Nada aqui deve conter informações inventadas:
 * apenas fatos reais sobre a Devizando e os projetos listados.
 */

export const site = {
  name: "Devizando",
  legalName: "Devizando",
  tagline: "Sites, sistemas, automações e soluções com inteligência artificial",
  description:
    "A Devizando desenvolve sites, sistemas web, automações e soluções com inteligência artificial para empresas que precisam de tecnologia que funcione na prática.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devizando.com",
  locale: "pt-BR",
  /** Contato comercial real encontrado nos materiais do projeto. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "leandrolima2107@gmail.com",
  /**
   * Número de WhatsApp comercial ainda não confirmado.
   * Enquanto não houver número real, o botão de WhatsApp fica oculto.
   */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
} as const;

export type ServiceId =
  | "sites"
  | "sistemas"
  | "automacoes"
  | "ia"
  | "infra";

export type Service = {
  id: ServiceId;
  title: string;
  short: string;
  headline: string;
  body: string;
  deliverables: string[];
  idealFor: string;
  tags: string[];
};

export const services: Service[] = [
  {
    id: "sites",
    title: "Sites e landing pages",
    short: "Sites e landing pages",
    headline: "Páginas rápidas, claras e preparadas para gerar contato",
    body: "Site institucional, landing page ou portfólio com carregamento leve, layout responsivo e textos que explicam o seu serviço sem rodeio. Inclui SEO técnico, formulário de contato e análise de desempenho antes da publicação.",
    deliverables: [
      "Layout responsivo em celular, tablet e desktop",
      "SEO técnico: títulos, descrições, sitemap e dados estruturados",
      "Formulário de contato com validação e proteção contra spam",
      "Hospedagem, domínio e HTTPS configurados",
    ],
    idealFor:
      "Para quem precisa de uma presença profissional que passe confiança e converta visitantes em conversas.",
    tags: ["Next.js", "React", "SEO", "Performance", "Acessibilidade"],
  },
  {
    id: "sistemas",
    title: "Sistemas web e SaaS",
    short: "Sistemas e SaaS",
    headline: "Sistemas sob medida para organizar a operação do dia a dia",
    body: "Painéis, portais e sistemas multiusuário construídos em torno da sua rotina real: cadastros, ordens de serviço, financeiro, relatórios e permissões por perfil. Arquitetura pensada para crescer sem precisar reescrever tudo depois.",
    deliverables: [
      "Telas com autenticação e perfis de acesso",
      "Modelo de dados documentado e versionado",
      "Relatórios e exportações para o time trabalhar",
      "Integrações com pagamentos, e-mail e WhatsApp",
    ],
    idealFor:
      "Para empresas que já passaram da fase da planilha e precisam de um sistema que acompanhe o negócio.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Multi-tenant"],
  },
  {
    id: "automacoes",
    title: "Automações e integrações",
    short: "Automações",
    headline: "Menos tarefas repetitivas, mais tempo para o que importa",
    body: "Conectamos as ferramentas que você já usa — WhatsApp, planilhas, ERP, gateway de pagamento — e automatizamos o caminho da informação entre elas. Cada automação é monitorada, para falha não passar despercebida.",
    deliverables: [
      "Webhooks e integrações entre sistemas",
      "Automação de atendimento e follow-up no WhatsApp",
      "Sincronização de dados entre planilhas, ERP e CRM",
      "Logs e alertas para acompanhar o que foi executado",
    ],
    idealFor:
      "Para equipes que gastam horas copiando dados de um sistema para outro.",
    tags: ["Webhooks", "APIs", "WhatsApp", "n8n", "Evolution API"],
  },
  {
    id: "ia",
    title: "Soluções com inteligência artificial",
    short: "Inteligência artificial",
    headline: "Inteligência artificial aplicada a problemas concretos",
    body: "IA entra onde ela resolve: responder clientes com base na sua documentação, classificar e extrair informações de documentos, apoiar a equipe com busca interna e gerar rascunhos. Sem promessa mágica — escopo, teste e métrica combinados antes.",
    deliverables: [
      "Atendimento assistido por IA com base no seu conteúdo",
      "Extração e classificação de dados em documentos e mensagens",
      "Busca semântica sobre a base de conhecimento da empresa",
      "Agentes e automações com revisão humana quando necessário",
    ],
    idealFor:
      "Para quem quer ganho de produtividade com controle do que a IA pode e não pode fazer.",
    tags: ["LLMs", "RAG", "Embeddings", "Agentes", "OpenAI API"],
  },
  {
    id: "infra",
    title: "Implantação e infraestrutura",
    short: "Infraestrutura",
    headline: "Publicação e manutenção para o projeto continuar no ar",
    body: "Deixo o projeto publicado com domínio, HTTPS, backup e monitoramento. Servidores gerenciados com Docker e Coolify, com processo de deploy que permite voltar atrás se algo sair do esperado.",
    deliverables: [
      "Deploy automatizado com rollback",
      "Domínio, certificado HTTPS e e-mail transacional",
      "Backup de banco de dados e arquivos",
      "Monitoramento de disponibilidade e logs",
    ],
    idealFor:
      "Para quem quer publicar sem depender de terceiros para cada ajuste.",
    tags: ["Docker", "Coolify", "VPS", "CI/CD", "Monitoramento"],
  },
];

export type Project = {
  title: string;
  category: string;
  status: string;
  problem: string;
  solution: string;
  tech: string[];
  result: string;
  highlights: string[];
};

/**
 * Portfólio: apenas trabalhos realizados e autorizados.
 * Cada item apresenta problema, solução e resultado reais.
 */
export const projects: Project[] = [
  {
    title: "MobiGest",
    category: "ERP web · Multi-tenant",
    status: "Em evolução contínua",
    highlights: [
      "Ordens de serviço, estoque, vendas e financeiro em um só lugar",
      "Painel por empresa com permissões por perfil",
      "Cobrança integrada e conversas de WhatsApp no fluxo do atendimento",
    ],
    problem:
      "Lojas e assistências técnicas precisam controlar ordens de serviço, estoque, vendas e clientes sem depender de planilhas paralelas que se perdem entre os atendentes.",
    solution:
      "Sistema web multitenant pensado para a rotina do balcão: cadastros, ordens de serviço, financeiro e cobrança integrada, com painel por empresa e controle de acesso por perfil.",
    tech: ["Next.js", "Tailwind CSS", "shadcn/ui", "Supabase", "Abacate Pay", "WhatsApp (GoWA)"],
    result:
      "Em desenvolvimento e validação contínua, com partes da operação já rodando em ambiente real.",
  },
  {
    title: "Multi Atendimento",
    category: "SaaS · Atendimento via WhatsApp",
    status: "Em operação piloto",
    highlights: [
      "Caixa de entrada compartilhada para toda a equipe",
      "Eventos em tempo real via webhooks e CRM leve por empresa",
      "Automação de mensagens com infraestrutura Docker própria",
    ],
    problem:
      "Equipes que atendem leads por WhatsApp perdem histórico e contexto quando toda a conversa acontece em um único celular, sem registro compartilhado.",
    solution:
      "Plataforma multi-tenant com caixa de entrada compartilhada, eventos em tempo real via webhooks, CRM leve por empresa e automação de mensagens — implantada com Docker em VPS.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Redis/BullMQ", "Docker"],
    result:
      "MVP publicado e em operação piloto, atendendo conversas reais com registro compartilhado para a equipe.",
  },
  {
    title: "Devizando",
    category: "Site institucional · WebGL",
    status: "Publicado em produção",
    highlights: [
      "Cena 3D interativa construída em WebGL, leve e responsiva",
      "Arquitetura de performance: renderização estática e envio de formulário seguro",
      "SEO técnico completo: sitemap, dados estruturados e política de privacidade",
    ],
    problem:
      "Apresentar capacidade técnica sem depender de print ou vídeo: a experiência precisa ser vivida no navegador, inclusive em celular.",
    solution:
      "Site com cena 3D em WebGL e geometria procedural, responde ao mouse e ao toque, desliga animação para quem prefere menos movimento e mantém formulário com validação e proteção contra spam.",
    tech: ["Next.js", "Three.js", "React Three Fiber", "WebGL", "Docker"],
    result:
      "Você está usando este projeto agora — a demonstração é o próprio site, publicado com HTTPS e monitoramento.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Conversa inicial para entender o problema, o público e o que já existe. Sem compromisso e sem jargão.",
  },
  {
    step: "02",
    title: "Proposta",
    description:
      "Escopo, etapas, prazos e investimento por escrito. Só começa quando estiver claro para os dois lados.",
  },
  {
    step: "03",
    title: "Desenvolvimento",
    description:
      "Construção em etapas curtas, com versões para você acompanhar e ajustar o caminho durante o projeto.",
  },
  {
    step: "04",
    title: "Validação",
    description:
      "Testes de funcionamento, celular, velocidade e acessibilidade. Você aprova antes de qualquer publicação.",
  },
  {
    step: "05",
    title: "Publicação",
    description:
      "Domínio, HTTPS, configurações e deploy. Com plano de volta atrás caso algo não saia como o esperado.",
  },
  {
    step: "06",
    title: "Suporte",
    description:
      "Acompanhamento depois do lançamento, com correções e evoluções combinadas conforme a necessidade.",
  },
];

export const faq = [
  {
    question: "Como funciona a contratação?",
    answer:
      "O primeiro contato serve para entender o seu problema e o que já existe. Depois disso você recebe uma proposta com escopo, etapas, prazos e investimento. O desenvolvimento só começa depois dessa aprovação.",
  },
  {
    question: "Quanto tempo leva um projeto?",
    answer:
      "Depende do escopo: uma landing page tem um ritmo diferente de um sistema com integrações e banco de dados. O prazo é definido na proposta, com etapas intermediárias para você acompanhar o andamento.",
  },
  {
    question: "Quanto custa?",
    answer:
      "Cada projeto tem escopo próprio, então o orçamento é detalhado a partir do que for combinado na proposta. O objetivo é que você saiba exatamente o que está pagando e por quê.",
  },
  {
    question: "Existe manutenção depois da publicação?",
    answer:
      "Sim. Correções, ajustes e evoluções podem ser combinados sob demanda ou em um plano de suporte, sempre com escopo e condições apresentados antes.",
  },
  {
    question: "Vocês cuidam da hospedagem e do domínio?",
    answer:
      "Sim, se você quiser. A implantação pode incluir hospedagem, domínio, HTTPS, backup e monitoramento. Também é possível publicar na sua própria conta, com orientação para você manter o controle.",
  },
  {
    question: "Posso contratar apenas uma automação ou integração?",
    answer:
      "Sim. Nem todo trabalho precisa de um projeto completo: automações, integrações e ajustes pontuais são orçados separadamente.",
  },
  {
    question: "Já tenho um site ou sistema. Vocês dão continuidade?",
    answer:
      "Sim. É possível avaliar o que existe, corrigir problemas, evoluir funcionalidades ou, quando fizer mais sentido, reescrever com calma e sem interromper a operação.",
  },
  {
    question: "Como meus dados são tratados?",
    answer:
      "Os dados enviados pelo formulário são usados apenas para responder ao seu contato. A política completa está na página de privacidade.",
  },
];

export const principles = [
  {
    title: "Simplicidade de manutenção",
    description:
      "Tecnologia é meio, não vitrine. A solução precisa continuar funcionando quando você precisar mudar algo daqui a um ano.",
  },
  {
    title: "Experiência do usuário dentro do escopo",
    description:
      "Um projeto bonito que confunde quem usa não entrega resultado. Navegação clara, velocidade e acessibilidade fazem parte do trabalho.",
  },
  {
    title: "Tecnologia adequada ao negócio",
    description:
      "Cada escolha técnica precisa fazer sentido para o tamanho e o momento da sua empresa — nem mais, nem menos.",
  },
];
