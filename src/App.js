import React, { useState, useEffect } from 'react'

import api from './services/api'

import './styles.css'

function App() {
  const [repositories, setRepositories] = useState([])

  async function fetchRepositories() {
    let response
    try {
      response = await api.get('repositories')
      setRepositories(response.data)
    } catch (error) {
      if (!error.response) {
        alert('Network error!')
      } else {
        alert(`An error occurred while trying to fetch the repositories: [${error.response.status}] - ${error.response.statusText}`)
      }
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  async function handleAddRepository() {
    let response
    try {
      response = await api.post('repositories', {
        title: `Repository - nº: ${Date.now()}`,
        url: `https://github.com/user/${Date.now()}`,
        techs: [
            `Tech - nº ${Date.now()}`,
            `Tech - nº ${Date.now()}`
        ]
      })

      const repository = response.data
      setRepositories([...repositories, repository])

    } catch (error) {
      if (!error.response) {
        alert('Network error!')
      } else {
        alert(`An error occurred while trying to include a repository: [${error.response.status}] - ${error.response.statusText}`)
      }
    }
  }

  async function handleRemoveRepository(id) {
    let response
    try {
      response = await api.delete(`repositories/${id}`)
      if (response.status === 204) {
        setRepositories(repositories.filter(repository => repository.id !== id))
      }
    } catch (error) {
      console.log(error)
      if (!error.response) {
        alert('Network error!')
      } else {
        alert(`An error occurred while trying to remove repository (ID - ${id}): [${error.response.status}] - ${error.response.statusText}`)
      }
    }
  }

  return (
    <div>
      <h1> Repositories list: </h1>
      <h4> [Challenge: ReactJS concepts] </h4>
      <ul data-testid='repository-list'>
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
