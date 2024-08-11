import React, { useState } from 'react'
import { Box, Button, Container, Input, InputLabel, Typography } from '@mui/material';
import { useDispatch } from 'react-redux'
import { authLogin } from '../lib/thunks/authThunk';

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = () => {
        if(!username || !password) return 
        dispatch(authLogin({username, password}))
    }

  return (
    <Container sx={{minHeight: '100vh', overflowY: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{width: '330px', color: '#fff', padding: "32px 24px", fontSize: 14,
            color:"#212121", display: "flex", flexDirection: "column", gap: '20px', borderRadius: "10px",
            border: '2px solid #ccc',
            boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168)"
        }}>
        <Typography variant='h4' sx={{textAlign: "center", fontWeight: 600, color: '#fff'}}> Login </Typography>
        <form style={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                <InputLabel sx={{display: 'block', marginBottom: '5px', color: '#fff'}}>Username</InputLabel>
                <Input onChange={e => setUsername(e.target.value)} autoComplete='off' sx={{width: '100%', padding: '12px 16px', color: '#fff', borderRadius: '6px', border: '1px solid #ccc'}} 
                type="text" id="username" name="username" placeholder="Enter your username"/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px', mt: 2}}>
                <InputLabel sx={{display: 'block', marginBottom: '5px', color: '#fff'}}>Password</InputLabel>
                <Input autoComplete='off' onChange={e => setPassword(e.target.value)} 
                sx={{width: '100%', 
                    padding: '12px 16px', 
                    color: '#fff', 
                    borderRadius: '6px', 
                    border: '1px solid #ccc',
                    '&.Mui-focused .MuiInputBase-root::after': {
                        borderBottom: 'none'
                    }
                }} 
                type="password" id="password" name="password" placeholder="Enter your password"/>
            </Box>
            <Button onClick={handleSubmit} sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', bgcolor: '#212121', border: 'none', 
                width: '100%', padding: '12px 16px', gap: '8px', margin: '12px 0', cursor: 'pointer', borderRadius: '6px', 
                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168)',
                '&:hover': {
                    bgcolor: '#2b2b2b'
                }
            }}>Sign IN</Button>
        </form>

        <p style={{color: '#fff'}}>
            Don't have an account?
            <a href="#"> Sign up now</a>
        </p>
        </Box>
    </Container>
  )
}
