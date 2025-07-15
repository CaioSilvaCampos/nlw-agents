# LetMeAsk 🎙️🤖

LetMeAsk é uma plataforma interativa que permite a criação de salas para compartilhamento de conhecimento por meio de áudios. Usuários podem gravar uma explicação sobre um tema e, em seguida, outras pessoas podem fazer perguntas relacionadas ao conteúdo. As perguntas são analisadas por uma IA (Gemini) que verifica se a resposta já foi abordada na aula por meio de embeddings e similaridade semântica.

---

## ✨ Funcionalidades

- ✅ Criação de salas temáticas com título e descrição
- 🎙️ Gravação de áudios com explicações sobre o tema da sala
- 🙋 Recebimento de perguntas de participantes em tempo real
- 🧠 Análise semântica da pergunta usando a API do Gemini
- 🔍 Comparação por embeddings para verificar se a resposta já está no conteúdo
- 💬 Resposta automática gerada pela IA com base no áudio gravado

---

## 🧱 Tecnologias Utilizadas

### Front-end:
- [React](https://react.dev/)
- [ShadCN UI](https://ui.shadcn.dev/) (biblioteca de componentes com foco em acessibilidade e design moderno)
- TypeScript

### Back-end:
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- Integração com a [API Gemini](https://ai.google.dev/gemini) para análise de linguagem e embeddings

---

## 🚀 Como Inicializar o Projeto

### 📦 Pré-requisitos
- Node.js >= 18
- PostgreSQL rodando localmente ou em servidor
- Variáveis de ambiente (.env) configuradas (ver seção abaixo)

---

### 🔧 Instalação

1. Clone o repositório principal:

```bash
git clone --recurse-submodules https://github.com/CaioSilvaCampos/nlw-agents.git
cd letmeask
