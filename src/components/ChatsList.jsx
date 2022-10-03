import React, { useContext, useEffect, useState } from 'react';
import ChatCard from './ChatCard';
import styled from 'styled-components';
import { purple } from './commonComponents';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { mobile1 } from '../styles/Responsive';


const ChatsContainer = styled.div`
    min-height: 50rem;
    max-height: 20rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.3rem;
    }
  
    &::-webkit-scrollbar-thumb {
        border-radius: 0.5rem;
        background-color: ${purple};
    }

    ${mobile1({maxHeight: '40rem'})}
`;

const ChatsList = ({openNav}) => {

    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);


    const handleSelect = (u) => {
        // console.log("Aman");
        openNav();
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <>

            <ChatsContainer>
                {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {

                    return <ChatCard
                        key={chat[0]}
                        name={chat[1].userInfo.displayName}
                        recentMsg={chat[1].lastMessage?.text}
                        profilePic={chat[1].userInfo.photoURL}
                        onCLickFunc={() => {handleSelect(chat[1].userInfo)}}
                    />
                })}

            </ChatsContainer>
        </>
    )
}

export default ChatsList