import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import ApptCard from '../../components/ApptCard.jsx';

const FILTERS = [
  { value: 'all',       label: 'Todos'      },
  { value: 'confirmed', label: 'Pendentes'  },
  { value: 'completed', label: 'Concluídos' },
  { value: 'cancelled', label: 'Cancelados' },
];

export default function OAgenda({ Nav }) {
  const { state } = useApp();
  const [filter, setFilter] = useState('all');

  const list = state.appointments
    .filter((a) => filter === 'all' || a.status === filter)
    .slice()
    .reverse();

  return (
    <div className="screen active">
      <div className="topbar">
        <span className="topbar-logo">BarberPro</span>
      </div>

      <div className="scroll-area">
        {/* Filtros */}
        <div className="filter-row">
          {FILTERS.map(({ value, label }) => (
            <span
              key={value}
              className={`filter-chip${filter === value ? ' active' : ''}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Lista */}
        {list.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            Nenhum agendamento nesta categoria
          </div>
        ) : (
          list.map((a) => <ApptCard key={a.id} appt={a} isOwner={true} />)
        )}
      </div>

      <Nav />
    </div>
  );
}
