import aura from '../assets/hero/aura.webp'
import pdvCore from '../assets/hero/pdvCore.webp'
import aveloz from '../assets/hero/aveloz.webp'
import { projectUrls } from './liveProjects'
export const heroProjects = [{
  id: 'aura',
  title: 'AURA',
  categoryLabel: 'Sites',
  image: aura,
  position: 'front',
  format: 'desktop',
  imageWidth: 1280,
  imageHeight: 686,
  link: 'https://www.behance.net/gallery/257366043/AURA-Skincare-Brand-Identity-Web-Experience'
}, {
  id: 'pdv',
  title: 'PDV Core',
  categoryLabel: 'Sites institucionais',
  image: pdvCore,
  position: 'back',
  format: 'desktop',
  imageWidth: 1280,
  imageHeight: 660
}, {
  id: 'mobile',
  title: 'Aveloz / Mobile',
  categoryLabel: 'Landing Page',
  image: aveloz,
  position: 'mobile',
  format: 'mobile',
  imageWidth: 482,
  imageHeight: 776
}].map(project => ({ ...project, link: projectUrls[project.id === 'mobile' ? 'aveloz' : project.id] }))
