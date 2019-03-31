import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../component/Header'
import Home from '../component/Home'
import About from '../component/About'
import EnsureLoggedIn from '../component/EnsureLoggedIn'
import SingOut from '../component/SingOut'
import Login from "../component/Login"
import Register from "../component/Register"
import AllUsers from "../component/AllUsers"
import { getItem, setItem, removeItem } from '../storage'
import {UserContext} from '../context/userContext'
export default class MainRoutes extends React.Component {
  constructor(props,context) {
    super(props,context)
    this.state = {
      user: getItem('user'),
      token:getItem('token')
    }
  }
  setUser = loginInfo => {
    setItem('user', loginInfo.user)
    setItem('token', loginInfo.token)
    this.setState({ user: loginInfo.user,token:loginInfo.token})
  }
  clearUser = () => {
    removeItem('user')
    removeItem('token')
    this.setState({token:null, user: null })
  }
  render() {

    return (
      <Router>
        <UserContext.Provider value={{user:this.state.user,token:this.state.token,
          setUser:this.setUser,
          clearUser:this.clearUser
          }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/register" component={Register} />
            <Route
              render={props => (
                <EnsureLoggedIn {...props}>
                  <Route path="/about" component={About} />
                  <Route path="/sign-out" component={SingOut} />
                  <Route path="/all-users" component={AllUsers} />
                </EnsureLoggedIn>
              )}
            />
          </Switch>
        </UserContext.Provider>
      </Router>
    )
  }
}
