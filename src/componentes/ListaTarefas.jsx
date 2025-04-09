import { useState, useEffect } from 'react';

function ListaTarefas() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  const [novaTarefa, setNovaTarefa] = useState('');

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const [ordenacao, setOrdenacao] = useState('data');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      const nova = {
        texto: novaTarefa,
        concluida: false,
        data: new Date().toISOString()
      };
      setTarefas([...tarefas, nova]);
      setNovaTarefa('');
    }
  };

  const removerTarefa = (indice) => {
    setTarefas(tarefas.filter((a, i) => i !== indice));
  };

  const excluirTudo = () => {
    setTarefas('');
  }

  const alternarConclusao = (indice) => {
    const novasTarefas = [...tarefas];
    novasTarefas[indice].concluida = !novasTarefas[indice].concluida;
    setTarefas(novasTarefas);
  };
  
  const tarefasOrdenadas = [...tarefas];

  if (ordenacao === 'az') {
    tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
  } else if (ordenacao === 'za') {
    tarefasOrdenadas.sort((a, b) => b.texto.localeCompare(a.texto));
  } else if (ordenacao === 'data') {
    tarefasOrdenadas.sort((a, b) => new Date(a.data) - new Date(b.data));
  }

  return (
    <div className="container">
      <div className="input-area">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
        <button onClick={excluirTudo}>Limpar Lista</button>
      </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="ordenacao">Ordenar por: </label>
          <select id="ordenacao" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
            <option value="data">Data de Adição</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      <ul>
        {tarefasOrdenadas.map((tarefa, indice) => (
          <li key={indice} className={tarefa.concluida ? 'tarefa-concluida' : ''}>
            {tarefa.texto}
            <div>
              <button onClick={() => alternarConclusao(indice)}>
                {tarefa.concluida ? 'Desfazer' : 'Concluir'}
              </button>
              <button onClick={() => removerTarefa(indice)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTarefas;