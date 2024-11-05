"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlunoHeader } from "@/components/AlunoHeader/AlunoHeader";
import { AvaliacaoList } from "@/components/AvaliacaoList/AvaliacaoList";
import { AvaliacaoForm } from "@/components/AvaliacaoForm/AvaliacaoForm";
import { PerformanceChart } from "@/components/PerformanceChart/PerformanceChart";
import { DisciplinaFilter } from "@/components/DisciplinaFilter/DisciplinaFilter";
import { Aluno, Avaliacao } from "@/types";
import { getAluno, getAvaliacoes, createAvaliacao } from "@/lib/api";
import Spinner from "@/components/Spinner/Spinner";

const disciplinas = [
  "Artificial Intelligence e Chatbot",
  "Building Relational Database",
  "Computational Thinking Using Python",
  "Domain Driven Design Using Java",
  "Formação Social E Sustentabilidade",
  "Front-End Design Engineering",
  "Software Engineering And Business Model",
];

export default function PerfilAluno() {
  const params = useParams();
  const rm = params.rm as string;

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState<string>("todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alunoData = await getAluno(rm);

        if (!alunoData) {
          setError(true);
        } else {
          setAluno(alunoData);
          const avaliacoesData = await getAvaliacoes(rm);
          setAvaliacoes(avaliacoesData);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rm]);

  const filteredAvaliacoes = useMemo(
    () =>
      selectedDisciplina === "todas"
        ? avaliacoes
        : avaliacoes.filter((av) => av.disciplina === selectedDisciplina),
    [avaliacoes, selectedDisciplina]
  );

  const checkpoints = useMemo(
    () => filteredAvaliacoes.filter((av) => av.tipo === "checkpoint"),
    [filteredAvaliacoes]
  );
  const globalSolutions = useMemo(
    () => filteredAvaliacoes.filter((av) => av.tipo === "globalsolution"),
    [filteredAvaliacoes]
  );
  const challengerSprints = useMemo(
    () => filteredAvaliacoes.filter((av) => av.tipo === "challengersprint"),
    [filteredAvaliacoes]
  );

  const handleAddAvaliacao = async (
    e: React.FormEvent<HTMLFormElement>,
    tipo: "checkpoint" | "globalsolution" | "challengersprint"
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const titulo = (form.elements.namedItem("titulo") as HTMLInputElement)
      .value;
    const nota = parseFloat(
      (form.elements.namedItem("nota") as HTMLInputElement).value
    );
    const data = (form.elements.namedItem("data") as HTMLInputElement).value;
    const feedback = (form.elements.namedItem("feedback") as HTMLInputElement)
      .value;
    const disciplina = (
      form.elements.namedItem("disciplina") as HTMLInputElement
    ).value;

    const newAvaliacao: Omit<Avaliacao, "$id" | "$createdAt" | "$updatedAt"> = {
      titulo,
      nota,
      data,
      feedback,
      disciplina,
      tipo,
      rm,
    };

    if (titulo && !isNaN(nota) && data && disciplina) {
      const createdAvaliacao = await createAvaliacao(newAvaliacao);
      if (createdAvaliacao) {
        setAvaliacoes([...avaliacoes, createdAvaliacao]);
        form.reset();
      }
    }
  };

  if (loading) {
    return <Spinner title="Carregando dados do aluno..." />;
  }

  if (error || !aluno) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Aluno não encontrado</h1>
        <p className="text-lg text-gray-700">
          Verifique se o RM está correto ou tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AlunoHeader aluno={aluno} />

      <DisciplinaFilter
        disciplinas={disciplinas}
        selectedDisciplina={selectedDisciplina}
        onSelectDisciplina={setSelectedDisciplina}
      />

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="sm:h-14 sm:w-fit w-full gap-1 sm:gap-4 px-1 sm:px-4 py-1 sm:py-2">
          <TabsTrigger
            value="performance"
            className="text-xs sm:text-base px-1 sm:px-4 py-1 sm:py-2"
          >
            Desempenho
          </TabsTrigger>
          <TabsTrigger
            value="checkpoints"
            className="text-xs sm:text-base px-1 sm:px-4 py-1 sm:py-2"
          >
            CheckPoints
          </TabsTrigger>
          <TabsTrigger
            value="globalsolution"
            className="text-xs sm:text-base px-1 sm:px-4 py-1 sm:py-2"
          >
            Global Solution
          </TabsTrigger>
          <TabsTrigger
            value="challengersprints"
            className="text-xs sm:text-base px-1 sm:px-4 py-1 sm:py-2"
          >
            Challenge
          </TabsTrigger>
        </TabsList>
        <TabsContent value="performance">
          <PerformanceChart
            checkpoints={checkpoints}
            globalSolutions={globalSolutions}
            challengerSprints={challengerSprints}
          />
        </TabsContent>
        <TabsContent value="checkpoints">
          <Card>
            <CardHeader>
              <CardTitle>CheckPoints</CardTitle>
              <CardDescription>Avaliações intermediárias</CardDescription>
            </CardHeader>
            <CardContent>
              <AvaliacaoList avaliacoes={checkpoints} />
              <AvaliacaoForm
                onSubmit={(e) => handleAddAvaliacao(e, "checkpoint")}
                tipo="CheckPoint"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="globalsolution">
          <Card>
            <CardHeader>
              <CardTitle>Global Solution</CardTitle>
              <CardDescription>Avaliações de soluções globais</CardDescription>
            </CardHeader>
            <CardContent>
              <AvaliacaoList avaliacoes={globalSolutions} />
              <AvaliacaoForm
                onSubmit={(e) => handleAddAvaliacao(e, "globalsolution")}
                tipo="Global Solution"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="challengersprints">
          <Card>
            <CardHeader>
              <CardTitle>Challenge</CardTitle>
              <CardDescription>
                Avaliações de sprints desafiadores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AvaliacaoList avaliacoes={challengerSprints} />
              <AvaliacaoForm
                onSubmit={(e) => handleAddAvaliacao(e, "challengersprint")}
                tipo="Challenger Sprint"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
