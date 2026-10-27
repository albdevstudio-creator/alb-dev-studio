export const contact = {
  whatsapp: '5581998857075',
  email: 'laisaa275@gmail.com',
  behance: 'https://www.behance.net/'
}
export const whatsappLink = (service = 'um projeto') => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Olá! Conheci a ALB Studio Dev e gostaria de conversar sobre ${service}.`)}`
