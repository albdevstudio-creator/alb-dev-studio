# ALB Studio Dev

Site de apresentação da **ALB Studio Dev**, um estúdio criativo independente que une design e desenvolvimento para construir experiências digitais com identidade.

A página destaca o portfólio logo após a hero, apresenta os serviços e a essência do estúdio e conduz o visitante aos canais de contato.

## Tecnologias

- **React 19** para os componentes e as interações.
- **Vite 7** para desenvolvimento e build.
- **Tailwind CSS 4** e CSS organizado por componentes e seções.
- **Motion para React** para animações e transições.
- **Lucide React** para ícones.
- **Fontsource** para carregar localmente as fontes variáveis DM Sans e Space Grotesk.
- **Playwright** para testes de interface.

## Como executar

Use Node.js **20.19+ ou 22.12+**, conforme os requisitos do Vite 7, e npm.

```bash
npm install
npm run dev
```

Abra o endereço local informado pelo Vite no terminal.

> No PowerShell com execução de scripts bloqueada, use `npm.cmd` no lugar de `npm`.

### Comandos disponíveis

| Comando | Função |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com atualização automática. |
| `npm run build` | Gera a versão de produção em `dist/`. |
| `npm run preview` | Serve o build para conferência local. |
| `npm run test:ui` | Executa a suíte de testes com Playwright. |

## Estrutura da página

A ordem das seções é definida em [`src/App.jsx`](src/App.jsx):

| Ordem | Seção | Componente |
| --- | --- | --- |
| Abertura | Hero e projetos em destaque | `HeroSection` |
| 01 | Projetos no ar | `LiveProjectsSection` |
| 02 | O que fazemos | `ServicesSection` |
| 03 | Nossa essência — Design com intenção | `AboutSection` |
| 04 | Como trabalhamos | `ProcessSection` |
| 05 | Formatos de contratação | `EngagementSection` |
| 06 | Dúvidas frequentes | `FAQSection` |
| 07 | Vamos conversar? | `ContactSection` |
| Encerramento | Rodapé e canais de contato | `Footer` |

## Portfólio

**Cada projeto, uma identidade. Cada marca, uma presença.**

A seção Projetos no ar apresenta cinco sites com capturas reais, descrições da linguagem visual e acesso direto em nova aba. A AURA ocupa o bloco de maior destaque.

| Projeto | Universo | Site |
| --- | --- | --- |
| AURA Skincare | Beleza e autocuidado | [Visitar AURA](https://aura-skincare-alb.vercel.app/) |
| NEXORA AI | Inteligência artificial | [Visitar NEXORA](https://nexora-ai-alb.vercel.app/) |
| DOMUS | Arquitetura e mercado imobiliário | [Visitar DOMUS](https://domus-imobiliaria-alb.vercel.app/) |
| Instituto Aveloz | Impacto social e sustentabilidade | [Visitar Instituto Aveloz](https://institutoaveloz.vercel.app/) |
| PDV Core | Software e gestão | [Visitar PDV Core](https://pdvcore.vercel.app/landing) |

Os links e textos ficam em [`src/data/liveProjects.js`](src/data/liveProjects.js). As capturas da seção ficam em `public/projects/` e são servidas localmente.

## Organização do projeto

```text
public/
  projects/               Capturas dos cinco sites do portfólio
src/
  assets/                 Logo, imagens e elementos visuais da hero
  components/
    animation/            Provedor de animações e componentes de entrada
    brand/                Componentes da marca
    hero/                 Hero, mockups e seleção de projetos
    layout/               Cabeçalho e rodapé
    projects/             Componentes da seleção de projetos anterior
    ui/                   Elementos visuais compartilhados
  data/                   Textos, links, serviços, projetos e contatos
  hooks/                  Hooks de interação
  sections/               Seções da página
  styles/                 Estilos globais, temas e estilos das seções
  App.jsx                 Composição e ordem da página
  main.jsx                Entrada da aplicação
index.html                Documento HTML e metadados
playwright.config.js      Configuração dos testes de interface
tests/                    Testes e scripts de captura
vite.config.js            Configuração do Vite
```

`ProjectsSection`, `DifferentialsSection` e `BrandSection` continuam disponíveis no código, mas não fazem parte da composição atual em `App.jsx`.

## Personalização

| O que alterar | Onde editar |
| --- | --- |
| Ordem das seções | `src/App.jsx` |
| Projetos no ar, links e descrições | `src/data/liveProjects.js` |
| Capturas dos projetos no ar | `public/projects/` |
| Projetos e imagens da hero | `src/data/heroProjects.js` e `src/assets/hero/` |
| Serviços | `src/data/services.js` |
| Pilares do estúdio | `src/data/about.js` |
| Etapas de trabalho | `src/data/process.js` |
| Formatos de contratação | `src/data/engagements.js` |
| Perguntas frequentes | `src/data/faq.js` |
| E-mail, WhatsApp e Behance | `src/data/contact.js` |
| Links do menu e do rodapé | `src/data/navigation.js` |
| Cores e tipografia | `src/styles/tokens.css` |
| Estilos dos projetos no ar | `src/styles/sections/live-projects.css` |
| Título e descrição da página | `index.html` |

O ponto de entrada dos estilos é `src/styles/index.css`. A ordem dos imports influencia a cascata e deve ser considerada ao alterar os estilos.

## Interações e acessibilidade

- Menu mobile com fechamento por Escape.
- Seleção de projetos na hero por mouse, teclado e toque.
- FAQ com estado expandido acessível.
- Link para pular ao conteúdo principal.
- Respeito à preferência de movimento reduzido (`prefers-reduced-motion`).
- Imagens do portfólio com texto alternativo e carregamento sob demanda.

Os pedidos de orçamento usam os links de WhatsApp e e-mail configurados em `src/data/contact.js`. O site não depende de backend ou CMS.

## Testes de interface

Os testes usam **Google Chrome instalado** e iniciam um servidor de preview na porta **5181**. Gere o build antes de executá-los:

```bash
npm run build
npm run test:ui
```

A suíte inclui verificações de responsividade, imagens, navegação, FAQ, seleção de projetos e movimento reduzido. Algumas verificações ainda fazem referência à antiga seção `#projetos`, à quantidade anterior de seções e à ordem anterior dos temas; elas precisam ser atualizadas para refletir a composição atual.

## Publicação

Gere os arquivos de produção:

```bash
npm run build
```

Publique o conteúdo de `dist/` em uma hospedagem de sites estáticos. Em serviços com build integrado, configure:

- **Comando de build:** `npm run build`
- **Diretório de saída:** `dist`

A configuração atual não exige variáveis de ambiente.
