import React, { createContext, useContext, useReducer } from 'react';
import { INITIAL_STATE } from '../models/initialState.js';
import appReducer from '../controllers/appReducer.js';

// ─── Context ────────────────────────────────────
const AppContext = createContext(null);

// ─── Provider ───────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook de acesso ─────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de <AppProvider>');
  return ctx;
}
