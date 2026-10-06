import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { calculateHatim, HatimId, HatimResult, HATIMS } from '../lib/hatim';
import { colors } from '../theme';

export default function HatimScreen() {
  const [hatimId, setHatimId] = useState<HatimId | null>(null);
  const [people, setPeople] = useState('');
  const [result, setResult] = useState<HatimResult | null>(null);

  const calculate = () => {
    Keyboard.dismiss();
    if (!hatimId) {
      setResult({ ok: false, error: 'Lütfen bir hatim seçiniz.' });
      return;
    }
    setResult(calculateHatim(hatimId, parseInt(people, 10)));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Hatim seçiniz</Text>
      <View style={styles.options}>
        {HATIMS.map(h => {
          const selected = h.id === hatimId;
          return (
            <Pressable
              key={h.id}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => {
                setHatimId(h.id);
                setResult(null);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {h.label}
              </Text>
              <Text
                style={[
                  styles.optionSub,
                  selected && styles.optionTextSelected,
                ]}
              >
                {h.total} adet
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Kişi sayısı</Text>
      <TextInput
        style={styles.input}
        placeholder="Kaç kişi olduğunu yazınız"
        placeholderTextColor="#666"
        keyboardType="number-pad"
        value={people}
        onChangeText={t => {
          setPeople(t.replace(/[^0-9]/g, ''));
          setResult(null);
        }}
        returnKeyType="done"
        onSubmitEditing={calculate}
      />

      <PrimaryButton label="Hesapla" onPress={calculate} />

      {result && (
        <View style={styles.result}>
          <Text
            style={[styles.resultText, !result.ok && { color: colors.accent }]}
          >
            {result.ok ? result.text : result.error}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 14 },
  label: { color: colors.muted, fontSize: 15, marginTop: 6 },
  options: { flexDirection: 'row', gap: 10 },
  option: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: { backgroundColor: colors.screen, borderColor: colors.text },
  optionText: { color: colors.text, fontSize: 16, fontWeight: '700' },
  optionSub: { color: colors.muted, fontSize: 13, marginTop: 2 },
  optionTextSelected: { color: colors.textDark },
  input: {
    backgroundColor: colors.screen,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 17,
    color: colors.textDark,
    marginBottom: 10,
  },
  result: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
  },
  resultText: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
  },
});
