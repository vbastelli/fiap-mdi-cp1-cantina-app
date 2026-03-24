import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '../components/Header';
import { EstadoVazio } from '../components/EstadoVazio';
import { useCart, CartItem } from '../components/CartContext';
import { Colors } from '../constants/Colors';

function ItemCarrinho({ cartItem }: { cartItem: CartItem }) {
  const { adicionarItem, removerItem } = useCart();
  const subtotal = cartItem.item.preco * cartItem.quantidade;

  return (
    <View style={styles.itemCard}>
      <Text style={styles.itemEmoji}>{cartItem.item.emoji}</Text>
      <View style={styles.itemInfo}>
        <Text style={styles.itemNome}>{cartItem.item.nome}</Text>
        <Text style={styles.itemPrecoUnit}>R$ {cartItem.item.preco.toFixed(2)} cada</Text>
        <Text style={styles.itemTempo}>⏱ {cartItem.item.tempoEstimado} min</Text>
      </View>
      <View style={styles.itemControles}>
        <TouchableOpacity
          style={styles.ctrlBtn}
          onPress={() => removerItem(cartItem.item.id)}
        >
          <Text style={styles.ctrlTxt}>−</Text>
        </TouchableOpacity>
        <Text style={styles.ctrlQtd}>{cartItem.quantidade}</Text>
        <TouchableOpacity
          style={[styles.ctrlBtn, styles.ctrlBtnAdd]}
          onPress={() => adicionarItem(cartItem.item)}
        >
          <Text style={[styles.ctrlTxt, styles.ctrlTxtAdd]}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemSubtotal}>R$ {subtotal.toFixed(2)}</Text>
    </View>
  );
}

export default function CarrinhoScreen() {
  const router = useRouter();
  const { itens, totalItens, totalPreco, limparCarrinho } = useCart();

  const tempoMaximo = itens.length > 0
    ? Math.max(...itens.map((i) => i.item.tempoEstimado))
    : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <Header titulo="Meu Pedido" mostrarVoltar />

      {itens.length === 0 ? (
        <View style={styles.vazioContainer}>
          <EstadoVazio
            emoji="🛒"
            titulo="Seu carrinho está vazio"
            subtitulo="Adicione itens do cardápio para fazer seu pedido."
          />
          <TouchableOpacity
            style={styles.btnCardapio}
            onPress={() => router.push('/cardapio')}
          >
            <Text style={styles.btnCardapioTxt}>Ver Cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={itens}
            keyExtractor={(item) => item.item.id}
            contentContainerStyle={styles.lista}
            renderItem={({ item }) => <ItemCarrinho cartItem={item} />}
            ListHeaderComponent={
              <Text style={styles.secaoTitulo}>
                {totalItens} {totalItens === 1 ? 'item' : 'itens'} no pedido
              </Text>
            }
          />

          {/* Resumo */}
          <View style={styles.resumo}>
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoLabel}>Tempo estimado</Text>
              <Text style={styles.resumoValor}>⏱ {tempoMaximo} min</Text>
            </View>
            <View style={[styles.resumoLinha, styles.totalLinha]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValor}>R$ {totalPreco.toFixed(2)}</Text>
            </View>

            <View style={styles.botoesContainer}>
              <TouchableOpacity
                style={styles.btnLimpar}
                onPress={limparCarrinho}
              >
                <Text style={styles.btnLimparTxt}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnConfirmar}
                onPress={() => router.push('/confirmacao')}
              >
                <Text style={styles.btnConfirmarTxt}>Confirmar Pedido →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  vazioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCardapio: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 8,
  },
  btnCardapioTxt: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  lista: {
    padding: 16,
  },
  secaoTitulo: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 10,
  },
  itemEmoji: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  itemPrecoUnit: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  itemTempo: {
    fontSize: 11,
    color: Colors.grayMedium,
    marginTop: 2,
  },
  itemControles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ctrlBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctrlBtnAdd: {
    backgroundColor: Colors.primary,
  },
  ctrlTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  ctrlTxtAdd: {
    color: Colors.white,
  },
  ctrlQtd: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
  itemSubtotal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  resumo: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resumoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  resumoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  totalLinha: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayLight,
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  totalValor: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  btnLimpar: {
    flex: 1,
    backgroundColor: Colors.grayLight,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnLimparTxt: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
  },
  btnConfirmar: {
    flex: 2,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  btnConfirmarTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
});
