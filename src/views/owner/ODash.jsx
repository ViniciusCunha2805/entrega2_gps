import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function ODash({ Nav }) {
  const { state } = useApp();
  const user = state.currentUser;
  const appts = state.appointments;

  const confirmed = appts.filter((a) => a.status === 'confirmed');
  const completed = appts.filter((a) => a.status === 'completed');
  const cancelled = appts.filter((a) => a.status === 'cancelled');
  const revenue   = [...confirmed, ...completed].reduce((s, a) => s + a.price, 0);

  const totalCortes = confirmed.length + completed.length;

  const barData = [
    { l: 'S1', v: 8 },
    { l: 'S2', v: 11 },
    { l: 'S3', v: 9 },
    { l: 'S4', v: 14 },
    { l: 'Atual', v: totalCortes },
  ];
  const maxBar = Math.max(...barData.map((d) => d.v), 1);

  return (
    <div className="screen active">
      <div className="topbar">
        <span className="topbar-logo">BarberPro</span>
        <div className="topbar-right">
          <div className="icon-btn">💈</div>
        </div>
      </div>

      <div className="scroll-area">
        {/* Cabeçalho do dono */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div className="avatar" style={{ width: 44, height: 44, fontSize: 16 }}>
            {user.initials}
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>Painel do barbeiro</div>
            <div style={{ fontSize: 17, fontWeight: 600 }}>{user.name}</div>
          </div>
          <span className="pill pill-green" style={{ marginLeft: 'auto' }}>● Aberto</span>
        </div>

        {/* Stats */}
        <p className="sec-title" style={{ marginTop: 0 }}>Resumo geral</p>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-num">{totalCortes}</div>
            <div className="stat-label">Total Cortes</div>
            <div className="stat-delta">{cancelled.length} cancelados</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ fontSize: totalCortes > 9 ? '28px' : '36px' }}>
              R${revenue}
            </div>
            <div className="stat-label">Receita</div>
            <div className="stat-delta">confirmados + concluídos</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{confirmed.length}</div>
            <div className="stat-label">Pendentes</div>
            <div className="stat-delta" style={{ color: 'var(--gold)' }}>⏳ Aguardando</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{completed.length}</div>
            <div className="stat-label">Concluídos</div>
            <div className="stat-delta">✓ Finalizados</div>
          </div>
        </div>

        {/* Gráfico de barras */}
        <p className="sec-title">Atividade — semanas</p>
        <div className="card" style={{ padding: 14 }}>
          <div className="bar-chart">
            {barData.map((d) => {
              const h = Math.round((d.v / maxBar) * 80);
              return (
                <div key={d.l} className="bar-wrap">
                  <div className="bar-val">{d.v}</div>
                  <div className="bar" style={{ height: h || 4 }} />
                  <div className="bar-label">{d.l}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Próximos confirmados */}
        <p className="sec-title">Próximos agendamentos</p>
        {confirmed.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            Nenhum agendamento pendente
          </div>
        ) : (
          confirmed.slice(0, 5).map((a) => (
            <div key={a.id} className="agenda-slot occupied">
              <div className="slot-time">{a.time}</div>
              <div className="slot-info">
                <div className="slot-name">{a.clientName}</div>
                <div className="slot-service">{a.service}</div>
              </div>
              <span className="pill pill-gold">R${a.price}</span>
            </div>
          ))
        )}
      </div>

      <Nav />
    </div>
  );
}
