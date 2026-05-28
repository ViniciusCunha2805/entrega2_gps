import React from 'react';
import { useApp } from '../../context/AppContext.jsx';

export default function CNotifications({ Nav }) {
  const { state, dispatch } = useApp();

  return (
    <div className="screen active">
      <div className="topbar">
        <span className="topbar-logo">BarberPro</span>
        <div className="topbar-right">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => dispatch({ type: 'READ_ALL_NOTIFS' })}
            style={{ fontSize: 11, padding: '6px 12px' }}
          >
            Marcar lidas
          </button>
        </div>
      </div>

      <div className="scroll-area">
        {state.notifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            Nenhuma notificação
          </div>
        ) : (
          state.notifications.map((n) => (
            <div key={n.id} className={`notif${!n.read ? ' unread' : ''}`}>
              <div className="notif-icon">{n.icon}</div>
              <div className="notif-body">
                <div className="notif-title">{n.title}</div>
                <div className="notif-text">{n.text}</div>
                <div className="notif-time">{n.time}</div>
              </div>
              {!n.read && <div className="notif-dot" />}
            </div>
          ))
        )}
      </div>

      <Nav />
    </div>
  );
}
