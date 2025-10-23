# Mega-Sena Checker (dados internos TS)

Esta versão usa um arquivo TypeScript (`src/data/games.ts`) como fonte dos jogos.

## Como usar
1. Edite `src/data/games.ts` e preencha o array `GAMES` com suas combinações **normalizadas** no formato `01-05-13-24-44-60`.

2. Rode localmente:

```bash
npm install
npm run dev
```

3. Abra o endereço exibido (ex.: `http://localhost:5173`).

## Dica de desempenho
- Para **muitos** jogos, prefira *import dinâmico* e/ ou dividir o dataset em vários arquivos.

Exemplo (dinâmico):

```ts
// dentro do componente, em um useEffect:
const { GAME_SET, TOTAL } = await import('./data/games');
```
# megaChecker
