import { BadgeIndianRupee, BanknoteArrowUp, ClipboardClock, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Sparkline: React.FC<{ data: number[]; width?: number; height?: number }> = ({
    data,
    width = 150,
    height = 30,
}) => {
    const padding = 2;
    if (!data || data.length === 0) {
        return (
            <svg width={width} height={height} className="block">
                <rect x={0} y={0} width={width} height={height} fill="transparent" />
            </svg>
        );
    }

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const stepX = (width - padding * 2) / (data.length - 1);
    const points = data.map((d, i) => {
        const x = padding + i * stepX;
        const y = padding + (1 - (d - min) / range) * (height - padding * 2);
        return `${x},${y}`;
    });

    // also generate an area path slightly filled for micro-visual
    const pathD =
        data.length === 1
            ? `M ${padding} ${height / 2} L ${width - padding} ${height / 2}`
            : `M ${points[0].replace(",", " ")} ${points
                .slice(1)
                .map((p) => "L " + p.replace(",", " "))
                .join(" ")}`;

    const areaD =
        data.length === 1
            ? pathD
            : `${pathD} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="block"
        >
            <path d={areaD} fill="rgba(99,102,241,0.08)" stroke="none" />
            <path d={pathD} fill="none" stroke="rgb(99,102,241)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
    );
};

// Static KPI data (last 6 points are the sparkline values — e.g., last 6 months)
const STATIC_KPIS = {
    totalInvoiced: {
        label: "Total Invoiced",
        value: 45231.89,
        changeText: "+20.1% from last month",
        spark: [12000, 15000, 18000, 21000, 37000, 45231.89],
    },
    totalNetPayable: {
        label: "Total Net Payable",
        value: 39820.5,
        changeText: "+12.6% from last month",
        spark: [9000, 10500, 14000, 16000, 32000, 39820.5],
    },
    totalCollected: {
        label: "Total Collected",
        value: 31234.0,
        changeText: "+8.3% from last month",
        spark: [8000, 9000, 12000, 15000, 26000, 31234.0],
    },
    outstanding: {
        label: "Outstanding",
        value: 8576.5,
        changeText: "-4.2% from last month",
        spark: [3000, 2800, 4000, 6000, 7500, 8576.5],
    },
    avgDaysToPayment: {
        label: "Avg Days to Payment",
        value: 12.4, // days
        changeText: "-0.8 days vs last month",
        spark: [15, 14.2, 13.5, 13.0, 12.8, 12.4],
    },
    invoiceCount: {
        label: "Invoices",
        value: 2350,
        changeText: "+180.1% from last month",
        spark: [300, 350, 420, 500, 650, 2350], // last point is cumulative or current period
        // sample status breakdown used in tooltip
        statusBreakdown: { pending: 573, paid: 12234, canceled: 12, credit_note_issued: 5 },
    },
};

// Simple INR formatter
const formatINR = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(v);

const AnalyticsKPIs: React.FC = () => {
    const s = STATIC_KPIS;

    return (
        <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {/* 1. Total Invoiced (Period) */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-md font-medium">{s.totalInvoiced.label}</CardTitle>
                            <BadgeIndianRupee className="text-secondary h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatINR(s.totalInvoiced.value)}</div>
                            <div className="mt-2">
                                <Sparkline data={s.totalInvoiced.spark} />
                            </div>
                            <p className="text-muted-foreground text-xs mt-2">{s.totalInvoiced.changeText}</p>
                        </CardContent>
                    </Card>

                    {/* 2. Total Net Payable (Period) */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-md font-medium">{s.totalNetPayable.label}</CardTitle>
                            <BadgeIndianRupee className="text-secondary h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatINR(s.totalNetPayable.value)}</div>
                            <div className="mt-2">
                                <Sparkline data={s.totalNetPayable.spark} />
                            </div>
                            <p className="text-muted-foreground text-xs mt-2">{s.totalNetPayable.changeText}</p>
                        </CardContent>
                    </Card>

                    {/* 3. Total Collected / Received */}
                    <Card className="flex flex-col justify-between bg-green-600/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-md font-medium">{s.totalCollected.label}</CardTitle>
                            <BanknoteArrowUp className="text-secondary h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatINR(s.totalCollected.value)}</div>
                            <div className="mt-2">
                                <Sparkline data={s.totalCollected.spark} />
                            </div>
                            <p className="text-muted-foreground text-xs mt-2">{s.totalCollected.changeText}</p>
                        </CardContent>
                    </Card>

                    {/* 4. Outstanding */}
                    <Card className={s.outstanding.value > 0 ? "flex flex-col justify-between bg-destructive/10" : "flex flex-col justify-between"}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-md font-medium">{s.outstanding.label}</CardTitle>
                            <ClipboardClock className="text-secondary h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatINR(s.outstanding.value)}</div>
                            <div className="mt-2">
                                <Sparkline data={s.outstanding.spark} />
                            </div>
                            <p className="text-muted-foreground text-xs mt-2">{s.outstanding.changeText}</p>
                        </CardContent>
                    </Card>

                    {/* 5. Avg Days to Payment */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-md font-medium">{s.avgDaysToPayment.label}</CardTitle>
                            <ReceiptText className="text-secondary h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{`${s.avgDaysToPayment.value.toFixed(1)} days`}</div>
                            <div className="mt-2">
                                <Sparkline data={s.avgDaysToPayment.spark} />
                            </div>
                            <p className="text-muted-foreground text-xs mt-2">{s.avgDaysToPayment.changeText}</p>
                        </CardContent>
                    </Card>

                    {/* 6. # Invoices */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-md font-medium">{s.invoiceCount.label}</CardTitle>
                            <ReceiptText className="text-secondary h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div
                                className="text-2xl font-bold"
                                title={
                                    `Status breakdown:\n` +
                                    Object.entries(s.invoiceCount.statusBreakdown)
                                        .map(([k, v]) => `${k}: ${v}`)
                                        .join("\n")
                                }
                            >
                                {s.invoiceCount.value}
                            </div>
                            <div className="mt-2">
                                <Sparkline data={s.invoiceCount.spark} />
                            </div>
                            <p className="text-muted-foreground text-xs mt-2">{s.invoiceCount.changeText}</p>
                        </CardContent>
                    </Card>
                </div>
        </>
    )
}

export default AnalyticsKPIs