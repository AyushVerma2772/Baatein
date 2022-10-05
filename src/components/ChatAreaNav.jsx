import React, { useContext } from 'react';
import styled from 'styled-components';
import { ProfileImage, purple, secondaryFont } from './commonComponents';
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
    ${mobile1({paddingLeft: '6rem'})}
`;

const UserInfo = styled.div`
    width: 70%;
    overflow: hidden;
    height: 100%;
    gap: 1rem;
    justify-content: flex-start;
`

const UserName = styled.div`
    height: 3.2rem;
    max-width: 70%;
    font-family: ${secondaryFont};
    font-size: 2.4rem;
    color: ${purple};
    font-weight: 600;
    overflow: hidden;
    ${mobile1({ marginLeft: '2rem', maxWidth: '70%' })}
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



                {/* <UserName>{data.user.displayName || 'Select an user'}</UserName> */}

                <UserInfo className='d-flex' >
                    <ProfileImage src={data.user.photoURL} onClick={(e) => {window.open(e.target.src, '_blank')}} />
                    <UserName>{data.user.displayName || 'Select an user'}</UserName>
                </UserInfo>

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