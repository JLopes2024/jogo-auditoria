import React, { useState } from 'react';
import VirusScreen from './VirusScreen'; 

const initialEmails = [
  { id: 1, from: "TI (Suporte)", subject: "ATUALIZAÇÃO DE SENHA", body: "Sua senha expirou. Clique aqui para resetar agora ou sua conta será bloqueada.", isPhishing: true },
  { id: 2, from: "Canal de Ética", subject: "DENÚNCIA: Unidade 2", body: "Vi a Fernanda (Vendas) gerando CPFs falsos em massa no fim do mês. Cuidado, ela sabe quem denuncia.", isPhishing: false },
  { id: 3, from: "Diretoria", subject: "Folha de Pagamentos", body: "Segue em anexo a planilha com todos os salários. Favor verificar.", isPhishing: true },
  { id: 4, from: "Financeiro", subject: "Urgente: Assinatura CEO", body: "Segue o contrato com a offshore. O CEO solicitou sigilo absoluto sobre os valores.", isPhishing: false, isEvidence: true },
  { id: 5, from: "Marketing", subject: "Promoção de Verão", body: "Confira as novas artes da campanha. Link para download de todos os arquivos aqui.", isPhishing: true },
  { id: 6, from: "Recursos Humanos", subject: "Política de Conduta", body: "Lembramos a todos que o uso de e-mail corporativo para fins pessoais é proibido.", isPhishing: false }
];

function EmailCenter({ onPhishingClick, onDenunciaClick }) {
  const [hacked, setHacked] = useState(false);

  const handleOpenEmail = (email) => {
    if (email.isPhishing) {
      setHacked(true);
      onPhishingClick();
    } else {
      if (email.isEvidence) {
        alert("🔍 PROVA ENCONTRADA: Você interceptou um contrato comprometedor do CEO!");
      }
      onDenunciaClick();
    }
  };

  // Estilo base para todos os botões
  const buttonStyle = {
    backgroundColor: '#2563eb', // Azul padrão
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  };

  if (hacked) {
    return <VirusScreen onFinish={() => setHacked(false)} />;
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
      <h2>📧 Caixa de Entrada</h2>
      {initialEmails.map(email => (
        <div key={email.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '5px', backgroundColor: email.isEvidence ? '#eff6ff' : '#fff' }}>
          <strong>De: {email.from}</strong><br/>
          <strong>Assunto: {email.subject}</strong>
          <p>{email.body}</p>
          
          <button 
            onClick={() => handleOpenEmail(email)} 
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Abrir E-mail
          </button>
        </div>
      ))}
    </div>
  );
}

export default EmailCenter;
