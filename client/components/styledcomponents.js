import styled from "styled-components";

export const TopRightButton = styled.button`

color: white;
padding: 5px 15px;
border-radius: 5px;
text-transform: uppercase;
margin: 10px 0px;
cursor: pointer;
transition: ease color 250ms;
&:hover {
  color: #444444 !important;
}
&:disabled {
  cursor: default;
  opacity: 0.7;
}
`;

export const TopLeftButton = styled.button`
color: white;
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