import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import {
  ChartDataInstallments,
  ChartDataTotal,
  computeValues,
} from "../utils/computeValues";

interface UseFinanceCalculator {
  entryValue: number;
  neededValue: number;
  financingTerm: number;
  financingInterest: number;
  chartDataTotal: ChartDataTotal[];
  chartDataInstallments: ChartDataInstallments[];
  handleInputChange: (
    setter: Dispatch<SetStateAction<number>>
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setEntryValue: Dispatch<SetStateAction<number>>;
  setNeededValue: Dispatch<SetStateAction<number>>;
  setFinancingTerm: Dispatch<SetStateAction<number>>;
  setFinancingInterest: Dispatch<SetStateAction<number>>;
}

export const useFinanceCalculator = (): UseFinanceCalculator => {
  const [entryValue, setEntryValue] = useState(10000);
  const [neededValue, setNeededValue] = useState(100000);
  const [financingTerm, setFinancingTerm] = useState(120);
  const [financingInterest, setFinancingInterest] = useState(10);
  const [chartDataTotal, setChartDataTotal] = useState<ChartDataTotal[]>([]);
  const [chartDataInstallments, setChartDataInstallments] = useState<
    ChartDataInstallments[]
  >([]);

  // Function to compute and update chart data when inputs change
  const updateChartData = () => {
    const { chartDataTotal, chartDataInstallments } = computeValues({
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
    (e: ChangeEvent<HTMLInputElement>) => {
      // Remove the "R$" prefix before validating the value
      const value = parseFloat(e.target.value.replace("R$", "").trim());

      // Validate the value and set it appropriately
      if (!isNaN(value)) {
        setter(value);
      } else {
        setter(0); // Default or fallback value if the input is invalid
      }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChartData();
  };

  return {
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
