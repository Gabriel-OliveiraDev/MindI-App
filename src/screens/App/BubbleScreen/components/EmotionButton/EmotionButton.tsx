import React from 'react';
import { Container, PressableContainer, Text, TouchableContainer } from "@/components"

interface EmotionButtonPreset {
  label: string;
  color: string;
  onPress?: () => void;
  selected?: boolean
};

export function EmotionButton(Preset: EmotionButtonPreset) {
  return (
    <TouchableContainer
      activeOpacity={0.6}
      backgroundColor={Preset.selected ? "tertiary" : "primary"}
      alignItems="center"
      borderRadius="s16"
      gap="s16"
      p="s8"
      height={175}
      onPress={Preset.onPress}
    >
      <Container
        style={{ borderRadius: 100, backgroundColor: Preset.color || "" }}
        height={100}
        width={100}
      />
      <Text preset="paragraphLarge" color="White">
        {Preset.label}
      </Text>
    </TouchableContainer>
  );
};