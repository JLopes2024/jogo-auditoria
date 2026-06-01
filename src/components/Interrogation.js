import React from 'react';
import TerminalMiniGame from './TerminalMiniGame';
import PuzzleMiniGame from './PuzzleMiniGame';

function Interrogation({ activeSuspect, handleOptionClick, handlePresentEvidence, buyHint, feedback, inventory }) {
  if (!activeSuspect) {
    return <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}><h2>Selecione um suspeito no quadro para iniciar.</h2></div>;
  }

  if (!activeSuspect.isUnlocked && !activeSuspect.isFailed) {
    return (
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#d32f2f', margin: '0 0 5px 0' }}>🔒 Acesso Negado</h1>
        <h3 style={{ color: '#555', marginTop: '0' }}>Alvo: {activeSuspect.name} ({activeSuspect.role})</h3>
        <p>Apresente uma evidência para forçar o interrogatório.</p>
        <div style={{ marginTop: '30px', borderTop: '2px solid #ccc', paddingTop: '20px' }}>
          <h4>💼 Seu Inventário:</h4>
          {inventory.length === 0 ? (<p>Inventário vazio.</p>) : (
            inventory.map((item, index) => (
              <button key={index} onClick={() => handlePresentEvidence(item, activeSuspect)}
                style={{ display: 'block', width: '100%', padding: '15px', margin: '10px 0', cursor: 'pointer', backgroundColor: '#e3f2fd', border: '1px solid #2196f3', borderRadius: '4px', fontWeight: 'bold' }}>
                Apresentar: {item}
              </button>
            ))
          )}
        </div>
        {feedback && <div style={{ marginTop: '30px', padding: '20px', backgroundColor: feedback.includes("❌") ? '#ffebee' : '#e8f5e9', borderLeft: feedback.includes("❌") ? '5px solid #f44336' : '5px solid #4caf50' }}>{feedback}</div>}
      </div>
    );
  }

  if (activeSuspect.id === 9 && !activeSuspect.isCompleted && !activeSuspect.isFailed) {
    const handleTerminalSuccess = (evidenceName) => handleOptionClick({ isCorrect: true, evidenceGiven: evidenceName, feedback: "O script rodou perfeitamente e isolou a planilha!" });
    const handleTerminalFail = () => handleOptionClick({ isCorrect: false, feedback: "Igor percebeu o acesso indevido no servidor e apagou o disco remotamente.", assedioPenalty: 0, cost: 50000, alertPenalty: 25 });
    return (
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#d32f2f', margin: '0 0 5px 0' }}>Alvo: {activeSuspect.name}</h1>
        <h3 style={{ color: '#555', marginTop: '0' }}>{activeSuspect.role}</h3>
        <p>Rode o script de automação para extrair a prova.</p>
        <TerminalMiniGame onSuccess={handleTerminalSuccess} onFail={handleTerminalFail} />
      </div>
    );
  }

  if (activeSuspect.id === 16 && !activeSuspect.isCompleted && !activeSuspect.isFailed) {
    const handlePuzzleSuccess = (evidenceName) => handleOptionClick({ isCorrect: true, evidenceGiven: evidenceName, feedback: "Contrato reconstruído!" });
    const handlePuzzleFail = () => handleOptionClick({ isCorrect: false, feedback: "Você demorou demais e montou errado. Liminar confiscada.", assedioPenalty: 0, cost: 50000, alertPenalty: 25 });
    return (
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#d32f2f', margin: '0 0 5px 0' }}>Alvo: {activeSuspect.name}</h1>
        <h3 style={{ color: '#555', marginTop: '0' }}>{activeSuspect.role}</h3>
        <p>Remonte as peças para conseguir a confissão!</p>
        <PuzzleMiniGame onSuccess={handlePuzzleSuccess} onFail={handlePuzzleFail} />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#d32f2f', margin: '0 0 5px 0' }}>Alvo: {activeSuspect.name}</h1>
      <h3 style={{ color: '#555', marginTop: '0' }}>{activeSuspect.role}</h3>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800' }}>
        <strong>Dilema:</strong> <p>{activeSuspect.dilemma}</p>
      </div>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8eaf6', borderLeft: '5px solid #3f51b5' }}>
        <strong>Abordagem:</strong> <p style={{ fontWeight: 'bold' }}>{activeSuspect.question}</p>
      </div>

      {!activeSuspect.isCompleted && !activeSuspect.isFailed && !activeSuspect.hintPurchased && (
        <button onClick={() => buyHint(activeSuspect)} style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>
          ⚖️ Consultar Assessoria Jurídica (- R$ 10.000)
        </button>
      )}

      {activeSuspect.hintPurchased && (
        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#e1f5fe', borderLeft: '5px solid #03a9f4', color: '#01579b', fontStyle: 'italic' }}>
          <strong>Dica do Compliance:</strong> {activeSuspect.hint}
        </div>
      )}

      {!activeSuspect.isCompleted && !activeSuspect.isFailed && (
        <div style={{ marginTop: '30px' }}>
          {activeSuspect.options.map((option, index) => (
            <button key={index} onClick={() => handleOptionClick(option)} style={{ display: 'block', width: '100%', padding: '15px', margin: '10px 0', cursor: 'pointer', textAlign: 'left', fontSize: '1em', backgroundColor: '#fafafa', border: '1px solid #ccc', borderRadius: '4px' }}>
              {option.text}
            </button>
          ))}
        </div>
      )}

      {activeSuspect.isFailed && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px', color: '#c62828', textAlign: 'center', fontWeight: 'bold' }}>
          🚫 INTERROGATÓRIO ENCERRADO. A pista foi perdida.
        </div>
      )}

      {feedback && <div style={{ whiteSpace: 'pre-line', marginTop: '30px', padding: '20px', backgroundColor: feedback.includes("❌") ? '#ffebee' : '#e8f5e9', borderLeft: feedback.includes("❌") ? '5px solid #f44336' : '5px solid #4caf50' }}>{feedback}</div>}
    </div>
  );
}

export default Interrogation;