import React from 'react';
import { ScrollContainer, InfoText, Screen, Text } from '@components'
import { termsTexts } from './TermsScreenTexts';

export function TermsScreen() {
  return (
    <Screen p='s16'>
      <Text preset='headingLarge' pb='s16'>
        Termos e condições
      </Text>

      <ScrollContainer
        showsVerticalScrollIndicator={false}
      >
        {termsTexts.map((infoText, index) => (
          <InfoText
            key={index}
            title={infoText.title}
            content={infoText.content}
          />
        ))}
      </ScrollContainer>
    </Screen>
  )
}