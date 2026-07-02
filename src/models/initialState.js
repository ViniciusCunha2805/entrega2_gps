// ═══════════════════════════════════════════════
// MODEL — Constantes e estado inicial da aplicação
// ═══════════════════════════════════════════════

export const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export const SERVICES = [
  { name: "Corte Degradê", price: 40, dur: "45 min", icon: "✂️" },
  { name: "Corte + Barba", price: 65, dur: "60 min", icon: "✂️🪒" },
  { name: "Barba", price: 30, dur: "30 min", icon: "🪒" },
  { name: "Luzes / Coloração", price: 80, dur: "90 min", icon: "🎨" },
];

export const INITIAL_STATE = {
  users: {
    "joao@email.com": {
      pass: "123456",
      role: "client",
      name: "João Silva",
      phone: "(27) 99999-0000",
      initials: "JS",
      since: "Jan 2025",
    },
    "carlos@barberpro.com": {
      pass: "admin123",
      role: "owner",
      name: "Carlos Barbeiro",
      phone: "(27) 9 9999-0000",
      initials: "CB",
      since: "Mar 2024",
    },
  },

  currentUser: null,

  appointments: [
    {
      id: 1,
      clientEmail: "joao@email.com",
      clientName: "João Silva",
      service: "Corte + Barba",
      price: 65,
      dur: "60 min",
      date: "2026-4-27",
      time: "14:30",
      status: "confirmed",
    },
    {
      id: 2,
      clientEmail: "joao@email.com",
      clientName: "João Silva",
      service: "Corte Degradê",
      price: 40,
      dur: "45 min",
      date: "2026-4-30",
      time: "10:00",
      status: "confirmed",
    },
    {
      id: 3,
      clientEmail: "joao@email.com",
      clientName: "João Silva",
      service: "Barba",
      price: 30,
      dur: "30 min",
      date: "2026-4-15",
      time: "11:00",
      status: "completed",
    },
  ],

  products: [
    {
      id: 1,
      icon: "🧴",
      name: "Pomada Matte Premium",
      desc: "Fixação forte, acabamento fosco",
      price: "45,00",
    },
    {
      id: 2,
      icon: "🧖",
      name: "Óleo de Barba",
      desc: "Hidrata e amacia, aroma amadeirado",
      price: "38,00",
    },
    {
      id: 3,
      icon: "✂️",
      name: "Shampoo Anticaspa Pro",
      desc: "Uso profissional, fragrância masc.",
      price: "32,00",
    },
    {
      id: 4,
      icon: "💆",
      name: "Cera Modeladora",
      desc: "Fixação média, brilho natural",
      price: "28,00",
    },
    {
      id: 5,
      icon: "🪒",
      name: "Gel Pós-Barba",
      desc: "Acalma a pele, evita irritação",
      price: "22,00",
    },
  ],

  services: SERVICES,
  serviceSchedules: [],

  notifications: [
    {
      id: 1,
      icon: "✂️",
      title: "Corte em 2 horas!",
      text: "Agendamento de Corte + Barba hoje às 14:30 com Carlos Barbeiro.",
      time: "Hoje, 12:30",
      read: false,
    },
    {
      id: 2,
      icon: "⏰",
      title: "Lembrete: amanhã às 10h",
      text: "Você tem um Corte Degradê agendado para amanhã às 10:00.",
      time: "Hoje, 09:00",
      read: false,
    },
    {
      id: 3,
      icon: "✅",
      title: "Agendamento confirmado",
      text: "Seu corte foi confirmado para Sex, 30 Mai às 10:00.",
      time: "Ontem, 16:00",
      read: true,
    },
    {
      id: 4,
      icon: "🧴",
      title: "Produto novo disponível",
      text: "Pomada Matte Premium chegou na barbearia. Confira!",
      time: "23 Mai, 10:00",
      read: true,
    },
  ],

  nextId: 100,
  toast: null,
};
