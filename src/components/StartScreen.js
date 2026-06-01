import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function StartScreen({ onStart }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onStart(result.user);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Simulador de Auditoria</h1>
      <button onClick={handleLogin} style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer' }}>
        ENTRAR COM GOOGLE
      </button>
    </div>
  );
}

export default StartScreen;