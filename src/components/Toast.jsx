import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Toast() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (!state.toast) return;
    const timer = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2400);
    return () => clearTimeout(timer);
  }, [state.toast]);

  return (
    <div className={`toast${state.toast ? ' show' : ''}`}>
      {state.toast}
    </div>
  );
}
