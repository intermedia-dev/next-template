import styled from "styled-components";

const SPostContent = styled.div`
  & *:nth-child(1) {
    margin-top: 0;
  }
  
  & table {
     border-collapse: collapse;
     border: 1px solid #000;
     font-family: 'Public Sans',sans-serif;
  }
  
  & th, & td {
   border: 1px solid #000;
   padding: 3px;
  }
  
  & th {
  color: #2a256a;
  }

  & h2 {
    font-weight: bold;
    font-size: 32px;
    line-height: 130%;
    letter-spacing: -0.01em;
    color: ${props => props.theme.textColors.heading};
  }
  
  
  & h3{
    font-weight: 900;
    font-size: 26px;
    line-height: 33px;
    text-transform: capitalize;
    color: ${props => props.theme.textColors.heading};
  }

  & h2, & h3{
    margin-top: 24px;
    padding-bottom: 12px;
    margin-bottom: 16px;
    position: relative;
  }

  & h2:after, & h3:after{
    display: block;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 291px;
    height: 4px;
    background: #2A256A;
  }
  & p{
    font-size: 16px;
    line-height: 155%;
    letter-spacing: -0.006em;
    color: ${props => props.theme.textColors.paragraphs};
    margin-bottom: 16px;
  }

  & ul{
    padding: 0;
    margin-bottom: 24px;
    list-style: none;
  }

  & li{
    margin-bottom: 8px;
    padding-left: 24px;
    position: relative;
  }

  & ul>li::before{
    display: block;
    content: "";
    position: absolute;
    border-radius: 100%;
    background: #000000;
    width: 4px;
    height: 4px;
    left: 10px;
    top: 8px;
  }
  
  & a {
    color: #3c3597;
    text-decoration: underline 1.5px #c4c6e7;
    text-underline-offset: 0.2em;
    transition: text-decoration-color 300ms, text-underline-offset 300ms;
  }
  
  & a:hover {
    text-decoration-color: #3c3597;
    text-underline-offset: 0.3em;
  }
`;

export default SPostContent
