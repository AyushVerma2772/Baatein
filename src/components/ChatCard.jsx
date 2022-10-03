import React from 'react';
import styled from 'styled-components';
import { mobile1 } from '../styles/Responsive';
import { primaryFont, purple, lightPurple, white, ProfileImage } from './commonComponents';


const Card = styled.div`
    width: 100%;
    height: 6.7rem;
    background-color: transparent;
    padding: 0.7rem;
    border-bottom: 0.1rem solid ${purple};
    cursor: pointer;


    &:hover {
        background-color: ${lightPurple};
    }

    ${mobile1({borderBottom: `0.1rem solid ${white}`})}
`;


const UserInfo = styled.div`
    width: 80%;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1.8rem;
`;

const UserName = styled.div`
    height: 2.7rem;
    width: 100%;
    font-family: ${primaryFont};
    font-size: 1.7rem;
    color: ${purple};
    font-weight: 500;
    overflow: hidden;
    ${mobile1({color: `${white}`})}
`;

const RecentMsg = styled.p`
    height: 2.3rem;
    width: 100%;
    font-family: ${primaryFont};
    font-size: 1.4rem;
    color: #1e1e1e;
    overflow: hidden;
    ${mobile1({color: '#e3e1e1'})}
`;


const ChatCard = ({name, recentMsg, profilePic, onCLickFunc}) => {
    return (
        <>
            <Card className='d-flex' >
                <ProfileImage src={profilePic} alt='user' onClick={(e) => {window.open(e.target.src, '_blank')}} />
                <UserInfo className='d-flex'  onClick={onCLickFunc}  >
                    <UserName>{name}</UserName>
                    <RecentMsg>{recentMsg}</RecentMsg>
                </UserInfo>
            </Card>
        </>
    )
}

export default ChatCard