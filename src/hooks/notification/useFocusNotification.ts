import { useState, useEffect } from "react";
import notifee, {
  AndroidChannel,
  AndroidImportance,
  IntervalTrigger,
  TriggerType,
  TimeUnit,
} from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Key } from "@constants";

type MinutesType = "15" | "30" | "45";

export function useFocusNotification() {
  const [focus, setFocus] = useState("");
  const [minutes, setMinutes] = useState<MinutesType>("" as MinutesType);
  const [notificationId, setNotificationId] = useState<string | null>(null);

  // Recupera estado ao iniciar
  useEffect(() => {
    async function initialize() {
      await createNotificationChannel();
      await restoreNotificationState();
    }
    initialize();
  }, []);

  async function createNotificationChannel() {
    const channel: AndroidChannel = {
      id: "Focus-channel",
      name: "Focus Notifications",
      importance: AndroidImportance.HIGH,
    };

    await notifee.createChannel(channel);
  }

  async function validateData() {
    if (!focus) {
      Alert.alert("Erro", "Por favor, preencha o campo de foco.");
      return true;
    }
    if (!minutes) {
      Alert.alert("Erro", "Por favor, escolha o tempo.");
      return true;
    }
    return false;
  }

  // Salva estado no AsyncStorage
  async function saveNotificationState() {
    const state = {
      focus,
      minutes,
      notificationId,
    };
    await AsyncStorage.setItem(Key.FOCUS_NOTIFICATION_KEY, JSON.stringify(state));
  }

  // Restaura estado do AsyncStorage
  async function restoreNotificationState() {
    const savedState = await AsyncStorage.getItem(Key.FOCUS_NOTIFICATION_KEY);
    if (savedState) {
      const { focus, minutes, notificationId } = JSON.parse(savedState);
      setFocus(focus);
      setMinutes(minutes);
      setNotificationId(notificationId);
    }
  }

  async function addNotification() {
    if (await validateData()) return;

    const interval = parseInt(minutes, 10) * 60; // Converte minutos para segundos

    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval,
      timeUnit: TimeUnit.SECONDS,
    };

    const id = await notifee.createTriggerNotification(
      {
        title: focus,
        body: `Lembre-se: você está focado na tarefa "${focus}".`,
        android: {
          channelId: "Focus-channel",
          smallIcon: "ic_launcher",
        },
      },
      trigger
    );

    setNotificationId(id);
    await saveNotificationState();
  }

  async function cancelNotification() {
    if (!notificationId) {
      Alert.alert("Erro", "Não há notificações ativas para cancelar.");
      return;
    }

    await notifee.cancelTriggerNotification(notificationId);
    setNotificationId(null);
    setFocus("");
    setMinutes("15");
    await AsyncStorage.removeItem(Key.FOCUS_NOTIFICATION_KEY);
  }

  return {
    setFocus,
    setMinutes,
    addNotification,
    cancelNotification,
    notificationId,
    focus,
  };
}
