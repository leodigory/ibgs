import React, { useState, useEffect } from 'react';

// Evento fictício para fins de exemplo
const evento = {
  nome: 'Culto de Adoração',
  data: '2024-12-23',
  horaInicio: '17:00',
  horaFim: '18:00',
  rua: 'Rua da Paz, 123',
};

function Frequencia() {
  const [frequencias, setFrequencias] = useState([]);
  const [localizacao, setLocalizacao] = useState(null);
  const [presencaRegistrada, setPresencaRegistrada] = useState(false);

  // Função para obter a localização do usuário
  const obterLocalizacao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((posicao) => {
        const { latitude, longitude } = posicao.coords;
        setLocalizacao({ latitude, longitude });
        verificarPresenca(latitude, longitude);
      });
    } else {
      alert('Geolocalização não suportada pelo navegador.');
    }
  };

  // Função para verificar presença
  const verificarPresenca = (latitude, longitude) => {
    // Verificar a hora atual
    const horaAtual = new Date();
    const horaInicio = new Date(`2024-12-23T${evento.horaInicio}:00`);
    const horaFim = new Date(`2024-12-23T${evento.horaFim}:00`);

    // Verificar se a hora atual está dentro do intervalo
    if (horaAtual >= horaInicio && horaAtual <= horaFim) {
      // Simulação de verificação de localização (aqui você pode melhorar com uma API de geolocalização mais precisa)
      const localCorreto = latitude === 40.7128 && longitude === -74.0060; // Exemplo: local da rua do evento (latitude e longitude fictícias)

      if (localCorreto) {
        const novaPresenca = {
          data: evento.data,
          hora: horaAtual.toLocaleTimeString(),
          localizacao: { latitude, longitude },
        };
        setFrequencias((prev) => [...prev, novaPresenca]);
        setPresencaRegistrada(true);
      }
    }
  };

  useEffect(() => {
    obterLocalizacao();
  }, []);

  return (
    <div>
      <h2>{evento.nome}</h2>
      <p>Data: {evento.data}</p>
      <p>Horário: {evento.horaInicio} - {evento.horaFim}</p>
      <button onClick={obterLocalizacao}>Registrar Presença</button>

      {presencaRegistrada ? (
        <p>Presença registrada com sucesso!</p>
      ) : (
        <p>Aguarde o horário para registrar sua presença.</p>
      )}

      <h3>Frequências Registradas</h3>
      <ul>
        {frequencias.map((freq, index) => (
          <li key={index}>
            {`Data: ${freq.data}, Hora: ${freq.hora}, Localização: (${freq.localizacao.latitude}, ${freq.localizacao.longitude})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Frequencia;
