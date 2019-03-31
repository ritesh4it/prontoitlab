import React from 'react'
import '../App.css'
import { Redirect } from 'react-router-dom'
import {UserContext} from "../context/userContext"
 class EnsureLoggedIn extends React.Component {
  constructor (props) {
    super(props)
    this.isRedirect = false
  }
  render () {
    console.log("ensure login >>>>:",this.context,this.props)
    if (!this.context.user ) {
      return <Redirect to="/sign-in" />
    }
    return this.props.children
  }
}

EnsureLoggedIn.contextType= UserContext
export default EnsureLoggedIn