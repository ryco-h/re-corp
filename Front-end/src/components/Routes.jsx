import { BrowserRouter as Router, Route } from "react-router-dom";
import React from 'react';

import Mainpage from "./js/MainPage/routesmain";

function Routes() {
  return (
    <Router>
        <Route path="/" component={Mainpage} />
        <Route path="/main" component={Mainpage}/>
    </Router>
  );
}

export default Routes;