import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import CHome          from './CHome.jsx';
import CBooking       from './CBooking.jsx';
import CProducts      from './CProducts.jsx';
import CNotifications from './CNotifications.jsx';
import CProfile       from './CProfile.jsx';

// Ícones SVG da nav
const NAV_ICONS = {
  home: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </>
  ),
  booking: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
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
  notif: (
    <>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </>
  ),
  profile: (
    <>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
};

export default function ClientApp() {
  const { state } = useApp();
  const [tab, setTab] = useState('home');

  const unread = state.notifications.filter((n) => !n.read).length;

  function BottomNav() {
    const items = [
      { key: 'home',     label: 'Início'   },
      { key: 'booking',  label: 'Agendar'  },
      { key: 'products', label: 'Produtos' },
      { key: 'notif',    label: 'Alertas'  },
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
            {key === 'notif' && unread > 0 && (
              <span className="badge" style={{ position: 'absolute', top: 2, right: 'calc(50% - 16px)' }}>
                {unread}
              </span>
            )}
          </div>
        ))}
      </nav>
    );
  }

  function TopBar({ extra }) {
    return (
      <div className="topbar">
        <span className="topbar-logo">BarberPro</span>
        <div className="topbar-right">
          {extra}
          <div className="icon-btn" onClick={() => setTab('notif')} style={{ position: 'relative' }}>
            🔔{unread > 0 && <span className="badge">{unread}</span>}
          </div>
          <div className="icon-btn" onClick={() => setTab('profile')}>👤</div>
        </div>
      </div>
    );
  }

  const views = {
    home:     <CHome          TopBar={TopBar} Nav={BottomNav} setTab={setTab} />,
    booking:  <CBooking       TopBar={TopBar} Nav={BottomNav} setTab={setTab} />,
    products: <CProducts      TopBar={TopBar} Nav={BottomNav} />,
    notif:    <CNotifications              Nav={BottomNav} />,
    profile:  <CProfile                    Nav={BottomNav} />,
  };

  return views[tab] ?? views.home;
}
