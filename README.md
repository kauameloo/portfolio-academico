## Projeto de Avaliação de Alunos

Este projeto é um sistema web para gerenciar avaliações de alunos em diferentes disciplinas. O sistema oferece uma interface intuitiva para visualizar o desempenho dos alunos em diversos tipos de avaliações, como checkpoints, Global Solution e Challenge Sprints.

### 📚 Tecnologias e Ferramentas

- **Next.js:** Framework React para desenvolvimento web moderno com SSR.
- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS:** Framework CSS para estilização rápida e responsiva.
- **TypeScript:** Suporte a tipos para código seguro e fácil de manter.
- **Appwrite:** Back-end para gerenciamento de banco de dados e autenticação (opcional).
- **Componentes Customizados:**
  - **AlunoHeader:** Exibe informações do aluno (RM e turma).
  - **DisciplinaFilter:** Componente para filtrar avaliações por disciplina.
  - **PerformanceChart:** Gráfico de desempenho do aluno.
  - **AvaliacaoList:** Lista as avaliações.
  - **AvaliacaoForm:** Formulário para adicionar novas avaliações.
  - **Spinner:** Feedback visual para carregamento de dados.

### 🚀 Funcionalidades

- **Visualização de Desempenho:** Exibe o desempenho do aluno em diferentes tipos de avaliações.
- **Filtragem por Disciplina:** Filtra avaliações por disciplina selecionada.
- **Cadastro de Novas Avaliações:** Permite adicionar novas avaliações através de um formulário.
- **Separação de Tipos de Avaliações:** Mostra avaliações separadas por tipo (checkpoints, Global Solution, Challenge Sprints).

### 👥 Equipe de Desenvolvimento

- Kauã de Melo Rodrigues (RM: 555168)
- Caike Dametto (RM: 558614)
- Guilherme Janunzzi (RM: 558461)
- Caio Cesar Rosa Nyimi (RM: 556331)
- Nicolas Guinante Cavalcanti (RM: 557844)

### 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- Yarn ou npm para gerenciamento de pacotes
- Appwrite configurado (opcional, caso o projeto use integração com Appwrite).

### 🛠️ Como Executar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```
2. **Instalar dependências:**
   ```bash
   yarn install
   # ou
   npm install
   ```
3. **Configurar variáveis de ambiente:**
   - Crie um arquivo `.env.local` na raiz do projeto.
   - Adicione as variáveis de ambiente necessárias, incluindo as do Appwrite (se aplicável).
4. **Iniciar o servidor de desenvolvimento:**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```
5. **Acessar a aplicação:** Abra o navegador e acesse http://localhost:3000.

### 📝 Estrutura de Código

O código é modularizado, utilizando componentes para facilitar a manutenção e escalabilidade.

### 📈 Manipulação dos Dados

As avaliações são manipuladas de acordo com seu tipo:

- **Checkpoints:** Avaliações intermediárias.
- **Global Solution:** Soluções completas para desafios globais.
- **Challenge Sprints:** Sprints de desafio para desenvolvimento de habilidades específicas.

### 📊 Visualização do Desempenho

O componente `PerformanceChart` utiliza os dados das avaliações para criar um gráfico que representa o progresso do aluno em cada tipo de avaliação.

##

Este README fornece uma visão geral do projeto. Para informações mais detalhadas, consulte o código fonte e a documentação adicional.
