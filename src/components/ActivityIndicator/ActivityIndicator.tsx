import React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';

import { Theme, ThemeColors } from '@theme';
import { useTheme } from '@shopify/restyle';

interface Props extends Omit<ActivityIndicatorProps, 'color'> {
  color?: ThemeColors;
}
export function ActivityIndicator({ color = 'primary', ...rest }: Props) {
  const colors = useTheme<Theme>().colors;

  return (
    <RNActivityIndicator
      testID="activity-indicator"
      color={colors[color]}
      {...rest}
    />
  );
};