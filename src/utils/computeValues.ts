interface ComputeValues {
  neededValue: number;
  financingTerm: number;
  financingInterest: number;
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
  financingTerm,
  financingInterest,
}: ComputeValues): {
  chartDataTotal: ChartDataTotal[];
  chartDataInstallments: ChartDataInstallments[];
} => {
  const administrationFeeRate = 0.23;
  const annualAdjustmentRate = 1.02;
  const consortiumTerm = 180;

  const adjustedNeededValue = neededValue;
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
    (neededValue *
      monthlyInterest *
      Math.pow(1 + monthlyInterest, financingTerm)) /
    (Math.pow(1 + monthlyInterest, financingTerm) - 1);

  const priceTotal = priceMonthly * financingTerm;

  const amortization = neededValue / financingTerm;
  let sacTotal = 0;
  const sacInstallments: number[] = [];

  // Calculate SAC installments for the entire financing term
  for (let i = 0; i < financingTerm; i++) {
    const saldoDevedor = neededValue - i * amortization;
    const parcelaSAC = amortization + saldoDevedor * monthlyInterest;
    sacInstallments.push(parcelaSAC);
    sacTotal += parcelaSAC;
  }

  // Prepare chart data for totals
  const chartDataTotal = [
    { label: "Valor do Bem", valorDoBem: neededValue },
    { label: "Consórcio", consorcio: consorcioTotal },
    { label: "Price", price: priceTotal },
    { label: "SAC", sac: sacTotal },
  ];

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
