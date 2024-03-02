import styled from "styled-components";

export const Button = styled.button`
  background-color: #3f51b5;
  width: 50%;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #283593;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export const SignUpButton = styled.button`
  background-color: #228B22;
  width: 15%;
  color: white;
  padding: 5px 15px;
  border-radius: 50%;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: #006400;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;