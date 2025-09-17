import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

const chartData = [
  { month: "January", paid: 186, unpaid: 80 },
  { month: "February", paid: 305, unpaid: 200 },
  { month: "March", paid: 237, unpaid: 120 },
  { month: "April", paid: 73, unpaid: 190 },
  { month: "May", paid: 209, unpaid: 130 },
  { month: "June", paid: 214, unpaid: 140 },
];

const chartConfig = {
    paid: {
        label: "Paid",
        color: "var(--chart-1)",
    },
    unpaid: {
        label: "Unpaid",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartBarStacked() {
    return (
        <Card className="col-span-1 lg:col-span-1 flex flex-col">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Overview of invoice status distribution</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        {/* <ChartTooltip content={<ChartTooltipContent hideLabel />} /> */}
                        <ChartTooltip
                            content={
                            <ChartTooltipContent
                                hideLabel
                                className="w-[180px]"
                                formatter={(value, name, item, index) => (
                                <>
                                    <div
                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                                    style={
                                        {
                                        "--color-bg": `var(--color-${name})`,
                                        } as React.CSSProperties
                                    }
                                    />
                                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                                    name}
                                    <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                                    {value}
                                    {/* <span className="text-muted-foreground font-normal">
                                        kcal
                                    </span> */}
                                    </div>
                                    {/* Add this after the last item */}
                                    {index === 1 && (
                                    <div className="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                                        Total
                                        <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                                        {item.payload.paid + item.payload.unpaid}
                                        {/* <span className="text-muted-foreground font-normal">
                                            kcal
                                        </span> */}
                                        </div>
                                    </div>
                                    )}
                                </>
                                )}
                            />
                            }
                            cursor={false}
                            defaultIndex={1}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="paid"
                            stackId="a"
                            fill="var(--color-paid)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="unpaid"
                            stackId="a"
                            fill="var(--color-unpaid)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
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
