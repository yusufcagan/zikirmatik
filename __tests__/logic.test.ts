import {
  decrement,
  formatDigits,
  increment,
  MAX_COUNT,
} from '../src/lib/counter';
import { calculateHatim } from '../src/lib/hatim';

describe('sayaç', () => {
  test('0-9999 arasında kalır', () => {
    expect(increment(0)).toBe(1);
    expect(increment(MAX_COUNT)).toBe(MAX_COUNT);
    expect(decrement(0)).toBe(0);
    expect(decrement(1000)).toBe(999);
  });

  test('dijital ekran biçimi', () => {
    expect(formatDigits(12)).toBe('0 0 1 2');
    expect(formatDigits(9999)).toBe('9 9 9 9');
  });
});

describe('hatim hesaplama', () => {
  test('eski uygulamayla aynı dağılım', () => {
    // 313 / 10 = 31 kalan 3 → 3 kişi 32, 7 kişi 31
    expect(calculateHatim('ayetel-kursi', 10)).toEqual({
      ok: true,
      text: '3 kişi 32, geriye kalanlar 31 okuyacak.',
    });
    // 41 / 6 = 6 kalan 5 → 1 kişi 6, kalanlar 7
    expect(calculateHatim('yasin', 6)).toEqual({
      ok: true,
      text: '1 kişi 6, geriye kalanlar 7 okuyacak.',
    });
    expect(calculateHatim('ihlas', 20)).toEqual({
      ok: true,
      text: 'Herkes 5 okuyacak.',
    });
    expect(calculateHatim('ihlas', 35)).toEqual({
      ok: true,
      text: "Herkes 3'er okuyacak.",
    });
  });

  test('sınır durumları', () => {
    expect(calculateHatim('yasin', 0).ok).toBe(false);
    expect(calculateHatim('yasin', NaN).ok).toBe(false);
    expect(calculateHatim('yasin', 50)).toEqual({
      ok: true,
      text: '41 kişi 1 okuyacak, geriye kalan 9 kişiye düşmüyor.',
    });
  });
});
