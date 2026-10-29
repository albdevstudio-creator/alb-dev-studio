import nexoraPost from '../assets/nexora/feed.png'
import nexoraStory from '../assets/nexora/story.png'
import nexoraCarousel1 from '../assets/nexora/carrosel1.png'
import nexoraCarousel2 from '../assets/nexora/carrosel2.png'
import nexoraCarousel3 from '../assets/nexora/carrosel3.png'
import auraPost from '../assets/aura/feed.png'
import auraStory from '../assets/aura/story.png'
import auraCarousel1 from '../assets/aura/carrosel1.png'
import auraCarousel2 from '../assets/aura/carrosel2.png'
import auraCarousel3 from '../assets/aura/carrosel3.png'
import domusPost from '../assets/domus/feed.png'
import domusStory from '../assets/domus/story.png'
import domusCarousel1 from '../assets/domus/carrosel1.png'
import domusCarousel2 from '../assets/domus/carrosel2.png'
import domusCarousel3 from '../assets/domus/carrosel3.png'

const previews = import.meta.glob('../assets/social-previews/*/*.webp', { eager: true, query: '?url', import: 'default' })
const preview = (brand, file) => previews[`../assets/social-previews/${brand}/${file}.webp`]

function artwork(brand, file, fullSrc, alt, height = 1350) {
  return { src: preview(brand, file), fullSrc, alt, width: 1080, height }
}

export const socialProjects = [
  {
    id: 'nexora', name: 'Nexora', category: 'TECNOLOGIA & INTELIGÊNCIA ARTIFICIAL', accent: '#be9afa', thumbnail: preview('nexora', 'feed-thumb'),
    formats: {
      post: [artwork('nexora', 'feed', nexoraPost, 'Post estático da Nexora AI: menos processos, mais possibilidades.')],
      carousel: [nexoraCarousel1, nexoraCarousel2, nexoraCarousel3].map((src, index) => artwork('nexora', `carrosel${index + 1}`, src, `Carrossel da Nexora AI, página ${index + 1} de 3.`)),
      story: [artwork('nexora', 'story', nexoraStory, 'Story da Nexora AI para redes sociais.', 1920)],
    },
  },
  {
    id: 'aura', name: 'Aura', category: 'BELEZA & AUTOCUIDADO', accent: '#d3c5a5', thumbnail: preview('aura', 'feed-thumb'),
    formats: {
      post: [artwork('aura', 'feed', auraPost, 'Post estático da Aura: rotina de cuidados para uma pele real.')],
      carousel: [auraCarousel1, auraCarousel2, auraCarousel3].map((src, index) => artwork('aura', `carrosel${index + 1}`, src, `Carrossel da Aura, página ${index + 1} de 3.`)),
      story: [artwork('aura', 'story', auraStory, 'Story da Aura para redes sociais.', 1920)],
    },
  },
  {
    id: 'domus', name: 'Domus', category: 'ARQUITETURA & MERCADO IMOBILIÁRIO', accent: '#ccbea3', thumbnail: preview('domus', 'feed-thumb'),
    formats: {
      post: [artwork('domus', 'feed', domusPost, 'Post estático da Domus para o feed.')],
      carousel: [domusCarousel1, domusCarousel2, domusCarousel3].map((src, index) => artwork('domus', `carrosel${index + 1}`, src, `Carrossel da Domus, página ${index + 1} de 3.`)),
      story: [artwork('domus', 'story', domusStory, 'Story da Domus: seu próximo capítulo começa aqui.', 1920)],
    },
  },
]
