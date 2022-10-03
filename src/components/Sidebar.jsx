import React from 'react'
import styled from 'styled-components';
import Navbar from './Navbar';
import { purple, secondaryFont, white } from './commonComponents'
import SearchBar from './SearchBar';
import ChatsList from './ChatsList';
import { mobile1 } from '../styles/Responsive';


const SideContainer = styled.div`
    width: 35%;
    height: inherit;
    border-right: 0.2rem solid ${purple};
    ${mobile1({borderRight: '0', backgroundColor: `${purple}`})}
`;


const YourChats = styled.div`
    font-family: ${secondaryFont};
    font-size: 2rem;
    color: ${purple};
    margin: 1rem 2rem;
    font-weight: bold;
    ${mobile1({color: `${white}`})}

`;


const Sidebar = ({ openClass, openNav }) => {
    return (
        <>
            <SideContainer className={`sidebar ${openClass}`}>
                <Navbar />
                <SearchBar />
                <YourChats>Your Chats:</YourChats>
                <ChatsList openNav={openNav} />
            </SideContainer>
        </>
    )
}

export default Sidebar