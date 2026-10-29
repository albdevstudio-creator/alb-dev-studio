export const projectUrls = {
  aura: 'https://aura-skincare-alb.vercel.app/',
  nexora: 'https://nexora-ai-alb.vercel.app/',
  domus: 'https://domus-imobiliaria-alb.vercel.app/',
  aveloz: 'https://institutoaveloz.vercel.app/',
  pdv: 'https://pdvcore.vercel.app/landing',
}

export const liveProjects = [
  {
    id: 'aura', name: 'AURA Skincare', category: 'BELEZA & AUTOCUIDADO',
    headline: 'Uma presença que se sente.',
    summary: 'Tons naturais e uma direção sensorial para transformar o cuidado em presença.',
    description: 'Tons naturais, tipografia delicada e imagens que aproximam. Uma experiência sensorial que traduz o cuidado em cada detalhe.',
    identity: 'Natural. Delicada. Sensorial.', accent: '#d3c5a5',
  },
  {
    id: 'nexora', name: 'NEXORA AI', category: 'INTELIGÊNCIA ARTIFICIAL',
    headline: 'Tecnologia com personalidade.',
    summary: 'Luz, profundidade e uma linguagem imersiva para dar personalidade à tecnologia.',
    description: 'Luz, profundidade e uma linguagem visual imersiva dão forma a uma marca de inteligência artificial voltada a transformar ideias em ação.',
    identity: 'Imersiva. Ousada. Digital.', accent: '#be9afa',
  },
  {
    id: 'domus', name: 'DOMUS', category: 'ARQUITETURA & MERCADO IMOBILIÁRIO',
    headline: 'Arquitetura também na experiência.',
    summary: 'Fotografia e composição editorial para valorizar a arquitetura de cada espaço.',
    description: 'Fotografia em destaque e uma composição editorial que valoriza os espaços. Uma presença sóbria, com tempo para olhar e descobrir.',
    identity: 'Editorial. Sóbria. Contemporânea.', accent: '#ccbea3',
  },
  {
    id: 'aveloz', name: 'Instituto Aveloz', category: 'IMPACTO SOCIAL & SUSTENTABILIDADE',
    headline: 'Uma causa com voz e presença.',
    summary: 'Cores vivas e imagens do território para aproximar pessoas de uma causa.',
    description: 'Cores vivas, imagens do território e informação acessível conectam a identidade do Instituto ao seu propósito de fortalecer comunidades.',
    identity: 'Humana. Viva. Acolhedora.', accent: '#d2d86b',
  },
  {
    id: 'pdv', name: 'PDV Core', category: 'SOFTWARE & GESTÃO',
    headline: 'Clareza para apresentar tecnologia.',
    summary: 'Contraste e clareza para apresentar vendas e gestão de forma direta.',
    description: 'Contrastes, organização e uma linguagem direta apresentam um sistema de vendas e gestão com uma presença digital prática e confiante.',
    identity: 'Direta. Estruturada. Confiante.', accent: '#9dbbf0',
  },
].map(project => ({ ...project, link: projectUrls[project.id], image: `/projects/${project.id}.jpg`, mobileImage: `/projects/${project.id}-mobile.jpg` }))

export { socialProjects } from './socialProjects'
