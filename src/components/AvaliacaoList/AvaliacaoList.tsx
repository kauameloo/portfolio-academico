import { Avaliacao } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

export function AvaliacaoList({ avaliacoes }: { avaliacoes: Avaliacao[] }) {
  return (
    <ul className="space-y-4 mb-4">
      {avaliacoes.map((av) => (
        <li key={av.$id} className="flex justify-between items-center">
          <span>{av.titulo}</span>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{format(new Date(av.data), "dd/MM/yyyy")}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Ver detalhes</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{av.titulo}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <p>Nota: {av.nota}</p>
                <p>Disciplina: {av.disciplina}</p>
                {av.feedback && <p>Feedback: {av.feedback}</p>}
              </div>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}