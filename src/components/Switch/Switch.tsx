import React from 'react';
import { Switch as RNSwitch, SwitchProps } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@theme';


export function Switch({ ...props }: SwitchProps) {
  const theme = useTheme<Theme>();

  const switchColor = {
    true: theme.colors.light,
    false: theme.colors.tertiary,
    thumb: theme.colors.primary,
  };

  return (
    <RNSwitch
      trackColor={{
        true: switchColor.true,
        false: switchColor.false
      }}
      thumbColor={switchColor.thumb}
      {...props}
    />
  );
};