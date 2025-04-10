// Importa os hooks useState e useEffect do React
import { useState, useEffect } from 'react';

// Estado para armazenar a lista de tarefas.
// Ao iniciar, busca do localStorage (para manter os dados mesmo após atualizar a página).
function ListaTarefas() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  // Estado para armazenar o texto da nova tarefa que será digitada pelo usuário.
  const [novaTarefa, setNovaTarefa] = useState('');

  // Efeito que roda sempre que 'tarefas' muda.
  // Ele salva a lista atualizada no localStorage como string JSON.
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  // Estado para armazenar o tipo de ordenação selecionado pelo usuário.
  const [ordenacao, setOrdenacao] = useState('data');

  // Função para adicionar uma nova tarefa à lista
  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') { // Verifica se não está vazia
      const nova = {
        id: Date.now(),                // Gera um ID único baseado no tempo atual
        texto: novaTarefa,             // Texto da tarefa
        concluida: false,              // Marca como não concluída
        data: new Date().toISOString() // Armazena a data atual em formato ISO
      };
      setTarefas([...tarefas, nova]);  // Adiciona a nova tarefa ao estado
      setNovaTarefa('');               // Limpa o input
    }
  };

  // Função para remover uma tarefa da lista com base no id
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id)); // Cria um novo array sem a tarefa que corresponde ao índice/id
  };

  // Função que limpa todas as tarefas da lista
  const excluirTudo = () => {
    setTarefas([]);
  };

  // Função que alterna o estado de 'concluída' da tarefa com base no id
  const alternarConclusao = (id) => {
    const novasTarefas = tarefas.map((tarefa) => tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa); // Inverte o valor de concluida
    setTarefas(novasTarefas);                   
  };

  // Cria uma cópia das tarefas para ordenar sem alterar o estado original
  const tarefasOrdenadas = [...tarefas];

  // Ordenação com base no valor selecionado
  if (ordenacao === 'az') {
    // Ordena por ordem alfabética (A-Z)
    tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
  } else if (ordenacao === 'za') {
    // Ordena por ordem alfabética invertida (Z-A)
    tarefasOrdenadas.sort((a, b) => b.texto.localeCompare(a.texto));
  } else if (ordenacao === 'data') {
    // Ordena por data de criação (mais antigas primeiro)
    tarefasOrdenadas.sort((a, b) => new Date(a.data) - new Date(b.data));
  }

  return (
    <div className="container">
      {/* Campo de entrada e botões principais */}
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

      {/* Seletor de ordenação */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="ordenacao">Ordenar por: </label>
        <select
          id="ordenacao"
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="data">Data de Adição</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      {/* Lista de tarefas */}
      <ul>
        {tarefasOrdenadas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.concluida ? 'tarefa-concluida' : ''}>
            {tarefa.texto}
            <div>
              {/* Botão para marcar como concluída ou desfazer */}
              <button onClick={() => alternarConclusao(tarefa.id)}>
                {tarefa.concluida ? 'Desfazer' : 'Concluir'}
              </button>
              {/* Botão para remover a tarefa */}
              <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTarefas;
