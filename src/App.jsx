import React, { useState } from 'react';
import { useApp } from './context/AppContext.jsx';
import Toast from './components/Toast.jsx';
import LoginScreen from './views/auth/LoginScreen.jsx';
import RegisterScreen from './views/auth/RegisterScreen.jsx';
import ClientApp from './views/client/ClientApp.jsx';
import OwnerApp from './views/owner/OwnerApp.jsx';

export default function App() {
  const { state } = useApp();
  const [showRegister, setShowRegister] = useState(false);

  const renderScreen = () => {
    if (!state.currentUser) {
      return showRegister
        ? <RegisterScreen onBack={() => setShowRegister(false)} />
        : <LoginScreen onRegister={() => setShowRegister(true)} />;
    }
    return state.currentUser.role === 'owner' ? <OwnerApp /> : <ClientApp />;
  };

  return (
    <>
      <Toast />
      {renderScreen()}
    </>
  );
}
