import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '../components/Header';
import { MenuCard } from '../components/MenuCard';
import { EstadoVazio } from '../components/EstadoVazio';
import { menuItems, categorias } from '../constants/menuData';
import { useCart } from '../components/CartContext';
import { Colors } from '../constants/Colors';

export default function CardapioScreen() {
  const router = useRouter();
  const { totalItens, totalPreco } = useCart();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Lanches');
  const [carregando, setCarregando] = useState(true);

  // Simula carregamento do cardápio
  useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const itensFiltrados = menuItems.filter(
    (item) => item.categoria === categoriaSelecionada
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        titulo="Cardápio"
        mostrarVoltar
        direitoConteudo={
          totalItens > 0 ? (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{totalItens}</Text>
            </View>
          ) : null
        }
      />

      {/* Filtro de categorias */}
      <View style={styles.categoriasContainer}>
        <FlatList
          data={categorias}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoriasList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoriaBtn,
                categoriaSelecionada === item && styles.categoriaBtnAtiva,
              ]}
              onPress={() => setCategoriaSelecionada(item)}
            >
              <Text
                style={[
                  styles.categoriaTxt,
                  categoriaSelecionada === item && styles.categoriaTxtAtiva,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lista de itens */}
      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Carregando cardápio...</Text>
        </View>
      ) : (
        <FlatList
          data={itensFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <EstadoVazio
              emoji="🍽️"
              titulo="Nenhum item nesta categoria"
              subtitulo="Tente outra categoria do cardápio."
            />
          }
          renderItem={({ item }) => <MenuCard item={item} />}
        />
      )}

      {/* Botão do carrinho flutuante */}
      {totalItens > 0 && (
        <View style={styles.carrinhoBar}>
          <View>
            <Text style={styles.carrinhoItens}>{totalItens} {totalItens === 1 ? 'item' : 'itens'}</Text>
            <Text style={styles.carrinhoPreco}>R$ {totalPreco.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.carrinhoBtn}
            onPress={() => router.push('/carrinho')}
            activeOpacity={0.85}
          >
            <Text style={styles.carrinhoBtnTxt}>Ver Pedido →</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  badgeContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  categoriasContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
  },
  categoriasList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoriaBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.grayLight,
    marginRight: 8,
  },
  categoriaBtnAtiva: {
    backgroundColor: Colors.primary,
  },
  categoriaTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray,
  },
  categoriaTxtAtiva: {
    color: Colors.white,
  },
  lista: {
    padding: 16,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  carrinhoBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.black,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  carrinhoItens: {
    color: Colors.grayMedium,
    fontSize: 12,
    fontWeight: '500',
  },
  carrinhoPreco: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  carrinhoBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  carrinhoBtnTxt: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
