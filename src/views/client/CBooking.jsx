import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import { MONTHS_PT, DAYS_PT, TIMES, SERVICES } from '../../models/initialState.js';

export default function CBooking({ TopBar, Nav, setTab }) {
  const { state, dispatch } = useApp();

  const [selSvc,  setSelSvc]  = useState(SERVICES[0]);
  const [calYear, setCalYear] = useState(2026);
  const [calMonth,setCalMonth]= useState(4);
  const [selDate, setSelDate] = useState('');
  const [selTime, setSelTime] = useState('');

  // Horários já ocupados na data selecionada
  const busyTimes = state.appointments
    .filter((a) => a.date === selDate && a.status !== 'cancelled')
    .map((a) => a.time);

  function changeMonth(dir) {
    let m = calMonth + dir;
    let y = calYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setCalMonth(m);
    setCalYear(y);
  }

  function confirmBooking() {
    if (!selDate) { dispatch({ type: 'TOAST', msg: 'Escolha uma data' }); return; }
    if (!selTime) { dispatch({ type: 'TOAST', msg: 'Escolha um horário' }); return; }
    const [y, m, d] = selDate.split('-');
    const dateLabel = `${d} de ${MONTHS_PT[parseInt(m)]}`;
    dispatch({
      type: 'BOOK',
      service: selSvc.name,
      price:   selSvc.price,
      dur:     selSvc.dur,
      date:    selDate,
      time:    selTime,
      dateLabel,
    });
    setSelDate('');
    setSelTime('');
    setTimeout(() => setTab('home'), 1600);
  }

  // ── Montar células do calendário ──
  const today  = new Date();
  const first  = new Date(calYear, calMonth, 1).getDay();
  const total  = new Date(calYear, calMonth + 1, 0).getDate();
  const prevTot= new Date(calYear, calMonth, 0).getDate();

  const cells = [];
  for (let i = 0; i < first; i++)
    cells.push({ day: prevTot - first + i + 1, type: 'prev' });

  for (let d = 1; d <= total; d++) {
    const ds     = `${calYear}-${calMonth}-${d}`;
    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    const isPast  = new Date(calYear, calMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const hasDot  = state.appointments.some(
      (a) => a.date === ds && a.status !== 'cancelled' && a.clientEmail === state.currentUser.email
    );
    cells.push({ day: d, type: 'cur', isToday, isPast, hasDot, ds });
  }

  while (cells.length < 42)
    cells.push({ day: cells.length - first - total + 1, type: 'next' });

  return (
    <div className="screen active">
      <TopBar />

      <div className="scroll-area">
        {/* Serviços */}
        <p className="sec-title" style={{ marginTop: 0 }}>Escolha o serviço</p>
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className={`service-option${selSvc.name === s.name ? ' selected' : ''}`}
            onClick={() => setSelSvc(s)}
          >
            <div>
              <div className="service-option-name">{s.name}</div>
              <div className="service-option-sub">{s.icon} {s.dur}</div>
            </div>
            <div className="service-option-price">R${s.price}</div>
          </div>
        ))}

        {/* Calendário */}
        <p className="sec-title">Escolha a data</p>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <button className="icon-btn" onClick={() => changeMonth(-1)} style={{ fontSize: 14 }}>◀</button>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{MONTHS_PT[calMonth]} {calYear}</span>
            <button className="icon-btn" onClick={() => changeMonth(1)} style={{ fontSize: 14 }}>▶</button>
          </div>
          <div className="cal-header">
            {DAYS_PT.map((d) => <div key={d} className="cal-hdr">{d}</div>)}
          </div>
          <div className="cal-grid">
            {cells.map((c, i) => (
              <div
                key={i}
                className={[
                  'cal-day',
                  c.type !== 'cur' ? 'other-month' : '',
                  c.isToday        ? 'today'        : '',
                  c.isPast && c.type === 'cur' ? 'past' : '',
                  c.ds === selDate && !c.isToday ? 'selected' : '',
                  c.hasDot         ? 'has-appt'     : '',
                ].filter(Boolean).join(' ')}
                onClick={() => c.type === 'cur' && !c.isPast && setSelDate(c.ds)}
              >
                {c.day}
              </div>
            ))}
          </div>
        </div>

        {/* Horários */}
        <p className="sec-title">
          Escolha o horário
          {selDate && (
            <span style={{ color: 'var(--text3)', fontWeight: 400, letterSpacing: 0, textTransform: 'none', fontSize: 11 }}>
              {' '}— cinza = ocupado
            </span>
          )}
        </p>
        <div className="time-grid">
          {TIMES.map((t) => (
            <div
              key={t}
              className={`time-chip${busyTimes.includes(t) ? ' unavailable' : ''}${selTime === t ? ' selected' : ''}`}
              onClick={() => !busyTimes.includes(t) && setSelTime(t)}
            >
              {t}
            </div>
          ))}
        </div>

        <button className="btn btn-gold" onClick={confirmBooking}>
          Confirmar Agendamento
        </button>
      </div>

      <Nav />
    </div>
  );
}
