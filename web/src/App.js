import React from 'react';

import api from './service/api';

// Componente: Bloco isolado de HTML, CSS e JSS, o qual não terfere  no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelos componentes (imutabilidade)

//pesquisar por plugin Emmet.syntaxPrfile
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './Components/DevItem';
import DevForm from './Components/DevForm';

function App() {
  const [devs, setDevs] = React.useState([]);

  React.useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  // aplico um post e atualizo alista de devs
  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  return (<div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <DevForm onSubmit={handleAddDev} />
    </aside>

    <main>
      <ul>
        {devs.map(dev => (<DevItem key={dev._id} dev={dev} />))}
      </ul>
    </main>

  </div>);
}

export default App;
