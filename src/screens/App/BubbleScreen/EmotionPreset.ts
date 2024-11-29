import { Colors } from "@/constants";

type EmotionButtonPreset = { label: string; color: string };

export const emotionPresets: EmotionButtonPreset[] = [
  {
    label: 'Raiva',
    color: Colors.Emotion.red, // Vermelho intenso
  },
  {
    label: 'Tristeza',
    color: Colors.Emotion.blue2, // Azul vibrante
  },
  {
    label: 'Nojo',
    color: Colors.Emotion.green, // Verde esmeralda
  },
  {
    label: 'Alegria',
    color: Colors.Emotion.yellow, // Amarelo dourado
  },
  {
    label: 'Surpresa',
    color: Colors.Emotion.purple, // Roxo vibrante
  },
  {
    label: 'Amor',
    color: Colors.Emotion.pink, // Rosa forte
  },
  {
    label: 'Orgulho',
    color: Colors.Emotion.orange, // Laranja queimado
  },
  {
    label: 'Desprezo',
    color: Colors.Emotion.darkRed, // Vermelho escuro e forte
  },
  {
    label: 'Vergonha',
    color: Colors.Emotion.lavanda, // Lavanda quente
  },
];
