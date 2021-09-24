import {
  Input,
} from '../../components';

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

      <Form onSubmit={() => {}}>
        <FormTitle>Entrar</FormTitle>

        <Input
          type="email"
          placeholder="E-mail"
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          required
        />

        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}

export { SignIn };
