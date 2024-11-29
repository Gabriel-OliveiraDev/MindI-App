import React from 'react'
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native'
import { Container, ContainerProps, ScrollContainer } from '@components'
import { useTheme } from '@shopify/restyle'
import { Theme } from '@theme'

interface ScreenProps extends ContainerProps {
  scrollable?: boolean
}


export function Screen({ children, style, scrollable = false, ...props }: ScreenProps) {
  const ScreenContainer = scrollable ? ScrollContainer : Container;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        touchSoundDisabled
      >
        <ScreenContainer style={style} flex={1} backgroundColor='background' {...props}>
          {children}
        </ScreenContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}
