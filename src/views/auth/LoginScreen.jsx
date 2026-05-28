import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function LoginScreen({ onRegister }) {
  const { dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');

  function tryLogin(e, p) {
    const em = e ?? email.trim();
    const pw = p ?? pass;
    if (!em || !pw) { dispatch({ type: 'TOAST', msg: 'Preencha e-mail e senha' }); return; }
    dispatch({ type: 'LOGIN', email: em, pass: pw });
  }

  function quickLogin(role) {
    const [e, p] =
      role === 'client'
        ? ['joao@email.com', '123456']
        : ['carlos@barberpro.com', 'admin123'];
    setEmail(e);
    setPass(p);
    setTimeout(() => dispatch({ type: 'LOGIN', email: e, pass: p }), 80);
  }

  return (
    <div className="screen active" id="screen-login">
      <div className="bg-art" />

      <div className="login-content">
        {/* Logo */}
        <div className="login-logo-area">
          <span className="login-scissor">✂️</span>
          <span className="login-logo">BarberPro</span>
          <span className="login-sub">Sua barbearia digital</span>
        </div>

        {/* Formulário */}
        <div className="input-group">
          <label className="input-label">EMAIL</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>
        <div className="input-group">
          <label className="input-label">SENHA</label>
          <input
            className="input"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === 'Enter' && tryLogin()}
          />
        </div>

        <button className="btn btn-gold" onClick={() => tryLogin()} style={{ marginBottom: 12 }}>
          Entrar
        </button>
        <button className="btn btn-outline" onClick={onRegister}>
          Criar conta
        </button>

        {/* Acesso rápido */}
        <div className="divider-or">contas de teste</div>
        <div className="test-accounts">
          <p>🔑 Acesso rápido</p>
          <button className="test-btn" onClick={() => quickLogin('client')}>
            <strong>👤 Cliente — João Silva</strong>
            joao@email.com / 123456
          </button>
          <button className="test-btn" onClick={() => quickLogin('owner')}>
            <strong>💈 Dono — Carlos Barbeiro</strong>
            carlos@barberpro.com / admin123
          </button>
        </div>
      </div>
    </div>
  );
}
