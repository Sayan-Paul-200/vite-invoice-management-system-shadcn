/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingUp } from "lucide-react";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
//   Tooltip as RechartTooltip,
//   Legend,
  Bar,
  Line,
  LabelList,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Invoices over time — invoices (bars) + amounts (lines)";

// ---------- static demo data (monthly) ----------
const chartData = [
  // month, invoices (count), total (INR), paid (INR)
  { month: "January", invoices: 42, total: 125000, paid: 82000 },
  { month: "February", invoices: 55, total: 198000, paid: 165000 },
  { month: "March", invoices: 48, total: 172500, paid: 120000 },
  { month: "April", invoices: 67, total: 240000, paid: 190000 },
  { month: "May", invoices: 80, total: 312000, paid: 260000 },
  { month: "June", invoices: 72, total: 285000, paid: 220000 },
];

const chartConfig = {
  invoices: { label: "# Invoices", color: "var(--chart-1)" },
  total: { label: "Total Amount", color: "var(--chart-2)" },
  paid: { label: "Paid Amount", color: "var(--chart-3)" },
} satisfies ChartConfig;

// ---------- helper for currency formatting in tooltip/axis ----------
const formatINR = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);

// ---------- component ----------
export function ChartInvoicesOverTimeFixed() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full gap-4">
          <div>
            <CardTitle>Invoices Over Time</CardTitle>
            <CardDescription>Monthly trend — invoice count & cashflow</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 12, right: 24, left: 12, bottom: 6 }}
          >
            <CartesianGrid vertical={false} />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => (value as string).slice(0, 3)}
            />

            {/* Left Y-axis for amounts (INR) */}
            <YAxis
              yAxisId="amount"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                typeof v === "number" && Math.abs(v) >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`
              }
            />

            {/* Right Y-axis for invoice counts */}
            <YAxis
              yAxisId="count"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}`}
            />

            {/* Tooltip + Legend using shadcn wrappers */}
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            {/* Bars: invoice counts (mapped to right axis) */}
            <Bar
              dataKey="invoices"
              name="# Invoices"
              yAxisId="count"
            //   barSize={18}
              fill="var(--color-invoices, var(--chart-1))"
              radius={[4, 4, 0, 0]}
            />

            {/* Line: Total Amount (left axis) */}
            <Line
              dataKey="total"
              name="Total Amount"
              type="monotone"
              yAxisId="amount"
              stroke="var(--color-total, var(--chart-2))"
              strokeWidth={2}
              dot={false}
            >
              <LabelList
                dataKey="total"
                position="top"
                formatter={(val: any) => formatINR(val)}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>

            {/* Line: Paid Amount (left axis) */}
            <Line
              dataKey="paid"
              name="Paid Amount"
              type="monotone"
              yAxisId="amount"
              stroke="var(--color-paid, var(--chart-3))"
              strokeWidth={2}
              dot={false}
            >
              <LabelList
                dataKey="paid"
                position="top"
                formatter={(val: any) => formatINR(val)}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </ComposedChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Trending up by 8.9% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Aggregation: monthly — # invoices (bars), total & paid amounts (lines).
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChartInvoicesOverTimeFixed;
