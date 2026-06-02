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
        setTimeout(onFinish, 2000);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div style={{ backgroundColor: 'black', color: '#00FF00', padding: '20px', height: '100vh', fontFamily: 'monospace' }}>
      <h2>⚠️ SISTEMA COMPROMETIDO</h2>
      {logs.map((log, index) => <div key={index}>{`> ${log}`}</div>)}
      <h1 style={{ color: 'red', marginTop: '50px' }}>VOCÊ PERDEU R$ 30.000 PELO ERRO!</h1>
    </div>
  );
}
export default VirusScreen;
