import React, { useState } from 'react';
import { suspectsData } from './suspectsData';
import { eventsData } from './eventsData';
import './App.css'; 

import StartScreen from './components/StartScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Interrogation from './components/Interrogation';
import GameResult from './components/GameResult';
import EventModal from './components/EventModal';
import IndictmentBoard from './components/IndictmentBoard';
import EvidenceRoom from './components/EvidenceRoom';

function App() {
  const [gameStatus, setGameStatus] = useState("start"); 
  const [suspects, setSuspects] = useState(suspectsData);
  const [activeSuspect, setActiveSuspect] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [budget, setBudget] = useState(200000); 
  const [inventory, setInventory] = useState([]);
  const [analyzedEvidences, setAnalyzedEvidences] = useState([]); 
  const [alertLevel, setAlertLevel] = useState(0); 
  const [assedioLevel, setAssedioLevel] = useState(0); 
  const [turnCounter, setTurnCounter] = useState(0);
  const [activeEvent, setActiveEvent] = useState(null);
  const [isMuralUnlocked, setIsMuralUnlocked] = useState(false);

  const penaltyAmount = 50000;
  const rewardAmount = 25000; 

  const getPlayerRank = () => {
    const evidenceCount = inventory.length;
    if (evidenceCount < 3) return "Auditor Trainee";
    if (evidenceCount < 6) return "Auditor Júnior";
    if (evidenceCount < 9) return "Auditor Pleno";
    if (evidenceCount < 12) return "Inspetor de Compliance";
    return "Diretor da Força-Tarefa";
  };

  const currentRank = getPlayerRank();

  const checkGameOver = (newBudget, newAlert, newAssedio) => {
    if (newBudget <= 0) setGameStatus("gameover_money");
    else if (newAlert >= 100) setGameStatus("gameover_alert");
    else if (newAssedio >= 100) {
      alert("💥 PROCESSO GIGANTE! O Sindicato processou a empresa por Assédio Moral.");
      setGameStatus("gameover_alert"); 
    }
  };

  const advanceTurn = () => {
    const nextTurn = turnCounter + 1;
    setTurnCounter(nextTurn);
    if (nextTurn % 2 === 0) {
      const eventIndex = (nextTurn / 2) - 1;
      if (eventsData[eventIndex]) setActiveEvent(eventsData[eventIndex]);
    }
  };

  const handleResolveEvent = (option) => {
    const newBudget = budget - option.cost;
    const newAlert = alertLevel + option.alertPenalty;
    setBudget(newBudget); setAlertLevel(newAlert);
    setFeedback(`🔔 Evento Resolvido: ${option.feedback}`);
    setActiveEvent(null); checkGameOver(newBudget, newAlert, assedioLevel);
  };

  const handleBuyHint = (suspect) => {
    const newBudget = budget - 10000;
    setBudget(newBudget);
    setSuspects(prev => prev.map(s => s.id === suspect.id ? { ...s, hintPurchased: true } : s));
    setActiveSuspect(prev => ({ ...prev, hintPurchased: true }));
    checkGameOver(newBudget, alertLevel, assedioLevel);
  };

  const handleAnalyzeEvidence = (evidenceName) => {
    const newBudget = budget - 15000;
    setBudget(newBudget);
    setAnalyzedEvidences([...analyzedEvidences, evidenceName]);
    checkGameOver(newBudget, alertLevel, assedioLevel);
  };

  const handleOptionClick = (option) => {
    const penaltyAssedio = option.assedioPenalty || 0;
    const newAssedio = assedioLevel + penaltyAssedio;
    setAssedioLevel(newAssedio);

    if (option.isCorrect) {
      setSuspects(prev => prev.map(s => s.id === activeSuspect.id ? { ...s, isCompleted: true } : s));
      setActiveSuspect(prev => ({ ...prev, isCompleted: true }));

      if (option.evidenceGiven && !inventory.includes(option.evidenceGiven)) {
        setInventory([...inventory, option.evidenceGiven]);
        const newBudget = budget + rewardAmount;
        setBudget(newBudget);
        setFeedback(`✅ ${option.feedback} \n\n 💼 PROVA COLETADA: [ ${option.evidenceGiven} ]`);
      } else {
        setFeedback(`✅ ${option.feedback}`);
      }
      
      if (activeSuspect.id === 13) setIsMuralUnlocked(true);
      checkGameOver(budget, alertLevel, newAssedio); 
    } else {
      const alertPenaltyVal = option.alertPenalty || 15;
      const optionCost = option.cost || penaltyAmount;
      const newBudget = budget - optionCost;
      const newAlert = alertLevel + alertPenaltyVal;
      setBudget(newBudget); setAlertLevel(newAlert);
      setSuspects(prev => prev.map(s => s.id === activeSuspect.id ? { ...s, isFailed: true } : s));
      setActiveSuspect(prev => ({ ...prev, isFailed: true }));
      setFeedback(`❌ ${option.feedback} \n PENALIDADE: - R$ ${optionCost.toLocaleString('pt-BR')}`);
      checkGameOver(newBudget, newAlert, newAssedio);
    }
    advanceTurn();
  };

  const handlePresentEvidence = (evidence, suspect) => {
    if (suspect.evidenceRequired && suspect.evidenceRequired.includes(evidence)) {
      setFeedback(`✅ Ameaça bem-sucedida!`);
      setSuspects(prev => prev.map(s => s.id === suspect.id ? { ...s, isUnlocked: true } : s));
      setActiveSuspect({ ...suspect, isUnlocked: true });
    } else {
      const newBudget = budget - penaltyAmount;
      const newAlert = alertLevel + 15;
      setBudget(newBudget); setAlertLevel(newAlert);
      setFeedback(`❌ Prova inútil.`);
      checkGameOver(newBudget, newAlert, assedioLevel);
    }
  };

  const handleSelectSuspect = (suspect) => {
    setActiveSuspect(suspect); setFeedback(""); setActiveTab("interrogatorio"); 
  };

  const handleFinalArrest = (board) => {
    if (board.mentor === 13 && board.juridico === 16 && board.financeiro === 10 && board.contabil === 11 && board.lavagem === 3 && board.dados === 9) {
      setGameStatus("victory");
    } else {
      setBudget(budget - penaltyAmount);
      alert(`❌ INDICIAMENTO REJEITADO!`);
    }
  };

  const restartGame = () => {
    setSuspects(suspectsData); setActiveSuspect(null); setFeedback(""); setActiveTab("dashboard");
    setBudget(200000); setInventory([]); setAnalyzedEvidences([]); setAlertLevel(0); setAssedioLevel(0);
    setTurnCounter(0); setActiveEvent(null); setIsMuralUnlocked(false); setGameStatus("start");
  };

  if (gameStatus === "start") return <StartScreen onStart={() => setGameStatus("playing")} />;
  if (gameStatus !== "playing") return <GameResult status={gameStatus} budget={budget} restartGame={restartGame} />;

  return (
    <div className="app-layout">
      <EventModal event={activeEvent} resolveEvent={handleResolveEvent} />
      <Header budget={budget} alertLevel={alertLevel} assedioLevel={assedioLevel} rank={currentRank} />
      <div className="main-body">
        <nav className="nav-menu">
          <button onClick={() => setActiveTab("dashboard")} className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}><span className="nav-icon">📊</span><span>Painel</span></button>
          <button onClick={() => setActiveTab("suspeitos")} className={`nav-item mobile-only ${activeTab === "suspeitos" ? "active" : ""}`}><span className="nav-icon">👥</span><span>Alvos</span></button>
          <button onClick={() => setActiveTab("interrogatorio")} className={`nav-item ${activeTab === "interrogatorio" ? "active" : ""}`}><span className="nav-icon">🕵️</span><span>Interrogatório</span></button>
          <button onClick={() => setActiveTab("provas")} className={`nav-item ${activeTab === "provas" ? "active" : ""}`}><span className="nav-icon">🗂️</span><span>Provas</span></button>
          {isMuralUnlocked && (<button onClick={() => setActiveTab("mural")} className={`nav-item ${activeTab === "mural" ? "active" : ""}`}><span className="nav-icon">📎</span><span>Relatório</span></button>)}
        </nav>
        <div className="desktop-sidebar">
          <Sidebar suspects={suspects} onSelectSuspect={handleSelectSuspect} activeTab="interrogatorio" inventory={inventory} />
        </div>
        <div className="content-area">
          <div style={{ display: activeTab === 'suspeitos' ? 'block' : 'none', width: '100%' }} className="mobile-only">
            <Sidebar suspects={suspects} onSelectSuspect={handleSelectSuspect} activeTab={activeTab} inventory={inventory} />
          </div>
          {activeTab === "dashboard" && <Dashboard suspects={suspects} />}
          {activeTab === "interrogatorio" && (<Interrogation activeSuspect={activeSuspect} handleOptionClick={handleOptionClick} handlePresentEvidence={handlePresentEvidence} buyHint={handleBuyHint} feedback={feedback} inventory={inventory} />)}
          {activeTab === "provas" && (<EvidenceRoom inventory={inventory} analyzedEvidences={analyzedEvidences} onAnalyzeEvidence={handleAnalyzeEvidence} />)}
          {activeTab === "mural" && (<IndictmentBoard suspects={suspects} onFinalArrest={handleFinalArrest} />)}
        </div>
      </div>
    </div>
  );
}

export default App;