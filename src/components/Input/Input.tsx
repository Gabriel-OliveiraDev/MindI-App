import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View, TouchableOpacity, DimensionValue } from "react-native";
import { Icon } from "@components";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@theme";

interface InputProps extends TextInputProps {
  isPassword?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
}

export function Input({ isPassword = false, width = "100%", height = 50, ...rest }: InputProps) {
  const theme = useTheme<Theme>();
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View
      style={[
        styles.container, {
          borderColor: theme.colors.LightGray,
          width,
          height,
        },
        rest.style
      ]}
    >
      <TextInput
        style={[
          styles.input,
          { color: theme.colors.backgroundContrast },
        ]}
        {...rest}
        secureTextEntry={isPassword && isSecure}
        placeholderTextColor={theme.colors.backgroundContrast}
        autoCapitalize="none" // "none" para evitar erros com senhas
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsSecure((prev) => !prev)}
          style={styles.icon}
        >
          <Icon
            name={isSecure ? "eye-off" : "eye"}
            color={theme.colors.LightGray}
            type="Ionicons"
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});
