import React from 'react';
import { Button, Container, Icon, Screen, Text } from '@components';
import { useMeditation } from '@hooks';

export function MeditationScreen() {

  const { setTiming, startTimer, pauseTimer, timeLeft, isRunning } = useMeditation()

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Screen p="s16" gap='s64'>
      <Container alignItems='center'>
        <Container>
          <Icon
            name='meditation'
            type='MaterialCommunityIcons'
            size={128}
            color='#FFFB97'
            shadow
          />
        </Container>
        <Container>
          <Text preset='headingLarge' textAlign='center'>
            {isRunning ? "Tempo restante" : "Meditação"}
          </Text>
          <Text preset='headingLarge' textAlign='center'>
            {isRunning && formatTime(timeLeft)}
          </Text>
          <Text preset='headingMedium' textAlign='center'>
            Selecione uma duração
          </Text>
        </Container>
      </Container>

      <Container gap='s16'>
        <Button title='Longa' onPress={() => setTiming('long')} />
        <Button title='Média' onPress={() => setTiming('medium')} />
        <Button title='Curta' onPress={() => setTiming('short')} />
        <Button
          title={isRunning ? "Pausar" : "Iniciar"}
          onPress={isRunning ? pauseTimer : startTimer}
          preset={isRunning ? 'gray' : 'ghost'}
        />
      </Container>

    </Screen>
  );
}
