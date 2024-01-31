import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.primary};
  }

  body {
    background: ${(props) => props.theme['base-background']};
    color: ${(props) => props.theme['base-text']};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, input, textarea, button {
    font-family: 'Nunito', sans-serif;
    font-family: 400;
    font-size: 1rem;
    line-height: 1.6;
  }

  a {
    text-decoration: none;

    transition: color 0.2;
  }

  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px ${(props) => props.theme['base-input']} inset !important;
      -webkit-text-fill-color: ${(props) => props.theme['base-text']} !important;
  }

`
