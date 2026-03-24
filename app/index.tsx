import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [hora, setHora] = useState('');
  const [saudacao, setSaudacao] = useState('');

  useEffect(() => {
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    setHora(`${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`);

    if (horas < 12) setSaudacao('Bom dia');
    else if (horas < 18) setSaudacao('Boa tarde');
    else setSaudacao('Boa noite');
  }, []);

  const cantinaBerta = hora >= '11:00' && hora <= '14:00' || hora >= '07:30' && hora <= '09:30';

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header vermelho */}
      <View style={styles.headerBg}>
        <View style={styles.headerContent}>
          <Text style={styles.fiapLogo}>FIAP</Text>
          <Text style={styles.appNome}>Cantina</Text>
        </View>
        <Text style={styles.saudacao}>{saudacao}, aluno! 👋</Text>
        <Text style={styles.subtitulo}>Peça antes, retire sem fila.</Text>
      </View>

      {/* Status da cantina */}
      <View style={styles.statusCard}>
        <View style={[styles.statusDot, cantinaBerta ? styles.dotAberta : styles.dotFechada]} />
        <View>
          <Text style={styles.statusTitulo}>
            {cantinaBerta ? 'Cantina Aberta' : 'Cantina Fechada'}
          </Text>
          <Text style={styles.statusSub}>
            {cantinaBerta
              ? 'Horário de funcionamento ativo'
              : 'Abre às 07:30 · Almoço: 11:00–14:00'}
          </Text>
        </View>
      </View>

      {/* Cards de ação */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.cardPrincipal}
          onPress={() => router.push('/cardapio')}
          activeOpacity={0.85}
        >
          <Text style={styles.cardEmoji}>🍽️</Text>
          <Text style={styles.cardTitulo}>Ver Cardápio</Text>
          <Text style={styles.cardDesc}>Monte seu pedido agora</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardSecundario}
          onPress={() => router.push('/carrinho')}
          activeOpacity={0.85}
        >
          <Text style={styles.cardEmoji}>🛒</Text>
          <Text style={styles.cardTituloSec}>Meu Pedido</Text>
          <Text style={styles.cardDescSec}>Ver carrinho</Text>
        </TouchableOpacity>
      </View>

      {/* Info footer */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTexto}>
          💡 Faça seu pedido com antecedência e retire na cantina sem esperar na fila!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBg: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  fiapLogo: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 2,
  },
  appNome: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.85)',
    marginLeft: 8,
  },
  saudacao: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: -18,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotAberta: {
    backgroundColor: Colors.success,
  },
  dotFechada: {
    backgroundColor: Colors.gray,
  },
  statusTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statusSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 12,
  },
  cardPrincipal: {
    flex: 2,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitulo: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  cardSecundario: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTituloSec: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardDescSec: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  infoBox: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFF3CD',
    borderRadius: 14,
    padding: 14,
  },
  infoTexto: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
});
