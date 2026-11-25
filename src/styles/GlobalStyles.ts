import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #fdfbf7 0%, #f3ece1 100%);
    color: #2c241e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
  }

  h1, h2, h3 {
    font-family: 'Cinzel', serif;
  }

  button {
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`;