import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import axios from 'axios';
import './App.css';
import SignUpSignIn from './SignUpSignIn';
import TopNavbar from './TopNavbar';
import Secret from './Secret';
import ListIndex from './ListIndex';
import ListDetail from './ListDetail';

import MoviesIndex from './MoviesIndex';

class App extends Component {
  constructor() {
    super();

    this.state = {
      nickname:'',
      signUpSignInError: '',
      authenticated: localStorage.getItem('token')
    };
  }

  handleSignUp(credentials) {
    const { nickname, username, password, confirmPassword } = credentials;
    if (!nickname.trim() || !username.trim() || !password.trim() || password.trim() !== confirmPassword.trim()) {
      this.setState({
        ...this.state,
        signUpSignInError: 'Must Provide All Fields'
      });
    } else {
      axios.post('/api/signup', credentials)
        .then(resp => {
          const { token } = resp.data;
          this.setState({
            ...this.state,
            nickname: nickname,
            signUpSignInError: '',
            authenticated: token
          });
          localStorage.setItem('token', token);
        });
    }
  }

  handleSignIn(credentials) {
    const { nickname, username, password } = credentials;
    if (!username.trim() || !password.trim()) {
      this.setState({
        ...this.state,
        signUpSignInError: 'Must Provide All Fields'
      });
    } else {
      axios.post('/api/signin', credentials)
        .then(resp => {
          const { token } = resp.data;
          this.setState({
            ...this.state,
            nickname: nickname,
            signUpSignInError: '',
            authenticated: token
          });
          localStorage.setItem('token', token);
        });
    }
  }

  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false
    });
  }

  renderSignUpSignIn() {
    return <SignUpSignIn error={this.state.signUpSignInError}
                         onSignUp={this.handleSignUp.bind(this)}
                         onSignIn={this.handleSignIn.bind(this)}
            />
  }

  renderApp() {

    return (
      <div>
        <Match exactly pattern="/" render={() => <h1>Wellcome!</h1>} />
        <Match exactly pattern="/" component={ListIndex}/>
        <Match exactly pattern="/listindex" component={ListIndex} />
        <Match exactly pattern="/listdetail/:id" component={ListDetail} />
        <Match exactly pattern="/movies" component={MoviesIndex} />
        <Match exactly pattern="/secret" component={Secret} />
        <Miss render={() => <h1>NOT FOUND!</h1>} />
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopNavbar showNavItems={true} onSignOut={this.handleSignOut.bind(this)}/>
          {this.state.authenticated ? this.renderApp() : this.renderSignUpSignIn()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
