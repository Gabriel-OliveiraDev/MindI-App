import { ScrollView, ScrollViewProps } from 'react-native';
import {
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
  createRestyleComponent,
} from '@shopify/restyle';
import { Theme } from '@theme';

type RestyleTypes = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

export type ScrollContainerProps = ScrollViewProps & RestyleTypes;

export const ScrollContainer =
  createRestyleComponent<ScrollContainerProps, Theme>(
    [backgroundColor, spacing, spacingShorthand, layout, border],
    ScrollView,
  );
