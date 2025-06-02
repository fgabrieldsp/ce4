# Mapa do Código - Calculadora de Estruturas de Eucalipto

## index.html
- Interface moderna, com grid responsivo.
- Inputs dos parâmetros agrupados em duas colunas.
- Blocos adicionados apresentados em cards.
- Resultado exibido como tabela para cada bloco e com resumo geral no final.

## script.js
- Funções principais:
  - capturarParametros(): Coleta todos os parâmetros do DOM.
  - adicionarBloco(): Adiciona bloco de vagas com modulação escolhida.
  - atualizarLista(): Atualiza lista de blocos na UI.
  - calcular(): Executa cálculo de pilares, longarinas, ferragens, tela e custos. Exibe tabela por bloco e resumo geral.
- Lógica de pilares (lado único): 2 * ceil(vagas / 2) + 2
- Longarinas longitudinais: calculadas apenas o necessário, com divisão em peças de 5m.

## style.css
- Layout moderno, grid e cards, responsivo.
- Tabelas destacadas com efeito card e design “glassmorphism leve”.
- Paleta principal: tons verdes, acinzentados e elementos em destaque.

## Observação
- Parâmetros podem ser ajustados diretamente na interface.
- O código é modular e pronto para expansão.



# Mapa do Código - CE4

- Estrutura modular: HTML, CSS e JS separados.
- Inputs padronizados via classe `.param-input`.
- Função de adicionar, editar e remover blocos na lista, todos dependentes de parâmetros globais.
- Lógica separada para "lado a lado" e "frente a frente", sem mistura de fórmulas.
- Reatividade: blocos recalculados sempre com base nos parâmetros atuais.
- Backups dos arquivos principais preservados no pacote para auditoria.



# Mapa do Código - CE4

- Estrutura modular: HTML, CSS e JS.
- Inputs compactos e padronizados.
- Blocos dinâmicos, reativos, controles de editar/remover.
- Lógica totalmente separada para “lado a lado” e “frente a frente”.
- Checagem de rotina obrigatória antes de qualquer evolução do sistema.
- Constante de versão presente para fácil rastreio e auditoria.
