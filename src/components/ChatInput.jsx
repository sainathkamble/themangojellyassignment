import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, IconButton } from '@mui/material';
import { Send, EmojiEmotions, AttachFile } from '@mui/icons-material';
import { sendMessage } from '../redux/slice/chatSlice';

const ChatInput = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.chat.currentUser);

    const handleSend = () => {
        if (!input.trim()) return;

        const message = {
            user: currentUser,
            text: input,
            timestamp: new Date().toLocaleTimeString(),
        };
        dispatch(sendMessage(message));
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 1,
                borderTop: '1px solid #ddd',
                backgroundColor: '#fff',
            }}
        >
            <IconButton color="#8BABD8">
                <EmojiEmotions />
            </IconButton>
            <IconButton color="#8BABD8">
                <AttachFile />
            </IconButton>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                sx={{
                    marginLeft: 1,
                    backgroundColor: '#f1f1f1',
                    borderRadius: '20px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                    },
                    fontFamily: 'Poppins'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
                sx={{ marginLeft: 1, borderRadius: '20px' }}
            >
                <Send />
            </Button>
        </Box>
    );
};

export default ChatInput;
