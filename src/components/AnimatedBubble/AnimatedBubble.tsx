import React from "react";
import { Canvas, Circle, Group, LinearGradient, RadialGradient, vec } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

interface AnimatedBubbleProps {
  colors: string[];
  diameter?: number;
}

export function AnimatedBubble({ colors, diameter = 150 }: AnimatedBubbleProps) { // Valor padrão de 150 para diameter
  const { width } = useWindowDimensions();
  const adjustedDiameter = diameter; // Usando a diameter passada diretamente
  const radius = adjustedDiameter / 2;

  // Ajustando a posição do segundo círculo com base na posição do primeiro
  const smallCircleRadius = radius - 100;
  const smallCircleOffset = radius - 90;

  return (
    <Canvas style={{ height: adjustedDiameter, width: adjustedDiameter }}>
      <Group>
        {/* Primeiro círculo (gradiente linear) */}
        <Circle cx={radius} cy={radius} r={radius}>
          <LinearGradient
            start={vec(10, adjustedDiameter)}
            end={vec(adjustedDiameter, 10)}
            colors={colors} // Usando as cores animadas
          />
        </Circle>
      </Group>

      {/* Segundo círculo (gradiente radial) - Responsivo */}
      <Circle
        cx={radius - smallCircleOffset}
        cy={radius - smallCircleOffset}
        r={smallCircleRadius}>
        <RadialGradient
          c={vec(radius - smallCircleOffset, radius - smallCircleOffset)}
          r={smallCircleRadius}
          colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0)']}
        />
      </Circle>
    </Canvas>
  );
}
