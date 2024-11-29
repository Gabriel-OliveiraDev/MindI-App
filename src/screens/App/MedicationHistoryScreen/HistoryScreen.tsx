import React from 'react';
import { Screen, ScrollContainer, Text } from '@components';
import { useAppContext } from '@/context';
import { NotificationText } from './components/NotificationText';

export function MedicationHistoryScreen() {
  const { userNotifications } = useAppContext()
  return (
    <Screen p='s16'>
      <Text preset='headingLarge' pb='s16'>
        Meus Medicamentos
      </Text>
      <ScrollContainer
        showsVerticalScrollIndicator={false}
      >
        {userNotifications.map((notification, index) => (
          notification.notificationAddress === 'Medication' &&
          <NotificationText notification={notification} key={index} />
        ))}
      </ScrollContainer>
    </Screen>
  )
}