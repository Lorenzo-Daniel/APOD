import styled ,{css} from "styled-components";
export const Div = styled.div`
  display: ${(props) => (props.$flex && "flex")};
  flex-direction: ${(props) => props.$column && "column"};
  align-items: ${(props) => props.$aic && "center"};
  /* align-items: end; */
  align-items: ${(props) => props.$aiend && "flex-end"};
  align-items: ${(props) => props.$ais && "flex-start"};
  justify-content: ${(props) => props.$jccent && "center"};
  justify-content: ${(props) => props.$jcc && "space-between"};
  justify-content: ${(props) => props.$jce && "space-evenly"};
  justify-content: ${(props) => props.$jcend && "end"};

  margin: ${(props) => props.$m || ""};
  margin-top: ${(props) => props.$mt || ""};
  margin-left: ${(props) => props.$ml || ""};
  margin-bottom: ${(props) => props.$mb || ""};
  margin-right: ${(props) => props.$mr || ""};
  padding:${(props) => props.$p || ""};
  background-color :${(props) => props.$bgc || ""};

  `;


export const Button = styled.button`
background-color: transparent;
padding: 3px;

${props=> props.$btnPrimary && css`
width: 120px;
  border-radius: 5px;
  color: white;
  background-color: var(--primary);
  border: 1px solid white;
  font-size: 14px;
  margin-top: 5px;

  &:hover {
    background-color: #0d6dfdb8;
  }

  @media (min-width: 768px) {
    width: 150px;
  }
`}

`