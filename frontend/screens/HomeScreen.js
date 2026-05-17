import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../services/AppContext';

const categorias = [
  "Comida","Vivienda","Servicios","Transporte",
  "Salud","Entretenimiento","Viajes","Gustos","Otros"
];

export default function HomeScreen() {
  const { tickets } = useContext(AppContext);

  const gastos = {};

  let total = 0;

  tickets.forEach(ticket => {
    ticket.categorias.forEach(item => {
      gastos[item.categoria] = (gastos[item.categoria] || 0) + item.gasto;
      total += item.gasto;
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {categorias.map((cat, index) => {
          const gastoCat = gastos[cat] || 0;
          const porcentaje = total > 0 ? Math.round((gastoCat / total) * 100) : 0;

          return (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.sectionTitle}>{cat}</Text>
                <Text style={styles.percentage}>{porcentaje}%</Text>
              </View>

              <View style={styles.row}>
                <View style={styles.circleContainer}>
                  <View style={styles.circleBackground}>
                    <View style={[styles.circleFill, { height: `${porcentaje}%` }]} />
                  </View>
                </View>

                <Text style={styles.text}>
                  ${gastoCat.toFixed(2)} gastados en esta categoría
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B'
  },

  logoutBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10
  },

  logoutText: {
    color: '#fff',
    fontWeight: '600'
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 120
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A'
  },

  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1'
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  circleContainer: {
    marginRight: 15
  },

  circleBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E7FF',
    overflow: 'hidden',
    justifyContent: 'flex-end'
  },

  circleFill: {
    width: '100%',
    backgroundColor: '#6366F1'
  },

  text: {
    flex: 1,
    fontSize: 13,
    color: '#475569'
  }
});