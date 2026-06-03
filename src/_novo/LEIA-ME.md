# Pasta _novo — versão nova isolada do portfólio

Esta pasta NÃO afeta seu site atual. Tudo aqui tem prefixo `nv-` no CSS,
componentes próprios e dados centralizados. Você testa, e só migra o que aprovar.

## Estrutura
```
_novo/
├─ novo.css                  ← estilos isolados (prefixo nv-)
├─ dados.js                  ← todos os dados (PT/EN) num lugar só
├─ PreviewNovo.jsx           ← página que junta os 6 componentes
└─ components/
   ├─ HeroNovo.jsx
   ├─ ProjetosNovo.jsx
   ├─ SkillsNovo.jsx
   ├─ ExperienciaNovo.jsx
   ├─ CertificacoesNovo.jsx
   └─ ContatoNovo.jsx
```

## 1. Onde colocar
Copie a pasta `_novo` inteira para dentro de `src/`. Fica assim:
`src/_novo/...`

## 2. Dependências
- `framer-motion` → você já tem.
- `react-simple-typewriter` → você já tem (usa no Inicio atual).
- As fontes Sora e Space Mono: adicione esta linha no `<head>` do seu `index.html`:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  ```

## 3. Como VISUALIZAR (sem router)
Abra `src/main.jsx`. Ele provavelmente está assim:
```jsx
import App from "./App.jsx";
// ...
<App />
```
TROQUE TEMPORARIAMENTE por:
```jsx
import App from "./_novo/PreviewNovo.jsx";
// ...
<App />
```
Rode `npm run dev`. Você verá só a versão nova.
Para voltar ao seu site, é só desfazer essa troca (volta o import pro App.jsx original).

> Dica: faça a troca, NÃO apague a linha antiga — comente ela com // na frente.
> Assim você alterna entre os dois sem decorar nada.

## 4. Imagens
Os projetos usam imagens da pasta `public/` (UC_logo.png, logo_invbB.png, etc.),
exatamente como seu site já faz. Elas carregam via `import.meta.env.BASE_URL`.

## 5. Migração (depois, com calma)
Quando aprovar uma seção, a gente troca o componente antigo pelo novo no App.jsx,
um por vez. Nada precisa ser feito de uma vez.
