import React from 'react';

function GameResult({ status, budget, restartGame }) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b', color: '#fff' }}>
      <h1>{status === "victory" ? "🏆 VITÓRIA!" : "🚨 GAME OVER"}</h1>
      <p style={{ fontSize: '1.2em' }}>{status === "victory" ? "Sua auditoria destruiu a quadrilha corporativa." : "Sua investigação falhou. A empresa quebrou ou você foi processado."}</p>
      <button onClick={restartGame} style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1em' }}>Tentar Novamente</button>
    </div>
  );
}

export default GameResult;