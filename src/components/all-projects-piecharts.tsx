import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label"

const chartData = [
  { region: "Bihar", invoices: 275, fill: "var(--chart-bihar)" },
  { region: "Delhi", invoices: 200, fill: "var(--chart-delhi)" },
  { region: "Goa", invoices: 187, fill: "var(--chart-goa)" },
  { region: "Gujarat", invoices: 173, fill: "var(--chart-gujarat)" },
  { region: "Haryana", invoices: 90, fill: "var(--chart-haryana)" },
  { region: "Jharkhand", invoices: 275, fill: "var(--chart-jharkhand)" },
  { region: "Madhya Pradesh", invoices: 200, fill: "var(--chart-madhya-pradesh)" },
  { region: "Odisha", invoices: 187, fill: "var(--chart-odisha)" },
  { region: "Port Blair", invoices: 173, fill: "var(--chart-port-blair)" },
  { region: "Rajasthan", invoices: 90, fill: "var(--chart-rajasthan)" },
  { region: "Sikkim", invoices: 275, fill: "var(--chart-sikkim)" },
  { region: "Uttar Pradesh", invoices: 200, fill: "var(--chart-uttar-pradesh)" },
  { region: "West Bengal", invoices: 187, fill: "var(--chart-west-bengal)" },
];


const chartConfig = {
  invoices: {
    label: "Invoices",
  },
  bihar: {
    label: "Bihar",
    color: "var(--chart-1)",
  },
  delhi: {
    label: "Delhi",
    color: "var(--chart-2)",
  },
  goa: {
    label: "Goa",
    color: "var(--chart-3)",
  },
  gujarat: {
    label: "Gujarat",
    color: "var(--chart-4)",
  },
  haryana: {
    label: "Haryana",
    color: "var(--chart-5)",
  },
  jharkhand: {
    label: "Jharkhand",
    color: "var(--chart-6)",
  },
  madhyaPradesh: {
    label: "Madhya Pradesh",
    color: "var(--chart-7)",
  },
  odisha: {
    label: "Odisha",
    color: "var(--chart-8)",
  },
  portBlair: {
    label: "Port Blair",
    color: "var(--chart-9)",
  },
  rajasthan: {
    label: "Rajasthan",
    color: "var(--chart-10)",
  },
  sikkim: {
    label: "Sikkim",
    color: "var(--chart-11)",
  },
  uttarPradesh: {
    label: "Uttar Pradesh",
    color: "var(--chart-12)",
  },
  westBengal: {
    label: "West Bengal",
    color: "var(--chart-13)",
  },
} satisfies ChartConfig;

export function ChartPieLabel() {
  return (
    <div className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[350px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="invoices" label nameKey="region" />
            <ChartLegend
                content={<ChartLegendContent nameKey="region" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </div>
  )
}
