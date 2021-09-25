import { useMemo, useState } from 'react';

import { Toggle } from '../Toggle';

import { emojis } from '../../utils/emojis';

import { useTheme } from '../../hooks/theme';

import {
  Container,
  Profile,
  Welcome,
  UserName,
} from './styles';


const MainHeader = () => {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);

    return emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle
        checked={darkTheme}
        labelLeft="Light"
        labelRight="Dark"
        onChance={handleChangeTheme}
      />

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Jonatas Rosa Moura</UserName>
      </Profile>
    </Container>
  );
}

export { MainHeader };
