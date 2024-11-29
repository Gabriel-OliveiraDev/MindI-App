import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Container, Icon, PressableContainer, Text } from '@components';
import { Colors } from '@constants';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@theme';
import { useTheme } from '@shopify/restyle';


interface WaveProps extends ViewProps {
  inverted?: boolean;
  headerProps?: NativeStackHeaderProps;
};

export function Wave({
  inverted = false,
  headerProps,
  ...props
}: WaveProps) {
  const theme = useTheme<Theme>();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container backgroundColor='background' {...props} flexGrow={1}>
      <Svg
        height="150"
        width="100%"
        style={{
          top: !inverted ? '-10%' : '0%',
          transform: [{ rotate: !inverted ? '180deg' : '0deg' }],
        }}
      >
        <Path
          d="M44.6371 45.6168L-6 92.6782V150H416V0L311.411 57.5739C287.235 70.8823 258.29 72.3633 232.882 61.5919L155.247 28.6799C144.135 23.9691 132.189 21.5414 120.119 21.5414H105.907C83.1759 21.5414 61.2872 30.1424 44.6371 45.6168Z"
          fill={theme.colors['primary']}
        />
      </Svg>
      {headerProps && (
        <PressableContainer
          pl="s20"
          pt="s24"
          style={{ position: 'absolute' }}
          onPress={handleBack}
          android_disableSound
        >
          <Text color="White" preset="headingMedium">
            <Icon color={Colors.White} name="chevron-left" type="Entypo" size={22} />
            Voltar
          </Text>
        </PressableContainer>
      )}
    </Container>
  );
}
