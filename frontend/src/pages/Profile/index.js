import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const companyName = localStorage.getItem('companyName');
  const companyId = localStorage.getItem('companyId');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: companyId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [companyId]);

  async function handleDeleteIncident(id) {
    try{
      await api.delete(`incidents/${id}`,{
        headers: {
          Authorization: companyId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(err){
      alert('Erro ao deletar caso, tente novamente.');
    }
  }
  
  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={ logoImg } alt="Be The Hero"/>
        <span>Bem vindo, {companyName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
                <li key={incident.id}>
                  <strong>CASO:</strong>
                  <p>{incident.title}</p>
        
                  <strong>DESCRIÇÀO:</strong>
                  <p>{incident.description}</p>
        
                  <strong>VALOR:</strong>
                  <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
        
                  <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>
                  </button>
                </li>
        ))}
      </ul>
    </div>    
  );
}