import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../lib/thunks/authThunk'
import { Box, Input, List, ListItem } from '@mui/material'
import { addChat } from '../lib/thunks/chatThunk'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchUser() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    const user = useSelector(state => state.users.user)
    const usernameRef = useRef(null)
    const [filteredUsers, setFilteredUsers] = useState([])
    
    useLayoutEffect(() => {
        dispatch(getUsers())
    }, [])

    const handleSearch = e => {
        if(e.target.value == "") return setFilteredUsers([])
        const filtered = users.filter(acc => 
            acc.username.toLowerCase().startsWith(e.target.value.toLowerCase())
        );
        setFilteredUsers(filtered);
    }
  return (
    <Box sx={{m: '2em auto', position: 'relative', width: '300px'}}>
        <Box sx={{position: 'relative', width: '100%', height: '40px'}}>
            <Input ref={usernameRef} sx={{position: 'absolute', width:'100%', height:'100%', border: '1px solid #ccc', color: '#fff', p: '3px 15px'}} type="text" onChange={e => handleSearch(e)} placeholder='Username'/>
            <SearchIcon sx={{display: 'block', position: 'absolute', right: '15px', top: '20%', transform: 'translateY(-50%s)'}}/>
        </Box>
        <List sx={{position:'absolute', color: '#000', width: '100%', p: 0}}>
            {filteredUsers && filteredUsers.map(filterUser => {
                const handleSubmit = () => {
                    dispatch(addChat({user_1: user.username, user_2: filterUser.username}))
                    setFilteredUsers([])
                    usernameRef.current.value = ""
                }
                return (
                    <ListItem key={filterUser.id} sx={{cursor: 'pointer', bgcolor: '#ccc', transition: 'all .1s ease', '&:hover': {bgcolor: '#a9a9a9'}}}
                    onClick={handleSubmit}>
                        {filterUser.username}
                    </ListItem>
                )
            })}
        </List>
    </Box>
  )
}
