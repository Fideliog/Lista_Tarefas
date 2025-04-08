import { useState } from 'react'; 

function ListaTarefas() { 
    const [tarefas, setTarefas] = useState([]); 
    const [novaTarefa, setNovaTarefa] = useState('');
    
    const adicionarTarefa = () => {
      if (novaTarefa.trim() !== '') {
        const nova = {
          texto: novaTarefa,
          concluida: false
        };
        setTarefas([...tarefas, nova]);
        setNovaTarefa('');
      }
    };
    
    const alternarConclusao = (indice) => {
      const novasTarefas = [...tarefas];
      novasTarefas[indice].concluida = !novasTarefas[indice].concluida;
      setTarefas(novasTarefas);
    };

    const removerTarefa = (indice) => { 
        setTarefas (tarefas.filter((_, i) => i !== indice)); 
    }; 

    return ( 
      <div className="container">
        <div className="input-area">
          <input 
            type='text' 
            value={novaTarefa} 
            onChange={(e) => setNovaTarefa(e.target.value)} 
            placeholder='Digite uma nova tarefa' 
          /> 
          <button onClick={adicionarTarefa}>Adicionar</button> 
        </div>
        <ul> 
        <ul>
            {tarefas.map((tarefa, indice) => (
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
        </ul> 
      </div> 
    );
}

export default ListaTarefas;