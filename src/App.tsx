import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RepositoryList from './RepositoryList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
            <RepositoryList />
        </div>
    </>
  )
}

export default App
