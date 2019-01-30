import React from 'react';
import RegisterRoute from './components/RegisterRoute';
import LoginRoute from './components/LoginRoute';
import ProfileRoute from './components/ProfileRoute';
import AboutRoute from './components/AboutRoute';
import MenuBar from './components/MenuBar';

import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import ActionsRoute from "./components/ActionsRoute";
import DetailsRoute from "./components/DetailsRoute";

class App extends React.Component {

    state = {
        loggedIn: localStorage.getItem('access_token') !== undefined,
        action: undefined,
    };

    onLoginAction = (e, email, password) => {
        fetch("/login", {
            method: 'POST',
            headers: {
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
            .catch(a => {
                console.log(a)
            });

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
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    loggedIn: false,
                });

            });
        localStorage.removeItem('access_token');
    };

    onActionSelected = (action) => {
        this.setState({
            action: action, 
        });
        console.log(this.state.action);
    };

    render() {
        const {loggedIn} = this.state;
        console.log(loggedIn)

        return (
            <Router>
                <div className="App">
                    <MenuBar loggedIn={loggedIn} onLogoutAction={this.onLogoutAction}/>
                    <Route
                        path="/register"
                        component={RegisterRoute}
                    />
                    <Route
                        path="/login"
                        render={() => (loggedIn ? (<Redirect to="/profile"/>) : (
                            <LoginRoute onLoginAction={this.onLoginAction}/>))}
                    />
                    <Route
                        path="/profile"
                        render={() => (loggedIn ? <ProfileRoute/> : <Redirect to="/login"/>)}
                    />
                    <Route
                        path="/about"
                        component={AboutRoute}
                    />
                    <Route
                        exact
                        path="/actions"
                        render={ () => <ActionsRoute onActionSelected={this.onActionSelected} /> }
                    />
                    <Route  path="/details"
                        render={() => (this.state.action ? <DetailsRoute action={this.state.action}/> : <Redirect to="/actions"/>)}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
