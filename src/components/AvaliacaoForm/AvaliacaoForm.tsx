import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AvaliacaoForm({
  onSubmit,
  tipo,
  disciplina,
  setDisciplina,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  tipo: string;
  disciplina: string;
  setDisciplina: (value: string) => void;
}) {
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 500) {
      setFeedbackError("O feedback deve ter no máximo 500 caracteres.");
    } else {
      setFeedbackError("");
    }
    setFeedback(value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor={`${tipo}Titulo`}>Título</Label>
          <Input id={`${tipo}Titulo`} name="titulo" required />
        </div>
        <div className="w-24">
          <Label htmlFor={`${tipo}Nota`}>Nota</Label>
          <Input id={`${tipo}Nota`} name="nota" type="number" step="0.1" min="0" max="10" required />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor={`${tipo}Data`}>Data</Label>
          <Input id={`${tipo}Data`} name="data" type="date" required />
        </div>
        <div className="flex-1">
          <Label htmlFor={`${tipo}Feedback`}>Feedback</Label>
          <Input id={`${tipo}Feedback`} name="feedback" value={feedback} onChange={handleFeedbackChange} maxLength={500} />
          {feedbackError && <p className="text-red-500 text-sm mt-1">{feedbackError}</p>}
        </div>
      </div>
      <div className="flex-1">
        <Label htmlFor={`${tipo}Disciplina`}>Disciplina</Label>
        <Select
          name="disciplina"
          value={disciplina}
          onValueChange={setDisciplina}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma disciplina" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Artificial Intelligence e Chatbot">Artificial Intelligence e Chatbot</SelectItem>
            <SelectItem value="Building Relational Database">Building Relational Database</SelectItem>
            <SelectItem value="Computational Thinking Using Python">Computational Thinking Using Python</SelectItem>
            <SelectItem value="Domain Driven Design Using Java">Domain Driven Design Using Java</SelectItem>
            <SelectItem value="Formação Social E Sustentabilidade">Formação Social E Sustentabilidade</SelectItem>
            <SelectItem value="Front-End Design Engineering">Front-End Design Engineering</SelectItem>
            <SelectItem value="Software Engineering And Business Model">Software Engineering And Business Model</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={feedback.length > 500}>Adicionar {tipo}</Button>
    </form>
  );
}
