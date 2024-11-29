import React from 'react'
import { Screen, ScrollContainer, Text, InfoText } from '@components'
import { infoTexts } from './InfoScreenTexts'

export function InfoScreen() {
  return (
    <Screen p='s16'>
      <Text preset='headingLarge' pb="s16">
        Informações
      </Text>

      <ScrollContainer
        showsVerticalScrollIndicator={false}
      >
        {infoTexts.map((infoText, index) => (
          <InfoText
            content={infoText.content}
            title={infoText.title}
            key={index}
          />
        ))};
      </ScrollContainer>
    </Screen>
  )
}