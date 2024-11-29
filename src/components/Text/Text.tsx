import React from 'react';
import { TextStyle } from 'react-native';

import { createText } from '@shopify/restyle';

import { Theme } from '@theme';

const SRText = createText<Theme>();
type SRTextProps = React.ComponentProps<typeof SRText>;

export interface TextProps extends SRTextProps {
  preset?: TextVariants;
}
export function Text({
  children,
  preset = 'paragraphMedium',
  style,
  fontWeight,
  color = "backgroundContrast",
  ...sRTextProps
}: TextProps) {
  return (
    <SRText
      color={color}
      style={[$fontSizes[preset], style, {fontWeight: fontWeight || 'bold'}]}
      {...sRTextProps}>
      {children}
    </SRText>
  );
}


type TextVariants =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall'
  | 'paragraphCaption'
  | 'paragraphCaptionSmall';

export const $fontSizes: Record<TextVariants, TextStyle> = {
  headingLarge: { fontSize: 32, lineHeight: 38.4 },
  headingMedium: { fontSize: 22, lineHeight: 26.4 },
  headingSmall: { fontSize: 18, lineHeight: 23.4 },

  paragraphLarge: { fontSize: 18, lineHeight: 25.2 },
  paragraphMedium: { fontSize: 16, lineHeight: 22.4 },
  paragraphSmall: { fontSize: 14, lineHeight: 19.6 },

  paragraphCaption: { fontSize: 12, lineHeight: 16.8 },
  paragraphCaptionSmall: { fontSize: 10, lineHeight: 14 },
};
