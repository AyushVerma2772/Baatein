import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { primaryFont, purple, secondaryFont, white } from './commonComponents';
import { AiOutlineSend } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid";
import { mobile1 } from '../styles/Responsive';



const InputBox = styled.div`
    width: 100%;
    height: 6.5rem;
    padding: 0.5rem 1.5rem;
    background-color: ${white};
    justify-content: space-between;
`;

const Input = styled.textarea`
    height: 100%;
    width: 70%;
    font-size: 1.6rem;
    font-family: ${primaryFont};
    resize: none;
    outline: none;
    border: 0;
    border-bottom: 0.1rem solid ${purple};

    &::-webkit-scrollbar {
        width: 0.5rem;
    }
  
    &::-webkit-scrollbar-thumb {
        border-radius: 0.5rem;
        border: 0.1rem solid white;
        background-color: ${purple};
    }

    ${mobile1({width: '60%'})}
`;

const RightBox = styled.div`
    height: 100%;
    width: 25%;
    justify-content: space-around;
    ${mobile1({width: '38%'})}
`;

const SendButton = styled.button`
    width: 8rem;
    font-size: 1.5rem;
    font-family: ${secondaryFont};
    /* background-color: ${purple}; */
    background-color: ${props => props.bgDisable || `${purple}`};
    color: ${white};
    padding: 0.8rem 1rem;
    border: 0;
    cursor: ${props => props.cursorDisable || 'pointer'};
    border-radius: 0.5rem;
    justify-content: space-between;
`;

const Label = styled.label``;


const AddImgIcon = styled(FcAddImage)`
    font-size: 2.5rem;
    cursor: pointer;
`;


const InputMsg = () => {

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [disable, setDisable] = useState(true)

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handelChange = (e) => {
        const msg = e.target.value;
        setText(msg);
        console.log(disable)
        if (msg.trim() === "") {
            setDisable(true)
        }
        
        else {
            setDisable(false)
        }

    }

    const handleSend = async () => {

        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } 

        else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
        setDisable(true)
    };

    return (
        <>
            <InputBox className='d-flex' >
                <Input placeholder='Type Something...'
                    onChange={handelChange}
                    value={text} />

                <RightBox className='d-flex' >

                    <Label htmlFor='file'><AddImgIcon /></Label>

                    <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={(e) => {setImg(e.target.files[0]); setDisable(false)}}
                    />

                    <SendButton className='d-flex' onClick={handleSend} disabled={disable} bgDisable={disable  && 'gray'} cursorDisable={disable && 'no-drop'} >Send <AiOutlineSend /></SendButton>

                </RightBox>

            </InputBox>
        </>
    )
}

export default InputMsg