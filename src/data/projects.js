import { heroProjects } from './heroProjects'
import { projectUrls } from './liveProjects'
const aura = heroProjects.find(project => project.id === 'aura')
const pdv = heroProjects.find(project => project.id === 'pdv')
const aveloz = heroProjects.find(project => project.id === 'mobile')

export const projects = [
  { id: 'domus', name: 'DOMUS', type: 'WEB DESIGN / LANDING PAGE', desc: 'Uma experiência editorial para o universo imobiliário.', link: 'https://www.behance.net/gallery/257369347/DOMUS-Real-Estate-Landing-Page-Web-Experience', theme: 'domus', small: 'REAL ESTATE / CONCEPT PROJECT', conceptual: true },
  { id: 'aura', name: 'AURA', type: 'BRANDING / WEB EXPERIENCE', desc: 'Uma identidade sensorial para uma marca de skincare.', link: aura.link, image: aura.image, theme: 'aura', conceptual: true },
  { id: 'nexora', name: 'NEXORA', type: 'DIGITAL EXPERIENCE / CONCEPT', desc: 'Exploração de linguagem visual e tecnologia para uma marca de IA.', link: null, theme: 'nexora', small: 'AI STUDIO / CONCEPT PROJECT', conceptual: true },
  { id: 'pdv', name: 'PDV Core', type: 'WEB DESIGN / TECNOLOGIA', desc: 'Uma apresentação digital para um sistema de ponto de venda e gestão.', image: pdv.image, theme: 'pdv', conceptual: false },
  { id: 'aveloz', name: 'Instituto Aveloz', type: 'LANDING PAGE / MOBILE', desc: 'Uma experiência mobile para apresentar iniciativas de desenvolvimento humano, territorial e comunitário.', image: aveloz.image, theme: 'aveloz', mobile: true, conceptual: false },
].map(project => ({ ...project, link: projectUrls[project.id] }))
