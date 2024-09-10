Desafio JackExperts Back-End
Back-end desenvolvido para o desafio da JackExperts. O projeto utiliza Node.js com TypeScript, Prisma como ORM, e Jest para testes. Abaixo estão as instruções para rodar o projeto e uma explicação das decisões tomadas durante o desenvolvimento.

Requisitos
Antes de começar, certifique-se de ter os seguintes softwares instalados:

Node.js (versão LTS recomendada)
npm (ou yarn, se preferir)
Configuração do Projeto
Clone o Repositório


git clone <URL-DO-REPOSITORIO>
cd desafio-jackexperts-back
Instale as Dependências


npm install
Configuração do Ambiente

Crie um arquivo .env na raiz do projeto e adicione suas variáveis de ambiente. Exemplo:

JWT_SECRET=seu-segredo-aqui
DATABASE_URL=postgresql://usuario:senha@localhost:5432/banco

Inicialize o Banco de Dados

Execute as migrações e sementes para preparar o banco de dados:


npm run migration:generate
npm run migration:run
npm run test:seed


Scripts
Aqui estão os scripts disponíveis para facilitar o desenvolvimento e testes:

dev: Inicia o servidor em modo de desenvolvimento com recarregamento automático.


npm run dev
start: Inicia o servidor em modo de produção.


npm run start
build: Compila o código TypeScript para JavaScript.


npm run build
test: Executa os testes com Jest.


npm run test
test:coverage: Executa os testes e gera um relatório de cobertura de código.


npm run test:coverage
test:watch: Executa os testes em modo de observação.


npm run test:watch
migration:generate: Gera uma nova migração para o banco de dados.


npm run migration:generate
migration:run: Executa todas as migrações pendentes.


npm run migration:run


Decisões de Desenvolvimento

Estrutura do Projeto

src: Contém o código-fonte da aplicação.

controllers: Manipuladores de rotas.
services: Lógica de negócios.
repositories: Acesso ao banco de dados.
schemas: Validação de dados.
factories: Funções para criar dados de teste.
helpers: Funções utilitárias.
config: Configurações do Prisma e outras configurações de ambiente.

migrations: Scripts de migração do Prisma.



Tecnologias Utilizadas

Node.js e TypeScript: Para desenvolvimento do servidor e garantir tipagem estática.
Prisma: ORM para gerenciar o banco de dados.
Jest e Supertest: Para testes unitários e integração.
dotenv: Para gerenciar variáveis de ambiente.
Decisões Arquiteturais
Uso do Prisma: Escolhido pela facilidade de integração com TypeScript e a capacidade de gerar migrações automaticamente.
Jest para Testes: Escolhido por sua robustez e integração com TypeScript através do ts-jest.
Estrutura Modular: Mantém o código organizado e facilita a manutenção e escalabilidade do projeto.