import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/common/loading';
import NotFound from '../components/common/notFound';

const AutoComplete = Loadable({
  loader: () => import(/* webpackChunkName: "AutoComplete" */'../containers/'),
  loading: Loading
});


const AppRouter = ({ ...rest }) => {
  return (
    <Switch>
      <Route
        {...rest}
        exact={true}
        path={`${rest.match.path}`}
        render={props => <AutoComplete {...props} />}
      />
      <Route component={NotFound} />
    </Switch>);
};

export default AppRouter;