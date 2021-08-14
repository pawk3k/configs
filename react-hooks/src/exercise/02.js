// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage(storageKey) {
  const [name, setName] = React.useState(() =>
    window.localStorage.getItem(`${storageKey}`),
  )

  React.useEffect(() => {
    window.localStorage.setItem(`${storageKey}`, name)
  }, [name])
  return [name, setName]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  // const [name, setName] = React.useState(() =>
  //   window.localStorage.getItem('name'),
  // )
  // const [state, toggle] = React.useState()

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  const [name, setName] = useLocalStorage('name')

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
