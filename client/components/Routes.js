import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AllCards, AllCollections } from './index';

const Routes = () => {
  return (
    <Switch>
      <Route path='/collections' component={AllCollections} />
      <Route path='/cards' component={AllCards} />
      <Redirect to='/collections' />
    </Switch>
  );
};

export default Routes;
