import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store/store';
import Index from "./views/Index";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faStar } from '@fortawesome/free-solid-svg-icons'

library.add( faUserPlus, faStar)


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Index/>
      </Router>
    </Provider>
  );
}

export default App;
