// Sayaç 4 haneli bir zikirmatik ekranını taklit eder: 0000 - 9999.
export const MAX_COUNT = 9999;

export function clampCount(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(Math.max(Math.trunc(n), 0), MAX_COUNT);
}

export function increment(n: number): number {
  return clampCount(n + 1);
}

export function decrement(n: number): number {
  return clampCount(n - 1);
}

/** 12 -> "0 0 1 2" (eski uygulamadaki dijital ekran görünümü) */
export function formatDigits(n: number): string {
  return String(clampCount(n)).padStart(4, '0').split('').join(' ');
}
