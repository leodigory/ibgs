import React, { useState } from 'react';

function LancarEvento() {
  const [tipoEvento, setTipoEvento] = useState('');
  const [data, setData] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [local, setLocal] = useState('');
  const [camposAdicionais, setCamposAdicionais] = useState([]);
  const [novoCampo, setNovoCampo] = useState('');

  const adicionarCampo = () => {
    setCamposAdicionais([...camposAdicionais, novoCampo]);
    setNovoCampo('');
  };

  const enviarEvento = async () => {
    const evento = {
      tipoEvento,
      data,
      horaInicio,
      horaFim,
      local,
      camposAdicionais,
    };

    // Enviar os dados para o servidor (aqui você pode usar fetch ou axios)
    console.log('Evento enviado:', evento);
    // fetch('/api/eventos', { method: 'POST', body: JSON.stringify(evento) });
  };

  return (
    <div>
      <h3>Lançar Evento</h3>

      <div>
        <label>Tipo de Evento</label>
        <select value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)}>
          <option value="unico">Evento Único</option>
          <option value="semanal">Evento Semanal</option>
          <option value="mensal">Evento Mensal</option>
        </select>
      </div>

      <div>
        <label>Data</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      </div>

      <div>
        <label>Hora de Início</label>
        <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
      </div>

      <div>
        <label>Hora de Término</label>
        <input type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
      </div>

      <div>
        <label>Local</label>
        <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
      </div>

      {/* Campos adicionais */}
      <div>
        <label>Campo Adicional</label>
        <input
          type="text"
          value={novoCampo}
          onChange={(e) => setNovoCampo(e.target.value)}
        />
        <button onClick={adicionarCampo}>Adicionar Campo</button>
      </div>

      <div>
        <h4>Campos Adicionais</h4>
        <ul>
          {camposAdicionais.map((campo, index) => (
            <li key={index}>{campo}</li>
          ))}
        </ul>
      </div>

      <button onClick={enviarEvento}>Enviar Evento</button>
    </div>
  );
}

export default LancarEvento;
