import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

import { primaryFont, white } from './commonComponents';

const MessageContainer = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
`;

const MessageContent = styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
`;

const ImgMsg = styled.img`
    width: 50%;
`;

const TextMsg = styled.p`
    background-color: ${white};
    font-family: ${primaryFont};
    font-size: 1.3rem;
    padding: 0.7rem;
    max-width: max-content;
    word-wrap: break-word;
    border-radius: 1rem 1rem 1rem 0;
    
`;


const Message = ({ message }) => {

    const { currentUser } = useContext(AuthContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <>
            <MessageContainer ref={ref} className={`${message.senderId === currentUser.uid && "owner"}`} >
                <MessageContent >

                    {message.img && <ImgMsg src={message.img} alt="" />}

                    <TextMsg>{message.text}</TextMsg>
                </MessageContent>
            </MessageContainer>
        </>
    )
}

export default Message
