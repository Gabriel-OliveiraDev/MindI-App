import { useSignInForm } from '@/hooks'
import { Button, Container, Input, Logo, Screen, Text } from '@components'
import { useNavigation } from '@react-navigation/native'
import React from 'react'


export function SignInScreen() {

  const navigate = useNavigation().navigate;

  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    buttonLoading,
    handleFinish,
  } = useSignInForm()

  return (
    <Screen p='s16' scrollable>
      <Container alignItems="center" justifyContent="center" flex={0.5}>
        <Logo height={'70%'} width={'100%'} />
        <Text preset="headingMedium" pt="s16">
          Entrar na sua conta
        </Text>
      </Container>

      <Container justifyContent="center" flex={0.5} gap="s16">
        {error?.field === 'email' && <Text preset="paragraphCaption" color="Red">{error.message}</Text>}
        <Input
          placeholder='Email'
          keyboardType='email-address'
          onChangeText={(value) => {
            setEmail(value);
            if (error?.field === 'email') setError(null);
          }}
          value={email}
        />
        {error?.field === 'password' && <Text preset="paragraphCaption" color="Red">{error.message}</Text>}
        <Input
          placeholder='Senha'
          isPassword
          onChangeText={(value) => {
            setPassword(value);
            if (error?.field === 'password') setError(null);
          }}
          value={password}
        />

        <Button title='Entrar' loading={buttonLoading} onPress={handleFinish} />
        <Text textAlign='center'>Ainda não possui uma conta ?
          <Text color='light' onPress={() => navigate('SignUp')}> Cadastre-se</Text>
        </Text>
      </Container>
    </Screen >
  )
}