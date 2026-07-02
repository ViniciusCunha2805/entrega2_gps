import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { DAYS_PT, TIMES } from "../../models/initialState.js";

export default function OServices({ Nav }) {
  const { state, dispatch } = useApp();
  const [edits, setEdits] = useState({});
  const [schedule, setSchedule] = useState({
    service: state.services[0]?.name || "",
    day: 1,
    time: TIMES[0],
    price: state.services[0]?.price?.toString() || "",
    dur: state.services[0]?.dur || "",
  });

  useEffect(() => {
    setEdits(
      Object.fromEntries(
        state.services.map((service) => [
          service.name,
          { price: service.price.toString(), dur: service.dur },
        ]),
      ),
    );
    if (state.services[0]) {
      setSchedule((prev) => ({
        ...prev,
        service: state.services[0].name,
        price: state.services[0].price.toString(),
        dur: state.services[0].dur,
      }));
    }
  }, [state.services]);

  const setEditField = (name, key) => (event) => {
    const value = event.target.value;
    setEdits((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [key]: value,
      },
    }));
  };

  const setScheduleField = (key) => (event) => {
    const value = event.target.value;
    setSchedule((prev) => ({ ...prev, [key]: value }));
  };

  function saveService(serviceName) {
    const edit = edits[serviceName];
    if (!edit || !edit.price.trim()) {
      dispatch({ type: "TOAST", msg: "Informe o preço do serviço" });
      return;
    }
    dispatch({
      type: "UPDATE_SERVICE",
      name: serviceName,
      price: edit.price.trim(),
      dur: edit.dur.trim() || "—",
    });
  }

  function saveSchedule() {
    if (!schedule.service || !schedule.price.trim()) {
      dispatch({ type: "TOAST", msg: "Informe serviço e preço" });
      return;
    }
    dispatch({
      type: "ADD_SERVICE_SCHEDULE",
      service: schedule.service,
      day: Number(schedule.day),
      time: schedule.time,
      price: schedule.price.trim(),
      dur: schedule.dur.trim() || "—",
    });
  }

  function removeSchedule(id) {
    dispatch({ type: "REMOVE_SERVICE_SCHEDULE", id });
  }

  return (
    <div className="screen active">
      <div className="topbar">
        <span className="topbar-logo">BarberPro</span>
      </div>

      <div className="scroll-area">
        <div className="hero-card" style={{ marginBottom: 16 }}>
          <div>
            <div className="hero-title">Serviços</div>
            <div className="hero-sub">
              Atualize valores e defina horários especiais para evitar tempo
              ocioso.
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
            Definir preço especial por dia/hora
          </div>

          <div className="input-group">
            <label className="input-label">Serviço</label>
            <select
              className="input"
              value={schedule.service}
              onChange={(event) => {
                const serviceName = event.target.value;
                const svc = state.services.find(
                  (item) => item.name === serviceName,
                );
                setSchedule((prev) => ({
                  ...prev,
                  service: serviceName,
                  price: svc?.price?.toString() || prev.price,
                  dur: svc?.dur || prev.dur,
                }));
              }}
            >
              {state.services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div className="input-group">
              <label className="input-label">Dia da semana</label>
              <select
                className="input"
                value={schedule.day}
                onChange={setScheduleField("day")}
              >
                {DAYS_PT.map((dayLabel, index) => (
                  <option key={dayLabel} value={index}>
                    {dayLabel}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Horário</label>
              <select
                className="input"
                value={schedule.time}
                onChange={setScheduleField("time")}
              >
                {TIMES.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Preço especial (R$)</label>
            <input
              className="input"
              type="text"
              value={schedule.price}
              onChange={setScheduleField("price")}
              placeholder="40"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Duração</label>
            <input
              className="input"
              type="text"
              value={schedule.dur}
              onChange={setScheduleField("dur")}
              placeholder="45 min"
            />
          </div>

          <button
            className="btn btn-gold"
            style={{ marginTop: 8 }}
            onClick={saveSchedule}
          >
            Salvar horário especial
          </button>
        </div>

        {state.serviceSchedules.length > 0 && (
          <div
            className="card"
            style={{ marginBottom: 18, borderColor: "var(--gold)" }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
              Horários especiais salvos
            </div>
            {state.serviceSchedules.map((rule) => (
              <div
                key={rule.id}
                className="card"
                style={{ padding: 12, marginBottom: 10 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>
                      {rule.service}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text2)" }}>
                      {DAYS_PT[rule.day]} às {rule.time} • {rule.dur}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div style={{ fontWeight: 700, color: "var(--gold)" }}>
                      R$ {rule.price}
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeSchedule(rule.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {state.services.map((service) => {
          const edit = edits[service.name] || {
            price: service.price,
            dur: service.dur,
          };
          return (
            <div
              key={service.name}
              className="card"
              style={{ marginBottom: 14 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>
                    {service.icon} {service.name}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text2)" }}>
                    Duração atual: {service.dur}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--gold)",
                  }}
                >
                  R$ {service.price}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Novo preço (R$)</label>
                <input
                  className="input"
                  value={edit.price}
                  onChange={setEditField(service.name, "price")}
                  placeholder="40"
                  type="text"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Duração</label>
                <input
                  className="input"
                  value={edit.dur}
                  onChange={setEditField(service.name, "dur")}
                  placeholder="45 min"
                  type="text"
                />
              </div>

              <button
                className="btn btn-gold"
                style={{ marginTop: 10 }}
                onClick={() => saveService(service.name)}
              >
                Salvar serviço
              </button>
            </div>
          );
        })}
      </div>

      <Nav />
    </div>
  );
}
