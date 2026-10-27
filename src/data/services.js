import { Globe2, MousePointer2, Palette, Wrench } from 'lucide-react'
export const services = [{
  icon: MousePointer2,
  number: '01',
  name: 'Landing Pages',
  includes: ['Página personalizada', 'Apresentação de campanhas', 'Contato e conversão'],
  action: 'Quero uma landing page',
  tag: 'Páginas que geram oportunidades',
  desc: 'Páginas personalizadas para apresentar serviços, divulgar campanhas e facilitar a conversão de visitantes em contatos.'
}, {
  icon: Globe2,
  number: '02',
  name: 'Sites Institucionais',
  includes: ['Páginas da empresa', 'Blog', 'Integrações'],
  action: 'Quero um site institucional',
  tag: 'Sua marca com presença própria',
  desc: 'Sites profissionais com estrutura personalizada, páginas completas, blog e integrações.'
}, {
  icon: Palette,
  number: '03',
  name: 'Design para Redes Sociais',
  includes: ['Posts para o feed', 'Stories', 'Carrosséis', 'Artes para campanhas'],
  action: 'Quero artes para minha marca',
  tag: 'Sua identidade em cada publicação',
  desc: 'Design de artes para Instagram e outras redes sociais: posts, stories, carrosséis e peças para campanhas. Uma linguagem visual alinhada à sua marca, em peças avulsas ou pacotes.'
}, {
  icon: Wrench,
  number: '04',
  name: 'Manutenção Web',
  includes: ['Atualizações', 'Melhorias', 'Suporte'],
  action: 'Quero melhorar meu site',
  tag: 'Seu site sempre em evolução',
  desc: 'Atualizações, melhorias e suporte para manter a experiência digital funcionando adequadamente.'
}]

export const serviceGroups = [
  {
    id: 'web', number: '01', icon: Globe2,
    tag: 'UM ESPAÇO QUE É SÓ SEU',
    name: 'Sites & experiências digitais',
    desc: 'Um espaço próprio para apresentar sua marca, valorizar seus serviços e facilitar o contato.',
    includes: ['Landing pages', 'Sites institucionais', 'Layouts personalizados'],
    action: 'Vamos criar meu site',
    request: 'criação de um site personalizado ou landing page',
    note: 'Da primeira ideia à publicação.',
  },
  {
    id: 'social', number: '02', icon: Palette,
    tag: 'SUA PERSONALIDADE EM CADA PEÇA',
    name: 'Design para redes sociais',
    desc: 'Uma linguagem visual consistente para sua marca aparecer com personalidade em cada publicação.',
    includes: ['Posts', 'Stories', 'Carrosséis', 'Artes para campanhas'],
    action: 'Quero artes para minha marca',
    request: 'criação de artes para redes sociais',
    note: 'Artes avulsas ou pacotes de criação.',
  },
]

export const maintenanceService = services.find(service => service.name === 'Manutenção Web')
