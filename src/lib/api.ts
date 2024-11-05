import { databases } from './appwrite';
import { Query } from 'appwrite';
import { Aluno, Avaliacao } from '@/types';

// Função para mapear o documento da API para o tipo Aluno
function mapToAluno(doc: any): Aluno {
  return {
    $id: doc.$id,
    $createdAt: doc.$createdAt,
    $updatedAt: doc.$updatedAt,
    rm: doc.rm,
    nome: doc.nome,
    curso: doc.curso,
    turma: doc.turma,
  };
}

// Função para mapear o documento da API para o tipo Avaliacao
function mapToAvaliacao(doc: any): Avaliacao {
  return {
    $id: doc.$id,
    $createdAt: doc.$createdAt,
    $updatedAt: doc.$updatedAt,
    titulo: doc.titulo,
    nota: doc.nota,
    data: doc.data,
    feedback: doc.feedback,
    disciplina: doc.disciplina,
    tipo: doc.tipo,
    rm: doc.rm,
  };
}

// Função para buscar todos os alunos
export async function getAllAlunos(): Promise<Aluno[]> {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ALUNOS!
      );
      return response.documents.map((doc: any) => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        rm: doc.rm,
        nome: doc.nome,
        curso: doc.curso,
        turma: doc.turma
      }));
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      return [];
    }
  }

// Função para buscar um aluno pelo rm
export async function getAluno(rm: string): Promise<Aluno | null> {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ALUNOS!,
      [Query.equal('rm', rm)]
    );
    return response.documents.length > 0 ? mapToAluno(response.documents[0]) : null;
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    return null;
  }
}

// Função para buscar avaliações pelo rm
export async function getAvaliacoes(rm: string): Promise<Avaliacao[]> {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_AVALIACOES!,
      [Query.equal('rm', rm)]
    );
    return response.documents.map(mapToAvaliacao);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    return [];
  }
}

// Função para criar uma nova avaliação
export async function createAvaliacao(avaliacao: Omit<Avaliacao, '$id' | '$createdAt' | '$updatedAt'>): Promise<Avaliacao | null> {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_AVALIACOES!,
      'unique()',
      avaliacao
    );
    return mapToAvaliacao(response);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    return null;
  }
}
