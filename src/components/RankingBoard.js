import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

function RankingBoard() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const rankingRef = ref(db, 'ranking/');
    onValue(rankingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data).sort((a, b) => b.provasColetadas - a.provasColetadas);
        setRanking(list);
      }
    });
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2>🏆 Ranking dos Auditores</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ textAlign: 'left' }}><th>Nome</th><th>Patente</th><th>Provas</th></tr></thead>
        <tbody>
          {ranking.map((u, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{u.nome}</td><td>{u.patente}</td><td>{u.provasColetadas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default RankingBoard;