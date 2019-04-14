import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AllCards, AllCollections, SingleCollection } from './index';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/collections' component={AllCollections} />
      <Route path='/collections/:collectionId/cards' component={SingleCollection} />
      <Route exact path='/cards' component={AllCards} />
      <Redirect to='/collections' />
    </Switch>
  );
};

export default Routes;
