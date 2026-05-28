import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import StatusPill from './StatusPill.jsx';

export default function ApptCard({ appt, isOwner }) {
  const { dispatch } = useApp();

  // Formata "2026-4-27" → "27/04/2026"
  const [y, m, d] = appt.date.split('-');
  const dateStr = `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;

  return (
    <div className="appt-card">
      {/* Cabeçalho */}
      <div className="appt-header">
        <div>
          <div className="appt-service">
            {isOwner ? appt.clientName : appt.service}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
            {isOwner ? `${appt.service} · ${appt.dur}` : 'Carlos Barbeiro'}
          </div>
        </div>
        <StatusPill status={appt.status} />
      </div>

      {/* Detalhes */}
      <div className="appt-details">
        <div className="appt-detail">
          <div className="appt-detail-label">Data</div>
          <div className="appt-detail-val">{dateStr}</div>
        </div>
        <div className="appt-detail">
          <div className="appt-detail-label">Hora</div>
          <div className="appt-detail-val">{appt.time}</div>
        </div>
        <div className="appt-detail">
          <div className="appt-detail-label">Duração</div>
          <div className="appt-detail-val">{appt.dur}</div>
        </div>
        <div className="appt-detail">
          <div className="appt-detail-label">Valor</div>
          <div className="appt-detail-val" style={{ color: 'var(--gold)' }}>
            R$ {appt.price}
          </div>
        </div>
      </div>

      {/* Ações — só para agendamentos confirmados */}
      {appt.status === 'confirmed' && (
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {isOwner && (
            <button
              className="btn btn-gold btn-sm"
              style={{ flex: 1 }}
              onClick={() => dispatch({ type: 'COMPLETE_APPT', id: appt.id })}
            >
              ✓ Concluir
            </button>
          )}
          <button
            className="btn btn-danger btn-sm"
            style={{ flex: 1 }}
            onClick={() => dispatch({ type: 'CANCEL_APPT', id: appt.id })}
          >
            {isOwner ? '✗ Cancelar' : 'Cancelar agendamento'}
          </button>
        </div>
      )}
    </div>
  );
}
