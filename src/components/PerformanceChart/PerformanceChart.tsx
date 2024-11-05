"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Avaliacao } from "@/types";

interface PerformanceChartProps {
  checkpoints: Avaliacao[];
  globalSolutions: Avaliacao[];
  challengerSprints: Avaliacao[];
}

export function PerformanceChart({
  checkpoints,
  globalSolutions,
  challengerSprints,
}: PerformanceChartProps) {
  const calcularMedia = (avaliacoes: Avaliacao[]) => {
    if (avaliacoes.length === 0) return 0;
    const soma = avaliacoes.reduce((acc, av) => acc + av.nota, 0);
    return Number((soma / avaliacoes.length).toFixed(2));
  };

  const data = [
    { name: "CheckPoints", nota: calcularMedia(checkpoints) },
    { name: "Global Solutions", nota: calcularMedia(globalSolutions) },
    { name: "Challenge", nota: calcularMedia(challengerSprints) },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho do Aluno</CardTitle>
        <CardDescription>Média das notas por tipo de avaliação</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            nota: {
              label: "Nota Média",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full h-[300px] sm:h-[400px]"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="nota"
              fill="hsl(220, 50%, 50%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
