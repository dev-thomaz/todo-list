import React from 'react';
import { Switch, Route } from 'react-router-dom'
import List from '../pages/List'

const Routes: React.FC = () => (

    <Switch>
        <Route path="/" exact component={List} />
    </Switch>
)

export default Routes;