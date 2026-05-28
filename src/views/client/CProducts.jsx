import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function CProducts({ TopBar, Nav }) {
  const { state } = useApp();

  return (
    <div className="screen active">
      <TopBar />

      <div className="scroll-area">
        <p className="sec-title" style={{ marginTop: 0 }}>Produtos disponíveis</p>

        {state.products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-icon">{p.icon}</div>
            <div className="product-info">
              <div className="product-name">{p.name}</div>
              <div className="product-desc">{p.desc}</div>
              <div className="product-price">R$ {p.price}</div>
            </div>
          </div>
        ))}

        {state.products.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🧴</div>
            Nenhum produto disponível no momento.
          </div>
        )}
      </div>

      <Nav />
    </div>
  );
}
