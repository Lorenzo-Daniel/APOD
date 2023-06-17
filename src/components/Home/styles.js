import styled from "styled-components";

export const Input = styled.input`
  text-align: center;
  width: 120px;
  border-radius: 5px;
  color: white;
  padding: 5px;
  font-weight: lighter;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 15px;
  border: 1px solid white;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--primary);
    /* color: var(--primary); */
  }
  &:focus {
    outline: none;
    border: 2px solid white;
  }
  @media (min-width: 768px) {
    width: 150px;
  }
`;

export const Label = styled.label`
  font-weight: lighter;
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

export const WrapperRowOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => (props.$single ? "center" : "")};
  margin-top: 15px;
  & div {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
    align-items: start;
  }
`;

export const HomeContainer = styled.div`
  height: 100vh;
  background-image: url("https://img.freepik.com/free-photo/fictional-planet-with-colourful-night-sky-stars-nebula_1048-7926.jpg?w=740&t=st=1686622579~exp=1686623179~hmac=b38161a703b2fe5497cc0a9ec4adf1c655a04e1a56232286f4954077f081c223");
  background-repeat: no-repeat;
  background-size:cover;
  background-position: bottom;
  @media (min-width: 320px) {
    height: 100vh;
    @media (min-height: 400px) {
      height: 130vh;
    }
    @media (min-height: 650px) {
      height: 100vh;
    }
  }
  @media (orientation: landscape) {
    @media (min-height: 320px) {
      height: 180vh;
    }
    @media (min-height: 600px) {
      height: 100vh;
    }
  }
`;
export const Span = styled.span`
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
