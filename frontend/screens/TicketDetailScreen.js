import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppContext } from '../services/AppContext';

export default function TicketDetailScreen({ route }) {
  const { fecha } = route.params;
  const { tickets } = useContext(AppContext);

  const ticketsDelDia = tickets.filter(t => t.fecha === fecha);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tickets del {fecha}</Text>

      {ticketsDelDia.map((ticket, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.ticketTitle}>Ticket #{ticket.idTicket}</Text>

          {ticket.categorias.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.amount}>${item.gasto}</Text>
            </View>
          ))}
        </View>
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
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#0F172A',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  name: {
    fontSize: 14,
    color: '#334155',
  },

  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  }
});