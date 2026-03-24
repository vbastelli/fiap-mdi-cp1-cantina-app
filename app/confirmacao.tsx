import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCart } from '../components/CartContext';
import { Colors } from '../constants/Colors';

type Status = 'processando' | 'confirmado';

export default function ConfirmacaoScreen() {
  const router = useRouter();
  const { itens, totalPreco, limparCarrinho } = useCart();
  const [status, setStatus] = useState<Status>('processando');
  const [numeroPedido, setNumeroPedido] = useState('');

  const tempoMaximo = itens.length > 0
    ? Math.max(...itens.map((i) => i.item.tempoEstimado))
    : 0;

  useEffect(() => {
    // Simula processamento do pedido
    const numero = `#${String(Math.floor(Math.random() * 900) + 100)}`;
    setNumeroPedido(numero);

    const timer = setTimeout(() => {
      setStatus('confirmado');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNovoPedido = () => {
    limparCarrinho();
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {status === 'processando' ? (
        <View style={styles.processandoContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.processandoTitulo}>Processando pedido...</Text>
          <Text style={styles.processandoSub}>Só um momento!</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {/* Ícone de sucesso */}
          <View style={styles.successCircle}>
            <Text style={styles.successEmoji}>✅</Text>
          </View>

          <Text style={styles.titulo}>Pedido Confirmado!</Text>
          <Text style={styles.subtitulo}>
            Seu pedido foi recebido pela cantina.
          </Text>

          {/* Card com detalhes */}
          <View style={styles.detalhesCard}>
            <View style={styles.detalheRow}>
              <Text style={styles.detalheLabel}>Número do pedido</Text>
              <Text style={styles.detalheValor}>{numeroPedido}</Text>
            </View>
            <View style={[styles.detalheRow, styles.separador]}>
              <Text style={styles.detalheLabel}>Itens</Text>
              <Text style={styles.detalheValor}>
                {itens.map((i) => `${i.quantidade}x ${i.item.nome}`).join(', ')}
              </Text>
            </View>
            <View style={[styles.detalheRow, styles.separador]}>
              <Text style={styles.detalheLabel}>Total pago</Text>
              <Text style={[styles.detalheValor, styles.totalValor]}>
                R$ {totalPreco.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.detalheRow, styles.separador]}>
              <Text style={styles.detalheLabel}>Tempo estimado</Text>
              <Text style={styles.detalheValor}>⏱ {tempoMaximo} min</Text>
            </View>
          </View>

          {/* Instrução de retirada */}
          <View style={styles.instrucaoBox}>
            <Text style={styles.instrucaoEmoji}>📍</Text>
            <View style={styles.instrucaoTextos}>
              <Text style={styles.instrucaoTitulo}>Retire na cantina</Text>
              <Text style={styles.instrucaoSub}>
                Mostre o número {numeroPedido} na hora de retirar. Sem fila!
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnNovoPedido}
            onPress={handleNovoPedido}
            activeOpacity={0.85}
          >
            <Text style={styles.btnNovoPedidoTxt}>Voltar ao início</Text>
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
  processandoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  processandoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  processandoSub: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successEmoji: {
    fontSize: 48,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
  },
  detalhesCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  detalheRow: {
    paddingVertical: 10,
    gap: 4,
  },
  separador: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayLight,
  },
  detalheLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  detalheValor: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  totalValor: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  instrucaoBox: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    gap: 12,
    marginBottom: 28,
    alignItems: 'flex-start',
  },
  instrucaoEmoji: {
    fontSize: 24,
  },
  instrucaoTextos: {
    flex: 1,
  },
  instrucaoTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3730A3',
    marginBottom: 4,
  },
  instrucaoSub: {
    fontSize: 13,
    color: '#4338CA',
    lineHeight: 18,
  },
  btnNovoPedido: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 40,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  btnNovoPedidoTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
