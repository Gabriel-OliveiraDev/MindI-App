import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import notifee from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Container, Logo, Screen, Text, TouchableContainer } from '@components';
import { useAppContext } from '@/context';


export function HomeScreen() {
  const navigate = useNavigation()
  useEffect(() => {
    notifee.requestPermission();

  }, []);
  const { userData } = useAppContext()

  return (
    <Screen>
      {/* Banner Container */}
      <TouchableContainer
        activeOpacity={0.9}
        backgroundColor='primary'
        flex={0.4}
        flexDirection='row'
        style={{ borderBottomStartRadius: 64 }}
        onPress={() => navigate.navigate('InfoScreen')}
      >
        <Container p={'s32'} width={'50%'} justifyContent='center' alignContent='center'>
          <Text preset='paragraphLarge' color='White'>Seja Bem-vindo</Text>
          <Text preset='paragraphLarge' color='White'>{userData?.name}</Text>
        </Container>

        <Container width={'50%'}>
          <Logo width={'100%'} height={'100%'} />
        </Container>
      </TouchableContainer>


      {/* Functions Container */}
      <Container
        style={{ padding: 16 }}
        justifyContent='flex-start'
        alignContent='flex-start'
        flex={0.6}
      >

        <Container
          borderBottomColor='backgroundContrast'
          borderBottomWidth={1}
        >
          <Text pb='s4' preset='headingLarge'> Funções</Text>
        </Container>

        <Container style={{ gap: '2%' }} height={'98%'} justifyContent='center'>
          <Button
            onPress={() => navigate.navigate('MedicationScreen')}
            title='Calendário de Medicações'
            style={btn}
          />
          <Button
            onPress={() => navigate.navigate('BubbleScreen')}
            title='Bolha de Emoções'
            style={btn}
          />
          <Button
            onPress={() => navigate.navigate('MeditationScreen')}
            title='Meditação'
            style={btn}
          />
          <Button
            onPress={() => navigate.navigate('FocusScreen')}
            title='Foco'
            style={btn}
          />
        </Container>
      </Container>
    </Screen>
  );
};

const btn: ViewStyle = { height: '20%' }