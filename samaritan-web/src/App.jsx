import React from 'react';
import RegisterRoute from './components/RegisterRoute';
import LoginRoute from './components/LoginRoute';
import ProfileRoute from './components/ProfileRoute';
import AboutRoute from './components/AboutRoute';
import MenuBar from './components/MenuBar';

import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: localStorage.getItem('access_token') !== null,
    };
  }

  onLoginAction = (e, email, password) => {
    fetch("/login", {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => {
        console.log(res.status);
        if (res.status === 200)
          return res.json();
    })
    .then(json => {
      console.log(json);
      localStorage.setItem('access_token', json.access_token);
      this.setState({
        loggedIn: true,
      });
    })
    .catch( a => { console.log(a) });

  }

  onLogoutAction = (e) => {
    const token = 'Bearer ' + localStorage.getItem('access_token');
    const reqHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': token,
        'Accept': 'application/json',
    });
    console.log("req")
    fetch('/logout', {
        method: 'POST',
        headers: reqHeaders,
    })
    .then( response => response.json() )
    .then ( json => {
      console.log(json);
      this.setState({
        loggedIn: false,
      });

    });
  }

  render() {
    const {loggedIn} = this.state;
    console.log(loggedIn)

    return(
      <Router>
        <div className="App">
        <MenuBar loggedIn={loggedIn} onLogoutAction={this.onLogoutAction} />
        <Route
          path="/register"
          component={RegisterRoute}
        />
        <Route
          path="/login"
          render={() => (loggedIn ? (<Redirect to="/profile" />) : (<LoginRoute onLoginAction={this.onLoginAction} />)) }
        />
        <Route
          path="/profile"
          render={() => (loggedIn ? <ProfileRoute /> : <Redirect to="/" />)}
        />
        <Route
          path="/about"
          component={AboutRoute}
        />

        </div>
      </Router>
    );
  }
}
export default App;
