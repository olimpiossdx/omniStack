import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

const NewIncident = () => {
  const history = useHistory();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [value, setValue] = React.useState('');

  const ongId = localStorage.getItem('ongId');

  const handleCadastrar = async (e) => {
    e.preventDefault();
    const data = { title, description, value };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');

    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  };

  return (
    <div className='new-incident-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />
          <h1>Cdastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontar um heróis para resolver isso</p>

          <Link className='back-link' to='/profile' >
            <FiArrowLeft size={16} color='#E02041' />
        voltar para home
        </Link>
        </section>
        <form onSubmit={handleCadastrar}>
          <input placeholder='Título do caso'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder='Descrição'
            alue={description}
            onChange={(e) => setDescription(e.target.value)} />
          <input placeholder='Valor em reais'
            value={value}
            onChange={(e) => setValue(e.target.value)} />

          <button className='button' type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident
