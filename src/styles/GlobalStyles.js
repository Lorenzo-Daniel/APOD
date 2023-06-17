import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap");

:root{
    --primary:#0d6efd;
}
*{margin:0;
padding:0;
box-sizing: border-box;
}

body{
  font-family: "Montserrat", sans-serif;
}

`;
