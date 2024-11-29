import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Button,
  Container,
  Input,
  Screen,
  Text,
} from '@components';
import { useNavigation } from '@react-navigation/native';
import Notifee, { AndroidImportance, RepeatFrequency, TriggerType } from '@notifee/react-native';
import { useAppContext } from '@/context';

export function MedicationScreen() {
  const { addNotification, userNotifications } = useAppContext();
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [repeat, setRepeat] = useState<'daily' | 'none'>('none');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const navigation = useNavigation();

  function handleDailyButton() {
    setRepeat(repeat === 'daily' ? 'none' : 'daily');
  }

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    const currentTime = selectedDate || selectedTime;
    setShowTimePicker(Platform.OS === 'ios');
    setSelectedTime(currentTime);
  };

  const scheduleNotification = async () => {
    if (!selectedTime) return;

    // Garantir que o horário da notificação está correto
    const notificationTime = new Date(selectedTime);
    const now = new Date();
    notificationTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

    if (notificationTime < now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    try {
      // Criando a notificação
      await Notifee.createTriggerNotification(
        {
          title: 'Hora da medicação!',
          body: `${medicationName} - ${dosage}`,
          android: {
            channelId: 'medication',
            importance: AndroidImportance.HIGH,
            vibrationPattern: [250, 250, 250, 250],
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: notificationTime.getTime(),
          repeatFrequency: repeat === 'daily' ? RepeatFrequency.DAILY : RepeatFrequency.NONE,
        }
      );

      // Adicionando a notificação ao contexto
      addNotification({
        id: userNotifications.length + 1,
        notificationAddress: 'Medication',
        title: medicationName,
        body: `Quantidade: ${dosage}`,
        date: notificationTime,
        repeat: repeat === 'daily' ? 'Diariamente' : 'Não',
      });

      // Alerta de sucesso
      Alert.alert('Sucesso', 'Notificação agendada com sucesso!');
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
      Alert.alert('Erro', 'Houve um problema ao agendar a notificação.');
    }
  };


  return (
    <Screen p="s16" justifyContent="space-evenly">
      {/* Inputs */}
      <Container pb="s8">
        <Text preset="headingMedium">Nome da Medicação</Text>
        <Input
          onChangeText={setMedicationName}
          value={medicationName}
          placeholder="Nome"
        />
        <Text preset="headingMedium" pt="s8">Dosagem</Text>
        <Input
          onChangeText={setDosage}
          placeholder="Dosagem"
          value={dosage}
        />
      </Container>

      {/* Main */}
      <Container pb="s8" gap="s16">
        <Container>
          <Text preset="headingMedium" pb="s10" textAlign="center">
            {selectedTime ? `Horário escolhido: \n${selectedTime.toTimeString().slice(0, 5)}` : "Escolha um horário"}
          </Text>
          <Button
            onPress={() => setShowTimePicker(true)}
            title="Escolher Horário"
          />
        </Container>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime || new Date()}
            mode="time"
            is24Hour
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <Button
          title={`Repetir diariamente: ${repeat === 'daily' ? 'Sim' : 'Não'}`}
          onPress={handleDailyButton}
          preset={repeat === 'daily' ? 'primary' : 'gray'}
        />
      </Container>

      {/* Bottom */}
      <Container justifyContent="flex-end" gap="s8">
        <Button
          onPress={scheduleNotification}
          title="Agendar Medicação"
          disabled={!medicationName || !dosage || !selectedTime}
        />
        <Button
          onPress={() => navigation.navigate("MedicationHistoryScreen")}
          title="Ver medicações"
        />
      </Container>
    </Screen>
  );
}
