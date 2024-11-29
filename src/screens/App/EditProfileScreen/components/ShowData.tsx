import React, { useState } from 'react';
import { Button, Container, Input, Text } from '@components';
import { useAppContext } from '@/context';
import { LoadingScreen } from '../../LoadingScreen/LoadingScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, } from '@/utils';

interface ShowDataProps {
  editMode?: boolean;
}

export function ShowData({ editMode = false }: ShowDataProps) {
  const { userData, updateUserData } = useAppContext();
  if (!userData) return <LoadingScreen />;

  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState(userData.birthdate ? new Date(userData.birthdate) : null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || birthdate;
    setShowPicker(false);

    setBirthdate(currentDate);
  };

  const handleSubmit = () => {
    if (birthdate !== null) {
      // updateUserData({ name, phone, birthdate: formatBirthdate(birthdate) });
    }
    updateUserData({ phone });
  };

  if (!editMode) {
    return (
      <>
        <Text preset="headingMedium" mb="s16">
          Minhas informações:
        </Text>
        <Container gap="s12">
          <Text preset="headingSmall">Nome: {userData.name}</Text>
          <Text preset="headingSmall">Email: {userData.email}</Text>
          <Text preset="headingSmall">Telefone: {userData.phone || 'Não fornecido'}</Text>
          <Text preset="headingSmall">
            Aniversário: {userData.birthdate ? userData.birthdate : 'Não fornecido'}
          </Text>
          {/* <Text preset="headingSmall">Criado em: {formatDate(userData.createdAt)}</Text> */}
        </Container>
      </>
    );
  }

  return (
    <>
      <Text preset="headingMedium" pb="s16">
        {editMode ? 'Editar' : 'Minhas'} informações:
      </Text>
      <Container gap="s12">
        <Text preset="headingSmall">Telefone</Text>
        <Input
          value={phone}
          onChangeText={(value) => setPhone(value)}
          placeholder="Digite seu telefone"
        />

        <Button title={"Aniversário"} onPress={() => setShowPicker(true)} />
        {/* Mostrar o DateTimePicker */}
        {showPicker && (
          <DateTimePicker
            value={birthdate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Button onPress={handleSubmit} title="Salvar" />
      </Container>
    </>
  );
}
