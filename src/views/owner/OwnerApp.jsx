import React, { useState } from 'react';
import ODash     from './ODash.jsx';
import OAgenda   from './OAgenda.jsx';
import OProducts from './OProducts.jsx';
import OProfile  from './OProfile.jsx';

const NAV_ICONS = {
  dash: (
    <>
      <rect x="3"  y="3"  width="7" height="7" rx="1" />
      <rect x="14" y="3"  width="7" height="7" rx="1" />
      <rect x="3"  y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  agenda: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2"  x2="16" y2="6"  />
      <line x1="8"  y1="2"  x2="8"  y2="6"  />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </>
  ),
  products: (
    <>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </>
  ),
  profile: (
    <>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
};

export default function OwnerApp() {
  const [tab, setTab] = useState('dash');

  function BottomNav() {
    const items = [
      { key: 'dash',     label: 'Painel'   },
      { key: 'agenda',   label: 'Agenda'   },
      { key: 'products', label: 'Produtos' },
      { key: 'profile',  label: 'Perfil'   },
    ];
    return (
      <nav className="bottom-nav">
        {items.map(({ key, label }) => (
          <div
            key={key}
            className={`nav-item${tab === key ? ' active' : ''}`}
            onClick={() => setTab(key)}
          >
            <svg viewBox="0 0 24 24">{NAV_ICONS[key]}</svg>
            <span>{label}</span>
          </div>
        ))}
      </nav>
    );
  }

  const views = {
    dash:     <ODash     Nav={BottomNav} />,
    agenda:   <OAgenda   Nav={BottomNav} />,
    products: <OProducts Nav={BottomNav} />,
    profile:  <OProfile  Nav={BottomNav} />,
  };

  return views[tab];
}
