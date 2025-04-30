
import React, { useState, useEffect } from "react";
import "./App.css";

const rotina = [
  "Beber 1 copo de água ao acordar",
  "Evitar celular nos primeiros minutos",
  "Tomar Venvanse com alimento leve",
  "Fazer alongamento ou caminhada (10–15 min)",
  "Respiração ou journaling (5 min)",
  "Listar 3–5 tarefas principais do dia",
  "Executar tarefa mais importante (9h–11h30)",
  "Almoçar leve (proteína, vegetais, pouco carboidrato)",
  "Trabalhar das 16h às 22h com pausas curtas",
  "Desacelerar à noite (sem cafeína, reduzir telas)"
];

function App() {
  const [concluidos, setConcluidos] = useState(Array(rotina.length).fill(false));
  const [reflexao, setReflexao] = useState("");

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const toggleCheck = (index) => {
    const novoEstado = [...concluidos];
    novoEstado[index] = !novoEstado[index];
    setConcluidos(novoEstado);
  };

  const resetar = () => {
    setConcluidos(Array(rotina.length).fill(false));
    setReflexao("");
  };

  const notificar = () => {
    if (Notification.permission === "granted") {
      new Notification("Lembrete", {
        body: "Hora de revisar sua rotina com Venvanse!",
        icon: "/icon-192.png"
      });
    }
  };

  return (
    <div className="container">
      <h1>Rotina Matinal com Venvanse</h1>
      <ul>
        {rotina.map((item, idx) => (
          <li key={idx}>
            <input
              type="checkbox"
              checked={concluidos[idx]}
              onChange={() => toggleCheck(idx)}
            />
            <span className={concluidos[idx] ? "checked" : ""}>{item}</span>
          </li>
        ))}
      </ul>
      <div>
        <p>Reflexão ou objetivo do dia:</p>
        <textarea
          value={reflexao}
          onChange={(e) => setReflexao(e.target.value)}
          placeholder="Hoje quero focar em..."
        />
      </div>
      <button onClick={resetar}>Resetar dia</button>
      <button onClick={notificar} style={{ marginTop: "10px" }}>Lembrar mais tarde</button>
    </div>
  );
}

export default App;
