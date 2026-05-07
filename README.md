# Impostos NF

API para cálculo de impostos (ICMS, IPI, PIS/COFINS) para Notas Fiscais.

## Estrutura do Projeto e Responsabilidades

Abaixo estão as responsabilidades de cada pasta e arquivo principal na estrutura do projeto:

### `src/`
Pasta raiz do código fonte da aplicação.

*   **`server.ts`**: Ponto de entrada da aplicação. Responsável por inicializar o servidor HTTP e escutar em uma porta específica.
*   **`app.ts`**: Configuração central do Fastify. Aqui são registrados os plugins, hooks globais e as rotas da aplicação.
*   **`routes/`**: Define os endpoints da API. Sua responsabilidade é receber as requisições, validar os dados (usando os schemas) e chamar o serviço correspondente.
*   **`schemas/`**: Contém as definições de validação usando **Zod**. Garante que os dados de entrada e saída estejam no formato correto e fornece tipagem automática para o TypeScript.
*   **`services/`**: Onde reside a **regra de negócio**. Toda a lógica de cálculo de impostos e processamento de dados deve ficar aqui, mantendo as rotas limpas.
*   **`plugins/`**: Configurações de plugins do Fastify, como Swagger para documentação automática, CORS, entre outros.
*   **`tests/`**: Suite de testes automatizados utilizando **Vitest** e **Supertest**. Contém testes unitários para os serviços e testes de integração para as rotas.
*   **`utils/`**: Funções utilitárias e ajudantes que são compartilhados por diversas partes do sistema.

### `docs/`
Documentação adicional do projeto.

*   **`libs.md`**: Detalhes sobre as bibliotecas escolhidas e suas justificativas.

---

## Equipe e Atribuições

### 👨‍💻 João Gabriel (JG)
**Backend, Front-end & DevOps**
*   **API:** Estrutura base do projeto (Node.js + Fastify), rota `/health` e rota `/nf-completa` (consolidação de impostos).
*   **DevOps:** CI/CD (GitHub Actions), deploy no Railway e gestão do repositório.
*   **Gestão:** Code review, cronograma e Setup inicial do projeto.

### 👨‍💻 Pedro Daou (PD)
**Backend & Front-end**
*   **API:** Rotas `/icms` (alíquota por estado) e `/ipi` (cálculo sobre produto) + Testes unitários.
*   **Front-end:** Telas de cálculo individual de ICMS e IPI, e tela de Help.

### 👨‍💻 Gabriel Bonatto (GB)
**Backend & Front-end**
*   **API:** Rota `/pis-cofins` (regimes cumulativo/não cumulativo) + Testes unitários.
*   **Front-end:** Tela de cálculo individual de PIS/COFINS e tela "Sobre" (Equipe).
*   **Doc:** Testes funcionais e documentação técnica (README).

---
