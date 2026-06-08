const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number, currency = "USD"): string {
  if (currency === "USD") {
    return USD_FORMATTER.format(amount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCurrencyUnsigned(amount: number, currency = "USD"): string {
  return formatCurrency(Math.abs(amount), currency);
}
