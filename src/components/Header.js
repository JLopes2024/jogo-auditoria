import React from 'react';

function Header({ budget, alertLevel, assedioLevel, rank }) {
  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '10px 20px', 
      backgroundColor: '#1a1a1a', 
      color: '#fff',
      fontSize: '0.9rem',
      gap: '20px'
    }}>
      <div><strong>Patente:</strong> {rank}</div>
      <div><strong>Saldo:</strong> R$ {budget.toLocaleString('pt-BR')}</div>
      
      <div style={{ color: alertLevel > 60 ? '#ff4d4d' : '#ffd700', fontWeight: 'bold' }}>
        ⚠️ Risco Fiscal: {alertLevel}%
      </div>
      
      <div style={{ color: assedioLevel > 60 ? '#ff4d4d' : '#ffd700', fontWeight: 'bold' }}>
        ⚖️ Assédio Moral: {assedioLevel}%
      </div>
    </header>
  );
}

export default Header;
