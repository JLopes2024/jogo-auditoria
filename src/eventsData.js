export const eventsData = [
  {
    id: 1,
    title: "Fiscalização Surpresa",
    description: "A Vigilância Sanitária bateu na Unidade 3 e encontrou suplementos vencidos.",
    options: [
      { text: "Pagar a multa e descartar tudo (- R$ 20.000)", cost: 20000, alertPenalty: 0, feedback: "Prejuízo financeiro assumido." },
      { text: "Tentar subornar o fiscal (Crime)", cost: 0, alertPenalty: 30, feedback: "O fiscal recusou e fez um B.O." }
    ]
  },
  {
    id: 2,
    title: "Processo Trabalhista",
    description: "Um ex-instrutor entrou com liminar bloqueando contas por falta de pagamento.",
    options: [
      { text: "Fazer acordo extrajudicial imediato (- R$ 35.000)", cost: 35000, alertPenalty: 0, feedback: "Acordo selado. Sigilo mantido." },
      { text: "Contestar na justiça", cost: 0, alertPenalty: 25, feedback: "Escândalo vazou na mídia local." }
    ]
  },
  {
    id: 3,
    title: "Vazamento de Dados (LGPD)",
    description: "Um pendrive com os CPFs falsos foi esquecido na recepção.",
    options: [
      { text: "Contratar assessoria de crise (- R$ 25.000)", cost: 25000, alertPenalty: 0, feedback: "Assessoria abafou o caso." },
      { text: "Ignorar e torcer para o aluno não denunciar", cost: 0, alertPenalty: 40, feedback: "O aluno postou nas redes sociais." }
    ]
  },
  {
    id: 4,
    title: "O Custo Humano do Caixa 2",
    description: "O desvio de R$ 450 mil secou o caixa. A equipe de limpeza está há 2 meses sem receber. O CEO mandou demitir todas sem pagar os atrasados.",
    options: [
      { text: "Seguir a ordem do CEO", cost: 0, alertPenalty: 15, feedback: "Você manteve o dinheiro, mas a equipe fez um protesto." },
      { text: "Gastar o fundo da auditoria para pagar as famílias (- R$ 40.000)", cost: 40000, alertPenalty: 0, feedback: "Você agiu com ética." }
    ]
  }
];