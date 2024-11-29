import React from 'react';
import { Button, Container, Screen, Text } from '@components';
import { useAppTheme } from '@context';
import { useNavigation } from '@react-navigation/native';

export function SettingsScreen() {
  const { theme, toggleTheme } = useAppTheme();
  const navigate = useNavigation().navigate;

  return (
    <Screen p='s16'>
      <Container gap='s24'>
        <Container
          borderBottomColor='backgroundContrast'
          borderBottomWidth={1}
        >
          <Text pb='s4' preset='headingLarge'>
            Ajustes
          </Text>
        </Container>
        <Container gap='s20'>

          <Button
            title='Termos e condições'
            onPress={() => navigate("TermsScreen")}
            alignItems='flex-start'
          />
          <Button
            title={`Trocar para tema ${theme === 'light' ? 'escuro' : 'claro'} `}
            onPress={toggleTheme}
            alignItems='flex-start'
          />
          {/* <Button
            title='Idioma'
            disabled
            onPress={() => { }}
            alignItems='flex-start'
          /> */}
          <Button
            title='Sobre'
            onPress={() => navigate("AboutScreen")}
            alignItems='flex-start'
          />
          <Button
            title='Excluir Conta'
            onPress={() => { }}
            alignItems='flex-start'
          />

        </Container>
      </Container>
      <Container flex={1} justifyContent='flex-end' style={{ padding: 16 }}>
        <Text preset='paragraphSmall' color='detail'>
          Um oferecimento: Olympic Green
        </Text>
      </Container>
    </Screen>
  )
}