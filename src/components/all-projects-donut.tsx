import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrendingUp } from "lucide-react"

export const description = "Interactive donut chart - invoice statuses"

const chartData = [
  { status: "Pending", invoices: 186, fill: "var(--color-pending)" },
  { status: "Paid", invoices: 305, fill: "var(--color-paid)" },
  { status: "Cancel", invoices: 237, fill: "var(--color-cancel)" },
  { status: "Credit Note Issued", invoices: 173, fill: "var(--color-credit-note-issued)" },
]

const chartConfig = {
  invoices: {
    label: "Invoices",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-1)",
  },
  paid: {
    label: "Paid",
    color: "var(--chart-2)",
  },
  cancel: {
    label: "Cancel",
    color: "var(--chart-3)",
  },
  creditNoteIssued: {
    label: "Credit Note Issued",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

// Helper: convert a human label like "Credit Note Issued" to camelCase key 'creditNoteIssued'
const toKey = (label: string) =>
  label
    .trim()
    .split(/\s+/)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join("")

export default function ChartPieInvoices() {
  const id = "pie-invoices"
  const [activeStatus, setActiveStatus] = React.useState(chartData[0].status)

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.status === activeStatus),
    [activeStatus]
  )

  const statuses = React.useMemo(() => chartData.map((item) => item.status), [])

  return (
    <Card data-chart={id} className="col-span-1 lg:col-span-1 flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Invoice Statuses</CardTitle>
          <CardDescription>Overview of invoice status distribution</CardDescription>
        </div>

        <Select value={activeStatus} onValueChange={setActiveStatus}>
          <SelectTrigger
            className="ml-auto h-7 w-[150px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {statuses.map((label) => {
              const key = toKey(label) as keyof typeof chartConfig
              const config = chartConfig[key]

              if (!config) return null

              return (
                <SelectItem key={label} value={label} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{ backgroundColor: `var(--color-${toKey(config.label)})` }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-sm">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <Pie
              data={chartData}
              dataKey="invoices"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const index = activeIndex >= 0 ? activeIndex : 0
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {chartData[index].invoices.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Invoices
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
          </div>
      </CardFooter>
    </Card>
  )
}
