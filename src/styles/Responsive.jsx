import { css } from "styled-components"
export const mobile1 = (resCss) => {
    return css`
        @media only screen and (max-width: 620px) {
            ${resCss};
        }
    `;
};