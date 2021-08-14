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

function PokemonInfo({pokemonName}) {
  console.log('Render start')
  const [status, setStatus] = React.useState('idle')
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    console.log('%cApp: useEffect(() => {} )', 'color: HotPink')
    if (!pokemonName) {
      return
    }
    setStatus('pending')
    console.log('%csetStatus () =>', 'color:yellow')
    fetchPokemon(pokemonName).then(
      pokemon => {
        console.log('%csetPokemon () =>', 'color:yellow')
        setPokemon(pokemon)
        console.log('%csetStatus () =>', 'color:yellow')
        setStatus('resolved')
      },
      error => {
        setError(error)
        setStatus('rejected')
      },
    )
    return () => {
      console.log('%cCleaning ', 'color:red')
    }
  }, [pokemonName])

  console.log('Render end')
  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    return (
      <div>
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
