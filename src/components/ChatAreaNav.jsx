import React, { useContext } from 'react';
import styled from 'styled-components';
import { purple, secondaryFont } from './commonComponents';
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChatContext } from '../context/ChatContext';
import { mobile1 } from '../styles/Responsive';



const Navbar = styled.nav`
    height: 6.5rem;
    width: 100%;
    padding: 0 1.5rem;
    background-color: #b86dff;
    justify-content: space-between;
`;

const UserName = styled.div`
    height: 3.2rem;
    width: 30%;
    font-family: ${secondaryFont};
    font-size: 2.4rem;
    color: ${purple};
    font-weight: 600;
    overflow: hidden;
    ${mobile1({marginLeft: '5rem', width: '50%'})}
`;

const IconBox = styled.div`
    gap: 2rem;
    justify-content: space-around;
    height: 3rem;
`;


const ChatAreaNav = () => {

    const { data } = useContext(ChatContext);

    return (
        <>
            <Navbar className='d-flex' >

                <UserName>{data.user.displayName || 'Select an user'}</UserName>

                <IconBox className='d-flex' >
                    <BsFillCameraVideoFill className='icon' />
                    <BsFillTelephoneFill className='icon' />
                    <BsThreeDotsVertical className='icon' />
                </IconBox>

            </Navbar>

        </>
    )
}

export default ChatAreaNav