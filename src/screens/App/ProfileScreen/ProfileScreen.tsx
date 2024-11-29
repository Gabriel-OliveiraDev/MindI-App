import React from 'react';
import { Button, Container, Icon, Screen, Text, TouchableContainer } from '@components';
import { Colors } from '@constants';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { useAppContext, useAuthContext } from '@context';
import { Image } from 'react-native';
import { UserType } from '@types';
import { useNavigation } from '@react-navigation/native';

export function ProfileScreen() {

  const { updateUserData, userData } = useAppContext()
  const { signOut } = useAuthContext()
  const navigate = useNavigation().navigate

  function handleExit() {
    signOut()
    updateUserData({} as UserType)
  }

  function handleOpenImagePicker() {
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {

      response.errorMessage && Promise.reject();
      response.didCancel && Promise.reject();
      response.errorCode && Promise.reject();

      if (!response.assets) {
        return;
      }
      const selectedPhoto = response.assets[0];
      updateUserData({ photoURL: selectedPhoto.uri });
    });
  };

  return (
    <Screen p='s16'>
      {/* Profile Container */}
      <Container flex={0.4} justifyContent='center' alignItems='center'>
        <TouchableContainer
          backgroundColor='Gray'
          onPress={handleOpenImagePicker}
          style={{ borderRadius: '100%' }}
          justifyContent='center'
          alignItems='center'
          height={200}
          width={200}
        >
          {userData?.photoURL ?
            <Image source={{ uri: userData?.photoURL || '' }}
              height={200}
              width={200}
              style={{ borderRadius: 400 }}
            />
            :
            <Icon name='person' type='MaterialIcons' size={72} color={Colors.Gray} />
          }
        </TouchableContainer>
      </Container>

      {/* Profile Info Container */}
      <Container flex={0.1} py='s24' gap="s8">
        <Text preset='headingLarge'>
          Nome: {userData?.name}
        </Text>
        <Text preset='headingMedium'>
          Email: {userData?.email}
        </Text>
      </Container>

      {/* Profile Options Container */}
      <Container flex={0.5} pt='s24' justifyContent='space-between'>
        <Container gap='s16'>
          <Button
            title='Editar Perfil'
            onPress={() => { navigate("EditProfileScreen") }}
          />
          <Button
            title='Sair'
            onPress={() => { handleExit() }}
          />
        </Container>
      </Container>
    </Screen>
  )
}