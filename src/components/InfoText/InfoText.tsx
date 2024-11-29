import React from 'react';
import { Container, Text } from '@components';

interface InfoTextProps {
  title: string;
  content: string;
};

export function InfoText({ title, content }: InfoTextProps) {
  return (
    <Container
      pt='s10'
      borderBottomColor='backgroundContrast'
      borderBottomWidth={1}
      paddingBottom='s16'
    >
      <Text preset='paragraphLarge'>{title}</Text>
      <Text preset='paragraphSmall'>{content}</Text>
    </Container>
  );
};