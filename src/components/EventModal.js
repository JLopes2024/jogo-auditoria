import React, { useState, useEffect } from 'react';

function EventModal({ event, resolveEvent }) {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (!event) return;
    setTimeLeft(15);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const worstOption = event.options.reduce((prevOption, currentOption) => 
            (prevOption.alertPenalty > currentOption.alertPenalty) ? prevOption : currentOption
          );
          const timeoutOption = { ...worstOption, feedback: `⏳ TEMPO ESGOTADO! ${worstOption.feedback}` };
          resolveEvent(timeoutOption);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [event, resolveEvent]);

  if (!event) return null;

  const timePercent = (timeLeft / 15) * 100;
  let barColor = '#10b981';
  if (timeLeft <= 5) barColor = '#ef4444';
  else if (timeLeft <= 10) barColor = '#f59e0b';

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', maxWidth: '600px', width: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', borderTop: `6px solid ${barColor}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ color: '#ef4444', margin: 0 }}>⚠️ DECISÃO EXECUTIVA</h2>
          <span style={{ fontSize: '1.8em', fontWeight: 'bold', color: barColor }}>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '25px', overflow: 'hidden' }}>
          <div style={{ width: `${timePercent}%`, height: '100%', backgroundColor: barColor, transition: 'width 1s linear' }}></div>
        </div>
        <h3 style={{ marginTop: 0 }}>{event.title}</h3>
        <p>{event.description}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {event.options.map((option, index) => (
            <button key={index} onClick={() => resolveEvent(option)} className="btn" style={{ padding: '15px', cursor: 'pointer', textAlign: 'left', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '5px', fontWeight: 'bold' }}>{option.text}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventModal;