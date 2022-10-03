import React from 'react';
import styled from 'styled-components';
import { nameFont, white } from './commonComponents';


const NameH1 = styled.h1`
  font-size: 6rem;
  color: ${white};
  text-align: center;
  font-family: ${nameFont};
  margin: 1.5rem 0;
  position: absolute;
  top: 0;

`;


const Name = () => {
  return (
    <NameH1>Baatein</NameH1>
  )
}

export default Name