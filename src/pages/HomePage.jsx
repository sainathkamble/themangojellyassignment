import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { receiveMessage } from '../redux/slice/chatSlice'
import { Avatar, Box, Typography } from '@mui/material';
import Chat from './../components/Chat';
import ChatInput from './../components/ChatInput';
import NotificationSound from '../assets/mp3/notify.wav';

const HomePage = () => {
    const dispatch = useDispatch();
    const [isTyping, setIsTyping] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const currentUser = useSelector((state) => state.chat.currentUser);

    useEffect(() => {
        const handleUserInteraction = () => {
            setHasUserInteracted(true);
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };
    }, []);

    useEffect(() => {
        const typingTimer = setTimeout(() => {
            setIsTyping(true);
        }, 3000);

        const messageTimer = setTimeout(() => {
            setIsTyping(false);
            const mockMessage = {
                user: 'Jane Smith',
                text: 'Hello! How are you?',
                timestamp: new Date().toLocaleTimeString(),
            };
            dispatch(receiveMessage(mockMessage));
            if (hasUserInteracted) {
                playNotificationSound();
            }
        }, 5000);

        return () => {
            clearTimeout(typingTimer);
            clearTimeout(messageTimer);
        };
    }, [dispatch, hasUserInteracted]);

    const playNotificationSound = () => {
        const audio = new Audio(NotificationSound);
        audio.play().catch((error) => {
            console.error('Sound play failed:', error);
        });
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                }}
            >

                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #ddd' }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar sx={{ bgcolor: '#4caf50', marginRight: 2, fontFamily: 'Poppins' }}>SW</Avatar>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontWeight: 600 }} color='#011627'>{currentUser}</Typography>

                        <Typography variant="body2" sx={{ fontFamily: 'Poppins' }} color="#707991">
                            Online
                        </Typography>
                    </Box>
                </Box>
                <Chat />
                <ChatInput />
            </Box>
        </>
    )
}

export default HomePage