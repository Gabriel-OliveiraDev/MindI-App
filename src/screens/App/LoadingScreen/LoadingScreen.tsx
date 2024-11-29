import React from 'react'
import { Container, Screen } from '@components'
import { ActivityIndicator } from 'react-native'
import { Colors } from '@constants'


export function LoadingScreen() {
  return (
    <Screen>
      <Container flex={1} backgroundColor='secondary' >
        <ActivityIndicator size={64} color={Colors.Blue.Deep} />
      </Container>
    </Screen>
  )
}