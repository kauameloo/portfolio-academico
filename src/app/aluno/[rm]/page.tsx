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

  useEffect(() => {
    const fetchData = async () => {
      const alunoData = await getAluno(rm);
      setAluno(alunoData);

      const avaliacoesData = await getAvaliacoes(rm);
      setAvaliacoes(avaliacoesData);
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

  if (!aluno) {
    return <Spinner title="Carregando dados do aluno..." />;
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
        <TabsList>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
          <TabsTrigger value="checkpoints">CheckPoints</TabsTrigger>
          <TabsTrigger value="globalsolution">Global Solution</TabsTrigger>
          <TabsTrigger value="challengersprints">Challenge</TabsTrigger>
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
