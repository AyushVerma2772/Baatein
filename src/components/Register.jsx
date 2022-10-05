import React, { useState } from "react";
import styled from 'styled-components';
import Name from './Name';
import { white, LoginCard, CardName, Input, LoginButton, AccQue, purple, ErrorMsg, LoadingMsg } from './commonComponents';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const FileInput = styled(Input)`
  
  &::-webkit-file-upload-button {
    background-color: transparent;
    border: 0;
    color: ${white};
    border: 0.1rem solid ${purple};
    margin-right: 2.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    visibility: hidden;
    position: relative;
  }

  &::before {
    position: absolute;
    content: "Avatar";
    width: 7rem;
    height: 2rem;
    border: 0.1rem solid ${purple};
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;


// const FileLabel = styled.label`
//   color: ${white};
//   font-family: ${primaryFont};
//   font-size: 1.3rem;
//   /* border: 2px solid red; */
//   /* align-self: flex-start; */
//   margin-top: 1rem;
//   cursor: pointer;
// `;


// const AddAvatarLogo = styled(FaUserPlus)`
//   font-size: 2rem;
//   margin: 0 1rem;
// `;


const Register = () => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            // console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };



  return (
    <>
      <Name />

      <LoginCard className='d-flex' onSubmit={handleSubmit}>
        <CardName>Create an Account</CardName>

        <Input placeholder='Name' type={'text'} required ></Input>
        <Input placeholder='@email.com' type={'email'} required ></Input>
        <Input placeholder='Password' type={'password'} required ></Input>
        {/* <FileLabel htmlFor="file-input" className='d-flex' >Add an Avatar <AddAvatarLogo /> </FileLabel> */}

        <FileInput placeholder='Add an Avatar' type={'file'} id='file-input' accept="image/*"></FileInput>


        <LoginButton disabled={loading}>Sign up</LoginButton>
        {loading && <LoadingMsg>Please wait...</LoadingMsg>}

        {error && <ErrorMsg>Error !!!</ErrorMsg>}


        <AccQue>Do you have an account ? <Link to="/login">login</Link> </AccQue>

      </LoginCard>
    </>
  )
}

export default Register;