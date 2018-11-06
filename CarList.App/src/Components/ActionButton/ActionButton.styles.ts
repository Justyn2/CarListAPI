import styled from 'styled-components';

export const StyledButton = styled.button`
padding:.2em 1em;
border-top:1px solid black;
border-left:1px solid black;
border-right:2px solid black;
border-bottom:3px solid black;
box-sizing: border-box;
font:inherit;
background:inherit;
width:auto;
min-width:15%;
-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
&:active{
    border-style:inset;
    background:black;
    color:white;
}
`;