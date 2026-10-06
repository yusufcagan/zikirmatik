export type HatimId = 'ayetel-kursi' | 'yasin' | 'ihlas';

export interface HatimType {
  id: HatimId;
  label: string;
  /** Bir hatim için okunması gereken toplam adet */
  total: number;
}

export const HATIMS: HatimType[] = [
  { id: 'ayetel-kursi', label: 'Ayetel Kürsi', total: 313 },
  { id: 'yasin', label: 'Yasin', total: 41 },
  { id: 'ihlas', label: 'İhlas', total: 100 },
];

/** İhlas'ta kişi sayısı bu değeri aşınca herkes 3'er okur (eski uygulamadaki kural). */
const IHLAS_THREE_EACH_THRESHOLD = 34;

export type HatimResult =
  | { ok: true; text: string }
  | { ok: false; error: string };

/**
 * Toplam okumayı kişilere olabildiğince eşit dağıtır:
 * q = taban(toplam / kişi), r = toplam % kişi → r kişi q+1, kalan (kişi-r) kişi q okur.
 * Mesaj, eski uygulamadaki gibi küçük grubu önce yazar.
 */
export function calculateHatim(hatimId: HatimId, people: number): HatimResult {
  const hatim = HATIMS.find(h => h.id === hatimId);
  if (!hatim) return { ok: false, error: 'Lütfen bir hatim seçiniz.' };
  if (!Number.isInteger(people) || people < 1) {
    return { ok: false, error: 'Lütfen geçerli bir kişi sayısı giriniz.' };
  }

  if (hatim.id === 'ihlas' && people > IHLAS_THREE_EACH_THRESHOLD) {
    return { ok: true, text: "Herkes 3'er okuyacak." };
  }

  const total = hatim.total;
  const q = Math.floor(total / people);
  const r = total % people;

  if (q === 0) {
    return {
      ok: true,
      text: `${total} kişi 1 okuyacak, geriye kalan ${
        people - total
      } kişiye düşmüyor.`,
    };
  }
  if (r === 0) {
    return { ok: true, text: `Herkes ${q} okuyacak.` };
  }
  if (r > people - r) {
    return {
      ok: true,
      text: `${people - r} kişi ${q}, geriye kalanlar ${q + 1} okuyacak.`,
    };
  }
  return {
    ok: true,
    text: `${r} kişi ${q + 1}, geriye kalanlar ${q} okuyacak.`,
  };
}
