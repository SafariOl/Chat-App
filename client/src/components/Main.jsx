import { Box } from '@mui/material'
import React from 'react'
import Chats from './Chats'
import ChatRoom from './ChatRoom'
import { useSelector } from 'react-redux'
import SearchUser from './SearchUser'

export default function Main() {
  const user = useSelector(state => state.users.user)

  return (
    <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center', px: '3vw'}}>
        <h1>Welcome to the "{user.username}'s" chat</h1>
        <SearchUser />
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10vw', height:'75vh'}}>
            <Chats/>
            <ChatRoom />
        </Box>
    </Box>
  )
}
