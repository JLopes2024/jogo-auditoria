import React, { useState } from 'react';

function StartScreen({ onStart, savedName }) {
  const [name, setName] = useState(savedName || "");

  return (
    <div className="start-screen" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Simulador de Auditoria</h1>
      <input 
        type="text" 
        placeholder="Digite seu nome de Auditor..." 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        style={{ padding: '10px', fontSize: '16px', display: 'block', margin: '20px auto' }}
      />
      <button disabled={!name} onClick={() => onStart(name)} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Iniciar Investigação
      </button>
    </div>
  );
}
export default StartScreen;
