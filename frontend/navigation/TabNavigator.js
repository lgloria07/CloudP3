import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TicketDetailScreen from '../screens/TicketDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function CalendarStack() {
  return (
    <Stack.Navigator>
      
      {/* Pantalla principal */}
      <Stack.Screen
        name="CalendarMain"
        component={CalendarScreen}
        options={{ headerShown: false }}
      />

      {/* Pantalla de detalle */}
      <Stack.Screen
        name="Detail"
        component={TicketDetailScreen}
        options={({ route }) => ({
          title: `Tickets ${route.params.fecha}`
        })}
      />

    </Stack.Navigator>
  );
}


export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          elevation: 10,
        }
      }}
    >

      {/* CAMARA */}
      <Tab.Screen
        name="Camara"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="camera"
              size={26}
              color={focused ? '#6366F1' : '#999'}
            />
          )
        }}
      />

      {/* HOME */}
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={26}
              color={focused ? '#6366F1' : '#999'}
            />
          )
        }}
      />

      {/* CALENDARIO (AHORA USA STACK) */}
      <Tab.Screen
        name="Calendario"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="calendar"
              size={24}
              color={focused ? '#6366F1' : '#999'}
            />
          )
        }}
      />

    </Tab.Navigator>
  );
}