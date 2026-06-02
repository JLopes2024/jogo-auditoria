import React, { useState } from 'react';

function Dashboard({ suspects }) {
  const [activeView, setActiveView] = useState("geral"); 
  const [audited, setAudited] = useState({ u1: false, u2: false, u3: false, sede: false });

  const handleVerdict = (unit, correctVerdictId, selectedVerdict) => {
    if (!selectedVerdict) return;
    if (selectedVerdict === correctVerdictId) {
      setAudited({ ...audited, [unit]: true });
      alert("✅ VEREDITO APROVADO! O Ministério Público aceitou seu relatório.");
    } else {
      alert("❌ VEREDITO REJEITADO! A análise técnica está incorreta. Revise os dados do dossiê.");
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#1e293b', marginTop: 0, borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
        📁 Terminal de Dossiês (Força-Tarefa)
      </h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveView("geral")} style={tabStyle(activeView === "geral")}>🏛️ Visão Geral</button>
        <button onClick={() => setActiveView("u1")} style={tabStyle(activeView === "u1")}>📍 Unidade 1 {audited.u1 && "✅"}</button>
      </div>

      {activeView === "geral" && (
        <div>
          <h3>Bem-vindo, Auditor.</h3>
          <p>Selecione uma unidade no menu acima para iniciar a análise dos dossiês criminais.</p>
        </div>
      )}

      {activeView === "u1" && (
        <div>
          <h2 style={{ color: '#1e293b' }}>Dossiê: Unidade 1 (Centro)</h2>
          <VerdictSection unit="u1" isAudited={audited.u1} suspects={suspects} requiredIds={[1, 5]} 
            options={[
              { id: 'v1', text: 'Sonegação Fiscal.' },
              { id: 'v2', text: 'Pejotização Ilegal (Vínculo Empregatício).' },
              { id: 'v3', text: 'Terceirização lícita.' }
            ]}
            correctId="v2" onVerdict={handleVerdict}
          />
        </div>
      )}
    </div>
  );
}

function VerdictSection({ unit, isAudited, options, correctId, onVerdict, suspects, requiredIds }) {
  const [selected, setSelected] = useState("");

  const missingSuspects = requiredIds?.filter(id => {
      const s = suspects?.find(x => x.id === id);
      return s && !s.isCompleted && !s.isFailed; 
    }).map(id => suspects.find(x => x.id === id)?.name) || [];

  const isLocked = missingSuspects.length > 0;

  if (isAudited) return (
    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '8px' }}>
      <h2 style={{ color: '#166534', margin: 0 }}>✅ AUDITORIA CONCLUÍDA</h2>
    </div>
  );

  if (isLocked) return (
    <div style={{ marginTop: '30px', backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', border: '1px solid #94a3b8', textAlign: 'center' }}>
      <h3>🔒 Bloqueado</h3>
      <p>Interrogue: <strong>{missingSuspects.join(', ')}</strong>.</p>
    </div>
  );

  return (
    <div style={{ marginTop: '30px', backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ marginTop: 0 }}>📑 Emissão de Parecer Técnico</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {options.map(opt => (
          <label key={opt.id} style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer' }}>
            <input type="radio" name={unit} value={opt.id} checked={selected === opt.id} onChange={(e) => setSelected(e.target.value)} />
            <span style={{ marginLeft: '10px' }}>{opt.text}</span>
          </label>
        ))}
      </div>
      <button 
        disabled={!selected}
        onClick={() => onVerdict(unit, correctId, selected)} 
        style={{ marginTop: '20px', padding: '12px', width: '100%', cursor: 'pointer', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Enviar Relatório
      </button>
    </div>
  );
}

const tabStyle = (isActive) => ({ padding: '10px 15px', backgroundColor: isActive ? '#2563eb' : '#f1f5f9', color: isActive ? '#fff' : '#475569', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' });

export default Dashboard;
