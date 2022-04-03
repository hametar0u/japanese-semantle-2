import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <Router>
      //   <Routes>
      //     <Route exact path="/">
      //       <p>This is the home page</p>
      //     </Route>
      //   </Routes>
      // </Router>
      <p>This is the home page</p>
    );
  }
}