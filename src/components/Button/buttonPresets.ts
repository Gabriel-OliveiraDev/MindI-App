import { ThemeColors } from '../../theme/theme';
import { TouchableContainerProps } from '../Container/Container';
import { TextProps } from '../Text/Text';

import { ButtonPreset } from './Button';

interface ButtonUI {
  container: TouchableContainerProps;
  content: { color: ThemeColors; textProps?: TextProps };
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: { color: 'White' },
    },
    disabled: {
      container: {
        backgroundColor: 'Gray',
      },
      content: { color: 'LightGray' },
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: { color: 'primary' },
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'LightGray',
      },
      content: { color: 'Gray' },
    },
  },
  ghost: {
    default: {
      container: {
        backgroundColor: 'White',
      },
      content: {
        color: 'Black',
      },
    },
    disabled: {
      container: {
        backgroundColor: 'LightGray',
        height: 40,
      },
      content: { color: 'Gray' },
    },
  },
  gray: {
    default: {
      container: {
        backgroundColor: 'Gray',
      },
      content: { color: 'LightGray' },
    },
    disabled: {
      container: {
        backgroundColor: 'Gray',
      },
      content: { color: 'LightGray' },
    },
  },
};