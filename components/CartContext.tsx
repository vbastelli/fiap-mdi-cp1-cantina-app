import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../constants/menuData';

export type CartItem = {
  item: MenuItem;
  quantidade: number;
};

type CartContextType = {
  itens: CartItem[];
  adicionarItem: (item: MenuItem) => void;
  removerItem: (id: string) => void;
  limparCarrinho: () => void;
  totalItens: number;
  totalPreco: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([]);

  const adicionarItem = (item: MenuItem) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.item.id === item.id);
      if (existente) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { item, quantidade: 1 }];
    });
  };

  const removerItem = (id: string) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.item.id === id);
      if (existente && existente.quantidade > 1) {
        return prev.map((i) =>
          i.item.id === id ? { ...i, quantidade: i.quantidade - 1 } : i
        );
      }
      return prev.filter((i) => i.item.id !== id);
    });
  };

  const limparCarrinho = () => setItens([]);

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);
  const totalPreco = itens.reduce(
    (acc, i) => acc + i.item.preco * i.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{ itens, adicionarItem, removerItem, limparCarrinho, totalItens, totalPreco }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
}
