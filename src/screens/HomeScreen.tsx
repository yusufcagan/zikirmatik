import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CounterDevice } from '../components/CounterDevice';
import { PrimaryButton } from '../components/PrimaryButton';
import { ZikirFormModal } from '../components/ZikirFormModal';
import { useZikir } from '../store/ZikirContext';

export default function HomeScreen() {
  const { state, dispatch } = useZikir();
  const [saving, setSaving] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <CounterDevice
        count={state.draftCount}
        vibration={state.vibration}
        onIncrement={() => dispatch({ type: 'draft/increment' })}
        onDecrement={() => dispatch({ type: 'draft/decrement' })}
        onReset={() => dispatch({ type: 'draft/reset' })}
      />
      <PrimaryButton label="KAYDET" onPress={() => setSaving(true)} />

      <ZikirFormModal
        visible={saving}
        title="Zikri kaydet"
        submitLabel="Ekle"
        onClose={() => setSaving(false)}
        onSubmit={name => {
          dispatch({ type: 'draft/save', name });
          setSaving(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingVertical: 32, gap: 32 },
});
