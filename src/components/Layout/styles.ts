import styled from "styled-components";
/**
* Grid - Layout:
* MH = MainHeader
* AS = Aside
* CT = Content
*/

export const Grid = styled.div`
  display: grid;
  //Primeira coluna vai ocular 250px e a segunda o tanto que sobrou - "Largura"
  grid-template-columns: 250px auto;
  // minha primeira linha (MH) vai ocupar 70px e vai pegar o que sobrar - "Altura"
  grid-template-rows: 70px auto;

  grid-template-areas:
  'AS MH'
  'AS CT';

  height: 100vh;
  min-height: 315px;

  @media(max-width: 600px) {
    grid-template-columns: 100%;
    grid-template-rows: 70px auto;

    grid-template-areas:
    'MH'
    'CT';
  }
`;
