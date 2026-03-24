import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem } from '../constants/menuData';
import { Colors } from '../constants/Colors';
import { useCart } from './CartContext';

type Props = {
  item: MenuItem;
};

export function MenuCard({ item }: Props) {
  const { adicionarItem, itens, removerItem } = useCart();
  const noCarrinho = itens.find((i) => i.item.id === item.id);
  const quantidade = noCarrinho?.quantidade ?? 0;

  return (
    <View style={[styles.card, !item.disponivel && styles.cardIndisponivel]}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
          {!item.disponivel && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Indisponível</Text>
            </View>
          )}
        </View>
        <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
            <Text style={styles.tempo}>⏱ {item.tempoEstimado} min</Text>
          </View>
          {item.disponivel && (
            <View style={styles.controles}>
              {quantidade > 0 && (
                <>
                  <TouchableOpacity
                    style={styles.botaoControle}
                    onPress={() => removerItem(item.id)}
                    accessibilityLabel="Remover item"
                  >
                    <Text style={styles.botaoTexto}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantidade}>{quantidade}</Text>
                </>
              )}
              <TouchableOpacity
                style={styles.botaoAdicionar}
                onPress={() => adicionarItem(item)}
                accessibilityLabel="Adicionar item"
              >
                <Text style={styles.botaoAdicionarTexto}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIndisponivel: {
    opacity: 0.6,
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 30,
  },
  info: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  nome: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 6,
  },
  badge: {
    backgroundColor: Colors.grayLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    color: Colors.gray,
    fontWeight: '600',
  },
  descricao: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preco: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  tempo: {
    fontSize: 11,
    color: Colors.grayMedium,
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  botaoControle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  quantidade: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 16,
    textAlign: 'center',
  },
  botaoAdicionar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoAdicionarTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
