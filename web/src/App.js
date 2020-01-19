import React from 'react';

// Componente: Bloco isolado de HTML, CSS e JSS, o qual não terfere  no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelos componentes (imutabilidade)

//pesquisar por plugin Emmet.syntaxPrfile
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [github_username, setGithub_username] = React.useState('');
  const [techs, setTechs] = React.useState('');
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      }, (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );

  }, []);

  async function handleAddDev(e) {
    e.preventDefatul(); 

  }
  return (<div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <form onSubmit={handleAddDev}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            name="github_username"
            id="github_username"
            value={github_username}
            onChange={e => setGithub_username(e.target.value)}
            required />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            value={techs}
            onChange={e => setTechs(e.target.value)}
            required />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
    </aside>

    <main>
      <ul>
        <li className="dev-item">
          <header>
            <img src="#" alt="jujé dev" />
            <div className="user-info">
              <strong>jujé dev</strong>
              <span>Reacjs, react Native, Node.js</span>
            </div>
          </header>
          <p>CTO na @zueira.com. Apaixonado pelas melhores zueiras do mercado com grande estilo</p>
          <a href="http://oi.com.br">Acessar perfil no Github</a>
        </li>
        <li className="dev-item">
          <header>
            <img src="#" alt="jujé dev" />
            <div className="user-info">
              <strong>jujé dev</strong>
              <span>Reacjs, react Native, Node.js</span>
            </div>
          </header>
          <p>CTO na @zueira.com. Apaixonado pelas melhores zueiras do mercado com grande estilo</p>
          <a href="#">Acessar perfil no Github</a>
        </li>
        <li className="dev-item">
          <header>
            <img src="#" alt="jujé dev" />
            <div className="user-info">
              <strong>jujé dev</strong>
              <span>Reacjs, react Native, Node.js</span>
            </div>
          </header>
          <p>CTO na @zueira.com. Apaixonado pelas melhores zueiras do mercado com grande estilo</p>
          <a href="#">Acessar perfil no Github</a>
        </li>
        <li className="dev-item">
          <header>
            <img src="#" alt="jujé dev" />
            <div className="user-info">
              <strong>jujé dev</strong>
              <span>Reacjs, react Native, Node.js</span>
            </div>
          </header>
          <p>CTO na @zueira.com. Apaixonado pelas melhores zueiras do mercado com grande estilo</p>
          <a href="#">Acessar perfil no Github</a>
        </li>
      </ul>
    </main>

  </div>);
}

export default App;
