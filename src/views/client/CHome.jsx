import React from 'react';
import { useApp } from '../../context/AppContext.jsx';
import ApptCard from '../../components/ApptCard.jsx';

export default function CHome({ TopBar, Nav, setTab }) {
  const { state } = useApp();
  const user = state.currentUser;

  const confirmed = state.appointments.filter(
    (a) => a.clientEmail === user.email && a.status === 'confirmed'
  );
  const nextAppt = confirmed[0];

  return (
    <div className="screen active">
      <TopBar />

      <div className="scroll-area">
        {/* Card de boas-vindas */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg,#1a1710 0%,#1a1a1e 100%)',
            borderColor: '#c9a84c33',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="avatar" style={{ width: 50, height: 50, fontSize: 18 }}>
              {user.initials}
            </div>
            <div>
              <div style={{ fontSize: 14, color: 'var(--text2)' }}>Bem-vindo,</div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{user.name}</div>
            </div>
          </div>

          <div className="divider" />

          {nextAppt ? (
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text3)',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Próximo agendamento
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{nextAppt.service}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                    {nextAppt.date.split('-').reverse().join('/')} às {nextAppt.time}
                  </div>
                </div>
                <span className="pill pill-gold">✓ Confirmado</span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4px 0' }}>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>
                Nenhum agendamento ativo
              </div>
              <button className="btn btn-gold btn-sm" onClick={() => setTab('booking')}>
                Agendar agora
              </button>
            </div>
          )}
        </div>

        {/* Lista de agendamentos confirmados */}
        <p className="sec-title">Meus agendamentos confirmados</p>
        {confirmed.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            Nenhum agendamento ativo.{' '}
            <span style={{ color: 'var(--gold)', cursor: 'pointer' }} onClick={() => setTab('booking')}>
              Agendar agora →
            </span>
          </div>
        ) : (
          confirmed.map((a) => <ApptCard key={a.id} appt={a} isOwner={false} />)
        )}
      </div>

      <Nav />
    </div>
  );
}
