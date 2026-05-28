import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Toggle from '../../components/Toggle.jsx';

export default function OProfile({ Nav }) {
  const { state, dispatch } = useApp();
  const user = state.currentUser;

  const [open,  setOpen]  = useState(true);
  const [notif, setNotif] = useState(true);

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
          <div className="profile-role">💈 Dono da Barbearia</div>
        </div>

        {/* Dados da barbearia */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Nome da Barbearia</span>
            <span style={{ fontSize: 14, color: 'var(--text2)' }}>BarberPro VIX</span>
          </div>
          <div className="divider" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingTop: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Endereço</span>
            <span style={{ fontSize: 13, color: 'var(--text2)', textAlign: 'right' }}>
              Av. Vitória, 100<br />Vitória — ES
            </span>
          </div>
          <div className="divider" />
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Telefone</span>
            <span style={{ fontSize: 14, color: 'var(--text2)' }}>{user.phone}</span>
          </div>
        </div>

        {/* Horários */}
        <p className="sec-title">Horário de funcionamento</p>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--text2)' }}>Segunda – Sexta</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)' }}>09:00 – 19:00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'var(--text2)' }}>Sábado</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)' }}>09:00 – 17:00</span>
          </div>
        </div>

        {/* Configurações */}
        <p className="sec-title">Configurações</p>
        <div className="card">
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="toggle-title">Barbearia aberta</div>
              <div className="toggle-sub">Aceitar novos agendamentos</div>
            </div>
            <Toggle on={open} onChange={() => setOpen((p) => !p)} />
          </div>
          <div className="divider" />
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="toggle-title">Notificações</div>
              <div className="toggle-sub">Alertas de novos pedidos</div>
            </div>
            <Toggle on={notif} onChange={() => setNotif((p) => !p)} />
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
