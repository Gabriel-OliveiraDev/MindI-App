import { useEffect, useState } from "react";
import { withTiming } from "react-native-reanimated";

export function useAnimatedGradient() {
  const [colors, setColors] = useState([
    'rgba(33, 150, 243, 0.7)', // Azul vibrante
    'rgba(124, 252, 0, 0.5)',
  ]);

  function updateColors(newColor: string) {
    console.log(colors.length);
    if (colors.length >= 7) {
      setColors((prevColors) => prevColors.slice(0, -1));
      return
    }
    setColors((prevColors) => [newColor, ...prevColors]);
  }

  return { colors, updateColors }
}
