import { NativeModules } from "react-native";

const { KeepAwake } = NativeModules;

export function useKeepAwake() {
  const activate = () => { KeepAwake.activate(); };
  const deactivate = () => { KeepAwake.deactivate(); };
  return { activate, deactivate };
}
