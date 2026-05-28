// ═══════════════════════════════════════════════
// CONTROLLER — Reducer com toda a lógica de negócio
// Cada action representa uma operação do sistema.
// ═══════════════════════════════════════════════

export default function appReducer(state, action) {
  switch (action.type) {

    // ── Autenticação ──────────────────────────────
    case 'LOGIN': {
      const user = state.users[action.email];
      if (!user)              return { ...state, toast: 'E-mail não encontrado' };
      if (user.pass !== action.pass) return { ...state, toast: 'Senha incorreta' };
      return {
        ...state,
        currentUser: { ...user, email: action.email },
        toast: `Bem-vindo, ${user.name}! 👋`,
      };
    }

    case 'LOGOUT':
      return { ...state, currentUser: null };

    case 'REGISTER': {
      if (state.users[action.email])
        return { ...state, toast: 'E-mail já cadastrado' };

      const initials = action.name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      return {
        ...state,
        users: {
          ...state.users,
          [action.email]: {
            pass: action.pass,
            role: action.role,
            name: action.name,
            phone: action.phone || '',
            initials,
            since: 'Mai 2026',
          },
        },
        toast: 'Conta criada! Faça login ✓',
      };
    }

    // ── Agendamentos ──────────────────────────────
    case 'BOOK': {
      const newAppt = {
        id: state.nextId,
        clientEmail: state.currentUser.email,
        clientName: state.currentUser.name,
        service: action.service,
        price: action.price,
        dur: action.dur,
        date: action.date,
        time: action.time,
        status: 'confirmed',
      };
      const newNotif = {
        id: state.nextId + 1,
        icon: '✅',
        title: 'Agendamento confirmado',
        text: `${action.service} confirmado para ${action.dateLabel} às ${action.time}. Valor: R$ ${action.price}.`,
        time: 'Agora',
        read: false,
      };
      return {
        ...state,
        appointments: [...state.appointments, newAppt],
        notifications: [newNotif, ...state.notifications],
        nextId: state.nextId + 2,
        toast: `✅ ${action.service} às ${action.time} confirmado!`,
      };
    }

    case 'CANCEL_APPT':
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.id ? { ...a, status: 'cancelled' } : a
        ),
        toast: 'Agendamento cancelado',
      };

    case 'COMPLETE_APPT':
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.id ? { ...a, status: 'completed' } : a
        ),
        toast: 'Marcado como concluído ✓',
      };

    // ── Produtos ──────────────────────────────────
    case 'ADD_PRODUCT': {
      const product = {
        id: state.nextId,
        icon: action.icon || '📦',
        name: action.name,
        desc: action.desc,
        price: action.price,
      };
      return {
        ...state,
        products: [...state.products, product],
        nextId: state.nextId + 1,
        toast: 'Produto adicionado ✓',
      };
    }

    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.id),
        toast: 'Produto removido',
      };

    // ── Notificações ──────────────────────────────
    case 'READ_ALL_NOTIFS':
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        toast: 'Notificações lidas ✓',
      };

    // ── Toast ─────────────────────────────────────
    case 'TOAST':
      return { ...state, toast: action.msg };

    case 'CLEAR_TOAST':
      return { ...state, toast: null };

    default:
      return state;
  }
}
