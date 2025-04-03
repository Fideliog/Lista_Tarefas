import ListaTarefas from "./componentes/ListaTarefas";

import './App.css';

function App(){

  return (
    <>
      
      <div className="titulo"><h1>Gerenciador de Tarefas</h1></div>
      <div className="sep"><h2>Lista de Tarefas</h2></div>
      <ListaTarefas />
    </>
  );
}

export default App;