import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { dataSimulation } from '../services/dataSimulation';
import { AppContext } from '../services/AppContext';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
  const { addTicket } = useContext(AppContext);

  //Función para manejar la captura del ticket desde la camara
  const handleCameraCapture = async () => {
    //Generar el nombre unico del recurso 
    const name = `ticket_${Date.now()}.jpeg`;
    //Solicitamos ver si tenemos permisos para acceder a la camara
    const permisos = await ImagePicker.requestCameraPermissionsAsync();
    //Verificamos los permoisos
    if(permisos.granted === false){
      console.log("No se tienen permisos para accceder a la camara");
    }
    //Capturamos el resultado
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
      saveToPhotos: true,
    });
    //Verificamos que no se haya cancelado la acción
    if(resultado.canceled){
      console.log("No se tomo ninguna imagen del ticket");
    }else{
      console.log("Se tomo la imagen del ticket correctamente");
      const formData = new FormData();
      formData.append('ticket', {
        uri: resultado.assets[0].uri,
        name: name,
        type: 'image/jpeg',
      });
      console.log(formData);
      const response = await fetch('https://cloudp3-backend-lgloria-beesaacreqg3fuax.eastus-01.azurewebsites.net/guardar-ticket', {
        method: 'POST',
        body: formData, 
      });
      const responseJson = await response.json();
      console.log("RESPUESTA BACKEND:");
      console.log(responseJson);
      if(responseJson.value){
        console.log("Se almaceno la imagen del ticket en blob storage de forma correcta y se realizo el analisis correctamente");
        const fechaActual = new Date().toLocaleDateString('es-MX');

        const ticketConFechaActual = {
          ...responseJson.ticket,
          fecha: fechaActual
        };

        addTicket(ticketConFechaActual);
        Alert.alert("Ticket registrado","El ticket se analizó y guardó correctamente");
        console.log(responseJson.ticket);
      }else{
        console.log("No se pudo almacenar la imagen del ticket en blob storage o no se pudo realizar el analisis correctamente");
      }
    }
  }

  //Función para manejar la captura del ticket desde la galeria
  const handleGalleryCapture = async () => {
    //Generar el nombre unico del recurso 
    const name = `ticket_${Date.now()}.jpeg`;
    //Solicitamos ver si tenemos permisos para acceder a la galeria
    const permisos = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permisos.granted === false){
      console.log("No se tienen permisos para acceder a la galeria");
    }
    //Capturamos el resultado 
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });
    //Verificamos que no se haya cancelado la acción
    if(resultado.canceled){
      console.log("No se selecciono ninguna imagen del ticket");
    }else{
      console.log("Se selecciono la imagen del ticket correctamente");
      const formData = new FormData();
      formData.append('ticket', {
        uri: resultado.assets[0].uri,
        name: name,
        type: 'image/jpeg',
      });
      console.log(formData);
      const response = await fetch('https://cloudp3-backend-lgloria-beesaacreqg3fuax.eastus-01.azurewebsites.net/guardar-ticket', {
        method: 'POST',
        body: formData, 
      });
      const responseJson = await response.json();
      console.log("RESPUESTA BACKEND:");
      console.log(responseJson);
      if(responseJson.value){
        console.log("Se almaceno la imagen del ticket en blob storage de forma correcta y se realizo el analisis correctamente");
        const fechaActual = new Date().toLocaleDateString('es-MX');

        const ticketConFechaActual = {
          ...responseJson.ticket,
          fecha: fechaActual
        };

        addTicket(ticketConFechaActual);
        Alert.alert("Ticket registrado","El ticket se analizó y guardó correctamente");
        console.log(responseJson.ticket); 
      }else{
        console.log("No se pudo almacenar la imagen del ticket en blob storage o no se pudo realizar el analisis correctamente");
      }
    }
  }

  //Dejo comentado esta parte del código por si necesitas seguir haciendo pruebas
  /*
  const handleFakeCapture = () => {
    const randomIndex = Math.floor(Math.random() * dataSimulation.length);
    const ticket = dataSimulation[randomIndex];

    addTicket(ticket);
  };
  */

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cameraButton} onPress={() => {handleCameraCapture()}}>
        <Ionicons name="camera" size={40} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.text}>Simular ticket</Text>

      <TouchableOpacity style={styles.uploadBtn} onPress={() => {handleGalleryCapture()}}>
        <Ionicons name="image" size={20} color="#fff" />
        <Text style={styles.uploadText}>Subir imagen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cameraButton: {
    backgroundColor: '#6366F1',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 6
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#1E293B'
  },

  uploadBtn: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center'
  },

  uploadText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600'
  }
});