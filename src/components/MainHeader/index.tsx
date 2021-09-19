import React, { useMemo } from 'react';

import {
  Container,
  Profile,
  Welcome,
  UserName
} from './styles';

import emojis from '../../utils/emojis';

const MainHeader = () => {
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);

    return emojis[indice];
  }, []);

  return (
    <Container>
      <h1>Toogle</h1>

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Jonatas Rosa Moura</UserName>
      </Profile>
    </Container>
  );
}

export { MainHeader };
