import React, { useContext } from 'react';
import styled from 'styled-components';
import { nameFont, purple, red, secondaryFont, white } from './commonComponents';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { mobile1 } from '../styles/Responsive';


const Nav = styled.nav`
    height: 6.5rem;
    width: 100%;
    background-color: ${purple};
    padding: 0 0.5rem;
    justify-content: space-around;
    ${mobile1({borderBottom: `0.1rem solid ${white}`, paddingLeft: '6rem'})}
    
    
`;

const NameLogo = styled.span`
    color: ${white};
    font-family: ${nameFont};
    font-size: 1.8rem;
    font-weight: bold;
    ${mobile1({marginLeft: '5rem'})}
`;

const RightNav = styled.div`
    width: 70%;
    justify-content: flex-end;
    overflow: hidden;
`;

const UserInfo = styled.div`
    overflow: hidden;
`;

const UserImage = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin: 0 0.9rem;
    object-fit: cover;
    cursor: pointer;
`;

const UserName = styled.span`
    height: 2.5rem;
    width: 7.5rem;
    font-size: 1.6rem;
    font-family: ${secondaryFont};
    font-family: 500;
    color: ${white};
    text-align: right;
    overflow: hidden;
`;

const LogoutButton = styled.button`
    background-color: ${red};
    color: ${white};
    padding: 0.3rem 0.8rem;
    font-size: 1.3rem;
    border: 0;
    border-radius: 0.3rem;
    cursor: pointer;
`;

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <Nav className='d-flex'>
                <NameLogo>Baatein</NameLogo>

                <RightNav className='d-flex' >

                    <UserInfo className='d-flex' >
                        <UserName>{currentUser.displayName}</UserName>
                        <UserImage src={currentUser.photoURL} alt='' onClick={(e) => {window.open(e.target.src, '_blank')}} />
                    </UserInfo>

                    <LogoutButton title='log out' onClick={() => signOut(auth)}>Log out</LogoutButton>
                </RightNav>
            </Nav>
        </>
    )
}

export default Navbar