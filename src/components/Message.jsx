import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { IoMdDoneAll } from "react-icons/io";
import { primaryFont, white } from './commonComponents';
import { MdOutlineDownloadForOffline } from "react-icons/md";

const MessageContainer = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
`;

const MessageContent = styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
    /* overflow-x: hidden; */
    height: auto;
    position: relative;
`;

const ImageBox = styled.div`
    width: 50%;
    position: relative;
`

const ImgMsg = styled.img`
    width: 100%;
`;

const TextMsg = styled.p`
    background-color: ${white};
    font-family: ${primaryFont};
    font-size: 1.3rem;
    padding: 0.7rem;
    max-width: 100%;
    word-wrap: break-word;
    border-radius: 1rem 1rem 1rem 0;
    
`;


const DownloadButton = styled.a`
    text-decoration: none;
    color: #0059ffbe;
    font-size: 2.8rem;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    &:hover {
        color: #0059ff;
    }
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

                    {/* Image */}
                    {
                        message.img &&
                        <ImageBox className='img-box'  >
                            <ImgMsg src={message.img} alt="" onClick={(e) => {window.open(e.target.src, '_blank')}}  />
                            <DownloadButton href={message.img} target='_blank' download><MdOutlineDownloadForOffline /></DownloadButton>
                        </ImageBox>
                    }


                    {/* Text Message */}
                    {
                        message.text ? <TextMsg>{message.text}</TextMsg> : <TextMsg style={{ display: 'none' }} ></TextMsg>
                    }

                    <IoMdDoneAll className='tick' />
                </MessageContent>
            </MessageContainer>
        </>
    )
}

export default Message