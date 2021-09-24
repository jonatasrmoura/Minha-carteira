import logoImg from '../../assets/logo.svg';

import {
  Container,
  Logo,
  FormTitle,
  Form,
} from './styles';

const SignIn = () => {
  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha Carteira" />
        <h2>Minha Carteira</h2>
      </Logo>

      <Form>
        <FormTitle>Entrar</FormTitle>

        <input type="text"></input>
        <input type="text"></input>

        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}

export { SignIn };
