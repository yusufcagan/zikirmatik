import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet } from 'react-native';
import { useZikir } from '../store/ZikirContext';
import { colors } from '../theme';

/** Header sağındaki titreşim aç/kapa düğmesi */
export function VibrationToggle() {
  const { state, dispatch } = useZikir();
  return (
    <Pressable
      onPress={() => {
        if (!state.vibration) Haptics.notificationAsync().catch(() => {});
        dispatch({ type: 'vibration/toggle' });
      }}
      hitSlop={10}
      style={styles.button}
      accessibilityLabel={state.vibration ? 'Titreşimi kapat' : 'Titreşimi aç'}
    >
      <Ionicons
        name={state.vibration ? 'phone-portrait' : 'phone-portrait-outline'}
        size={22}
        color={state.vibration ? colors.text : colors.muted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingHorizontal: 16 },
});
