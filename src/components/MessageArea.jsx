import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from './Message';


const MessagesBox = styled.div`
    width: 100%;
    height: calc(100% - 13rem);
    padding: 1rem;
    /* border: 2px solid #0e8abb; */
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;


const MessageArea = () => {

    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);


    return (
        <MessagesBox>
            {messages.map((msg) => {
                return <Message key={msg.id} message={msg} />
            })}
            
        </MessagesBox>
    );
}

export default MessageArea