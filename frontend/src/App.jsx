import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello Developers good morning! 
        <br />
        Welcome to Aura Tracker Project , Part of CodeSangam
      </h1>
    </>
  )
}

export default App
