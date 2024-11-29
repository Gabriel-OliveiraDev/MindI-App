import React, { useState } from "react";
import { Button, Container, Icon, Input, Screen, Text } from "@components";
import { useFocusNotification } from "@hooks";

export function FocusScreen() {
  const focusNotify = useFocusNotification();
  const [selectedTime, setSelectedTime] = useState<"15" | "30" | "45" | null>(null);

  function handleChoice(value: "15" | "30" | "45") {
    setSelectedTime(value);
    focusNotify.setMinutes(value);
  }

  const getButtonStyle = (value: "15" | "30" | "45") => {
    return selectedTime === value ? true : false;
  };

  return (
    <Screen p='s16' gap="s8" scrollable>
      <Container gap='s8' pb='s40' alignItems="center" justifyContent="center">
        <Text preset='headingMedium' textAlign="center">
          Qual é o foco de hoje?
        </Text>
        <Icon
          name='emoji-objects'
          type="MaterialIcons"
          size={256}
          color="#FFFB97"
          shadow
        />
        <Input
          placeholder="Ex: Estudar"
          allowFontScaling={false}
          onChangeText={(value) => focusNotify.setFocus(value)}
          value={focusNotify.focus}
        />
      </Container >

      <Container gap="s8" alignItems="center">
        <Button
          onPress={() => handleChoice('15')}
          disabled={getButtonStyle('15')}
          title="15 Minutos"
          width='80%'
        />
        <Button
          onPress={() => handleChoice('30')}
          disabled={getButtonStyle('30')}
          title="30 Minutos"
          width='80%'
        />
        <Button
          onPress={() => handleChoice('45')}
          disabled={getButtonStyle('45')}
          title="45 Minutos"
          width='80%'
        />
        {
          focusNotify.notificationId ?
            <Button
              title="Cancelar"
              preset="gray"
              width='80%'
              onPress={focusNotify.cancelNotification}
            />
            :
            <Button
              title="Confirmar"
              preset="ghost"
              width='80%'
              onPress={focusNotify.addNotification}
            />
        }
      </Container>
    </Screen>
  );
}

