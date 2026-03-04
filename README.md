# Portfolio - Gabriel Contesini (Data Engineer)

Portfolio React com visual autoral inspirado em "control room" de dados, focado nos projetos de engenharia de dados publicados no GitHub.

## Destaques

- Layout completamente novo com direcao visual propria
- Tipografia customizada (`Syne`, `Space Grotesk`, `JetBrains Mono`)
- Animacoes com Framer Motion (entrada, destaque de secoes e fundo dinamico)
- Conteudo tecnico orientado a pipeline: ingestao, curadoria e governanca
- Dados dos repositorios sincronizados via endpoint serverless (`/api/github`)
- Download direto do curriculo em `public/CV - Gabriel Contesini Torres de Moraes.pdf`
- Responsivo para desktop e mobile
- Vercel ready (Vite + Functions Node.js)

## Stack

- React 18
- Vite 5
- Framer Motion
- React Icons
- React Intersection Observer

## Estrutura

```text
src/
  components/
    Navigation.jsx
    Hero.jsx
    About.jsx
    Projects.jsx
    Skills.jsx
    Contact.jsx
    Footer.jsx
    FloatingElements.jsx
  data/
    portfolioData.js
  hooks/
    useGithubSnapshot.js
  utils/
    formatters.js
  styles/
    globals.css
public/
  CV - Gabriel Contesini Torres de Moraes.pdf
api/
  github.js
vercel.json
```

## Executar local

```bash
npm install
npm run dev
```

## Build de producao

```bash
npm run build
npm run preview
```

## Deploy na Vercel

1. Importe o repositorio na Vercel.
2. Em `Settings > Environment Variables`, configure:
   - `GITHUB_TOKEN` (token pessoal do GitHub com acesso publico de leitura)
3. Faça deploy.

### Observacao sobre sincronizacao

- Em producao, o front consome `/api/github` (com cache em borda).
- Se o endpoint interno falhar, existe fallback para leitura direta da API do GitHub.
- Se ambos falharem, o site continua funcional com dados base dos projetos principais.

## Repositorios em destaque

- https://github.com/GabrielContesini/openweather_pipeline
- https://github.com/GabrielContesini/weather-lakehouse
- https://github.com/GabrielContesini/weather-lakehouse-databricks

## Observacoes

- O portifolio sincroniza metricas atualizadas no carregamento.
- O uso de `GITHUB_TOKEN` na Vercel reduz risco de rate limit.
