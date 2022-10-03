import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { primaryFont, purple, green, ErrorMsg, white } from './commonComponents';
import { FaUserPlus } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { mobile1 } from '../styles/Responsive';


const SearchContainer = styled.div`
    width: 100%;
    position: relative;
    max-height: 20rem;
`;

const SearchInput = styled.input`
    width: 100%;
    color: #37005a;
    background-color: transparent;
    font-family: ${primaryFont};
    font-weight: 500;
    font-size: 1.5rem;
    padding: 1rem;
    outline: 0;
    border: 0;
    border-bottom: 0.1rem solid ${purple};

    &::placeholder {
        color: #7423a6;
        ${mobile1({color: '#e3e1e1'})}
    }

    ${mobile1({borderBottom: `0.1rem solid ${white}`, color: `${white}`})}

`;

const SearchButton = styled.button`
    position: absolute;
    background: transparent;
    height: 100%;
    border: 0;
    cursor: pointer;
    top: 0;
    right: 0.5rem;

    .mdp {
        color: ${purple};
        font-size: 3rem;
        ${mobile1({color: `${white}`})}
    }
`

const SearchUsers = styled.div`
    width: 100%;
    max-height: 7rem;
`;

const Card = styled.div`
    width: 100%;
    height: 6.7rem;
    background-color: transparent;
    padding: 0.7rem;
    border-bottom: 0.1rem solid ${purple};
    justify-content: space-around;
    /* border: 2px solid red; */
    ${mobile1({borderBottom: `0.1rem solid ${white}`})}
`;

const ProfileImage = styled.img`
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    object-fit: cover;
`;

const UserName = styled.div`
    height: 2.7rem;
    width: 60%;
    max-width: 60%;
    font-family: ${primaryFont};
    font-size: 1.7rem;
    color: ${purple};
    font-weight: 500;
    overflow: hidden;
    ${mobile1({color: `${white}`})}
`;

const AddUser = styled(FaUserPlus)`
    font-size: 2.3rem;
    color: ${green};
`;


const SearchBar = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);


    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        alert("Now, You both are friends 🤘🏻");
        setUser(null);
        setUsername("");
    };





    return (
        <>
            <SearchContainer>
                <SearchInput placeholder='Add Friend' type='text' spellCheck="false" onChange={(e) => setUsername(e.target.value)}
                    value={username} />

                <SearchButton onClick={handleSearch} ><MdPersonSearch className='mdp d-flex' /></SearchButton>


            </SearchContainer>

            <SearchUsers>

                {err && <ErrorMsg>User not found !!!</ErrorMsg>}

                {user && (
                    <Card className='d-flex'>
                        <ProfileImage src={user.photoURL} alt='user' />

                        <UserName>{user.displayName}</UserName>

                        <button style={{ border: 0, backgroundColor: 'transparent', cursor: 'pointer' }} 
                        onClick={handleSelect} ><AddUser /></button>
                    </Card>
                )}

            </SearchUsers>
        </>
    )
}

export default SearchBar