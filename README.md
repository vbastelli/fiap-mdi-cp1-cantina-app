# 🍽️ FIAP Cantina App

> **Checkpoint 1 — Mobile Development & IoT | FIAP — Engenharia de Software 3º Ano**

---

## 📌 Sobre o Projeto

**FIAP Cantina** é um aplicativo mobile desenvolvido em **React Native + Expo** que resolve um problema cotidiano da FIAP: as **longas filas na cantina** durante os horários de pico (intervalo e almoço).

### O problema escolhido

Durante os intervalos e o horário de almoço, a cantina da FIAP concentra centenas de alunos simultaneamente, gerando filas que podem durar mais de 15 minutos — tempo que os estudantes perdem em vez de descansar ou estudar.

### A solução proposta

Um app de **pré-pedido e reserva de itens**, onde o aluno:
1. Consulta o cardápio disponível com preços e tempo estimado de preparo
2. Monta seu pedido no app
3. Confirma o pedido e recebe um número
4. Retira na cantina **sem esperar na fila**

### Funcionalidades implementadas

- ✅ Tela inicial com saudação dinâmica (bom dia/boa tarde/boa noite) e status da cantina
- ✅ Cardápio completo com 10 itens divididos em 4 categorias (Lanches, Refeições, Bebidas, Sobremesas)
- ✅ Filtro de categorias horizontal interativo
- ✅ Carrinho de compras com controle de quantidade por item
- ✅ Cálculo automático de total e tempo estimado de preparo
- ✅ Tela de confirmação com número de pedido gerado
- ✅ Loading states (simulação de carregamento do cardápio e processamento do pedido)
- ✅ Tratamento de estado vazio (carrinho vazio, categoria sem itens)
- ✅ Itens indisponíveis marcados visualmente
- ✅ Tema visual com identidade FIAP (vermelho #ED1C24)

---

## 👥 Integrantes do Grupo

| Nome Completo | RM |
|---|---|
NOME: Lorenzo Hayashi Mangini | RM: 554901
NOME: Milton Cezar Bacanieski | RM: 555206
NOME: Vitor Bebiano Mulford | RM: 555026
NOME: Victório Maia Bastelli | RM: 554723

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Expo Go](https://expo.dev/go) instalado no celular (Android ou iOS)
- **ou** Android Studio / Xcode para emulador

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/fiap-mdi-cp1-cantina-app.git

# 2. Entre na pasta do projeto
cd fiap-mdi-cp1-cantina-app

# 3. Instale as dependências
npm install

# 4. Inicie o projeto
npx expo start
```

Após rodar o último comando:
- Escaneie o **QR Code** com o app Expo Go no celular, **ou**
- Pressione `a` para abrir no emulador Android, **ou**
- Pressione `i` para abrir no simulador iOS

---

## 📱 Demonstração

### Telas do App

> *(Adicione os prints das telas aqui. Sugestão: arraste as imagens para a pasta `/assets/screenshots/` e referencie abaixo)*

| Tela Inicial | Cardápio | Carrinho | Confirmação |
|:---:|:---:|:---:|:---:|
| ![Home](./assets/screenshots/home.png) | ![Cardápio](./assets/screenshots/cardapio.png) | ![Carrinho](./assets/screenshots/carrinho.png) | ![Confirmação](./assets/screenshots/confirmacao.png) |

### Vídeo / GIF de demonstração

> *(Adicione aqui o link do vídeo no YouTube/Google Drive ou o GIF gravado pelo emulador)*

🎥 [Link do vídeo de demonstração](https://link-aqui)

**Fluxo principal demonstrado:**
1. Abertura do app → Tela inicial com status da cantina
2. Navegação para o Cardápio → Filtro por categoria → Adição de itens
3. Visualização do carrinho → Ajuste de quantidades
4. Confirmação do pedido → Número gerado → Tela de sucesso

---

## 🛠️ Decisões Técnicas

### Estrutura do projeto

```
fiap-mdi-cp1-cantina-app/
├── app/                    # Telas (Expo Router — file-based routing)
│   ├── _layout.tsx         # Layout raiz com CartProvider e Stack navigator
│   ├── index.tsx           # Tela inicial (Home)
│   ├── cardapio.tsx        # Tela do cardápio
│   ├── carrinho.tsx        # Tela do carrinho
│   └── confirmacao.tsx     # Tela de confirmação do pedido
├── components/             # Componentes reutilizáveis
│   ├── CartContext.tsx      # Context API para estado global do carrinho
│   ├── Header.tsx           # Header reutilizável com botão de voltar
│   ├── MenuCard.tsx         # Card de item do cardápio
│   └── EstadoVazio.tsx      # Componente para estados sem conteúdo
├── constants/
│   ├── Colors.ts            # Paleta de cores do app
│   └── menuData.ts          # Dados mockados do cardápio
└── assets/                 # Ícones, imagens e screenshots
```

### Hooks utilizados

| Hook | Onde | Para quê |
|---|---|---|
| `useState` | Todas as telas e contexto | Gerenciar estado local (itens do carrinho, categoria selecionada, status do pedido) |
| `useEffect` | `index.tsx` | Calcular saudação e horário ao montar a tela |
| `useEffect` | `cardapio.tsx` | Simular loading do cardápio com `setTimeout` |
| `useEffect` | `confirmacao.tsx` | Simular processamento do pedido com `setTimeout` |
| `useContext` | `CartContext.tsx` + hook customizado `useCart` | Compartilhar estado do carrinho entre todas as telas sem prop drilling |
| `createContext` | `CartContext.tsx` | Criar o contexto global do carrinho |

### Navegação

A navegação foi implementada com **Expo Router** (file-based routing), onde cada arquivo dentro da pasta `app/` corresponde a uma rota:

- `/` → `app/index.tsx` (Tela inicial)
- `/cardapio` → `app/cardapio.tsx` (Cardápio)
- `/carrinho` → `app/carrinho.tsx` (Carrinho)
- `/confirmacao` → `app/confirmacao.tsx` (Confirmação)

O `_layout.tsx` configura o `Stack` navigator com `headerShown: false` (headers customizados em cada tela) e envolve toda a aplicação com o `CartProvider`.

### Gerenciamento de estado global

O carrinho de compras foi implementado com **Context API** (`CartContext.tsx`), expondo um hook customizado `useCart()` que fornece:
- `itens`: lista de itens no carrinho com quantidade
- `adicionarItem` / `removerItem`: funções para manipular o carrinho
- `limparCarrinho`: esvazia o carrinho após confirmação
- `totalItens` e `totalPreco`: valores calculados automaticamente

---

## 🔮 Próximos Passos

Com mais tempo, o grupo implementaria:

- **Integração com API REST** — Substituir os dados mockados por uma API real da cantina com cardápio atualizado em tempo real
- **Autenticação** — Login com RM + senha FIAP para identificar o aluno no pedido
- **Pagamento in-app** — Integração com gateway de pagamento (Pix, cartão)
- **Notificações push** — Avisar o aluno quando o pedido estiver pronto para retirada
- **Histórico de pedidos** — Tela com pedidos anteriores e opção de repetir pedido
- **Avaliação de itens** — Sistema de estrelas para avaliar os pratos após consumo

---

## 📚 Tecnologias utilizadas

- [React Native](https://reactnative.dev/) — Framework mobile
- [Expo](https://expo.dev/) — Toolchain e SDK
- [Expo Router](https://expo.github.io/router/) — Navegação file-based
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [Context API](https://react.dev/reference/react/createContext) — Estado global

---

*Desenvolvido para o Checkpoint 1 da disciplina Mobile Development & IoT — FIAP 2026*
