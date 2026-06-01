import React from 'react';

function Sidebar({ suspects, onSelectSuspect, activeTab }) {
  // O clique é permitido se estiver na aba "interrogatorio" (PC) ou "suspeitos" (Mobile)
  const isClickable = activeTab === "interrogatorio" || activeTab === "suspeitos";

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px 0', boxSizing: 'border-box' }}>
      <h2 style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '10px', marginTop: 0, color: '#1e293b' }}>
        Alvos da Investigação
      </h2>
      
      {!isClickable && (
        <div style={{ padding: '10px', backgroundColor: '#fff3e0', color: '#e65100', fontSize: '0.85em', borderRadius: '4px', marginBottom: '15px', fontWeight: 'bold' }}>
          ⚠️ Vá para a aba de Interrogatório para interagir.
        </div>
      )}

      {suspects.map(suspect => {
        let statusClass = "locked";
        if (suspect.isCompleted) statusClass = "completed";
        else if (suspect.isFailed) statusClass = "failed";
        else if (suspect.isUnlocked) statusClass = "unlocked";

        const clickableClass = isClickable ? "clickable" : "not-clickable";

        return (
          <div
            key={suspect.id}
            onClick={() => isClickable && onSelectSuspect(suspect)}
            className={`suspect-card ${statusClass} ${clickableClass}`}
            style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}
          >
            <strong style={{ fontSize: '1.1em' }}>{suspect.name}</strong> <br/>
            <span style={{ fontSize: '0.9em', color: '#64748b' }}>Nível {suspect.tier} - {suspect.role}</span>
            
            {!suspect.isUnlocked && !suspect.isFailed && !suspect.isCompleted && (
              <span style={{display: 'block', color: 'var(--danger)', fontSize: '0.85em', marginTop: '6px', fontWeight: '500'}}>
                🔒 Bloqueado (Requer Prova)
              </span>
            )}
            {suspect.isCompleted && (
              <span style={{display: 'block', color: 'var(--success)', fontSize: '0.85em', marginTop: '6px', fontWeight: 'bold'}}>
                ✅ Confissão Extraída
              </span>
            )}
            {suspect.isFailed && (
              <span style={{display: 'block', color: 'var(--danger)', fontSize: '0.85em', marginTop: '6px', fontWeight: 'bold'}}>
                ❌ Interrogatório Fracassado
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;