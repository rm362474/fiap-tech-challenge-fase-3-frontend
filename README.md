# Frontend - Tech Challenge Fase 3

## Stack

- Node.js
- TypeScript
- React
- React Router DOM
- ZOD
- Vite
- Tailwind CSS

## Arquitetura do Projeto e do Sistema

O frontend foi construído como uma Single Page Application utilizando React, React Router DOM e Vite. A estrutura é composta por:

- **Páginas**: cada rota principal possui um componente de página dedicado (ex: Home, Register, Login, Admin, Post, Create/Edit).
- **Componentes**: elemento de Header reutilizável.
- **Hooks**: lógica de autenticação e integração com API encapsulada em hook personalizado (`useAuth`).
- **Serviços**: camada de integração com o backend via API REST, centralizando chamadas HTTP (`services/auth.ts` e `services/posts.ts`).
- **Validação de Dados**: uso da biblioteca ZOD para validação de dados e schemas no frontend, garantindo maior segurança e previsibilidade ao manipular dados provenientes de formulários e da API.
- **Estilos**: uso de Tailwind CSS para estilização.
- **Gerenciamento de estado**: feito via hooks do React, com estados locais e contextuais conforme necessário.

## Requisitos

- Node.js instalado.
- Antes de iniciar o frontend, certifique-se que o backend e o banco de dados estejam configurados e rodando. Siga as instruções do [README do backend](https://github.com/rm362474/fiap-tech-challenge-fase-3-backend).

## Configuração e Execução

1. Clone este repositório e acesse o diretório do projeto em seu computador.
2. Crie um arquivo `.env` baseado no `.env.example` e configure as variáveis de ambiente.
3. Instale as dependências:
	```bash
	npm install
	```
4. Inicie a aplicação:
	```bash
	npm run dev
	```
5. Acesse o frontend em: http://localhost:5173
