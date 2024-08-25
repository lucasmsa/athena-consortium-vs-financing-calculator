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
  chartDataTotal: ChartDataTotal[];
  chartDataInstallments: ChartDataInstallments[];
  handleInputChange: (
    setter: Dispatch<SetStateAction<number>>
  ) => (value: NumberFormatValues) => void;
  setCollapseOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setEntryValue: Dispatch<SetStateAction<number>>;
  setNeededValue: Dispatch<SetStateAction<number>>;
  setFinancingTerm: Dispatch<SetStateAction<number>>;
  setFinancingInterest: Dispatch<SetStateAction<number>>;
}

export const useFinanceCalculator = (): UseFinanceCalculator => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [entryValue, setEntryValue] = useState(10000);
  const [neededValue, setNeededValue] = useState(100000);
  const [financingTerm, setFinancingTerm] = useState(120);
  const [financingInterest, setFinancingInterest] = useState(10);
  const [chartDataTotal, setChartDataTotal] = useState<ChartDataTotal[]>([]);
  const [chartDataInstallments, setChartDataInstallments] = useState<
    ChartDataInstallments[]
  >([]);

  const updateChartData = () => {
    const { chartDataTotal, chartDataInstallments } = computeValues({
      entryValue,
      neededValue,
      financingTerm,
      financingInterest,
    });

    setChartDataTotal(chartDataTotal);
    setChartDataInstallments(chartDataInstallments);
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
    collapseOpen,
    setCollapseOpen,
    entryValue,
    neededValue,
    financingTerm,
    financingInterest,
    chartDataTotal,
    chartDataInstallments,
    handleInputChange,
    handleSubmit,
    setEntryValue,
    setNeededValue,
    setFinancingTerm,
    setFinancingInterest,
  };
};
