import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import StatusPill from '../../components/StatusPill.jsx';
import Toggle     from '../../components/Toggle.jsx';

export default function CProfile({ Nav }) {
  const { state, dispatch } = useApp();
  const user = state.currentUser;

  const mine       = state.appointments.filter((a) => a.clientEmail === user.email);
  const totalGasto = mine.filter((a) => a.status !== 'cancelled').reduce((s, a) => s + a.price, 0);

  const [notifOn, setNotifOn] = useState(true);
  const [lembOn,  setLembOn]  = useState(true);
  const [prodOn,  setProdOn]  = useState(false);

  return (
    <div className="screen active">
      <div className="topbar">
        <span className="topbar-logo">BarberPro</span>
      </div>

      <div className="scroll-area">
        {/* Hero */}
        <div className="profile-hero">
          <div className="profile-avatar-big">{user.initials}</div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-role">Cliente</div>
        </div>

        {/* Stats */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Total de agendamentos</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: 'var(--gold)' }}>
              {mine.length}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Total gasto</span>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: 'var(--gold)' }}>
              R$ {totalGasto}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Cliente desde</span>
            <span style={{ fontSize: 14, color: 'var(--text2)' }}>{user.since}</span>
          </div>
        </div>

        {/* Histórico */}
        <p className="sec-title">Histórico completo</p>
        {mine.length === 0 ? (
          <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
            Nenhum histórico ainda
          </div>
        ) : (
          mine
            .slice()
            .reverse()
            .map((a) => (
              <div
                key={a.id}
                className="card-sm"
                style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{a.service}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                    {a.date.split('-').reverse().join('/')} às {a.time}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: 'var(--gold)' }}>
                    R$ {a.price}
                  </div>
                  <StatusPill status={a.status} />
                </div>
              </div>
            ))
        )}

        {/* Configurações */}
        <p className="sec-title">Configurações</p>
        <div className="card">
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="toggle-title">Notificações</div>
              <div className="toggle-sub">Alertas de agendamento</div>
            </div>
            <Toggle on={notifOn} onChange={() => setNotifOn((p) => !p)} />
          </div>
          <div className="divider" />
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="toggle-title">Lembrete 2h antes</div>
              <div className="toggle-sub">Aviso quando faltam 2 horas</div>
            </div>
            <Toggle on={lembOn} onChange={() => setLembOn((p) => !p)} />
          </div>
          <div className="divider" />
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="toggle-title">Novidades de produtos</div>
              <div className="toggle-sub">Quando chegar produto novo</div>
            </div>
            <Toggle on={prodOn} onChange={() => setProdOn((p) => !p)} />
          </div>
        </div>

        <button
          className="btn btn-danger"
          onClick={() => dispatch({ type: 'LOGOUT' })}
          style={{ marginTop: 16 }}
        >
          Sair da conta
        </button>
      </div>

      <Nav />
    </div>
  );
}
