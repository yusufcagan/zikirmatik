import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VibrationToggle } from '../components/VibrationToggle';
import HatimScreen from '../screens/HatimScreen';
import HomeScreen from '../screens/HomeScreen';
import ZikirDetailScreen from '../screens/ZikirDetailScreen';
import ZikirListScreen from '../screens/ZikirListScreen';
import { colors, screenHeader } from '../theme';
import type { DrawerParamList, ZikirStackParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<ZikirStackParamList>();

const renderDrawerToggle = () => <DrawerToggleButton tintColor={colors.text} />;
const renderVibrationToggle = () => <VibrationToggle />;

function ZikirStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenHeader,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="ZikirList"
        component={ZikirListScreen}
        options={{
          title: 'Zikirlerim',
          headerLeft: renderDrawerToggle,
        }}
      />
      <Stack.Screen
        name="ZikirDetail"
        component={ZikirDetailScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...screenHeader,
        drawerType: 'slide',
        drawerStyle: { backgroundColor: colors.card },
        drawerActiveTintColor: colors.text,
        drawerInactiveTintColor: colors.muted,
        drawerActiveBackgroundColor: colors.button,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Anasayfa', headerRight: renderVibrationToggle }}
      />
      <Drawer.Screen
        name="Zikirler"
        component={ZikirStack}
        options={{ title: 'Zikirlerim', headerShown: false }}
      />
      <Drawer.Screen
        name="Hatim"
        component={HatimScreen}
        options={{ title: 'Hatim Hesaplama' }}
      />
    </Drawer.Navigator>
  );
}
