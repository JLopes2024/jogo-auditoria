import React, { useEffect, useState } from 'react';

function VirusScreen({ onFinish }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const messages = [
      "Iniciando invasão...", "Bypass firewall...", "Acessando banco de dados...",
      "Criptografando arquivos...", "Coletando credenciais...", "Transferência iniciada..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, messages[i % messages.length]]);
      i++;
      if (i > 15) {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: 'black', color: '#00FF00', padding: '20px', height: '100vh', fontFamily: 'monospace' }}>
      <h2>⚠️ SISTEMA COMPROMETIDO</h2>
      {logs.map((log, index) => <div key={index}>{`> ${log}`}</div>)}
      <h1 style={{ color: 'red', marginTop: '50px' }}>VOCÊ PERDEU R$ 30.000 PELO ERRO!</h1>
      
      <button 
        onClick={onFinish} 
        style={{ marginTop: '20px', padding: '15px', cursor: 'pointer', backgroundColor: '#fff', border: 'none' }}
      >
        TENTAR RECUPERAR SISTEMA
      </button>
    </div>
  );
}

export default VirusScreen;
