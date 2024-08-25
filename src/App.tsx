import {
  Bar,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
  BarChart,
  CartesianGrid,
} from "recharts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AthenaLogo from "@/assets/athena-logo.png";
import { chartConfig } from "./utils/chartConfig";
import InstagramIcon from "@/assets/instagram.svg";
import { NumericFormat } from "react-number-format";
import AthenaLogoMini from "@/assets/athena-logo-mini.png";
import { useFinanceCalculator } from "./hooks/useFinanceCalculator";
import { CustomTooltip } from "./components/CustomTooltip/CustomTooltip";
import { ChartContainer, ChartLegendContent } from "@/components/ui/chart";
import { formatToFloat } from "./utils/formatToFloat";

function App() {
  const {
    entryValue,
    neededValue,
    handleSubmit,
    financingTerm,
    setEntryValue,
    collapseOpen,
    setCollapseOpen,
    chartDataTotal,
    setNeededValue,
    setFinancingTerm,
    financingInterest,
    handleInputChange,
    setFinancingInterest,
    chartDataInstallments,
  } = useFinanceCalculator();

  return (
    <>
      <header className="flex flex-1 bg-darkBlue h-12 border-b-[0.1px] border-cantaloupe-medium">
        <div className="w-max-width flex items-center px-4 mx-auto">
          <img className="h-10 flex" src={AthenaLogo} />
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-2 mt-12 max-w-96 px-4 mx-auto w-max-width max-[400px]:max-w-80"
      >
        <label className="text-white font-bold">Valor de entrada</label>
        <NumericFormat
          value={entryValue}
          customInput={Input}
          decimalScale={2}
          decimalSeparator=","
          fixedDecimalScale
          placeholder="R$ 0,00"
          prefix="R$ "
          thousandSeparator="."
          onValueChange={handleInputChange(setEntryValue)}
        />
        <label className="text-white mt-4 font-bold">Valor Necessário</label>
        <NumericFormat
          value={neededValue}
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          customInput={Input}
          decimalSeparator=","
          placeholder="R$ 0,00"
          thousandSeparator="."
          onValueChange={handleInputChange(setNeededValue)}
        />
        <label className="text-white mt-4 font-bold">
          Prazo de Financiamento (em Meses)
        </label>
        <NumericFormat
          inputMode="numeric"
          customInput={Input}
          value={financingTerm}
          onValueChange={handleInputChange(setFinancingTerm)}
        />
        <label className="text-white mt-4 font-bold">
          Juros de Financiamento por ano (%)
        </label>
        <NumericFormat
          decimalScale={2}
          fixedDecimalScale
          customInput={Input}
          decimalSeparator=","
          value={financingInterest}
          onValueChange={handleInputChange(setFinancingInterest)}
        />
        <Button
          type="submit"
          className="bg-cantaloupe-medium mt-6 w-full hover:bg-cantaloupe-dark"
        >
          Calcular Financiamento vs Consórcio
        </Button>
      </form>

      <section className="w-[1100px] max-tablet:w-[600px] max-mobile:w-[300px] items-center flex flex-col mx-auto text-center mb-16 mt-16">
        <h1 className="text-white text-3xl mb-8">Comparativo dos casos</h1>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full mobile:pr-[110px] max-mobile:mr-[100px]"
        >
          <BarChart accessibilityLayer data={chartDataTotal}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: "10px" }}
              style={{ fontSize: "14px", fill: "#fff" }}
            />
            <YAxis
              tickFormatter={formatToFloat}
              style={{ fontSize: "12px", fill: "#fff", overflow: "visible" }}
              tick={{ fontSize: "10px", overflow: "visible" }}
              allowDecimals={false}
              minTickGap={10}
              width={110}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              wrapperStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "14px",
                color: "#fff",
                marginLeft: 50,
              }}
              content={<ChartLegendContent />}
            />
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

        <h1 className="text-white text-3xl mt-16 mb-10">
          Valores das Parcelas
        </h1>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full mobile:pr-[110px] max-mobile:mr-[110px]"
        >
          <BarChart accessibilityLayer data={chartDataInstallments}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              style={{ fontSize: "14px", fill: "#fff" }}
              interval={Math.floor(chartDataInstallments.length / 2.5)}
            />
            <YAxis
              tickFormatter={formatToFloat}
              style={{ fontSize: "12px", fill: "#fff" }}
              tick={{ fontSize: "12px" }}
              allowDecimals={false}
              minTickGap={10}
              width={110}
            />
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "14px",
                color: "#fff",
                marginLeft: 50,
              }}
              content={<ChartLegendContent />}
            />
            <Bar dataKey="sac" fill="var(--color-sac)" radius={2} />
            <Bar dataKey="consorcio" fill="var(--color-consorcio)" radius={2} />
            <Bar dataKey="price" fill="var(--color-price)" radius={2} />
          </BarChart>
        </ChartContainer>
      </section>
      <section className="mt-16 mb-16 flex flex-1 max-w-96 text-white px-4 mx-auto w-max-width">
        <Collapsible
          open={collapseOpen}
          onOpenChange={setCollapseOpen}
          className="w-full space-y-4"
        >
          <div className="flex flex-1 items-center space-x-4 px-4">
            <CollapsibleTrigger asChild>
              <Button variant="secondary" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
            <h4 className="text-sm font-semibold">Metodologia e Disclaimers</h4>
          </div>
          <CollapsibleContent className="space-y-4">
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Metodologia: <br />
              <br />
              Esta ferramenta permite simular financiamentos comparando os
              modelos Price, SAC e um consórcio, todos nas mesmas condições. Com
              isso, você pode visualizar o valor total a ser pago em cada
              modalidade, além de estimar o valor das parcelas em cada sistema.
              No modelo Price, as parcelas são fixas ao longo de todo o período
              de financiamento. Já no modelo SAC, que é o Sistema de Amortização
              Constante, o valor amortizado permanece o mesmo, resultando em
              parcelas que diminuem com o tempo. No consórcio, o prazo
              considerado é de 180 meses, com uma taxa de administração de 20% e
              um fundo de reserva de 3%, aplicados uma única vez sobre o valor
              do bem. Além disso, o saldo devedor do consórcio é reajustado
              anualmente em 2%, para preservar o poder de compra da carta ao
              longo do tempo.
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Disclaimer: <br />
              <br />
              Os resultados apresentados por esta ferramenta são estimativas
              baseadas nas informações inseridas e nos modelos de cálculo de
              financiamento Price, SAC e consórcio. Embora seja feito um esforço
              para garantir a precisão dos cálculos, os valores reais podem
              diferir das condições de mercado, taxas de juros e termos
              oferecidos pelas instituições financeiras. Recomendamos que você
              consulte diretamente especialistas financeiros e instituições para
              obter cotações e condições personalizadas para a sua situação.
              Esta calculadora é apenas uma ferramenta informativa e não
              constitui aconselhamento financeiro, jurídico ou profissional. Ao
              utilizá-la, você concorda que não seremos responsáveis por
              quaisquer decisões financeiras baseadas nos resultados fornecidos.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>
      <footer>
        <div className="flex flex-1 bg-darkBlue h-12 border-t-[0.1px] border-cantaloupe-medium">
          <div className="w-max-width flex items-center px-4 mx-auto">
            <span className="text-white text-sm">
              Copyright © Athena-BGA Investimentos 2022
            </span>
            <img className="h-10 flex ml-4" src={AthenaLogoMini} />
            <a href="https://www.instagram.com/athenainvestimentos/">
              <img
                className="h-8 flex ml-4 cursor-pointer text-white mr-6"
                src={InstagramIcon}
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
