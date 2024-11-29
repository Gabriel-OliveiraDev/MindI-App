import { useState, useRef, useEffect } from "react";
import { Vibration } from "react-native";
import { useKeepAwake } from "@hooks";

export function useMeditation() {
  const [meditationTime, setMeditationTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const KeepAwake = useKeepAwake();

  const minuteToMillisecond = (value: number) => value * 60 * 1000;

  function setTiming(time: "long" | "medium" | "short") {
    let duration = 0;
    switch (time) {
      case "long":
        duration = minuteToMillisecond(45);
        break;
      case "medium":
        duration = minuteToMillisecond(30);
        break;
      case "short":
        duration = minuteToMillisecond(15);
        break;
      default:
        break;
    }
    setMeditationTime(duration);
    setTimeLeft(duration);
  }

  const startTimer = () => {
    if (isRunning || timeLeft <= 0) return;
    setIsRunning(true);
    KeepAwake.activate(); // Ativa o Keep Awake para manter o celular acordado

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearIntervalTimer();
          KeepAwake.deactivate(); // Desativa o Keep Awake quando o tempo acabar
          handleTimerEnd(); // Executa ações ao final do timer
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearIntervalTimer();
    KeepAwake.deactivate(); // Desativa o Keep Awake quando o timer for pausado
  };

  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(meditationTime);
  };

  const clearIntervalTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTimerEnd = () => {
    // Vibração ao final do timer
    Vibration.vibrate([500, 500, 500]); // Vibração padrão: vibra por 500ms, pausa por 500ms, e vibra novamente
  };

  useEffect(() => {
    return () => {
      clearIntervalTimer(); // Limpa o intervalo quando o componente desmontar
      KeepAwake.deactivate(); // Garante que o Keep Awake seja desativado
    };
  }, []);

  return {
    meditationTime,
    timeLeft,
    isRunning,
    setTiming,
    startTimer,
    pauseTimer,
    resetTimer,
  };
}
