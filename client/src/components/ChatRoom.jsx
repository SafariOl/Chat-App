import { Box, Button, Grid, Input, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from '@mui/icons-material/Send';
import { getChatMessages, sendMessage } from '../lib/thunks/messageThunk';
import { API_KEY } from '../lib/api';
import {io} from 'socket.io-client'
import { addMessage } from '../lib/slices/messageSlice';

const socket = io("http://localhost:5000")

export default function ChatRoom() {
  const chat = useSelector(state => state.chat.currentChatWith)
  const chatMessages = useSelector(state => state.message.messages)
  const user = useSelector(state => state.users.user)
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });
    return () => {
      socket.off('message');
    };
  }, [dispatch]);

  const handleSend = () => {
    const newMessage = {chatId: chat.chatId, from_user: user.username, to_user: chat.to_user, message}
    socket.emit('message', newMessage);
    dispatch(sendMessage(newMessage))
    setMessage("")
  }

  return (
    <Box sx={{width: '100%', border:'2px solid #ccc', height:'100%', borderRadius: '10px', overflow: 'hidden', p: '1em', display: 'grid', gridTemplateRows: '30px 1fr 50px', gap: '10px', gridTemplateColumns: '100%'}}>
      <Typography variant='h5'>{!chat.to_user ? "ChatRoom" : chat.to_user}</Typography>
      <Box sx={{display: 'flex', flexDirection: 'column-reverse', overflowY: 'auto', pr: 'calc(15px + 1em)', width: '100%', boxSizing: 'content-box'}}>
        <Box sx={{display: 'flex', flexDirection: 'column-reverse',  width: '100%', height: '100%'}}>
          {chatMessages && chatMessages.map(m => 
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: (m.from_user === user.username) ? 'flex-end' : 'flex-start', width: '100%', mb: '.5em'}} key={m.timestamp}>
              <Typography sx={{bgcolor: '#1c76cb', p: '.5em 1em', borderRadius: '15px'}}>{m.message}</Typography>
              <Typography variant='body1' sx={{fontSize: '.7em', opacity: .7, mx: '.5em'}}>{new Date(m.timestamp).toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'})}</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{display: 'grid', width:'100%', gridTemplateColumns: '1fr 15%', gap:'5px'}}>
        <Input autoComplete='off' onChange={e => setMessage(e.target.value)} 
        sx={{color:'#fff', boxShadow: 'none', border:'1px solid #ccc', borderRadius: '10px', p:'.5em 10px', 
          '&:focus': {border: 'none'}
        }} type='text' value={message} placeholder='Write here...'/>
        <Button onClick={handleSend} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', px: 0, bgcolor: '#0065c3', color: '#fff', borderRadius: '7px'}}><SendIcon /></Button>
      </Box>
    </Box>
  )
}
