import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { ThemeProvider as RestyleThemeProvider } from "@shopify/restyle";
import { darkTheme, theme as lightTheme } from "@theme";
import { ThemeType } from "@types";
import { StorageService } from "@/services/Storage/Storage";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
};

interface ThemeProviderProps { children: React.ReactNode; };

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeType>(() =>
    Appearance.getColorScheme() === "dark" ? 'dark' : 'light');

  // AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      const storagedTheme = await StorageService.getTheme()
      storagedTheme && setThemeState(storagedTheme)
    }
    loadTheme()
  }, []);

  async function toggleTheme() {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    await StorageService.updateTheme(theme)
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme === 'dark' ? 'dark' : 'light');
    });

    return () => subscription.remove();
  }, []);

  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <RestyleThemeProvider theme={selectedTheme}>
        {children}
      </RestyleThemeProvider>
    </ThemeContext.Provider>
  )
};

export function useAppTheme() {
  const context = useContext(ThemeContext);
  return context
}