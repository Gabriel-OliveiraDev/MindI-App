import React from 'react';
import { Container, Text, Button, PressableContainer, Icon } from '@components';
import { NotificationType } from '@/@types';
import { useAppContext } from '@/context';
import { Colors } from '@/constants';
import { formatDate } from '@utils'

interface NotificationTextProps {
  notification: NotificationType;
}

export function NotificationText({
  notification,
}: NotificationTextProps) {
  const { removeNotification } = useAppContext();

  const handleDelete = () => {
    removeNotification(notification.id);
  };

  return (
    <Container
      pt="s8"
      borderBottomColor="backgroundContrast"
      borderBottomWidth={1}
      flexDirection='row'
    >
      <Container flex={1}>
        <Text preset="paragraphLarge">{notification.title}</Text>
        <Text preset="paragraphSmall">{notification.body}</Text>
        <Text preset="paragraphSmall">
          {formatDate(notification.date)}
        </Text>
        {notification.repeat && (
          <Text preset="paragraphSmall">Repete: {notification.repeat}</Text>
        )}
      </Container>
      <PressableContainer
        justifyContent='center'
        onPress={handleDelete}
      >
        <Icon
          type='MaterialCommunityIcons'
          name="close"
          size={32}
          color={Colors.Red}
        />
      </PressableContainer>
    </Container>
  );
}
