import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function OProducts({ Nav }) {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ icon: '', name: '', desc: '', price: '' });

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function saveProduct() {
    if (!form.name.trim()) {
      dispatch({ type: 'TOAST', msg: 'Informe o nome do produto' });
      return;
    }
    const price = (parseFloat(form.price) || 0).toFixed(2).replace('.', ',');
    dispatch({
      type: 'ADD_PRODUCT',
      icon: form.icon || '📦',
      name: form.name.trim(),
      desc: form.desc.trim(),
      price,
    });
    setForm({ icon: '', name: '', desc: '', price: '' });
    setShowForm(false);
  }

  return (
    <div className="screen active">
      <div className="topbar">
        <span className="topbar-logo">BarberPro</span>
        <div className="topbar-right">
          <button
            className="btn btn-gold btn-sm"
            onClick={() => setShowForm((s) => !s)}
            style={{ fontSize: 11 }}
          >
            {showForm ? '✕ Fechar' : '+ Produto'}
          </button>
        </div>
      </div>

      <div className="scroll-area">
        {/* Formulário de novo produto */}
        {showForm && (
          <div className="card" style={{ borderColor: 'var(--gold)', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: 'var(--gold)' }}>
              Novo produto
            </div>

            <div className="input-group">
              <label className="input-label">EMOJI / ÍCONE</label>
              <input className="input" value={form.icon} onChange={set('icon')} placeholder="🧴" style={{ fontSize: 20 }} />
            </div>
            <div className="input-group">
              <label className="input-label">NOME *</label>
              <input className="input" value={form.name} onChange={set('name')} placeholder="Pomada Matte Premium" />
            </div>
            <div className="input-group">
              <label className="input-label">DESCRIÇÃO</label>
              <input className="input" value={form.desc} onChange={set('desc')} placeholder="Fixação forte, acabamento fosco" />
            </div>
            <div className="input-group">
              <label className="input-label">PREÇO (R$)</label>
              <input className="input" type="number" value={form.price} onChange={set('price')} placeholder="45.00" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 4 }}>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancelar</button>
              <button className="btn btn-gold"    onClick={saveProduct}>Salvar</button>
            </div>
          </div>
        )}

        {/* Lista de produtos */}
        {state.products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-icon">{p.icon}</div>
            <div className="product-info">
              <div className="product-name">{p.name}</div>
              <div className="product-desc">{p.desc}</div>
              <div className="product-price">R$ {p.price}</div>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch({ type: 'REMOVE_PRODUCT', id: p.id })}
              style={{ marginLeft: 8, flexShrink: 0 }}
            >
              🗑
            </button>
          </div>
        ))}

        {state.products.length === 0 && !showForm && (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            Nenhum produto cadastrado.
          </div>
        )}
      </div>

      <Nav />
    </div>
  );
}
