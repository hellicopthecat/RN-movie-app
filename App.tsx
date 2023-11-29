import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import {useAssets} from "expo-asset";
import {Ionicons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import {useCallback, useEffect, useState} from "react";
import {Image, StyleSheet, Text, View, useColorScheme} from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import RootNav from "./navigation/RootNav";
import {darkTheme, lightTheme} from "./theme";
import {ThemeProvider} from "styled-components";
import {QueryClient, QueryClientProvider} from "react-query";

export default function App() {
  const isDark = useColorScheme() === "dark";
  const [ready, setReady] = useState(false);
  const [fontLoaded] = useFonts(Ionicons.font);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready || !fontLoaded) {
    return null;
  }
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer onReady={onLayoutRootView}>
          <RootNav />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
