import React, { useState } from 'react';
import './FerramentasPorAcesso.css'; // Importação do CSS

function FerramentasPorAcesso({ onClose }) {
  const [acessoSelecionado, setAcessoSelecionado] = useState('');
  const [ferramentasSelecionadas, setFerramentasSelecionadas] = useState([]);

  const ferramentasDisponiveis = [
    'Agenda de Reuniões',
    'Feedback da Equipe',
    'Louvor',
    'Mensagem',
    'Escala'
  ];

  const handleSalvar = () => {
    // Lógica para salvar as ferramentas selecionadas para o acesso no Firebase
    console.log('Acesso:', acessoSelecionado);
    console.log('Ferramentas selecionadas:', ferramentasSelecionadas);
    onClose();
  };

  return (
    <div className="ferramentas-acesso-modal">
      <div className="ferramentas-acesso-content">
        <div className="modal-header">
          <h2>Alterar Ferramentas por Acesso</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <select
          className="select-acesso"
          value={acessoSelecionado}
          onChange={(e) => setAcessoSelecionado(e.target.value)}
        >
          <option value="">Selecione um acesso</option>
          <option value="lider mídia">Líder Mídia</option>
          <option value="lider culto">Líder Culto</option>
          <option value="lider geral">Líder Geral</option>
        </select>
        <div className="ferramentas-list">
          {ferramentasDisponiveis.map((ferramenta, index) => (
            <div key={index} className="ferramenta-item">
              <label>
                <input
                  type="checkbox"
                  className="hidden-checkbox"
                  value={ferramenta}
                  checked={ferramentasSelecionadas.includes(ferramenta)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFerramentasSelecionadas([...ferramentasSelecionadas, ferramenta]);
                    } else {
                      setFerramentasSelecionadas(
                        ferramentasSelecionadas.filter((item) => item !== ferramenta)
                      );
                    }
                  }}
                />
                <span className="checkmark"></span>
                {ferramenta}
              </label>
            </div>
          ))}
        </div>
        <button className="save-button" onClick={handleSalvar}>Salvar</button>
      </div>
    </div>
  );
}

export default FerramentasPorAcesso;