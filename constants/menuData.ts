export type MenuItem = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: 'Lanches' | 'Refeições' | 'Bebidas' | 'Sobremesas';
  emoji: string;
  disponivel: boolean;
  tempoEstimado: number; // em minutos
};

export const menuItems: MenuItem[] = [
  {
    id: '1',
    nome: 'X-Burguer',
    descricao: 'Hambúrguer artesanal com queijo, alface e tomate',
    preco: 18.90,
    categoria: 'Lanches',
    emoji: '🍔',
    disponivel: true,
    tempoEstimado: 10,
  },
  {
    id: '2',
    nome: 'Wrap de Frango',
    descricao: 'Frango grelhado, cream cheese e vegetais frescos',
    preco: 16.50,
    categoria: 'Lanches',
    emoji: '🌯',
    disponivel: true,
    tempoEstimado: 8,
  },
  {
    id: '3',
    nome: 'Prato do Dia',
    descricao: 'Arroz, feijão, proteína grelhada e salada',
    preco: 24.90,
    categoria: 'Refeições',
    emoji: '🍽️',
    disponivel: true,
    tempoEstimado: 5,
  },
  {
    id: '4',
    nome: 'Macarrão ao Molho',
    descricao: 'Macarrão parafuso ao molho bolonhesa',
    preco: 21.00,
    categoria: 'Refeições',
    emoji: '🍝',
    disponivel: false,
    tempoEstimado: 7,
  },
  {
    id: '5',
    nome: 'Suco Natural',
    descricao: 'Laranja, limão ou maracujá — 400ml',
    preco: 8.00,
    categoria: 'Bebidas',
    emoji: '🥤',
    disponivel: true,
    tempoEstimado: 3,
  },
  {
    id: '6',
    nome: 'Café Expresso',
    descricao: 'Café forte e encorpado, feito na hora',
    preco: 5.00,
    categoria: 'Bebidas',
    emoji: '☕',
    disponivel: true,
    tempoEstimado: 2,
  },
  {
    id: '7',
    nome: 'Água Mineral',
    descricao: 'Garrafa 500ml gelada',
    preco: 3.50,
    categoria: 'Bebidas',
    emoji: '💧',
    disponivel: true,
    tempoEstimado: 1,
  },
  {
    id: '8',
    nome: 'Brownie',
    descricao: 'Brownie de chocolate meio amargo',
    preco: 7.00,
    categoria: 'Sobremesas',
    emoji: '🍫',
    disponivel: true,
    tempoEstimado: 1,
  },
  {
    id: '9',
    nome: 'Vitamina de Banana',
    descricao: 'Banana, leite e mel — 300ml',
    preco: 9.50,
    categoria: 'Bebidas',
    emoji: '🍌',
    disponivel: true,
    tempoEstimado: 4,
  },
  {
    id: '10',
    nome: 'Salada Caesar',
    descricao: 'Alface romana, croutons, parmesão e molho caesar',
    preco: 19.90,
    categoria: 'Refeições',
    emoji: '🥗',
    disponivel: true,
    tempoEstimado: 5,
  },
];

export const categorias = ['Lanches', 'Refeições', 'Bebidas', 'Sobremesas'] as const;
