import { useMemo } from 'react';

import { Toggle } from '../Toggle';
import emojis from '../../utils/emojis';

import {
  Container,
  Profile,
  Welcome,
  UserName
} from './styles';


const MainHeader = () => {
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);

    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle />

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Jonatas Rosa Moura</UserName>
      </Profile>
    </Container>
  );
}

export { MainHeader };
