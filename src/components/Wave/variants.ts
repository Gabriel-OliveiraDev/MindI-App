import { Colors } from "@constants";

export interface WaveStyle {
  color?: string
}

const lightPrimary: WaveStyle = {
  color: Colors.Blue.Deep
}

const lightSecondary: WaveStyle = {
  color: Colors.White
}

const light = {
  primary: lightPrimary,
  secondary: lightSecondary
}

const darkPrimary: WaveStyle = {
  color: Colors.White
}

const darkSecondary: WaveStyle = {
  color: Colors.Blue.Deep
}

const dark = {
  primary: darkPrimary,
  secondary: darkSecondary
}

export const Variants = {
  light,
  dark
}