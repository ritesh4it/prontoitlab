import React from 'react'
import { removeItem } from '../storage'
import {UserContext} from "../context/userContext"
 class SignOut extends React.Component {
  componentDidMount () {
    removeItem('user')
    removeItem('token')
    this.context.clearUser()
  }
  render () {
    return (
     null
    )
  }
}

SignOut.contextType=UserContext
export default SignOut;