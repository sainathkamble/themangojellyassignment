import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

const Chat = () => {
    const messages = useSelector((state) => state.chat.messages);
    const currentUser = useSelector((state) => state.chat.currentUser);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Box
            sx={{
                height: '65vh',
                overflowY: 'auto',
                padding: 2,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                    borderRadius: '10px',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#888 #f1f1f1',
            }}
        >
            {messages.map((msg, index) => (
                <Box
                    key={index}
                    sx={{
                        alignSelf: msg.user === currentUser ? 'flex-end' : 'flex-start',
                        backgroundColor: msg.user === currentUser ? '#78E378' : '#FFF',
                        padding: '10px 15px',
                        borderRadius: '15px',
                        maxWidth: '60%',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <Typography variant="body1" sx={{ wordWrap: 'break-word', fontFamily: 'Poppins', color: '#011627' }}>
                        {msg.text}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ marginTop: 0.5, fontFamily: 'Poppins' }}>
                        {msg.timestamp}
                    </Typography>
                </Box>
            ))}
            <div ref={chatEndRef} />
        </Box>
    );
};

export default Chat;
