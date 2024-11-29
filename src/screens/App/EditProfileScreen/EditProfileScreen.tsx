import React, { useState } from 'react';
import { Container, Screen, Text } from '@components';
import { ShowData } from './components/ShowData';

export function EditProfileScreen() {
  const [isEditMode, setIsEditMode] = useState(false)
  function toggleEditMode() { setIsEditMode(!isEditMode) }
  return (
    <Screen p='s16' gap='s32' scrollable >
      {/* Top */}
      <Container
        borderBottomColor='backgroundContrast'
        borderBottomWidth={1}
        mb='s16'
      >
        <Text preset='headingLarge'>
          {isEditMode ? "Editar" : "Meu"} Perfil
        </Text>
        <Text preset='paragraphSmall' onPress={() => { toggleEditMode() }}>
          Alternar modo edição
        </Text>
      </Container >
      {/* Main */}
      <Container>
        <ShowData editMode={isEditMode} />
      </Container >
    </Screen >
  )
}