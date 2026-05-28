import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function RegisterScreen({ onBack }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', email: '', pass: '', role: 'client' });

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function register() {
    if (!form.name || !form.email || !form.pass) {
      dispatch({ type: 'TOAST', msg: 'Preencha os campos obrigatórios' });
      return;
    }
    if (form.pass.length < 6) {
      dispatch({ type: 'TOAST', msg: 'Senha: mínimo 6 caracteres' });
      return;
    }
    dispatch({ type: 'REGISTER', ...form });
    setTimeout(onBack, 1400);
  }

  return (
    <div className="screen active">
      <div className="topbar">
        <button className="icon-btn" onClick={onBack} style={{ fontSize: 18 }}>
          ←
        </button>
        <span className="topbar-title">Criar conta</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="scroll-area">
        <div className="input-group">
          <label className="input-label">NOME COMPLETO *</label>
          <input className="input" value={form.name} onChange={set('name')} placeholder="João Silva" />
        </div>
        <div className="input-group">
          <label className="input-label">TELEFONE</label>
          <input className="input" type="tel" value={form.phone} onChange={set('phone')} placeholder="(27) 99999-0000" />
        </div>
        <div className="input-group">
          <label className="input-label">EMAIL *</label>
          <input className="input" type="email" value={form.email} onChange={set('email')} placeholder="joao@email.com" />
        </div>
        <div className="input-group">
          <label className="input-label">SENHA * (mín. 6 caracteres)</label>
          <input className="input" type="password" value={form.pass} onChange={set('pass')} placeholder="••••••••" />
        </div>
        <div className="input-group">
          <label className="input-label">TIPO DE CONTA</label>
          <select className="input" value={form.role} onChange={set('role')}>
            <option value="client">Cliente</option>
            <option value="owner">Dono de Barbearia</option>
          </select>
        </div>

        <button className="btn btn-gold" onClick={register} style={{ marginTop: 8 }}>
          Criar conta
        </button>
      </div>
    </div>
  );
}
