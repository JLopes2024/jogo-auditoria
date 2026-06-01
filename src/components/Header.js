import React from 'react';

function Header({ budget, alertLevel, assedioLevel, rank }) {
  return (
    <header className="header-container" style={{ display: 'flex', gap: '20px', padding: '10px' }}>
      <div><strong>Patente:</strong> {rank}</div>
      <div><strong>Saldo:</strong> R$ {budget.toLocaleString('pt-BR')}</div>
      
      {/* Adicione estes indicadores */}
      <div style={{ color: alertLevel > 70 ? 'red' : 'white' }}>
        ⚠️ Risco Fiscal: {alertLevel}%
      </div>
      <div style={{ color: assedioLevel > 70 ? 'orange' : 'white' }}>
        ⚖️ Assédio Moral: {assedioLevel}%
      </div>
    </header>
  );
}

export default Header;
