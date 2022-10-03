import React, { useState } from 'react';
import Name from './Name';
import { LoginCard, CardName, Input, LoginButton, AccQue, ErrorMsg } from './commonComponents';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            setErr(true);
        }
    };


    return (
        <>
            <Name />

            <LoginCard className='d-flex' onSubmit={handleSubmit}>
                <CardName>Login</CardName>

                <Input placeholder='@email.com' type={'email'}></Input>
                <Input placeholder='Password' type={'password'}></Input>

                <LoginButton>Log in</LoginButton>

                {err && <ErrorMsg>Error !!!</ErrorMsg>}

                <AccQue>Not Registered Yet ? <Link to="/register">Sign up</Link> </AccQue>

            </LoginCard>
        </>
    )
}

export default Login;