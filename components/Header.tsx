import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

type Props = {
  titulo: string;
  mostrarVoltar?: boolean;
  direitoConteudo?: React.ReactNode;
};

export function Header({ titulo, mostrarVoltar = false, direitoConteudo }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {mostrarVoltar ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn} accessibilityLabel="Voltar">
          <Text style={styles.voltarTexto}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.espacador} />
      )}
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.direita}>{direitoConteudo}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight,
  },
  voltarBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voltarTexto: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: '600',
  },
  espacador: {
    width: 36,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  direita: {
    width: 36,
    alignItems: 'flex-end',
  },
});
