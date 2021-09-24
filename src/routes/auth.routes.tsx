import { Switch, Route } from 'react-router-dom';

import { SignIn } from '../pages';

// Arquivo para usuário não logado

const AuthRoutes = () => (
  <Switch>
    <Route component={SignIn} />
  </Switch>
);

export { AuthRoutes };
