export const parseCurrency = (value: string): number => {
  if (!value) return 0;

  const numericValue = parseFloat(
    value.replace(/[^\d,]/g, "").replace(",", ".")
  );
  return isNaN(numericValue) ? 0 : numericValue;
};

export const currencyFormatter = (value: number) => {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  return `${amount}`;
};
