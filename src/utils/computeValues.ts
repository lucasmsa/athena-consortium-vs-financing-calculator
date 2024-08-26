interface ComputeValues {
  neededValue: number; // This represents the total value of the property.
  entryValue: number; // This represents the initial entry payment.
  financingTerm: number;
  financingInterest: number;
  annualAdjustmentRate: number;
  administrationFeeRate: number;
}

export interface ChartDataTotal {
  sac?: number;
  label: string;
  price?: number;
  consorcio?: number;
  valorDoBem?: number;
}

export interface ChartDataInstallments {
  sac: number;
  month: string;
  price: number;
  consorcio: number;
}

export const computeValues = ({
  neededValue,
  entryValue,
  financingTerm,
  financingInterest,
  annualAdjustmentRate,
  administrationFeeRate,
}: ComputeValues): {
  chartDataTotal: ChartDataTotal[];
  chartDataInstallments: ChartDataInstallments[];
} => {
  const consortiumTerm = 180;

  // Subtract the entry value from the needed value to get the financed value.
  const financedValue = neededValue - entryValue;
  const adjustedNeededValue = financedValue; // This is the value you are financing.
  const administrationFee = neededValue * administrationFeeRate;
  let remainingDebt = adjustedNeededValue;
  let remainingAdminDebt = administrationFee;

  const monthlyConsortiumInstallments: number[] = [];
  let consorcioTotal = 0;

  // Calculate consortium installments with adjustments
  for (let i = 0; i < consortiumTerm; i++) {
    if (i % 12 === 0 && i !== 0) {
      remainingDebt *= annualAdjustmentRate;
      remainingAdminDebt *= annualAdjustmentRate;
    }

    const parcelaMensalImovel = remainingDebt / (consortiumTerm - i);
    const parcelaMensalAdmin = remainingAdminDebt / (consortiumTerm - i);

    const parcelaMensal = parcelaMensalImovel + parcelaMensalAdmin;

    monthlyConsortiumInstallments.push(parcelaMensal);
    consorcioTotal += parcelaMensal;

    remainingDebt -= parcelaMensalImovel;
    remainingAdminDebt -= parcelaMensalAdmin;
  }

  // After consortiumTerm, consortium payments are 0
  for (let i = consortiumTerm; i < financingTerm; i++) {
    monthlyConsortiumInstallments.push(0); // No more consortium payments
  }

  const monthlyInterest = financingInterest / 100 / 12;
  const priceMonthly =
    (financedValue *
      monthlyInterest *
      Math.pow(1 + monthlyInterest, financingTerm)) /
    (Math.pow(1 + monthlyInterest, financingTerm) - 1);

  const priceTotal = priceMonthly * financingTerm;

  const amortization = financedValue / financingTerm;
  let sacTotal = 0;
  const sacInstallments: number[] = [];

  // Calculate SAC installments for the entire financing term
  for (let i = 0; i < financingTerm; i++) {
    const saldoDevedor = financedValue - i * amortization;
    const parcelaSAC = amortization + saldoDevedor * monthlyInterest;
    sacInstallments.push(parcelaSAC);
    sacTotal += parcelaSAC;
  }

  // Prepare chart data for totals
  let chartDataTotal = [
    { label: "Valor do Bem", valorDoBem: neededValue },
    { label: "Consórcio", consorcio: consorcioTotal + entryValue },
    { label: "Price", price: priceTotal + entryValue },
    { label: "SAC", sac: sacTotal + entryValue },
  ];

  chartDataTotal = chartDataTotal.filter(
    (item) =>
      (item.valorDoBem === undefined || item.valorDoBem >= 0) &&
      (item.consorcio === undefined || item.consorcio >= 0) &&
      (item.price === undefined || item.price >= 0) &&
      (item.sac === undefined || item.sac >= 0)
  );

  // Create chart data for installments
  const chartDataInstallments = Array.from(
    { length: financingTerm },
    (_, i) => ({
      parcela: i + 1,
      price: priceMonthly,
      month: `Parcela ${i + 1}`,
      sac: sacInstallments[i] || 0,
      consorcio: monthlyConsortiumInstallments[i] || 0,
    })
  );

  return {
    chartDataTotal,
    chartDataInstallments,
  };
};
