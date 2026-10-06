import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { clampCount } from '../lib/counter';
import { colors } from '../theme';

interface Props {
  visible: boolean;
  title: string;
  submitLabel: string;
  initialName?: string;
  /** Verilirse sayı alanı da gösterilir (düzenleme modu). */
  initialCount?: number;
  onClose: () => void;
  onSubmit: (name: string, count: number) => void;
}

export function ZikirFormModal({
  visible,
  title,
  submitLabel,
  initialName = '',
  initialCount,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initialName);
  const [count, setCount] = useState(String(initialCount ?? 0));
  const [error, setError] = useState('');
  const showCount = initialCount !== undefined;

  useEffect(() => {
    if (visible) {
      setName(initialName);
      setCount(String(initialCount ?? 0));
      setError('');
    }
  }, [visible, initialName, initialCount]);

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Lütfen bir zikir ismi yazınız.');
      return;
    }
    onSubmit(trimmed, clampCount(parseInt(count, 10) || 0));
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable
              onPress={onClose}
              hitSlop={10}
              accessibilityLabel="Kapat"
            >
              <Ionicons name="close" size={26} color={colors.text} />
            </Pressable>
          </View>

          <Text style={styles.label}>Zikir adı</Text>
          <TextInput
            style={styles.input}
            placeholder="Zikir adını giriniz"
            placeholderTextColor="#666"
            value={name}
            onChangeText={t => {
              setName(t);
              setError('');
            }}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={submit}
          />

          {showCount && (
            <>
              <Text style={styles.label}>Sayı</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                maxLength={4}
                value={count}
                onChangeText={t => setCount(t.replace(/[^0-9]/g, ''))}
              />
            </>
          )}

          {!!error && <Text style={styles.error}>{error}</Text>}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.7 },
            ]}
            onPress={submit}
          >
            <Text style={styles.buttonText}>{submitLabel}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: '700' },
  label: { color: colors.muted, marginTop: 12, marginBottom: 6 },
  input: {
    backgroundColor: colors.screen,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
    color: colors.textDark,
  },
  error: { color: colors.accent, marginTop: 10 },
  button: {
    backgroundColor: colors.button,
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 22,
    alignItems: 'center',
  },
  buttonText: { color: colors.text, fontSize: 18, fontWeight: '700' },
});
