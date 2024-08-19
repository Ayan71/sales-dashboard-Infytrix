import styled from "styled-components";
export const NavbarStyle = styled.div`
  display: flex;
  justify-content: space-evenly;
   /* width: 100vw; */
  background-color: lightblue;
  padding: 1rem;

  a {
    text-decoration: none;
    font-size:20px;
    cursor: pointer;
    font-family: serif;
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
