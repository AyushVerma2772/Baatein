import styled from "styled-components";

// Colors
export const white = "#fffefe";
export const green = "#3eb244";
export const purple = "#410179";    // #880ED4   #686ffd    #6C0BA9
export const lightPurple = "#c487fe98";
export const red = "#dc3545";


// Fonts
export const secondaryFont = "'Ubuntu', sans-serif";
export const primaryFont = "'Poppins', sans-serif";
export const nameFont = "'Libre Baskerville', serif";


// Common components
export const LoginCard = styled.form`
    width: 40rem;
    padding: 2rem;
    backdrop-filter: blur(12px) saturate(150%);
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 9px 9px 13px -3px #b452ea49;
    border-radius: 12px;
    flex-direction: column;
    gap: 1.5rem;
`;

export const CardName = styled.span`
    margin: 1rem 0;
    color: ${white};
    font-family: ${secondaryFont};
    font-size: 2.5rem;
`;

export const Input = styled.input`
    background-color: transparent;
    border: 0;
    border-bottom: 0.2rem solid ${purple} ;
    outline: none;
    color: ${white};
    font-family: ${primaryFont};
    width: 90%;
    padding: 0.5rem 1rem;
    font-size: 1.45rem;

    &::placeholder {
    
    color: #d4d4d4;
    }

`;

export const LoginButton = styled.button`
  background-color: ${green};
  color: ${white};
  font-size: 1.8rem;
  font-weight: 500;
  font-family: ${secondaryFont};
  padding: 0.7rem 5rem;
  border: 0;
  border-radius: 0.7rem;
  margin-top: 1.5rem;
  cursor: pointer;
`;

export const AccQue = styled.span`
  color: ${white};
  font-size: 1.2rem;
  font-family: ${primaryFont};
  margin-top: 1rem;

  a {
    background-color: ${green};
    color: ${white};
    text-decoration: none;
    padding: 0.1rem 1.3rem;
    border-radius: 0.5rem;
    margin-left: 1rem;
  }

`;

export const ErrorMsg = styled.span`
  color: ${red};
  background-color: transparent;
  font-size: 1.4rem;
  font-family: ${primaryFont};
  font-weight: bold;
`;

export const LoadingMsg = styled.span`
  color: ${green};
  background-color: transparent;
  font-size: 1.4rem;
  font-family: ${primaryFont};
  font-weight: bold;
`;