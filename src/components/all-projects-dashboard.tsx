import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeIndianRupee, BanknoteArrowUp, ClipboardClock, ReceiptText } from "lucide-react"
import { ChartBarStacked } from "./all-projects-barcharts"
import { ChartPieInteractive } from "./all-projects-donut"

const AllProjects = () => {
    return (
        <>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                        <CardTitle className='text-md font-medium'>
                            Total Invoices Amount
                        </CardTitle>
                        <BadgeIndianRupee className='text-secondary h-4 w-4' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>₹45,231.89</div>
                        <p className='text-muted-foreground text-xs'>
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                        <CardTitle className='text-md font-medium'>
                            Total Invoices
                        </CardTitle>
                        <ReceiptText className='text-secondary h-4 w-4' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>+2350</div>
                        <p className='text-muted-foreground text-xs'>
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-green-600/20">
                    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                        <CardTitle className='text-md font-medium'>
                            Paid Invoices
                        </CardTitle>
                        <BanknoteArrowUp className='text-secondary h-4 w-4' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>+12,234</div>
                        <p className='text-muted-foreground text-xs'>
                            +19 from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-destructive/10">
                    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                        <CardTitle className='text-md font-medium'>
                            Pending Invoices
                        </CardTitle>
                        <ClipboardClock className="text-secondary h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>+573</div>
                        <p className='text-muted-foreground text-xs'>
                            -13 from last month
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                <Card className='col-span-1 lg:col-span-4'>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className='ps-2'>
                        <ChartBarStacked />
                    </CardContent>
                </Card>
                <Card className='col-span-1 lg:col-span-3'>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* <ChartPieLabel /> */}
                        <ChartPieInteractive />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AllProjects