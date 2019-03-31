import React, { Component } from 'react';
import "../styles/Login.css"
import {post} from "../api" 
import { UserContext } from '../context/userContext';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
    return post('/login',{
        userName:this.state.username,
        password:this.state.password
    }).then(user=>{
      this.context.setUser(user)
      this.props.history.push("/all-users")

    }).catch(error=>{
        this.setState({error:error.errorMessage})
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" className="error-message" >
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <label>User Name</label>
          <input type="text" data-test="username" id="username" value={this.state.username} onChange={this.handleChange} />

          <label>Password</label>
          <input type="password" data-test="password" id="password"value={this.state.password} onChange={this.handleChange} />

          <input type="submit" value="Log In" data-test="submit" />
        </form>
      </div>
    );
  }
}

LoginPage.contextType= UserContext
export default LoginPage;