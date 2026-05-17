# TechMed

TechMed é um sistema web desenvolvido para auxiliar no gerenciamento da medicação de idosos, facilitando o cadastro, acompanhamento de horários e controle dos medicamentos já tomados.

## Objetivo

O objetivo do TechMed é apoiar idosos, familiares e cuidadores na organização da rotina de medicamentos, ajudando a reduzir esquecimentos, atrasos e confusões relacionadas a horários, dosagens e orientações de uso.

O sistema foi pensado para ser simples, visualmente claro e adequado a testes práticos em uma atividade extensionista, priorizando facilidade de uso, leitura confortável e ações objetivas.

## Público-alvo

O projeto é voltado principalmente para:

- Idosos que precisam acompanhar medicamentos de uso contínuo ou temporário.
- Familiares que auxiliam no cuidado diário.
- Cuidadores que acompanham a rotina de medicação.
- Atividades acadêmicas, sociais ou extensionistas relacionadas à tecnologia aplicada à saúde e ao bem-estar.

## Problema Que Resolve

Muitos idosos utilizam mais de um medicamento ao longo do dia, com horários, doses e observações diferentes. Sem uma organização clara, podem ocorrer esquecimentos, uso duplicado, atrasos ou dificuldade para identificar qual medicamento deve ser tomado em seguida.

O TechMed contribui com esse cenário ao centralizar as informações em uma interface simples, permitindo visualizar a lista de medicamentos, acompanhar a agenda do dia, receber alerta no horário cadastrado e marcar quando o medicamento foi tomado.

## Funcionalidades

- Cadastro de medicamentos com nome, dosagem, horário e observações.
- Listagem dos medicamentos cadastrados.
- Edição e exclusão de registros.
- Persistência dos dados no `localStorage` do navegador.
- Agenda com cards de medicamentos.
- Destaque do próximo medicamento pendente.
- Alerta em modal quando chega o horário de tomar o medicamento.
- Marcação de medicamento como tomado.
- Paginação na lista e na agenda quando há muitos registros.
- Opção para limpar os dados cadastrados antes de novos testes.
- Interface com fontes, espaçamentos e botões ajustados para melhor leitura por idosos.

## Como Usar

1. Acesse a tela **Cadastrar medicamento**.
2. Preencha nome, dosagem, horário e, se necessário, observações.
3. Salve o medicamento.
4. Consulte a tela **Lista medicamento** para editar, excluir ou limpar os dados.
5. Acesse **Visualizar horário do remédio** para acompanhar a agenda, verificar o próximo medicamento e marcar itens como tomados.

Os dados ficam salvos no navegador utilizado. Caso o teste seja feito em outro computador ou navegador, será necessário cadastrar os medicamentos novamente.

## Executando o Projeto

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Gere a versão de produção:

```bash
npm run build
```

Execute a verificação de código:

```bash
npm run lint
```

## Tecnologias

- React
- Vite
- React Bootstrap
- Bootstrap
- LocalStorage

## Contexto Acadêmico

Este projeto foi desenvolvido como apoio para uma atividade extensionista, com foco em aplicar tecnologia de forma prática para auxiliar na rotina de medicação de idosos e observar a experiência de uso em um contexto real.
