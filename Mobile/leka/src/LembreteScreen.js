import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

const ReminderScreen = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    // Configurações de notificação
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      popInitialNotification: true, // Para garantir que a notificação inicial seja lida
      requestPermissions: Platform.OS === 'ios',
    });

    createNotificationChannel();
  }, []);

  const createNotificationChannel = () => {
    // Cria o canal de notificação (necessário apenas no Android)
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'daily-reminder', // O ID do canal
          channelName: 'Lembretes Diários', // Nome visível para o usuário
          channelDescription: 'Canal para lembretes diários', // Descrição do canal
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`) // Confirmação da criação
      );
    }
  };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowPicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const scheduleNotification = () => {
    const now = new Date();
    const notificationTime = new Date(time);

    notificationTime.setSeconds(0); // Defina os segundos como zero

    if (notificationTime < now) {
      // Se o horário for no passado, agenda para o próximo dia
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
      channelId: 'daily-reminder',
      message: "Está na hora de completar seu hábito!", // Mensagem da notificação
      date: notificationTime, // Horário da notificação
      repeatType: 'day', // Notificações diárias
      allowWhileIdle: true,
    });

    console.log(`Notificação agendada para ${notificationTime}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DEFINIR DEPOIS</Text>
      <Text style={styles.title}>Adquira o hábito de ..., defina um lembrete diário</Text>
      <Text style={styles.subtitle}>Você pode mudar de horário a qualquer momento.</Text>
      <TouchableOpacity style={styles.timeButton} onPress={showTimePicker}>
        <Text style={styles.timeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity style={styles.activateButton} onPress={scheduleNotification}>
        <Text style={styles.activateText}>SIM, ATIVAR</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    top: 40,
    right: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#b0b0b0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  timeButton: {
    backgroundColor: '#4f4f4f',
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
  },
  timeText: {
    color: '#d0d0d0',
    fontSize: 20,
  },
  activateButton: {
    backgroundColor: '#7b46ff',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  activateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReminderScreen;
