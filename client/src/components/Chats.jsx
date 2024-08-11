import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats, removeChat } from '../lib/thunks/chatThunk'
import { Box, Button, Typography } from '@mui/material'
import { currentChatWith } from '../lib/slices/chatSlice'
import { getChatMessages } from '../lib/thunks/messageThunk'

export default function Chats() {
    const chats = useSelector(state => state.chat.chats)
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)

    useEffect(() => {
        if(user) dispatch(getChats(user.username))
    }, [user])

  return (
    <Box sx={{width:'100%'}}>
        <Typography variant='h5'>Chats</Typography>
        <Box>
            {chats && chats.map(chat => {
                const handleChatSelect = () => {
                    dispatch(currentChatWith({to_user: chat.user_1 == user.username ? chat.user_2 : chat.user_1, chatId: chat.id}))
                    dispatch(getChatMessages(chat.id))
                }
                return (
                    <Box onClick={handleChatSelect} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: '1em', p: '.5em 2em', border: '1px solid #ccc', cursor: 'pointer'}} key={chat.id}>
                        <Typography>
                            {chat.user_1 == user.username ? chat.user_2 : chat.user_1}
                        </Typography>
                        <Button onClick={() => dispatch(removeChat({chatId: chat.id, username: user.username}))}>x</Button>
                    </Box>
                )
            }
            )}
        </Box>
    </Box>
  )
}
