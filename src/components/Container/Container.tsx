import {
  TouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
  PressableProps,
} from 'react-native';

import {
  createBox,
  createRestyleComponent,
  backgroundColor,
  BackgroundColorProps,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
  border,
  BorderProps,
  spacingShorthand,
  SpacingShorthandProps,
} from '@shopify/restyle';

import { Theme } from '@theme';

export const Container = createBox<Theme>();
export type ContainerProps = React.ComponentProps<typeof Container>;

type RestyleTypes = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

export type TouchableContainerProps = RNTouchableOpacityProps & RestyleTypes;

export const TouchableContainer = createRestyleComponent<
  TouchableContainerProps,
  Theme
>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  TouchableOpacity,
);

export type PressableContainerProps = PressableProps & RestyleTypes;
export const PressableContainer = createRestyleComponent<PressableContainerProps, Theme>(
  [backgroundColor, spacing, spacingShorthand, layout, border],
  TouchableOpacity,
);