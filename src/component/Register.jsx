import React, { Component } from 'react'
import '../styles/Login.css'
import { post } from '../api'
import { UserContext } from '../context/userContext';
class RegisterPage extends Component {
  constructor (props) {
      super(props)
      console.log(this.props)
    this.state = {
      username: '',
      password: '',
      gender: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleGenderChange = this.handleGenderChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.dismissError = this.dismissError.bind(this)
  }

  dismissError () {
    this.setState({ error: '' })
  }

  handleSubmit (evt) {
    evt.preventDefault()

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' })
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' })
    }
    return post('', {
      userName: this.state.username,
      password: this.state.password,
      gender: this.state.gender.toUpperCase()
    }).then(_ => {
        alert('Successfully Sign up')
      this.props.history.push('/')
    }).catch(error=>{
        this.setState({error:error.errorMessage})
    })
  }
  handleGenderChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.id
    })
  }
  handleChange (evt) {
    this.setState({
      [evt.target.id]: evt.target.value
    })
  }

  handlePassChange (evt) {
    this.setState({
      password: evt.target.value
    })
  }

  render () {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {this.state.error && (
            <h3 data-test="error" className="error-message">
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          )}
          <label>User Name</label>
          <input
            type="text"
            data-test="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            data-test="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label>Gender</label>
          <br/>
          <input
            onChange={this.handleGenderChange}
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={this.state.gender === 'male'}
          />{' '}
          Male<br />
          <input
            onChange={this.handleGenderChange}
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={this.state.gender === 'female'}
          />{' '}
          Female<br />
          <input
            onChange={this.handleGenderChange}
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={this.state.gender === 'other'}
          />{' '}
          Other
          <input type="submit" value="Sign Up" data-test="submit" />
        </form>
      </div>
    )
  }
}

RegisterPage.contextType=UserContext
export default RegisterPage
