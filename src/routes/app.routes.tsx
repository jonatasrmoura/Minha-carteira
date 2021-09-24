import { Switch, Route } from 'react-router-dom';

import { Layout } from "../components";
import { Dashboard, List } from '../pages';

const AppRoutes = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/list/:type" exact component={List} />
    </Switch>
  </Layout>
);

export { AppRoutes };
