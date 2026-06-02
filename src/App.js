import React, { useState } from 'react';
import { suspectsData } from './suspectsData';
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
import EmailCenter from './components/EmailCenter';

function App() {
  const [gameStatus, setGameStatus] = useState("start"); 
  const [playerName, setPlayerName] = useState(localStorage.getItem('auditorName') || "");
  const [suspects, setSuspects] = useState(suspectsData);
  const [activeSuspect, setActiveSuspect] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [budget, setBudget] = useState(200000); 
  const [inventory, setInventory] = useState([]);
  const [analyzedEvidences, setAnalyzedEvidences] = useState([]); 
  const [alertLevel, setAlertLevel] = useState(0); 
  const [assedioLevel, setAssedioLevel] = useState(0); 
  const [activeEvent, setActiveEvent] = useState(null);
  const [isMuralUnlocked, setIsMuralUnlocked] = useState(false);

  const penaltyAmount = 50000;
  const rewardAmount = 25000; 

  const handleStartGame = (name) => {
    localStorage.setItem('auditorName', name);
    setPlayerName(name);
    setGameStatus("playing");
  };

  const currentRank = (() => {
    const evidenceCount = inventory.length;
    if (evidenceCount < 3) return "Auditor Trainee";
    if (evidenceCount < 6) return "Auditor Júnior";
    if (evidenceCount < 9) return "Auditor Pleno";
    if (evidenceCount < 12) return "Inspetor de Compliance";
    return "Diretor da Força-Tarefa";
  })();

  const checkGameOver = (newBudget, newAlert, newAssedio) => {
    if (newBudget <= 0) setGameStatus("gameover_money");
    else if (newAlert >= 100) setGameStatus("gameover_alert");
    else if (newAssedio >= 100) {
      alert("💥 PROCESSO GIGANTE! O Sindicato processou a empresa.");
      setGameStatus("gameover_alert"); 
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
    setBudget(prev => prev - 10000);
    setSuspects(prev => prev.map(s => s.id === suspect.id ? { ...s, hintPurchased: true } : s));
    setActiveSuspect(prev => ({ ...prev, hintPurchased: true }));
  };

  const handleAnalyzeEvidence = (evidenceName) => {
    setBudget(prev => prev - 15000);
    setAnalyzedEvidences([...analyzedEvidences, evidenceName]);
  };

  const handlePhishing = () => {
    alert("⚠️ ALERTA! Você clicou em um link de Phishing!");
    setBudget(prev => prev - 30000);
    setAlertLevel(prev => prev + 30);
  };

  const handleOptionClick = (option) => {
    const newAssedio = assedioLevel + (option.assedioPenalty || 0);
    setAssedioLevel(newAssedio);

    if (option.isCorrect) {
      setSuspects(prev => prev.map(s => s.id === activeSuspect.id ? { ...s, isCompleted: true } : s));
      setActiveSuspect(prev => ({ ...prev, isCompleted: true }));
      if (option.evidenceGiven && !inventory.includes(option.evidenceGiven)) {
        setInventory([...inventory, option.evidenceGiven]);
        setBudget(prev => prev + rewardAmount);
        setFeedback(`✅ ${option.feedback} \n\n 💼 PROVA COLETADA: [ ${option.evidenceGiven} ]`);
      } else {
        setFeedback(`✅ ${option.feedback}`);
      }
      if (activeSuspect.id === 13) setIsMuralUnlocked(true);
    } else {
      const optionCost = option.cost || penaltyAmount;
      setBudget(prev => prev - optionCost);
      setAlertLevel(prev => prev + (option.alertPenalty || 15));
      setSuspects(prev => prev.map(s => s.id === activeSuspect.id ? { ...s, isFailed: true } : s));
      setActiveSuspect(prev => ({ ...prev, isFailed: true }));
      setFeedback(`❌ ${option.feedback}`);
    }
  };

  const handlePresentEvidence = (evidence, suspect) => {
    if (suspect.evidenceRequired?.includes(evidence)) {
      setFeedback(`✅ Ameaça bem-sucedida!`);
      setSuspects(prev => prev.map(s => s.id === suspect.id ? { ...s, isUnlocked: true } : s));
      setActiveSuspect({ ...suspect, isUnlocked: true });
    } else {
      setBudget(prev => prev - penaltyAmount);
      setAlertLevel(prev => prev + 15);
      setFeedback(`❌ Prova inútil.`);
    }
  };

  const restartGame = () => {
    window.location.reload();
  };

  if (gameStatus === "start") return <StartScreen onStart={handleStartGame} savedName={playerName} />;
  if (gameStatus !== "playing") return <GameResult status={gameStatus} budget={budget} restartGame={restartGame} />;

  return (
    <div className="app-layout">
      <EventModal event={activeEvent} resolveEvent={handleResolveEvent} />
      <Header playerName={playerName} budget={budget} alertLevel={alertLevel} assedioLevel={assedioLevel} rank={currentRank} />
      <div className="main-body">
        <nav className="nav-menu">
          <button onClick={() => setActiveTab("dashboard")} className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}><span className="nav-icon">📊</span><span>Painel</span></button>
          <button onClick={() => setActiveTab("interrogatorio")} className={`nav-item ${activeTab === "interrogatorio" ? "active" : ""}`}><span className="nav-icon">🕵️</span><span>Interrogatório</span></button>
          <button onClick={() => setActiveTab("provas")} className={`nav-item ${activeTab === "provas" ? "active" : ""}`}><span className="nav-icon">🗂️</span><span>Provas</span></button>
          <button onClick={() => setActiveTab("email")} className={`nav-item ${activeTab === "email" ? "active" : ""}`}><span className="nav-icon">📧</span><span>E-mail</span></button>
          {isMuralUnlocked && <button onClick={() => setActiveTab("mural")} className={`nav-item ${activeTab === "mural" ? "active" : ""}`}><span className="nav-icon">📎</span><span>Relatório</span></button>}
        </nav>
        <div className="sidebar-wrapper">
          <Sidebar suspects={suspects} onSelectSuspect={(s) => {setActiveSuspect(s); setActiveTab("interrogatorio");}} activeTab={activeTab} inventory={inventory} />
        </div>
        <div className="content-area">
          {activeTab === "dashboard" && <Dashboard suspects={suspects} />}
          {activeTab === "interrogatorio" && <Interrogation activeSuspect={activeSuspect} handleOptionClick={handleOptionClick} handlePresentEvidence={handlePresentEvidence} buyHint={handleBuyHint} feedback={feedback} inventory={inventory} />}
          {activeTab === "provas" && <EvidenceRoom inventory={inventory} analyzedEvidences={analyzedEvidences} onAnalyzeEvidence={handleAnalyzeEvidence} />}
          {activeTab === "email" && <EmailCenter onPhishingClick={handlePhishing} onDenunciaClick={() => alert("✅ Denúncia Segura!")} />}
          {activeTab === "mural" && <IndictmentBoard suspects={suspects} onFinalArrest={(b) => {if(b.mentor === 13) setGameStatus("victory"); else alert("❌ Erro!");}} />}
        </div>
      </div>
    </div>
  );
}
export default App;
