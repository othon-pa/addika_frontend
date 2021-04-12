import React from 'react';
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import MainPageScreen from './modules/MainPageScreen';

const App = () => {
  const history = createBrowserHistory()
  /* const counter = useSelector(state => state.counter);
  const dispatch = useDispatch(); */
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={MainPageScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
