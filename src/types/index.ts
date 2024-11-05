export interface Aluno {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    rm: string;
    nome: string;
    curso: string;
    turma: string;
  }
  
  export interface Avaliacao {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    titulo: string;
    nota: number;
    data: string;
    feedback?: string;
    disciplina: string;
    tipo: 'checkpoint' | 'globalsolution' | 'challengersprint';
    rm: string;
  }