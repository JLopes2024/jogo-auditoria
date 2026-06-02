import React, { useState } from 'react';
import VirusScreen from './VirusScreen'; 

const initialEmails = [
  { id: 1, from: "TI (Suporte)", subject: "ATUALIZAÇÃO DE SENHA", body: "Sua senha expirou. Clique aqui para resetar agora ou sua conta será bloqueada.", isPhishing: true },
  { id: 2, from: "Canal de Ética", subject: "DENÚNCIA: Unidade 2", body: "Vi a Fernanda (Vendas) gerando CPFs falsos em massa no fim do mês. Cuidado, ela sabe quem denuncia.", isPhishing: false },
  { id: 3, from: "Diretoria", subject: "Folha de Pagamentos", body: "Segue em anexo a planilha com todos os salários. Favor verificar.", isPhishing: true },
  { id: 4, from: "Financeiro", subject: "Urgente: Assinatura CEO", body: "Segue o contrato com a offshore. O CEO solicitou sigilo absoluto sobre os valores.", isPhishing: false, isEvidence: true }
];

function EmailCenter({ onPhishingClick, onDenunciaClick }) {
  const [inbox, setInbox] = useState(initialEmails);
  const [sentItems, setSentItems] = useState([]);
  const [hacked, setHacked] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' ou 'sent'

  const handleOpenEmail = (email) => {
    // Move para a caixa de saída (consultados)
    setInbox(inbox.filter(e => e.id !== email.id));
    setSentItems([...sentItems, email]);

    if (email.isPhishing) {
      setHacked(true);
      onPhishingClick();
    } else {
      if (email.isEvidence) alert("🔍 PROVA ENCONTRADA: Contrato do CEO interceptado!");
      onDenunciaClick();
    }
  };

  if (hacked) return <VirusScreen onFinish={() => setHacked(false)} />;

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <h2 onClick={() => setActiveTab('inbox')} style={{ cursor: 'pointer', color: activeTab === 'inbox' ? '#2563eb' : '#64748b' }}>📥 Caixa de Entrada ({inbox.length})</h2>
        <h2 onClick={() => setActiveTab('sent')} style={{ cursor: 'pointer', color: activeTab === 'sent' ? '#2563eb' : '#64748b' }}>📤 Consultados ({sentItems.length})</h2>
      </div>

      {(activeTab === 'inbox' ? inbox : sentItems).map(email => (
        <div key={email.id} style={{ border: '1px solid #e2e8f0', margin: '10px 0', padding: '15px', borderRadius: '5px' }}>
          <strong>De: {email.from}</strong><br/>
          <strong>Assunto: {email.subject}</strong>
          <p>{email.body}</p>
          
          {activeTab === 'inbox' && (
            <button onClick={() => handleOpenEmail(email)} style={buttonStyle}>
              Abrir E-mail
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '4px'
};

export default EmailCenter;
