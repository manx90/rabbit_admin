"use client"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { Day: "Saturday", desktop: 186, mobile: 80 },
  { Day: "Sunday", desktop: 305, mobile: 200 },
  { Day: "Monday", desktop: 237, mobile: 120 },
  { Day: "Tuesday", desktop: 73, mobile: 190 },
  { Day: "Wednesday", desktop: 209, mobile: 130 },
  { Day: "Thursday", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "blue",
  },
  mobile: {
    label: "Mobile",
    color: "red",
  },
} satisfies ChartConfig

export default function ComponentChart({ Title, Count, Percentage, IconPrice }: { Title: string; Count: number; Percentage: string; IconPrice: Boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle><span className="font-poppins text-3xl">{Title}</span></CardTitle>
        <CardDescription>
          <div className="flex gap-1.5 ">
            <span className="flex gap-1 font-poppins text-2xl text-black">{Count}
              {IconPrice &&
                <svg xmlns="http://www.w3.org/2000/svg" className="my-auto" width="13" height="12" viewBox="0 0 13 12" fill="none">
                  <g clipPath="url(#clip0_2207_1666)">
                    <path
                      d="M10.7888 10.2796V1.01945C10.7779 0.892244 10.7779 0.764345 10.7888 0.637144C10.8324 0.433787 10.9529 0.255116 11.1252 0.138384C11.2975 0.0216518 11.5082 -0.0241252 11.7135 0.0105989C11.9101 0.0158213 12.0975 0.0955084 12.2376 0.233518C12.3777 0.371527 12.4601 0.557548 12.4681 0.753959C12.4734 0.838832 12.4734 0.923958 12.4681 1.00883V10.9911C12.4734 11.0725 12.4734 11.1541 12.4681 11.2354C12.4681 11.3344 12.4486 11.4324 12.4107 11.5239C12.3727 11.6154 12.3172 11.6985 12.2471 11.7685C12.177 11.8385 12.0938 11.8941 12.0023 11.932C11.9107 11.9699 11.8126 11.9894 11.7135 11.9894H8.08902C6.98112 11.9464 5.93125 11.4832 5.15321 10.694C4.37516 9.90483 3.92746 8.84901 3.90125 7.74157C3.90125 6.58405 3.90125 5.42654 3.90125 4.26902C3.88631 4.06556 3.95115 3.86425 4.08207 3.70769C4.21298 3.55113 4.3997 3.45158 4.60275 3.43007C4.80242 3.38609 5.01134 3.41839 5.18838 3.52059C5.36542 3.62278 5.49776 3.78749 5.55935 3.98229C5.59848 4.11675 5.61641 4.25647 5.6125 4.39644C5.6125 5.45839 5.6125 6.52034 5.6125 7.58229C5.61249 7.93182 5.68158 8.27793 5.81578 8.60073C5.94998 8.92352 6.14666 9.21666 6.39453 9.46333C6.6424 9.71 6.93659 9.90533 7.2602 10.0381C7.58382 10.1709 7.93049 10.2386 8.28034 10.2372C9.03499 10.2372 9.78964 10.2372 10.5443 10.2372L10.7888 10.2796Z"
                      fill="black"
                    />
                    <path
                      d="M2.21125 1.73099V10.9911C2.22703 11.1181 2.22703 11.2465 2.21125 11.3734C2.16775 11.5784 2.04519 11.758 1.87012 11.8732C1.69504 11.9885 1.48156 12.0302 1.27591 11.9894C1.08214 11.9814 0.898647 11.9002 0.762507 11.7622C0.626367 11.6242 0.547734 11.4397 0.542513 11.246C0.537221 11.1611 0.537221 11.076 0.542513 10.9911V0.775223C0.547883 0.574131 0.630233 0.382751 0.772603 0.240507C0.914973 0.0982624 1.10652 0.0159854 1.30779 0.0106201H2.49823C3.25288 0.0106201 4.00753 0.0106201 4.76218 0.0106201C5.77802 0.0216578 6.75824 0.386087 7.53421 1.0412C8.31017 1.69631 8.83335 2.60113 9.01373 3.60001C9.04767 3.81787 9.06543 4.03793 9.06688 4.25841C9.06688 5.40531 9.06688 6.5416 9.06688 7.68851C9.08107 7.83055 9.05827 7.97383 9.00071 8.10448C8.94315 8.23513 8.85278 8.34869 8.73836 8.43417C8.62393 8.51964 8.48934 8.57412 8.34764 8.59232C8.20594 8.61052 8.06193 8.59183 7.92959 8.53805C7.74714 8.48632 7.58913 8.3713 7.48394 8.21365C7.37874 8.05599 7.33325 7.86603 7.35563 7.67788V5.20354C7.35563 4.76814 7.35563 4.33274 7.35563 3.90796C7.26112 3.34862 6.98329 2.8365 6.56581 2.45206C6.14832 2.06762 5.61483 1.83265 5.04915 1.78407C4.09255 1.70973 3.16784 1.73099 2.21125 1.73099Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2207_1666">
                      <rect width="12" height="12" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>}
            </span>
            <span className=" flex w-[60px] px-[10px] justify-center font-poppins text-[12px] text-[#56D141] my-auto bg-[#EFFFEC]  py-[5px] rounded-full">{Percentage}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-auto">
                <mask id="mask0_2207_1440" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
                  <rect width="12" height="12" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_2207_1440)">
                  <path d="M5.5 10V3.9125L2.7 6.7125L2 6L6 2L10 6L9.3 6.7125L6.5 3.9125V10H5.5Z" fill="#56D141" />
                </g>
              </svg>
            </span>
            <span></span>
          </div>

        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="Day"
              tickLine={true}
              axisLine={true}
              thick={5}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.6}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by <span className="text-green-500">5.2%</span> this month <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
