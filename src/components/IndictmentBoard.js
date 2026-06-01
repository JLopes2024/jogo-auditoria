import React, { useState } from 'react';

function IndictmentBoard({ suspects, onFinalArrest }) {
  const [board, setBoard] = useState({ mentor: null, juridico: null, financeiro: null, contabil: null, lavagem: null, dados: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectingRole, setSelectingRole] = useState(null);

  const availableSuspects = suspects.filter(s => s.isUnlocked);

  const openSelection = (role) => { setSelectingRole(role); setIsModalOpen(true); };
  const handleSelectSuspect = (suspectId) => { setBoard({ ...board, [selectingRole]: suspectId }); setIsModalOpen(false); setSelectingRole(null); };

  const handleSubmit = () => {
    if (Object.values(board).includes(null)) { alert("⚠️ Preencha o organograma completo."); return; }
    onFinalArrest(board);
  };

  const renderNode = (roleKey, roleTitle) => {
    const suspectId = board[roleKey];
    const suspect = suspectId ? suspects.find(s => s.id === suspectId) : null;
    return (
      <div className={`tree-node ${suspect ? 'filled' : ''}`} onClick={() => openSelection(roleKey)}>
        <div className="node-role">{roleTitle}</div>
        {suspect ? (<div className="node-name">{suspect.name}</div>) : (<div style={{ color: '#94a3b8', fontSize: '2em' }}>+</div>)}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#1e293b', marginTop: 0, borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>📎 Quadro da Polícia Federal</h1>
      <p style={{ color: '#64748b' }}>Construa a hierarquia da quadrilha clicando nos espaços.</p>
      <div className="tree-container">
        <div className="tree-level">{renderNode('mentor', '1. Beneficiário Final')}</div>
        <div style={{ color: '#cbd5e1', fontSize: '1.5em' }}>⬇</div>
        <div className="tree-level">{renderNode('juridico', '2. Blindagem Offshore')}{renderNode('financeiro', '3. Valuation Falso')}</div>
        <div style={{ color: '#cbd5e1', fontSize: '1.5em' }}>⬇</div>
        <div className="tree-level">{renderNode('contabil', '4. Co-autoria Contábil')}{renderNode('lavagem', '5. Lavagem (MEI)')}{renderNode('dados', '6. Ocultação T.I.')}</div>
      </div>
      <button onClick={handleSubmit} className="btn" style={{ marginTop: '40px', padding: '20px', fontSize: '1.2em', cursor: 'pointer', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '900', width: '100%' }}>🚔 Assinar Mandados de Prisão</button>

      {isModalOpen && (
        <div className="suspect-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="suspect-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0, color: '#1e293b' }}>Selecione o Suspeito</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {availableSuspects.map(s => (
                <button key={s.id} onClick={() => handleSelectSuspect(s.id)} style={{ padding: '15px', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#334155' }}>
                  {s.name} <span style={{ fontWeight: 'normal', color: '#64748b', display: 'block', fontSize: '0.85em' }}>{s.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndictmentBoard;