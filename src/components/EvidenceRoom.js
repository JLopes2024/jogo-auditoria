import React from 'react';
import { evidenceDictionary } from '../evidenceDictionary';

function EvidenceRoom({ inventory, analyzedEvidences, onAnalyzeEvidence }) {
  if (inventory.length === 0) {
    return (
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ color: '#64748b' }}>🗄️ Sala de Evidências Vazia</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px' }}>
      <h1 style={{ color: '#1e293b', marginTop: 0, borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>🗂️ Arquivo de Evidências</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {inventory.map((evidenceName, index) => {
          const evidenceData = evidenceDictionary[evidenceName];
          const isAnalyzed = analyzedEvidences.includes(evidenceName);
          return (
            <div key={index} style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', backgroundColor: '#f8fafc' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2563eb' }}>📄 {evidenceName}</h3>
              <p style={{ margin: '0 0 15px 0', color: '#334155' }}><strong>Descrição:</strong> {evidenceData ? evidenceData.description : "Análise pendente."}</p>
              {isAnalyzed ? (
                <div style={{ backgroundColor: '#ecfdf5', padding: '15px', borderRadius: '5px', borderLeft: '4px solid #10b981', color: '#065f46', fontWeight: 'bold' }}>🎯 {evidenceData ? evidenceData.hint : "Dados insuficientes."}</div>
              ) : (
                <button onClick={() => onAnalyzeEvidence(evidenceName)} style={{ backgroundColor: '#f59e0b', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🔍 Rastrear Conexões (- R$ 15.000)</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EvidenceRoom;