import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CounterDevice } from '../components/CounterDevice';
import { VibrationToggle } from '../components/VibrationToggle';
import { ZikirFormModal } from '../components/ZikirFormModal';
import type { ZikirStackParamList } from '../navigation/types';
import { useZikir } from '../store/ZikirContext';
import { colors } from '../theme';

type Props = NativeStackScreenProps<ZikirStackParamList, 'ZikirDetail'>;

function HeaderActions({ onEdit }: { onEdit: () => void }) {
  return (
    <View style={styles.headerActions}>
      <Pressable onPress={onEdit} hitSlop={10} accessibilityLabel="Düzenle">
        <Ionicons name="create-outline" size={24} color={colors.text} />
      </Pressable>
      <VibrationToggle />
    </View>
  );
}

export default function ZikirDetailScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const { state, dispatch } = useZikir();
  const zikir = state.zikirs.find(z => z.id === id);
  const [editing, setEditing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: zikir?.name ?? 'Bulunamadı',
      headerRight: zikir
        ? () => <HeaderActions onEdit={() => setEditing(true)} />
        : undefined,
    });
  }, [navigation, zikir]);

  if (!zikir) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Bu zikir bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <CounterDevice
        count={zikir.count}
        vibration={state.vibration}
        onIncrement={() => dispatch({ type: 'zikir/increment', id })}
        onDecrement={() => dispatch({ type: 'zikir/decrement', id })}
        onReset={() =>
          dispatch({ type: 'zikir/update', id, name: zikir.name, count: 0 })
        }
      />

      <ZikirFormModal
        visible={editing}
        title="Zikri düzenle"
        submitLabel="Kaydet"
        initialName={zikir.name}
        initialCount={zikir.count}
        onClose={() => setEditing(false)}
        onSubmit={(name, count) => {
          dispatch({ type: 'zikir/update', id, name, count });
          setEditing(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingVertical: 32 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  missing: { padding: 24 },
  missingText: { color: colors.text, fontSize: 17 },
});
