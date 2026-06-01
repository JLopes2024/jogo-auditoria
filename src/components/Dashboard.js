import React, { useState } from 'react';

function Dashboard({ suspects }) {
  const [activeView, setActiveView] = useState("geral"); 
  const [audited, setAudited] = useState({ u1: false, u2: false, u3: false, sede: false });
  
  const [faturamento, setFaturamento] = useState('');
  const [socios, setSocios] = useState('');
  const [resultadoSimulacao, setResultadoSimulacao] = useState(null);

  const handleSimular = () => {
    if (!faturamento || !socios) {
      alert("Preencha o faturamento e o número de sócios para simular.");
      return;
    }
    let natureza = "", porte = "", regime = "", alerta = "";
    if (faturamento === "81k") porte = "Microempreendedor (Limite MEI)";
    else if (faturamento === "360k") porte = "ME (Microempresa)";
    else if (faturamento === "4.8m") porte = "EPP (Empresa de Pequeno Porte)";
    else porte = "Médio e Grande Porte";

    if (socios === "1") {
      natureza = faturamento === "81k" ? "MEI, SLU ou EI" : "SLU ou EI";
      regime = faturamento === "gigante" ? "Lucro Real" : "Simples Nacional ou Lucro Presumido";
      if (socios === "1" && faturamento !== "81k") alerta = "Atenção: Passou do limite do MEI. Desenquadramento obrigatório!";
    } else if (socios === "2+") {
      natureza = "LTDA ou Sociedade Simples";
      regime = faturamento === "gigante" ? "Lucro Real" : "Simples ou Presumido";
      if (faturamento === "81k") alerta = "Fraude: MEI não pode ter sócios!";
    } else {
      natureza = "S/A (Sociedade Anônima)";
      regime = "Lucro Real ou Presumido";
      alerta = "S/A exige compliance rigoroso. Vedado Simples Nacional.";
    }
    setResultadoSimulacao({ natureza, porte, regime, alerta });
  };

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
        <button onClick={() => setActiveView("u2")} style={tabStyle(activeView === "u2")}>📍 Unidade 2 {audited.u2 && "✅"}</button>
        <button onClick={() => setActiveView("u3")} style={tabStyle(activeView === "u3")}>📍 Unidade 3 {audited.u3 && "✅"}</button>
        <button onClick={() => setActiveView("sede")} style={tabStyle(activeView === "sede")}>💼 Sede {audited.sede && "✅"}</button>
      </div>

      {activeView === "geral" && (
        <div>
          <h3 style={{ color: '#0f172a' }}>Simulador de Enquadramento da Receita Federal</h3>
          <p style={{ color: '#475569' }}>Cruze o faturamento e a estrutura societária para descobrir crimes de desenquadramento.</p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontWeight: 'bold' }}>1. Faturamento Bruto</label>
              <select value={faturamento} onChange={(e) => setFaturamento(e.target.value)} style={selectStyle}>
                <option value="">-- Selecione --</option>
                <option value="81k">Até R$ 81.000,00</option>
                <option value="360k">Até R$ 360 mil</option>
                <option value="4.8m">Até R$ 4,8 milhões</option>
                <option value="78m">Até R$ 78 milhões</option>
                <option value="gigante">Acima de R$ 78 milhões</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontWeight: 'bold' }}>2. Estrutura Societária</label>
              <select value={socios} onChange={(e) => setSocios(e.target.value)} style={selectStyle}>
                <option value="">-- Selecione --</option>
                <option value="1">Sem sócios</option>
                <option value="2+">Dois ou mais sócios</option>
                <option value="acoes">Capital em Ações</option>
              </select>
            </div>
            <div style={{ width: '100%' }}>
              <button onClick={handleSimular} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Testar Legalidade</button>
            </div>
          </div>
          {resultadoSimulacao && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#eff6ff', borderLeft: '5px solid #2563eb' }}>
              <p><strong>Natureza:</strong> {resultadoSimulacao.natureza}</p>
              <p><strong>Porte:</strong> {resultadoSimulacao.porte}</p>
              <p><strong>Regime:</strong> {resultadoSimulacao.regime}</p>
              {resultadoSimulacao.alerta && <p style={{ color: '#dc2626', fontWeight: 'bold' }}>🚨 {resultadoSimulacao.alerta}</p>}
            </div>
          )}
        </div>
      )}

      {activeView === "u1" && (
        <div>
          <h2 style={{ color: '#1e293b' }}>Dossiê: Unidade 1 (Centro)</h2>
          <div style={dossierGrid}>
            <div style={dossierCard}><strong>Gestão:</strong> Diego (Gerente)</div>
            <div style={dossierCard}><strong>Alvos:</strong> Carlos (Instrutor Chefe)</div>
          </div>
          <div style={reportBox}>
            <strong>Legislação e Campo:</strong> Carlos abriu uma empresa MEI, mas é obrigado a bater ponto, usar a camisa da academia, não pode mandar substitutos e obedece ordens diretas. Exige dinheiro vivo dos alunos para compensar.
          </div>
          <VerdictSection unit="u1" isAudited={audited.u1} suspects={suspects} requiredIds={[1, 5]} 
            options={[
              { id: 'v1', text: 'Sonegação Fiscal Exclusiva da Empresa.' },
              { id: 'v2', text: 'Pejotização Ilegal (Vínculo Empregatício Mascarado).' },
              { id: 'v3', text: 'Processo lícito de Terceirização (Lei 13.429).' }
            ]}
            correctId="v2" onVerdict={handleVerdict}
          />
        </div>
      )}

      {activeView === "u2" && (
        <div>
          <h2 style={{ color: '#1e293b' }}>Dossiê: Unidade 2 (Zona Sul)</h2>
          <div style={dossierGrid}>
            <div style={dossierCard}><strong>Gestão:</strong> Luciana (Gerente)</div>
            <div style={dossierCard}><strong>Alvos:</strong> Fernanda (Supervisora de Vendas)</div>
          </div>
          <div style={reportBox}>
            <strong>Relatório:</strong> Unidade registra centenas de matrículas no último dia do mês. 80% são canceladas misteriosamente 24 horas depois, antes do faturamento do cartão de crédito.
          </div>
          <VerdictSection unit="u2" isAudited={audited.u2} suspects={suspects} requiredIds={[4, 8]} 
            options={[
              { id: 'v1', text: 'Inflação artificial de métricas para enganar investidores (Fraude de Valuation).' },
              { id: 'v2', text: 'Direito de Arrependimento legal.' },
              { id: 'v3', text: 'Lavagem de dinheiro via mensalidades superfaturadas.' }
            ]}
            correctId="v1" onVerdict={handleVerdict}
          />
        </div>
      )}

      {activeView === "u3" && (
        <div>
          <h2 style={{ color: '#1e293b' }}>Dossiê: Unidade 3 (Norte)</h2>
          <div style={dossierGrid}>
            <div style={dossierCard}><strong>Gestão:</strong> Sem gerente fixo</div>
            <div style={dossierCard}><strong>Alvos:</strong> Mariana (Recepcionista)</div>
          </div>
          <div style={reportBox}>
            <strong>Relatório:</strong> Venda de suplementos na recepção. O dinheiro entra direto na gaveta, sem nota fiscal.
          </div>
          <VerdictSection unit="u3" isAudited={audited.u3} suspects={suspects} requiredIds={[2]} 
            options={[
              { id: 'v1', text: 'Venda legalizada de produtos isentos.' },
              { id: 'v2', text: 'Justa causa por apropriação indébita isolada.' },
              { id: 'v3', text: 'Sonegação Fiscal contínua somada a grave Infração Sanitária.' }
            ]}
            correctId="v3" onVerdict={handleVerdict}
          />
        </div>
      )}

      {activeView === "sede" && (
        <div>
          <h2 style={{ color: '#1e293b' }}>Dossiê: Sede & Fornecedores</h2>
          <div style={dossierGrid}>
            <div style={dossierCard}><strong>Alvos:</strong> Roberto (MEI), CFO, CEO</div>
          </div>
          <div style={reportBox}>
            <strong>Relatório:</strong> A Sede autoriza o pagamento mensal de R$ 250 mil para Manutenção (MEI). Há saídas milionárias para a Alpha offshore.
          </div>
          <VerdictSection unit="sede" isAudited={audited.sede} suspects={suspects} requiredIds={[3, 7, 10]} 
            options={[
              { id: 'v1', text: 'Falha na pesquisa de preços de mercado.' },
              { id: 'v2', text: 'Lavagem de dinheiro via Notas Frias (MEI) e Evasão de Divisas (Offshore).' },
              { id: 'v3', text: 'Estratégia legal de elisão fiscal.' }
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

  const missingSuspects = requiredIds
    ?.filter(id => {
      const s = suspects?.find(x => x.id === id);
      return s && !s.isCompleted && !s.isFailed; 
    })
    .map(id => suspects.find(x => x.id === id)?.name) || [];

  const isLocked = missingSuspects.length > 0;

  if (isAudited) return (
    <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '8px', textAlign: 'center' }}>
      <h2 style={{ color: '#166534', margin: 0 }}>✅ AUDITORIA CONCLUÍDA</h2>
    </div>
  );

  if (isLocked) return (
    <div style={{ marginTop: '30px', backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', border: '1px solid #94a3b8', textAlign: 'center' }}>
      <h3 style={{ marginTop: 0, color: '#475569' }}>🔒 Emissão de Parecer Bloqueada</h3>
      <p style={{ color: '#64748b' }}>Interrogue os alvos antes de emitir o veredito: <strong style={{ color: '#dc2626' }}>{missingSuspects.join(', ')}</strong>.</p>
    </div>
  );

  return (
    <div style={{ marginTop: '30px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
      <h3 style={{ marginTop: 0, color: '#dc2626' }}>⚖️ Veredito da Força-Tarefa</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
        {options.map(opt => (
          <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer' }}>
            <input type="radio" name={`verdict-${unit}`} value={opt.id} checked={selected === opt.id} onChange={(e) => setSelected(e.target.value)} />
            {opt.text}
          </label>
        ))}
      </div>
      <button onClick={() => onVerdict(unit, correctId, selected)} style={{ marginTop: '20px', padding: '12px 20px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
        Emitir Parecer Oficial
      </button>
    </div>
  );
}

const tabStyle = (isActive) => ({ padding: '10px 15px', backgroundColor: isActive ? '#2563eb' : '#f1f5f9', color: isActive ? '#fff' : '#475569', border: '1px solid #cbd5e1', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' });
const dossierGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' };
const dossierCard = { backgroundColor: '#eff6ff', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #2563eb', color: '#1e293b' };
const reportBox = { padding: '20px', backgroundColor: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', color: '#92400e', lineHeight: '1.6' };
const selectStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '5px' };

export default Dashboard;