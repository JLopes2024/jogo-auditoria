import React from 'react';

function Header({ user, budget, alertLevel, assedioLevel, rank }) {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '15px 30px', 
      backgroundColor: '#1a1a1a', 
      color: '#fff',
      alignItems: 'center'
    }}>
      <div>
        <strong>🎖️ {rank}</strong> | 💰 R$ {budget?.toLocaleString('pt-BR')}
      </div>
      
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{user.displayName}</span>
          
        </div>
      ) : (
        <span>Não autenticado</span>
      )}
    </header>
  );
}

export default Header;