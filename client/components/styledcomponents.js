import styled from "styled-components";

export const TopRightButton = styled.button`

color: #F5F5F5;
padding: 5px 15px;
border-radius: 5px;
text-transform: uppercase;
margin: 10px 0px;
cursor: pointer;
transition: color 250ms;
&:hover {
  color: red !important;
}
&:disabled {
  cursor: default;
  opacity: 0.7;
}
`;

export const TopLeftButton = styled.button`
color: #F5F5F5;
background-color: black;
font-size: 20px;
padding: 5px 15px;
border-radius: 5px;
text-transform: uppercase;
margin: 10px 0px;
cursor: pointer;
transition: color 250ms;
&:hover {
  color: red !important;
}
&:disabled {
  cursor: default;
  opacity: 0.7;
}
`;

export const Logo = styled.img`
  width: 200px; 
  height: auto;
`;