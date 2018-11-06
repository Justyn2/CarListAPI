import styled from 'styled-components';

export const AppMain = styled.div`text-align: center;`;

export const AppLogo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  display: inline-block;
  float:left;
  height: 60px;
  @keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
  }
`;

export const AppTitle = styled.h1`
  float:left;
  font-size: 1.5em;
  display:inline-block
`;

export const AppHeader = styled.header`
  background-color: #222;
  height: 60px;
  padding-left: 10px;
  color: white;
`;

export const AppIntro = styled.p`
  font-size: large;
`;
