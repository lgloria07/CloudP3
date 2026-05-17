import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppContext } from '../services/AppContext';

export default function CalendarScreen({ navigation }) {
  const { tickets } = useContext(AppContext);

  const grouped = {};

  tickets.forEach(ticket => {
    const total = ticket.categorias.reduce((sum, item) => sum + item.gasto, 0);

    if (!grouped[ticket.fecha]) {
      grouped[ticket.fecha] = 0;
    }

    grouped[ticket.fecha] += total;
  });

  const data = Object.keys(grouped).map(fecha => ({
    fecha,
    total: grouped[fecha]
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gastos por día</Text>

      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate('Detail', { fecha: item.fecha })}
        >
          <Text style={styles.date}>{item.fecha}</Text>
          <Text style={styles.amount}>${item.total}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    padding: 20,

  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1E293B',
    marginTop: 50,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },

  date: {
    fontSize: 14,
    color: '#334155'
  },

  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1'
  }
});