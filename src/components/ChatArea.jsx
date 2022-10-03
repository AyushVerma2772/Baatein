import React from 'react';
import styled from 'styled-components';
import ChatAreaNav from './ChatAreaNav';
import InputMsg from './InputMsg';
import MessageArea from './MessageArea';



const ChatAreaContainer = styled.div`
    width: 65%;
    height: 100%;
`;


const ChatArea = () => {


    return (
        <>
            <ChatAreaContainer className='chat-area-container' >
                <ChatAreaNav/>
                <MessageArea />
                <InputMsg />
            </ChatAreaContainer>
        </>
    )
}

export default ChatArea