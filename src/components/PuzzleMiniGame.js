import React, { useState, useEffect } from 'react';

const correctOrder = ["DOCUMENTO CONFIDENCIAL - CONSULTORIA ALPHA S.A.", "OBJETO: TRANSFERÊNCIA INTERNACIONAL DE ATIVOS", "BENEFICIÁRIO FINAL (UBO) DECLARADO:", "VICTOR - SÓCIO MAJORITÁRIO DA REDE DE ACADEMIAS"];

function PuzzleMiniGame({ onSuccess, onFail }) {
  const [pieces, setPieces] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [attempts, setAttempts] = useState(3);

  useEffect(() => { setPieces([...correctOrder].sort(() => Math.random() - 0.5)); }, []);

  const handlePieceClick = (index) => {
    if (selectedIndex === null) setSelectedIndex(index);
    else {
      const newPieces = [...pieces];
      const temp = newPieces[selectedIndex];
      newPieces[selectedIndex] = newPieces[index];
      newPieces[index] = temp;
      setPieces(newPieces); setSelectedIndex(null);
    }
  };

  const handleValidate = () => {
    if (pieces.every((piece, i) => piece === correctOrder[i])) onSuccess("Contratos de fachada da Offshore");
    else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      if (newAttempts <= 0) onFail();
    }
  };

  return (
    <div style={{ backgroundColor: '#e0e0e0', padding: '20px', borderRadius: '5px' }}>
      <h3 style={{ color: '#333' }}>🧩 Análise Forense</h3>
      <p>Tentativas restantes: {attempts}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {pieces.map((piece, index) => (
          <div key={index} onClick={() => handlePieceClick(index)} style={{ backgroundColor: selectedIndex === index ? '#bbdefb' : '#fff', border: selectedIndex === index ? '2px dashed #1976d2' : '1px solid #ccc', padding: '15px', cursor: 'pointer', fontFamily: 'monospace' }}>{piece}</div>
        ))}
      </div>
      <button onClick={handleValidate} style={{ marginTop: '20px', width: '100%', padding: '15px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Validar Documento Reconstruído</button>
    </div>
  );
}

export default PuzzleMiniGame;