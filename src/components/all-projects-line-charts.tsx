/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Line,
  // LabelList,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export const description = "Interactive invoices chart — range + toggles";

// ---------- static demo data (monthly) ----------
const chartData = [
  // month, invoices (count), total (INR), paid (INR)
  { month: "Jan 2025", invoices: 42, total: 125000, paid: 52000 },
  { month: "Feb 2025", invoices: 55, total: 198000, paid: 115000 },
  { month: "Mar 2025", invoices: 48, total: 172500, paid: 120000 },
  { month: "Apr 2025", invoices: 67, total: 240000, paid: 105000 },
  { month: "May 2025", invoices: 80, total: 312000, paid: 260000 },
  { month: "Jun 2025", invoices: 72, total: 285000, paid: 220000 },
];

const chartConfig = {
  invoices: { label: "# Invoices", color: "var(--chart-5)" },
  total: { label: "Total Amount", color: "var(--primary)" },
  paid: { label: "Paid Amount", color: "var(--secondary)" },
} satisfies ChartConfig;

// ---------- helpers ----------
const formatINR = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);

// map range keys to number of points to show (months)
const RANGE_TO_POINTS: Record<string, number> = {
  "6m": 6,
  "3m": 3,
  "1m": 1,
};

// ---------- component ----------
export function ChartInvoicesOverTimeInteractive() {
  const [range, setRange] = React.useState<"6m" | "3m" | "1m">("6m");
  const [visible, setVisible] = React.useState({
    invoices: true,
    total: true,
    paid: true,
  });

  // compute filtered data (last N points)
  const filteredData = React.useMemo(() => {
    const points = RANGE_TO_POINTS[range] ?? chartData.length;
    return chartData.slice(Math.max(0, chartData.length - points));
  }, [range]);

  const toggle = (key: "invoices" | "total" | "paid") =>
    setVisible((s) => ({ ...s, [key]: !s[key] }));

  return (
    <Card className="col-span-1 lg:col-span-1 flex flex-col pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Invoices Over Time</CardTitle>
          <CardDescription>Monthly trend — invoice count & cashflow</CardDescription>
        </div>

        {/* Range selector */}
        <Select value={range} onValueChange={(v) => setRange(v as any)}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select range"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="6m" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="3m" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="1m" className="rounded-lg">
              Last 1 month
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 sm:px-4">
        {/* small toggles for series visibility */}
        <div className="mb-3 flex flex-wrap justify-center items-center gap-2">
          <Button
            variant={visible.invoices ? "outline" : "ghost"}
            onClick={() => toggle("invoices")}
            aria-pressed={visible.invoices}
            className={`${
              visible.invoices
                ? "bg-secondary border-secondary"
                : ""
            }`}
          >
            {/* small legend color box */}
            <span
              className="inline-block h-2 w-4 shrink-0 rounded-xs"
              style={{ background: "var(--chart-5)" }}
            />
            # Invoices
          </Button>

          <Button
            variant={visible.total ? "outline" : "ghost"}
            onClick={() => toggle("total")}
            aria-pressed={visible.total}
            className={`${
              visible.total
                ? "bg-secondary border-secondary"
                : ""
            }`}
          >
            <span
              className="inline-block h-2 w-4 shrink-0 rounded-sm"
              style={{ background: "var(--primary)" }}
            />
            Total Amount
          </Button>

          <Button
            variant={visible.paid ? "outline" : "ghost"}
            onClick={() => toggle("paid")}
            aria-pressed={visible.paid}
            className={`${
              visible.paid
                ? "bg-secondary border-secondary"
                : ""
            }`}
          >
            <span
              className="inline-block h-2 w-4 shrink-0 rounded-sm"
              style={{ background: "var(--secondary)" }}
            />
            Paid Amount
          </Button>
        </div>

        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <ComposedChart
            accessibilityLayer
            data={filteredData}
            margin={{ top: 12, bottom: 6 }}
          >
            <CartesianGrid vertical={false} />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => (v as string).slice(0, 3)}
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

            {/* Tooltip + Legend (ChartLegend kept for visual parity) */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[200px]"
                  indicator="dot"
                  labelFormatter={(value: any) => {
                    // show full month label in tooltip
                    return value;
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />

            {/* Bars: invoice counts (mapped to right axis) */}
            {visible.invoices && (
              <Bar
                dataKey="invoices"
                name="# Invoices"
                yAxisId="count"
                // barSize={18}
                fill="var(--chart-5)"
                radius={[4, 4, 0, 0]}
              />
            )}

            {/* Line: Total Amount (left axis) */}
            {visible.total && (
              <Line
                dataKey="total"
                name="Total Amount"
                type="monotone"
                yAxisId="amount"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={true}
                activeDot={{ r: 6 }}
              >
                {/* <LabelList
                  dataKey="total"
                  position="top"
                  formatter={(val: any) => formatINR(val)}
                  className="fill-foreground"
                  fontSize={8}
                /> */}
              </Line>
            )}

            {/* Line: Paid Amount (left axis) */}
            {visible.paid && (
              <Line
                dataKey="paid"
                name="Paid Amount"
                type="monotone"
                yAxisId="amount"
                stroke="var(--secondary)"
                strokeWidth={2}
                dot={true}
                activeDot={{ r: 6 }}
              >
                {/* <LabelList
                  dataKey="paid"
                  position="top"
                  formatter={(val: any) => formatINR(val)}
                  className="fill-foreground"
                  fontSize={12}
                /> */}
              </Line>
            )}
          </ComposedChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Trending up by 8.9% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Aggregation: monthly — # invoices (bars), total & paid amounts (lines). Use the toggles to hide/show series.
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChartInvoicesOverTimeInteractive;
