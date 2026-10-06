import Ionicons from '@expo/vector-icons/Ionicons';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { useZikir, ZikirProvider } from './src/store/ZikirContext';
import { colors, DIGITAL_FONT } from './src/theme';

const navTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    primary: colors.text,
    border: 'transparent',
  },
};

function Root() {
  const { loaded } = useZikir();
  const [fontsLoaded] = useFonts({
    [DIGITAL_FONT]: require('./assets/fonts/digital-7.ttf'),
    ...Ionicons.font,
  });
  if (!loaded || !fontsLoaded) return null;

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <ZikirProvider>
          <Root />
        </ZikirProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
});
