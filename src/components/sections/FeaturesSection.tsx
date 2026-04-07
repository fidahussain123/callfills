"use client";
import { Activity, Map as MapIcon, MessageCircle } from "lucide-react";
import DottedMap from "dotted-map";
import { Area, AreaChart, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function FeaturesSection() {
  return (
    <section className="px-4 py-8 md:py-12 bg-white">
      <div className="mx-auto grid max-w-5xl border border-gray-200 md:grid-cols-2">
        <div>
          <div className="p-6 sm:p-12">
            <span className="text-gray-500 flex items-center gap-2">
              <MapIcon className="size-4" />
              Real time lead tracking
            </span>

            <p className="mt-8 text-2xl font-semibold text-gray-900">
              Advanced tracking system, Instantly locate all your leads.
            </p>
          </div>

          <div aria-hidden className="relative">
            <div className="absolute inset-0 z-10 m-auto size-fit">
              <div className="rounded-lg bg-white z-[1] relative flex size-fit w-fit items-center gap-2 border border-gray-200 px-3 py-1 text-xs font-medium shadow-md shadow-black/5">
                <MapIcon className="size-4 text-purple-600 inline-block" /> Lead detected in Houston,
                TX
              </div>
              <div className="rounded-lg bg-gray-50 absolute inset-2 -bottom-2 mx-auto border border-gray-200 px-3 py-4 text-xs font-medium shadow-md shadow-black/5" />
            </div>

            <div className="relative overflow-hidden">
              <div className="[background-image:radial-gradient(var(--tw-gradient-stops))] z-1 to-white absolute inset-0 from-transparent to-75%" />
              <Map />
            </div>
          </div>
        </div>
        <div className="overflow-hidden border-t border-gray-200 bg-gray-50 p-6 sm:p-12 md:border-0 md:border-l">
          <div className="relative z-10">
            <span className="text-gray-500 flex items-center gap-2">
              <MessageCircle className="size-4" />
              WhatsApp and email support
            </span>

            <p className="my-8 text-2xl font-semibold text-gray-900">
              Reach out via WhatsApp or email for any assistance you need.
            </p>
          </div>
          <div aria-hidden className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex justify-center items-center size-5 rounded-full border border-gray-300">
                  <span className="size-3 rounded-full bg-purple-500" />
                </span>
                <span className="text-gray-500 text-xs">Sat 22 Feb</span>
              </div>
              <div className="rounded-lg bg-white mt-1.5 w-3/5 border border-gray-200 p-3 text-xs text-gray-700">
                Hey, I&apos;m having trouble setting up my lead alerts.
              </div>
            </div>

            <div>
              <div className="rounded-lg mb-1 ml-auto w-3/5 bg-gradient-to-r from-purple-600 to-violet-500 p-3 text-xs text-white font-medium">
                No worries! I&apos;ve configured your WhatsApp alerts for
                Houston TX leads. You&apos;ll receive them within 60 seconds of
                detection.
              </div>
              <span className="text-gray-400 block text-right text-xs">
                Now
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-full border-y border-gray-200 p-12">
          <p className="text-center text-4xl font-semibold text-gray-900 lg:text-7xl">
            99.99% Uptime
          </p>
        </div>
        <div className="relative col-span-full">
          <div className="absolute z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
            <span className="text-gray-500 flex items-center gap-2">
              <Activity className="size-4" />
              Activity feed
            </span>

            <p className="my-8 text-2xl font-semibold text-gray-900">
              Monitor your lead pipeline in real-time.{" "}
              <span className="text-gray-400">
                Instantly identify and act on hot leads.
              </span>
            </p>
          </div>
          <MonitoringChart />
        </div>
      </div>
    </section>
  );
}

const map = new DottedMap({ height: 55, grid: "diagonal" });

const points = map.getPoints();

const svgOptions = {
  backgroundColor: "#ffffff",
  color: "#d1d5db",
  radius: 0.15,
};

const Map = () => {
  const viewBox = `0 0 120 60`;
  return (
    <svg
      viewBox={viewBox}
      style={{ background: svgOptions.backgroundColor }}
    >
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={svgOptions.radius}
          fill={svgOptions.color}
        />
      ))}
    </svg>
  );
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#7C3AED",
  },
  mobile: {
    label: "Mobile",
    color: "#A855F7",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "May", desktop: 56, mobile: 224 },
  { month: "June", desktop: 56, mobile: 224 },
  { month: "January", desktop: 126, mobile: 252 },
  { month: "February", desktop: 205, mobile: 410 },
  { month: "March", desktop: 200, mobile: 126 },
  { month: "April", desktop: 400, mobile: 800 },
];

const MonitoringChart = () => {
  return (
    <ChartContainer
      className="h-120 aspect-auto md:h-96"
      config={chartConfig}
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="55%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="55%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          active
          cursor={false}
          content={<ChartTooltipContent />}
        />
        <Area
          strokeWidth={2}
          dataKey="mobile"
          type="stepBefore"
          fill="url(#fillMobile)"
          fillOpacity={0.1}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          strokeWidth={2}
          dataKey="desktop"
          type="stepBefore"
          fill="url(#fillDesktop)"
          fillOpacity={0.1}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};
