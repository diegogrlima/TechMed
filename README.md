# TechMed

TechMed e um sistema web desenvolvido para auxiliar no gerenciamento da medicacao de idosos, facilitando o cadastro, acompanhamento de horarios e controle dos medicamentos ja tomados.

## Objetivo

O objetivo do TechMed e apoiar idosos, familiares e cuidadores na organizacao da rotina de medicamentos, ajudando a reduzir esquecimentos, atrasos e confusoes relacionadas a horarios, dosagens e orientacoes de uso.

O sistema foi pensado para ser simples, visualmente claro e adequado a testes praticos em uma atividade extensionista, priorizando facilidade de uso, leitura confortavel e acoes objetivas.

## Publico-alvo

O projeto e voltado principalmente para:

- Idosos que precisam acompanhar medicamentos de uso continuo ou temporario.
- Familiares que auxiliam no cuidado diario.
- Cuidadores que acompanham a rotina de medicacao.
- Atividades academicas, sociais ou extensionistas relacionadas a tecnologia aplicada a saude e ao bem-estar.

## Problema Que Resolve

Muitos idosos utilizam mais de um medicamento ao longo do dia, com horarios, doses e observacoes diferentes. Sem uma organizacao clara, podem ocorrer esquecimentos, uso duplicado, atrasos ou dificuldade para identificar qual medicamento deve ser tomado em seguida.

O TechMed contribui com esse cenario ao centralizar as informacoes em uma interface simples, permitindo visualizar a lista de medicamentos, acompanhar a agenda do dia, receber alertas de horario e atraso, alem de marcar quando o medicamento foi tomado.

## Funcionalidades

- Cadastro de medicamentos com nome, dosagem, horario e observacoes.
- Listagem dos medicamentos cadastrados.
- Edicao e exclusao de registros.
- Persistencia dos dados no `localStorage` do navegador.
- Agenda com cards de medicamentos.
- Destaque do proximo medicamento pendente.
- Alerta em modal quando chega o horario de tomar o medicamento.
- Alerta laranja para medicamentos pendentes ha algumas horas.
- Alerta vermelho para medicamentos que ficaram pendentes desde outro dia.
- Marcacao de medicamento como tomado.
- Redefinicao diaria dos status para iniciar um novo ciclo de acompanhamento.
- Paginacao na lista e na agenda quando ha muitos registros.
- Opcao para limpar os dados cadastrados antes de novos testes.
- Interface com fontes, espacamentos e botoes ajustados para melhor leitura por idosos.

## Como Usar

1. Acesse a tela **Cadastrar medicamento**.
2. Preencha nome, dosagem, horario e, se necessario, observacoes.
3. Salve o medicamento.
4. Consulte a tela **Lista medicamento** para editar, excluir ou limpar os dados.
5. Acesse **Visualizar horario do remedio** para acompanhar a agenda, verificar o proximo medicamento, observar alertas e marcar itens como tomados.

Os dados ficam salvos no navegador utilizado. Caso o teste seja feito em outro computador ou navegador, sera necessario cadastrar os medicamentos novamente.

## Executando o Projeto

Instale as dependencias:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Gere a versao de producao:

```bash
npm run build
```

Execute a verificacao de codigo:

```bash
npm run lint
```

## Tecnologias

- React
- Vite
- React Bootstrap
- Bootstrap
- LocalStorage

## Contexto Academico

Este projeto foi desenvolvido como apoio para uma atividade extensionista, com foco em aplicar tecnologia de forma pratica para auxiliar na rotina de medicacao de idosos e observar a experiencia de uso em um contexto real.
