import { ThemeProvider } from 'styled-components';

import GlobalStyles from "./styles/GlobalStyles";
import { Layout } from "./components/Layout";
import { Dashboard } from './pages/Dashboard';
import { List } from './pages/List';
import  dark from './styles/themes/dark';

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Layout>
        <List />
      </Layout>
    </ThemeProvider>
  );
}

export { App };
