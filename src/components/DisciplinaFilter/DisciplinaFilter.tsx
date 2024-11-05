import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DisciplinaFilterProps {
  disciplinas: string[]
  selectedDisciplina: string
  onSelectDisciplina: (disciplina: string) => void
}

export function DisciplinaFilter({ disciplinas, selectedDisciplina, onSelectDisciplina }: DisciplinaFilterProps) {
  return (
    <div className="mb-4">
      <Select value={selectedDisciplina} onValueChange={onSelectDisciplina}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Selecione uma disciplina" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas as disciplinas</SelectItem>
          {disciplinas.map((disciplina) => (
            <SelectItem key={disciplina} value={disciplina}>
              {disciplina}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}