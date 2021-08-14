// useEffect: HTTP requests
// 💯 use a status
// http://localhost:3000/isolated/final/06.extra-2.js

import * as React from 'react'

import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {error}
  }

  render() {
    const {error} = this.state
    if (error) {
      // You can render any custom fallback UI
      return (
        <div>
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  // const [status, setStatus] = React.useState('idle')
  // const [pokemon, setPokemon] = React.useState(null)
  const [pokemonStatus, setPokemonStatus] = React.useState({
    pokemon: null,
    status: 'idle',
    error: null,
  })
  // const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    // setStatus('pending')
    setPokemonStatus({pokemon: null, status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setPokemonStatus({pokemon: pokemon, status: 'resolved'})
        // setPokemon(pokemon)
        // setStatus('resolved')
      },
      error => {
        setPokemonStatus({pokemon: null, status: 'rejected', error: error})
        throw TypeError
        // setStatus('rejected')
      },
    )
  }, [pokemonName])

  const {status, error, pokemon} = pokemonStatus
  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
    // return (
    //   <div>
    //     There was an error:{' '}
    //     <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    //   </div>
    // )
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
