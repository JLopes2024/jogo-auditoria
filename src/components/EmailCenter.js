import React, { useState } from 'react';
import VirusScreen from './VirusScreen'; // Certifique-se de ter criado este arquivo

const initialEmails = [
  { id: 1, from: "TI (Suporte)", subject: "ATUALIZAÇÃO DE SENHA", body: "Sua senha expirou. Clique aqui para resetar agora ou sua conta será bloqueada.", isPhishing: true },
  { id: 2, from: "Canal de Ética", subject: "DENÚNCIA: Unidade 2", body: "Vi a Fernanda (Vendas) gerando CPFs falsos em massa no fim do mês. Cuidado, ela sabe quem denuncia.", isPhishing: false },
  { id: 3, from: "Diretoria", subject: "Folha de Pagamentos", body: "Segue em anexo a planilha com todos os salários. Favor verificar.", isPhishing: true }
];

function EmailCenter({ onPhishingClick, onDenunciaClick }) {
  const [hacked, setHacked] = useState(false);

  // Se o aluno clicou em phishing, ele é "hackeado" e a tela muda
  if (hacked) {
    return <VirusScreen onFinish={() => window.location.reload()} />;
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
      <h2>📧 Caixa de Entrada</h2>
      {initialEmails.map(email => (
        <div key={email.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '5px' }}>
          <strong>De: {email.from}</strong><br/>
          <strong>Assunto: {email.subject}</strong>
          <p>{email.body}</p>
          
          {email.isPhishing ? (
            <button 
              onClick={() => {
                setHacked(true); // Ativa a tela preta
                onPhishingClick(); // Chama a função do App.js para penalizar
              }} 
              style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer' }}
            >
              Acessar Link (Perigoso)
            </button>
          ) : (
            <button 
              onClick={onDenunciaClick} 
              style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '10px', cursor: 'pointer' }}
            >
              Abrir Dossiê de Denúncia
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default EmailCenter;
