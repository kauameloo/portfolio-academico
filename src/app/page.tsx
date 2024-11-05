"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Aluno } from "@/types";
import { getAllAlunos } from "@/lib/api";
import Spinner from "@/components/Spinner/Spinner";
import { log } from "console";

export default function Home() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const alunosData = await getAllAlunos();
      setAlunos(alunosData);
      // console.log(alunosData);

      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner title="Carregando dados..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Portfólio Acadêmico FIAP</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {alunos.map((aluno) => (
          <Card key={aluno.$id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${aluno.nome}`}
                  />
                  <AvatarFallback>
                    {aluno.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{aluno.nome}</CardTitle>
                  <CardDescription>RM: {aluno.rm}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>Curso: {aluno.curso}</p>
              <p>Turma: {aluno.turma}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/aluno/${aluno.rm}`}>Ver Perfil</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
