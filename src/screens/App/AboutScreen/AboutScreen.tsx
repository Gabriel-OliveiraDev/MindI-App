import React from 'react'
import { InfoText, Screen, ScrollContainer, Text } from '@components'
import { aboutTexts } from './AboutScreenTexts'


export function AboutScreen() {
  return (
    <Screen p='s16'>
      <Text preset='headingLarge' pb='s16'>
        Sobre o Aplicativo
      </Text>
      <ScrollContainer
        showsVerticalScrollIndicator={false}
      >
        {aboutTexts.map((infotexts, index) => (
          <InfoText
            content={infotexts.content}
            title={infotexts.title}
            key={index}
          />
        ))}
      </ScrollContainer>
    </Screen>
  )
}