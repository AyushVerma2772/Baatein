import React, { useState } from 'react';
import styled from 'styled-components';
import ChatArea from './ChatArea';
import Sidebar from './Sidebar';
import { RiMenu4Fill } from "react-icons/ri";


const ChatContainer = styled.div`
    width: 68%;
    height: 90vh;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.68);
    border-radius: 12px;
    overflow: hidden;
`;




const ChatRoom = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ChatContainer className='d-flex chat-room' >

                <button className='d-flex menu' style={{color: `${open ? '#fffefe': '#410179'}`}} onClick={() => { setOpen(!open) }} ><RiMenu4Fill /></button>

                <Sidebar openClass={`${open && 'open-sidebar'}`} openNav={() => { setOpen(!open) }} />

                <ChatArea />
            </ChatContainer>
        </>
    )
}

export default ChatRoom