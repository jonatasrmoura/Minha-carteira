import { useAuth } from '../../hooks/auth';

import {
  Input,
  Button,
} from '../../components';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Logo,
  FormTitle,
  Form,
} from './styles';
import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Minha Carteira" />
        <h2>Minha Carteira</h2>
      </Logo>

      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>

        <Input
          type="email"
          placeholder="E-mail"
          required
          onChange={((e) => setEmail(e.target.value))}
        />
        <Input
          type="password"
          placeholder="Senha"
          required
          onChange={((e) => setPassword(e.target.value))}
        />

        <Button type="submit">Acessar</Button>
      </Form>
    </Container>
  );
}

export { SignIn };
