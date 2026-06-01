export const suspectsData = [
  {
    id: 1, tier: 1, name: "Carlos", role: "Instrutor Chefe - Unidade 1", isUnlocked: true, isCompleted: false, isFailed: false, evidenceRequired: [],
    dilemma: "Carlos foi obrigado a abrir um MEI para dar aulas. Porém, ele tem que bater ponto às 06h, usa o uniforme da academia, não pode mandar substitutos e é punido se faltar. Para compensar o baixo repasse da empresa, ele cobra os alunos 'por fora' para montar treinos.",
    question: "Como você aborda Carlos sobre os pagamentos ilegais e o regime de contratação?",
    hint: "Ameaçar um 'Falso PJ' de demissão é prova contra a própria empresa. Foque em provar para ele que a subordinação o torna vítima do esquema.",
    options: [
      { 
        text: "'Ou você confessa esse esquema de propina agora, ou eu chamo a polícia e você sai daqui algemado!'", 
        isCorrect: true, 
        evidenceGiven: "Confissão de propina (Instrutor)", 
        feedback: "Ele se assustou e confessou. MAS ele gravou sua ameaça com o celular no bolso. O Sindicato adorou isso.",
        assedioPenalty: 35,
        cost: 0,
        alertPenalty: 0
      },
      { 
        text: "'Carlos, se você bate ponto e usa uniforme, a lei diz que você é CLT. Entregar quem te obriga a cobrar por fora é sua única proteção legal agora.'", 
        isCorrect: true, 
        evidenceGiven: "Confissão de propina (Instrutor)", 
        feedback: "Você usou a lei trabalhista com maestria. Ele percebeu a pejotização ilegal e entregou o esquema do Gerente.",
        assedioPenalty: 0,
        cost: 0,
        alertPenalty: 0
      },
      { 
        text: "'Poxa Carlos, a academia está passando por uma crise, você não quer parar de cobrar os alunos por fora para ajudar a nossa imagem?'", 
        isCorrect: false, 
        feedback: "Ele riu da sua cara, disse que não é instituição de caridade e foi embora. A pista esfriou.",
        assedioPenalty: 0,
        cost: 0,
        alertPenalty: 15
      },
      { 
        text: "'Você está demitido por justa causa! Pegue suas coisas e suma da minha unidade!'", 
        isCorrect: false, 
        feedback: "ERRO CRASSO! Você não pode dar 'Justa Causa' para quem é CNPJ (MEI). Processo trabalhista imediato!",
        assedioPenalty: 40,
        cost: 50000,
        alertPenalty: 20
      }
    ]
  },
  {
    id: 2, tier: 1, name: "Mariana", role: "Recepcionista - Unidade 3", isUnlocked: true, isCompleted: false, isFailed: false, evidenceRequired: [],
    dilemma: "Mariana vende suplementos no balcão sem emitir nota fiscal e guarda o dinheiro direto na gaveta. Ela justifica dizendo que o RH cortou o vale-refeição de todo mundo sem aviso prévio.",
    question: "Como você pressiona Mariana a revelar a ordem de sonegação?",
    hint: "Ela está cometendo um crime, mas o RH também cometeu uma infração. Use isso como moeda de troca.",
    options: [
      { text: "'Eu sei que o RH cortou seu benefício ilegalmente. Se me der o e-mail que prova o corte, eu garanto que você não responde pelo desvio.'", isCorrect: true, evidenceGiven: "Ordem de mascarar custos (RH)", feedback: "Negociação perfeita. Ela abriu a caixa de e-mails e te entregou a Diretora de RH.", assedioPenalty: 0, cost: 0, alertPenalty: 0 },
      { text: "'Sua ladra! Vou descontar cada centavo do seu salário e te processar por furto qualificado!'", isCorrect: true, evidenceGiven: "Ordem de mascarar custos (RH)", feedback: "Ela chorou e entregou a prova em pânico. O clima na unidade ficou péssimo e a taxa de assédio moral subiu.", assedioPenalty: 30, cost: 0, alertPenalty: 10 },
      { text: "'Tudo bem Mariana, a vida está difícil. Pode ficar com o dinheiro dos suplementos, só me fala quem mandou cortar o vale.'", isCorrect: false, feedback: "Você virou cúmplice. A auditoria te suspendeu.", assedioPenalty: 0, cost: 50000, alertPenalty: 30 },
      { text: "'Não me interessa sua vida! Você é paga para trabalhar. Me dê logo essa prova!'", isCorrect: false, feedback: "Ela teve uma crise de ansiedade. O SAMU foi chamado. Diretoria furiosa.", assedioPenalty: 50, cost: 50000, alertPenalty: 40 }
    ]
  },
  {
    id: 3, tier: 1, name: "Roberto", role: "Terceirizado de Manutenção", isUnlocked: true, isCompleted: false, isFailed: false, evidenceRequired: [],
    dilemma: "Roberto é dono de um MEI, mas emite notas de R$ 250.000,00 mensais sem nunca consertar nada. Limite MEI é R$ 81.000,00/ano.",
    question: "Como você faz Roberto confessar que a empresa dele é de fachada?",
    hint: "A matemática não mente e o crime tributário é inegável.",
    options: [
      { text: "'Seu criminoso! Está lavando dinheiro para o tráfico? Vou expor você!'", isCorrect: false, feedback: "Acusações sem provas (Calúnia). Notificação extrajudicial recebida.", assedioPenalty: 25, cost: 50000, alertPenalty: 20 },
      { text: "'Um MEI faturando R$ 250 mil num mês vai dar cadeia na Receita Federal. Quem aprova essas notas na Sede?'", isCorrect: true, evidenceGiven: "Admissão de notas frias (MEI)", feedback: "Ameaça cirúrgica. Ele jogou a culpa na Diretoria de Operações.", assedioPenalty: 0, cost: 0, alertPenalty: 0 },
      { text: "'Roberto, por favor, vá arrumar algumas esteiras para justificar essa nota fiscal.'", isCorrect: false, feedback: "Ele viu que você é fraco e bloqueou seu número.", assedioPenalty: 0, cost: 50000, alertPenalty: 15 }
    ]
  },
  { id: 4, tier: 1, name: "Fernanda", role: "Supervisora de Vendas - Unidade 2", isUnlocked: true, isCompleted: false, isFailed: false, evidenceRequired: [], dilemma: "Matrículas com CPFs gerados automaticamente e canceladas 24h depois.", question: "Como conseguir a prova dos CPFs?", hint: "Alerte sobre LGPD.", options: [{ text: "Oferecer imunidade se ela entregar o esquema da Gerente.", isCorrect: true, evidenceGiven: "Esquema de CPFs falsos", feedback: "Ela confessou.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }, { text: "Ameaçar chamar a polícia pelos CPFs falsos.", isCorrect: false, feedback: "Ela destruiu o pendrive.", assedioPenalty: 15, cost: 50000, alertPenalty: 15 }] },
  { id: 5, tier: 2, name: "Diego", role: "Gerente da Unidade 1", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Confissão de propina (Instrutor)"], dilemma: "Recebe a propina dos instrutores e finge não ver o Falso PJ.", question: "Como arrancar a confissão de Diego?", hint: "Use a prova do Carlos.", options: [{ text: "Mostrar a prova e exigir os relatórios.", isCorrect: true, evidenceGiven: "Denúncia do apagão nas catracas", feedback: "Diego cedeu.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }, { text: "Acusar de desvio abertamente sem garantias.", isCorrect: false, feedback: "Diego contatou a diretoria.", assedioPenalty: 20, cost: 50000, alertPenalty: 15 }] },
  { id: 6, tier: 2, name: "Paula", role: "Coordenadora de RH", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Ordem de mascarar custos (RH)"], dilemma: "Corte de benefícios e passivos trabalhistas escondidos.", question: "Como confrontar a Coordenadora?", hint: "Mostre o e-mail da Mariana.", options: [{ text: "Exigir as comunicações do CFO.", isCorrect: true, evidenceGiven: "E-mail do CFO sobre passivos", feedback: "Paula entregou os e-mails.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }] },
  { id: 7, tier: 2, name: "Sérgio", role: "Diretor de Operações", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Admissão de notas frias (MEI)"], dilemma: "Aprova compras superfaturadas.", question: "Como expor Sérgio?", hint: "Apresente as notas frias do Roberto.", options: [{ text: "Sugerir que a Receita já sabe.", isCorrect: true, evidenceGiven: "Recibos de Superfaturamento", feedback: "Sérgio entregou as notas da Alpha.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }] },
  { id: 8, tier: 2, name: "Luciana", role: "Gerente da Unidade 2", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Esquema de CPFs falsos"], dilemma: "Inflaciona o Valuation para o IPO.", question: "Como Luciana confessará?", hint: "Use os CPFs.", options: [{ text: "Mostrar os CPFs falsos.", isCorrect: true, evidenceGiven: "Áudio do CFO sobre Valuation", feedback: "Luciana abriu o jogo.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }] },
  { id: 9, tier: 3, name: "Igor", role: "Analista de T.I.", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Denúncia do apagão nas catracas"], dilemma: "Oculta os dados de catraca.", question: "TERMINAL INICIADO", hint: "Automação Python.", options: [] },
  { id: 10, tier: 3, name: "Marcos", role: "Diretor Financeiro (CFO)", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["E-mail do CFO sobre passivos", "Áudio do CFO sobre Valuation"], dilemma: "Mentor intelectual das fraudes base.", question: "Como quebrar o CFO?", hint: "Bata nele com o e-mail e o áudio.", options: [{ text: "Confrontar com as provas do RH e Valuation.", isCorrect: true, evidenceGiven: "Comprovante de remessa Offshore", feedback: "CFO tenta delação premiada.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }] },
  { id: 11, tier: 3, name: "Aline", role: "Contadora (Interna)", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Logs de T.I. apagados"], dilemma: "Assina balanços fraudulentos.", question: "Como fazer a contadora falar?", hint: "Mostre os logs de T.I.", options: [{ text: "Ameaçar o CRC (Conselho de Contabilidade) dela.", isCorrect: true, evidenceGiven: "Assinatura da Contadora nas notas", feedback: "Aline desabou e assinou a confissão.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }] },
  { id: 12, tier: 4, name: "Renato", role: "Auditor Independente (Externo)", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Recibos de Superfaturamento", "Assinatura da Contadora nas notas"], dilemma: "Valida os crimes de contabilidade.", question: "Como destruir o Auditor Externo?", hint: "Ele precisa perder a licença.", options: [{ text: "Mostrar conluio com a contabilidade.", isCorrect: true, evidenceGiven: "Balanço Maquiado da S.A.", feedback: "Auditor confessou pressão do Jurídico.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }] },
  { id: 16, tier: 4, name: "Dr. Lemos", role: "Diretor Jurídico", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Balanço Maquiado da S.A."], dilemma: "Ameaça todos com processos.", question: "PUZZLE DE DOCUMENTOS", hint: "Remonte o papel.", options: [] },
  { id: 13, tier: 5, name: "Victor", role: "CEO & Sócio Majoritário", isUnlocked: false, isCompleted: false, isFailed: false, evidenceRequired: ["Contratos de fachada da Offshore", "Quebra de Sigilo Societário"], dilemma: "O topo da cadeia.", question: "O Interrogatório Final.", hint: "Ele é o UBO.", options: [{ text: "Apresentar a quebra do sigilo internacional.", isCorrect: true, evidenceGiven: "CONFISSAO_CEO", feedback: "Xeque-mate.", assedioPenalty: 0, cost: 0, alertPenalty: 0 }] }
];