import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  ChartDataInstallments,
  ChartDataTotal,
  computeValues,
} from "../utils/computeValues";
import { NumberFormatValues } from "react-number-format";

interface UseFinanceCalculator {
  entryValue: number;
  neededValue: number;
  collapseOpen: boolean;
  financingTerm: number;
  financingInterest: number;
  annualAdjustmentRate: number;
  administrationFeeRate: number;
  chartDataTotal: ChartDataTotal[];
  methodologyAnnualAdjustmentRate: number;
  methodologyAdministrationFeeRate: number;
  handleInputChange: (
    setter: Dispatch<SetStateAction<number>>
  ) => (value: NumberFormatValues) => void;
  chartDataInstallments: ChartDataInstallments[];
  setCollapseOpen: Dispatch<SetStateAction<boolean>>;
  setEntryValue: Dispatch<SetStateAction<number>>;
  setNeededValue: Dispatch<SetStateAction<number>>;
  setFinancingTerm: Dispatch<SetStateAction<number>>;
  setFinancingInterest: Dispatch<SetStateAction<number>>;
  setAnnualAdjustmentRate: Dispatch<SetStateAction<number>>;
  setAdministrationFeeRate: Dispatch<SetStateAction<number>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const useFinanceCalculator = (): UseFinanceCalculator => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [entryValue, setEntryValue] = useState(10000);
  const [neededValue, setNeededValue] = useState(100000);
  const [financingTerm, setFinancingTerm] = useState(120);
  const [financingInterest, setFinancingInterest] = useState(10);
  const [annualAdjustmentRate, setAnnualAdjustmentRate] = useState(1.02);
  const [administrationFeeRate, setAdministrationFeeRate] = useState(0.2);
  const [chartDataTotal, setChartDataTotal] = useState<ChartDataTotal[]>([]);
  const [methodologyAnnualAdjustmentRate, setMethodologyAnnualAdjustmentRate] =
    useState(annualAdjustmentRate);
  const [
    methodologyAdministrationFeeRate,
    setMethodologyAdministrationFeeRate,
  ] = useState(administrationFeeRate);
  const [chartDataInstallments, setChartDataInstallments] = useState<
    ChartDataInstallments[]
  >([]);

  const updateChartData = () => {
    const { chartDataTotal, chartDataInstallments } = computeValues({
      entryValue,
      neededValue,
      financingTerm,
      financingInterest,
      annualAdjustmentRate,
      administrationFeeRate,
    });

    setChartDataTotal(chartDataTotal);
    setChartDataInstallments(chartDataInstallments);
    setMethodologyAnnualAdjustmentRate(annualAdjustmentRate);
    setMethodologyAdministrationFeeRate(administrationFeeRate);
  };

  useEffect(() => {
    updateChartData();
  }, []);

  const handleInputChange =
    (setter: Dispatch<SetStateAction<number>>) =>
    (value: NumberFormatValues) => {
      const { floatValue } = value;

      setter(floatValue || 0.0);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChartData();
  };

  return {
    entryValue,
    neededValue,
    handleSubmit,
    collapseOpen,
    financingTerm,
    setEntryValue,
    chartDataTotal,
    setNeededValue,
    setCollapseOpen,
    setFinancingTerm,
    handleInputChange,
    financingInterest,
    setFinancingInterest,
    annualAdjustmentRate,
    chartDataInstallments,
    administrationFeeRate,
    setAnnualAdjustmentRate,
    setAdministrationFeeRate,
    methodologyAnnualAdjustmentRate,
    methodologyAdministrationFeeRate,
  };
};
