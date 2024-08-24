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
  // Consortium: administration fee of 23% + annual readjustment of 2%
  const consortiumTotal =
    neededValue * 1.23 * Math.pow(1.02, financingTerm / 12);

  // Price Financing: constant installments
  const monthlyInterest = financingInterest / 100 / 12;
  const priceMonthly =
    (neededValue *
      monthlyInterest *
      Math.pow(1 + monthlyInterest, financingTerm)) /
    (Math.pow(1 + monthlyInterest, financingTerm) - 1);

  const priceTotal = priceMonthly * financingTerm;

  // SAC financing: decreasing installments
  const amortizacao = neededValue / financingTerm;

  let sacTotal = 0;
  const sacInstallments: number[] = [];

  // Compute SAC Installments
  for (let i = 0; i < financingTerm; i++) {
    const saldoDevedor = neededValue - i * amortizacao;
    const parcelaSAC = amortizacao + saldoDevedor * monthlyInterest;
    sacInstallments.push(parcelaSAC);
    sacTotal += parcelaSAC;
  }

  // Data for the totals chart
  const chartDataTotal = [
    { label: "Valor do Bem", valorDoBem: neededValue },
    { label: "Consórcio", consorcio: consortiumTotal },
    { label: "Price", price: priceTotal },
    { label: "SAC", sac: sacTotal },
  ];

  // Compute installments of consortium and Price
  const chartDataInstallments = Array.from(
    { length: financingTerm },
    (_, i) => ({
      month: `Parcela ${i + 1}`,
      sac: sacInstallments[i],
      consorcio: consortiumTotal / financingTerm,
      price: priceMonthly,
    })
  );

  return {
    chartDataTotal,
    chartDataInstallments,
  };
};
