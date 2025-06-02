# Metadados - Calculadora de Estruturas de Eucalipto

## Estrutura e Padrão Atual

- Peso Linear da Tora: 12 kg/m
- Bitola padrão: 12/14 cm
- Tora Pilar: 3m
- Tora Longarina: 5m
- Modulação: Sistema por Blocos, parâmetros configuráveis para qualquer quantidade de vagas.

## Parâmetros Operacionais
- Largura da Vaga: 2.4m (ajustável)
- Profundidade da Vaga: 4.8m (ajustável)
- Custos de processos: Usinagem, Lixamento, Verniz (por metro)
- Custo de Tela (R$/m²)
- Custo Logística (R$/kg)
- Peso/custo das mãos francesas (paramétrico)
- Consumo de piche (L/pilar)
- Distância padrão entre ilhós (ajustável)
- Todos os parâmetros disponíveis em interface configurável pelo usuário.

## Modulação — Lógica
- "Lado Único": Pilares = 2 × ceil(vagas/2) + 2
- Longarinas longitudinais: calculadas em função do comprimento total do bloco, peças de 5 m para cada lateral, somando sempre para cobrir toda a extensão, sem duplicar peças.
- Exibição totalizadora: cada bloco apresenta custos e materiais detalhados, com totalizadores por bloco e gerais.

## Observação
- Parametrização dinâmica via interface.
- Resultados apresentados em tabelas modernas e organizadas.


## atualizações inseridas por humanos


## 23052025 1308 
### Metadados - Calculadora Eucalipto 4 Pilares

- Estado: Lógica robusta e aprovada para ambos os modos de modulação.
- Interface pronta para novos refinamentos de UI/UX.
- Parâmetros globais padronizados e inputs compactos.
- Permite controle fino dos blocos, com edição e remoção.
- Inteligência contextual mantida — backups presentes para histórico de mudanças.
- Alvo: Finalizar experiência visual e alinhar interface para próxima versão estável.


# Snapshot - Estado Atual do Projeto CE4
Data: 2025-05-23
Versão: 2.0

## Marco
- Atualização manual dos arquivos, com foco total em não sobrescrever versões antigas — apenas agregar o novo ao sistema.
- Etapa obrigatória de checagem e validação do ecossistema antes de cada avanço.
- Constante de versão presente em todos os arquivos, garantindo rastreabilidade e referência clara de cada etapa.
- Lógica dos modos “lado a lado” e “frente a frente” aprovada, blocos reativos, controles de edição e remoção ativos.
- Interface visual ainda pendente de refinamento, mas sistema pronto e seguro para evoluir sem sustos.
- Backups preservados para rollback ou auditoria.

# Metadados - Calculadora Eucalipto 4 Pilares

- Estado: Sistema de atualização e checagem consolidado, garantindo segurança e rastreabilidade em cada etapa.
- Constante de versão presente em todos os arquivos de referência.
- Lógica robusta aprovada, interface pronta para ajustes visuais.
- Backups preservados — nada do antigo foi perdido; toda evolução é agregação.
- Próximo passo: refinamento visual e experiência do usuário.