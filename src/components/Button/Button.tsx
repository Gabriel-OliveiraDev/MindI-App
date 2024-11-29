import React from 'react';

import {
  ActivityIndicator,
  TouchableContainer,
  TouchableContainerProps,
  Text,
} from '@components';

import { buttonPresets } from './buttonPresets';

export type ButtonPreset = 'primary' | 'outline' | 'ghost' | 'gray';

export interface ButtonProps extends TouchableContainerProps {
  title: string;
  loading?: boolean;
  preset?: ButtonPreset;
  disabled?: boolean;
}

export function Button({
  title,
  loading = false,
  preset = 'primary',
  disabled,
  ...TouchableContainerProps
}: ButtonProps) {
  const buttonPreset = buttonPresets[preset][disabled ? 'disabled' : 'default'];
  return (
    <TouchableContainer
      activeOpacity={0.6}
      disabled={disabled || loading}
      paddingHorizontal="s20"
      height={60}
      alignItems="center"
      justifyContent="center"
      borderRadius="s16"
      {...buttonPreset.container}
      {...TouchableContainerProps}>
      {loading ? (
        <ActivityIndicator color={buttonPreset.content.color} />
      ) : (
        <Text
          preset="paragraphLarge"
          color={buttonPreset.content.color}
          {...buttonPreset.content.textProps}>
          {title}
        </Text>
      )}
    </TouchableContainer>
  );
};