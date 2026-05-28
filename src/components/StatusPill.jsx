import React from 'react';

const STATUS_MAP = {
  confirmed: { cls: 'pill-gold',  label: 'Confirmado' },
  completed: { cls: 'pill-green', label: 'Concluído'  },
  cancelled: { cls: 'pill-red',   label: 'Cancelado'  },
};

export default function StatusPill({ status }) {
  const { cls, label } = STATUS_MAP[status] ?? { cls: 'pill-blue', label: '—' };
  return <span className={`pill ${cls}`}>{label}</span>;
}
