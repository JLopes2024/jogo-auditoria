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
  const [turnCounter, setTurnCounter] = useState(0);
  const [activeEvent, setActiveEvent] = useState(null);
  const [isMuralUnlocked, setIsMuralUnlocked] = useState(false);

  const penaltyAmount = 50000;
  const rewardAmount = 25000; 

  const handleStartGame = (name) => {
    localStorage.setItem('auditorName', name);
    setPlayerName(name);
    setGameStatus("playing");
  };

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

  const handlePhishing = () => {
    alert("⚠️ ALERTA! Você clicou em um link de Phishing! Seus dados foram criptografados.");
    setBudget(prev => prev - 30000);
    setAlertLevel(prev => prev + 30);
    checkGameOver(budget - 30000, alertLevel + 30, assedioLevel);
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
        setBudget(prev => prev + rewardAmount);
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
      setFeedback(`✅ Amea
