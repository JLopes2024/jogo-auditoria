import React, { useState } from 'react';

function TerminalMiniGame({ onSuccess, onFail }) {
  const [inputCode, setInputCode] = useState("");
  const [logs, setLogs] = useState([
    "C:\\Users\\Igor_TI\\Downloads> dir",
    "25/09/2025  08:10           500.432 relatorio_catraca_V2.xlsx [OCULTO]",
    "ERRO: Sistema bloqueado. Digite exatamente: python automacao_downloads.py"
  ]);

  const handleCommand = (e) => {
    e.preventDefault();
    const command = inputCode.trim().toLowerCase();
    if (command === "python automacao_downloads.py") {
      setLogs(prev => [...prev, `> ${command}`, "Executando script Python...", "[SUCESSO] Prova extraída com sucesso!"]);
      setTimeout(() => onSuccess("Logs de T.I. apagados"), 2500);
    } else {
      setLogs(prev => [...prev, `> ${command}`, "ERRO: Comando não reconhecido."]);
      setTimeout(() => onFail(), 1500);
    }
    setInputCode("");
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#0f0', fontFamily: 'monospace', padding: '20px', borderRadius: '5px', height: '300px', overflowY: 'auto' }}>
      <h3 style={{ color: '#fff', borderBottom: '1px solid #333' }}>📟 Terminal Forense (Acesso ROOT)</h3>
      {logs.map((log, idx) => (<div key={idx}>{log}</div>))}
      <form onSubmit={handleCommand} style={{ display: 'flex', marginTop: '10px' }}>
        <span>&gt; </span>
        <input type="text" value={inputCode} onChange={(e) => setInputCode(e.target.value)} style={{ backgroundColor: 'transparent', color: '#0f0', border: 'none', outline: 'none', flex: 1, fontFamily: 'monospace' }} autoFocus />
      </form>
    </div>
  );
}

export default TerminalMiniGame;