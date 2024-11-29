const palette = {
  bluePrimary: "#2D3250",
  blueSecondary: "#3F4778",
  blueTerciary: "#676F9D",
  blueLight: "#657CFF",

  White: '#FFFFFF',
  Black: '#000000',
  Gray: '#212121',
  LightGray: '#D3D3D3',

  Red: "#F26444",

  Green: "#B0F2C2",
};

const lightTheme = {
  ...palette,

  background: palette.White,
  backgroundContrast: palette.bluePrimary,

  // Blues
  primary: palette.bluePrimary,
  secondary: palette.blueSecondary,
  tertiary: palette.blueTerciary,
  light: palette.blueLight,

  // Messages
  error: palette.Red,
  success: palette.Green,

  // Buttons
  btnPrimary: palette.bluePrimary,
  btnSecondary: palette.blueSecondary,

  // Texts
  detail: palette.LightGray,
  textNormal: palette.bluePrimary,
  textTitle: palette.White
};

const darkTheme: typeof lightTheme = {
  ...palette,

  background: palette.bluePrimary,
  backgroundContrast: palette.White,

  // Blues
  primary: palette.blueSecondary,
  secondary: palette.bluePrimary,
  tertiary: palette.blueTerciary,
  light: palette.blueLight,

  // Messages
  error: palette.Red,
  success: palette.Green,

  // Buttons
  btnPrimary: palette.blueSecondary,
  btnSecondary: palette.bluePrimary,

  detail: palette.LightGray,
  textNormal: palette.White,
  textTitle: palette.White,
};

export const colors = { lightTheme, darkTheme, palette };