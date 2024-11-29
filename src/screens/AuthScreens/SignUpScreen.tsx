import React from 'react';
import { Button, Container, Input, Logo, Screen, Text } from '@components';
import { useSignUpForm } from '@hooks';
import { useNavigation } from '@react-navigation/native';


export function SignUpScreen() {

  const navigate = useNavigation().navigate

  const {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    formStep,
    error,
    setError,
    handleContinue,
    handleFinish,
    handleBack,
    loadingButton
  } = useSignUpForm();

  return (
    <Screen p="s16" scrollable>
      <Container alignItems="center" justifyContent="center" flex={0.5}>
        <Logo height={'70%'} width={'100%'} />
        <Text preset="headingMedium" pt="s16">
          Crie sua conta
        </Text>
      </Container>


      <Container justifyContent="center" flex={0.5} gap="s16">

        {formStep === 'nameEmail' ? (
          <>
            {error?.field === 'name' && <Text preset="paragraphCaption" color="Red">{error.message}</Text>}
            <Input
              keyboardType="name-phone-pad"
              autoCapitalize="words"
              onChangeText={(value) => {
                setName(value);
                if (error?.field === 'name') setError(null);
              }}
              placeholder="Nome"
              value={name}
            />

            {error?.field === 'email' && <Text preset="paragraphCaption" color="Red">{error.message}</Text>}
            <Input
              keyboardType="email-address"
              onChangeText={(value) => {
                setEmail(value);
                if (error?.field === 'email') setError(null);
              }}
              placeholder="Email"
              value={email}
            />

            <Button title="Continuar" onPress={handleContinue} />
          </>
        ) : (
          <>
            {error?.field === 'password' && <Text preset="paragraphCaption" color="Red">{error.message}</Text>}
            <Input
              placeholder="Senha"
              isPassword
              onChangeText={(value) => {
                setPassword(value);
                if (error?.field === 'password') setError(null);
              }}
              value={password}
              key={'password'}
            />

            {error?.field === 'confirmPassword' && <Text preset="paragraphCaption" color="Red">{error.message}</Text>}
            <Input
              isPassword
              placeholder="Confirmação de Senha"
              onChangeText={(value) => {
                setConfirmPassword(value);
                if (error?.field === 'confirmPassword') setError(null);
              }}
              value={confirmPassword}
              key={'confirmPassword'}
            />

            <Container flexDirection="row" gap='s16' alignItems="center" justifyContent="center">
              <Button title="Voltar" onPress={handleBack} preset="gray" />
              <Button title="Concluir" onPress={handleFinish} loading={loadingButton} />
            </Container>
          </>
        )}
        <Text preset='paragraphSmall' textAlign='center' onPress={() => navigate('SignIn')}>
          Ja possui uma conta?
        </Text>
      </Container>
    </Screen>
  );
}
