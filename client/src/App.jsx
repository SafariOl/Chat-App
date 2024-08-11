import { useState } from 'react'
import { Container } from '@mui/material'
import { useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Main from './components/Main'

function App() {
  const [count, setCount] = useState(0)
  const user = useSelector(state => state.users.user)

  return (
    <Container maxWidth="xl" sx={{py: '2em'}}>
      {!user ? <LoginForm /> : <Main />}
    </Container>
  )
}

export default App
