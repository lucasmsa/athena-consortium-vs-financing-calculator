import {
  Dispatch,
  useState,
  useEffect,
  ChangeEvent,
  SetStateAction,
} from "react";
import {
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AthenaLogo from "@/assets/athena-logo.png";
import { chartConfig } from "./utils/chartConfig";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartDataInstallments,
  ChartDataTotal,
  computeValues,
} from "./utils/computeValues";

function App() {
  const [entryValue, setEntryValue] = useState(10000);
  const [neededValue, setNeededValue] = useState(100000);
  const [financingTerm, setFinancingTerm] = useState(120);
  const [financingInterest, setFinancingInterest] = useState(10);
  const [chartDataTotal, setChartDataTotal] = useState<ChartDataTotal[]>([]);
  const [chartDataInstallments, setChartDataInstallments] = useState<
    ChartDataInstallments[]
  >([]);

  useEffect(() => {
    const { chartDataTotal, chartDataInstallments } = computeValues({
      neededValue,
      financingTerm,
      financingInterest,
    });

    setChartDataTotal(chartDataTotal);
    setChartDataInstallments(chartDataInstallments);
  }, []);

  const handleInputChange =
    (setter: Dispatch<SetStateAction<number>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);

      if (!isNaN(value)) {
        setter(value);
      } else {
        setter(0);
      }
    };

  return (
    <>
      <header className="flex flex-1 bg-darkBlue h-12 border-b-[0.1px] border-cantaloupe-medium">
        <div className="w-max-width flex items-center px-4 mx-auto">
          <img className="h-10 flex" src={AthenaLogo} />
        </div>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const { chartDataTotal, chartDataInstallments } = computeValues({
            neededValue,
            financingTerm,
            financingInterest,
          });

          setChartDataTotal(chartDataTotal);
          setChartDataInstallments(chartDataInstallments);
        }}
        className="flex flex-col items-start gap-2 mt-12 max-w-96 px-4 mx-auto w-max-width max-consorcio:max-w-80"
      >
        <label className="text-white font-bold">Valor de entrada</label>
        <Input
          className="bg-dark-blue text-white"
          defaultValue={entryValue}
          value={entryValue}
          onChange={handleInputChange(setEntryValue)}
        />

        <label className="text-white mt-4 font-bold">Valor Necessário</label>
        <Input
          className="bg-dark-blue text-white"
          defaultValue={neededValue}
          value={neededValue}
          onChange={handleInputChange(setNeededValue)}
        />

        <label className="text-white mt-4 font-bold">
          Prazo de Financiamento (em Meses)
        </label>
        <Input
          className="bg-dark-blue text-white"
          defaultValue={financingTerm}
          value={financingTerm}
          onChange={handleInputChange(setFinancingTerm)}
        />

        <label className="text-white mt-4 font-bold">
          Juros de Financiamento por ano (%)
        </label>
        <Input
          value={financingInterest}
          defaultValue={financingInterest}
          className="bg-dark-blue text-white"
          onChange={handleInputChange(setFinancingInterest)}
        />

        <Button
          type={"submit"}
          className="bg-cantaloupe-medium mt-6 w-full hover:bg-cantaloupe-dark"
        >
          Calcular Financiamento vs Consórcio
        </Button>
      </form>

      <section className="w-[800px] items-center flex flex-col mx-auto mb-16 mt-12">
        <h1 className="text-white text-3xl mb-8">Comparativo dos casos</h1>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartDataTotal}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="valorDoBem"
              fill="var(--color-valorDoBem)"
              radius={2}
            />
            <Bar dataKey="consorcio" fill="var(--color-consorcio)" radius={2} />
            <Bar dataKey="price" fill="var(--color-price)" radius={2} />
            <Bar dataKey="sac" fill="var(--color-sac)" radius={2} />
          </BarChart>
        </ChartContainer>

        <h1 className="text-white text-3xl mt-12 mb-10">
          Valores das Parcelas
        </h1>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartDataInstallments}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="sac" fill="var(--color-sac)" radius={2} />
            <Bar dataKey="consorcio" fill="var(--color-consorcio)" radius={2} />
            <Bar dataKey="price" fill="var(--color-price)" radius={2} />
          </BarChart>
        </ChartContainer>
      </section>
    </>
  );
}

export default App;
