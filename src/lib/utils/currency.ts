export function formatCurrency(amount: number, currency = 'TRY', locale = 'tr-TR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number, locale = 'tr-TR'): string {
  return new Intl.NumberFormat(locale).format(n);
}
