import { Container, Screen, AnimatedBubble, Text } from '@/components';
import { Colors } from '@/constants';
import React from 'react';
import { useWindowDimensions } from 'react-native';

export function BubbleHistoryScreen() {
  const { width } = useWindowDimensions();
  const smallDiameter = width * 0.25; // Ajuste o tamanho da bolha pequena

  // Definindo as cores de exemplo
  const colors = [
    Colors.Emotion.pink,
    Colors.Emotion.purple,
    Colors.Emotion.blue,
    Colors.Emotion.blue2,
    Colors.Emotion.red,
    Colors.Emotion.darkRed,
  ];
  const color3 = [
    Colors.Emotion.pink,
    Colors.Emotion.pink,
    Colors.Emotion.lavanda,
    Colors.Emotion.red,
    Colors.Emotion.darkRed,
    Colors.Emotion.lavanda,
  ];
  const colors2 = [
    Colors.Emotion.orange,
    Colors.Emotion.darkRed,
    Colors.Emotion.orange,
    Colors.Emotion.orange,
    Colors.Emotion.yellow,
  ];

  return (
    <Screen gap='s16' p='s16'>
      <Container borderBottomWidth={1} borderBottomColor='backgroundContrast' py={'s16'}>
        <Text preset='headingLarge'>
          Suas Bolhas
        </Text>
      </Container>
      <Container py={'s16'} flexDirection='row' gap='s16' justifyContent='center'>
        <AnimatedBubble colors={colors} diameter={smallDiameter} />
        <AnimatedBubble colors={colors2} diameter={smallDiameter} />
        <AnimatedBubble colors={color3} diameter={smallDiameter} />
      </Container>

    </Screen>
  );
}
