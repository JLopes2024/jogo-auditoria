import React from 'react';

function Header({ playerName, budget, alertLevel, assedioLevel, rank }) {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '10px 20px', 
      backgroundColor: '#1a1a1a', 
      color: '#fff',
      alignItems: 'center'
    }}>
      {/* Exibindo o nome do Auditor aqui */}
      <div>
        Auditor(a): <strong>{playerName}</strong>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>Patente: {rank}</div>
        <div>Saldo: R$ {budget.toLocaleString('pt-BR')}</div>
        <div style={{ color: alertLevel > 60 ? '#ff4d4d' : '#ffd700' }}>
          ⚠️ Risco Fiscal: {alertLevel}%
        </div>
        <div style={{ color: assedioLevel > 60 ? '#ff4d4d' : '#ffd700' }}>
          ⚖️ Assédio Moral: {assedioLevel}%
        </div>
      </div>
    </header>
  );
}

export default Header;
