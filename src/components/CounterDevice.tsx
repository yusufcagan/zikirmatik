import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { formatDigits } from '../lib/counter';
import { colors, DIGITAL_FONT } from '../theme';

interface Props {
  count: number;
  vibration: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

function confirmReset(onReset: () => void) {
  Alert.alert('Uyarı', 'Sayacı sıfırlamak istediğinizden emin misiniz?', [
    { text: 'Hayır', style: 'cancel' },
    { text: 'Evet, sıfırla', style: 'destructive', onPress: onReset },
  ]);
}

export function CounterDevice({
  count,
  vibration,
  onIncrement,
  onDecrement,
  onReset,
}: Props) {
  const tap = () => {
    onIncrement();
    if (vibration)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  };

  return (
    <View style={styles.device}>
      <View style={styles.screen}>
        <Text style={styles.digits} accessibilityLabel={`Sayaç ${count}`}>
          {formatDigits(count)}
        </Text>
      </View>

      <View style={styles.smallRow}>
        <Pressable
          style={({ pressed }) => [
            styles.small,
            { backgroundColor: colors.undo },
            pressed && styles.pressed,
          ]}
          onPress={onDecrement}
          accessibilityLabel="Geri al"
          hitSlop={8}
        >
          <Ionicons name="arrow-undo" size={18} color={colors.textDark} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.small,
            { backgroundColor: colors.reset },
            pressed && styles.pressed,
          ]}
          onPress={() => confirmReset(onReset)}
          accessibilityLabel="Sıfırla"
          hitSlop={8}
        >
          <Ionicons name="refresh" size={18} color={colors.text} />
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.countButton,
          pressed && styles.countPressed,
        ]}
        onPress={tap}
        accessibilityLabel="Say"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  device: {
    alignSelf: 'center',
    width: 270,
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: colors.device,
    borderRadius: 135,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    borderWidth: 6,
    borderColor: colors.deviceEdge,
  },
  screen: {
    width: 190,
    height: 72,
    backgroundColor: colors.screen,
    borderRadius: 16,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.deviceEdge,
  },
  digits: {
    fontFamily: DIGITAL_FONT,
    fontSize: 54,
    textAlign: 'center',
    color: colors.textDark,
  },
  smallRow: {
    width: 190,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  small: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
  countButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginTop: 18,
    backgroundColor: colors.countButton,
    borderWidth: 4,
    borderColor: colors.deviceEdge,
  },
  countPressed: { transform: [{ scale: 0.96 }], backgroundColor: '#2E2E2E' },
});
