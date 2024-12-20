"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#15A149",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const isEmptyData =
    depositsTotal === 0 && investmentsTotal === 0 && expensesTotal === 0;

  const chartData = isEmptyData
    ? [
        {
          type: "Sem transações",
          amount: 1,
          fill: "#4B5563",
        },
      ]
    : [
        {
          type: TransactionType.DEPOSIT,
          amount: depositsTotal,
          fill: "#15A149",
        },
        {
          type: TransactionType.EXPENSE,
          amount: expensesTotal,
          fill: "#E93030",
        },
        {
          type: TransactionType.INVESTMENT,
          amount: investmentsTotal,
          fill: "#FFFFFF",
        },
      ];

  return (
    <Card className="flex flex-col py-10 md:py-20 xl:py-0">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[230px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="hidden space-y-3 px-4 sm:px-6 xl:block">
          {!isEmptyData ? (
            <>
              <PercentageItem
                icon={<TrendingUpIcon size={16} className="text-primary" />}
                title="Receita"
                value={typesPercentage[TransactionType.DEPOSIT]}
              />
              <PercentageItem
                icon={<TrendingDownIcon size={16} className="text-red-500" />}
                title="Despesas"
                value={typesPercentage[TransactionType.EXPENSE]}
              />
              <PercentageItem
                icon={<PiggyBankIcon size={16} />}
                title="Investido"
                value={typesPercentage[TransactionType.INVESTMENT]}
              />
            </>
          ) : (
            <p className="pt-10 text-center text-gray-600">
              Sem dados disponíveis
            </p>
          )}
        </div>
      </CardContent>

      <div className="space-y-3 px-4 sm:px-6 xl:hidden">
        {!isEmptyData ? (
          <>
            <PercentageItem
              icon={<TrendingUpIcon size={16} className="text-primary" />}
              title="Receita"
              value={typesPercentage[TransactionType.DEPOSIT]}
            />
            <PercentageItem
              icon={<TrendingDownIcon size={16} className="text-red-500" />}
              title="Despesas"
              value={typesPercentage[TransactionType.EXPENSE]}
            />
            <PercentageItem
              icon={<PiggyBankIcon size={16} />}
              title="Investido"
              value={typesPercentage[TransactionType.INVESTMENT]}
            />
          </>
        ) : (
          <p className="text-center text-gray-600">Sem dados disponíveis</p>
        )}
      </div>
    </Card>
  );
};

export default TransactionsPieChart;
