import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Aluno } from "@/types";

export function AlunoHeader({ aluno }: { aluno: Aluno }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${aluno.nome}`} alt={aluno.nome} />
            <AvatarFallback>{aluno.nome.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{aluno.nome}</CardTitle>
            <CardDescription>RM: {aluno.rm}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>Curso: {aluno.curso}</p>
        <p>Turma: {aluno.turma}</p>
      </CardContent>
    </Card>
  );
}