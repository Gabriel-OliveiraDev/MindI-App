import React, { useState } from "react";
import { Button, Container, Screen, ScrollContainer, AnimatedBubble } from "@components";
import { EmotionButton } from "./components/EmotionButton/EmotionButton";
import { emotionPresets } from "./EmotionPreset";
import { useAnimatedGradient } from "./useAnimatedGradient";
import { useNavigation } from "@react-navigation/native";

export function BubbleScreen() {
  const [selectedColor, setSelectedColor] = useState('');
  const navigate = useNavigation().navigate
  const { colors, updateColors } = useAnimatedGradient()

  return (
    <Screen p="s16" gap="s48">
      <Container alignItems="center">
        <AnimatedBubble diameter={300} colors={colors} />
      </Container>

      <Container>
        <ScrollContainer showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ gap: 16 }}>
          {emotionPresets.map((emotionPreset, index) => (
            <EmotionButton
              selected={emotionPreset.color === selectedColor}
              key={index}
              color={emotionPreset.color}
              label={emotionPreset.label}
              onPress={() => setSelectedColor(emotionPreset.color)}
            />
          ))}
        </ScrollContainer>
      </Container>

      <Container gap="s16">
        <Button
          onPress={() => { updateColors(selectedColor) }}
          disabled={!selectedColor}
          title="Confirmar"
        />
        <Button
          onPress={() => { navigate("BubbleHistoryScreen") }}
          title="Ver Bolhas"
        />
      </Container>
    </Screen>
  );
}
