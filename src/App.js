import React, {useState,useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect( () => {
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const {data} = await api.post('/repositories',{
      title: `Repositório ${Date.now()}`,
      url: "http://Repo1.com",
      techs: "javascript"
    });
    setRepositories([...repositories,data]);
  }

  async function handleRemoveRepository(id) {
    setRepositories(repositories.filter(repository => repository.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( (repository) =>{
          return( 
          <li key={repository.id}>
            {repository.title}
           <button onClick={() => handleRemoveRepository(repository.id)}>
             Remover
           </button>
         </li> 
         );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
