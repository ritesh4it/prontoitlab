import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import {UserContext} from "../context/userContext"
//  class Header extends React.Component {
//   render () {
//     debugger
//     // let context = this.context;

//     return (
//       <UserContext.Consumer>
//         {(props)=>{
//           console.log(props);
//           return( <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/all-users">All Users</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           {getUser(props)}
//         </ul>)}
//         }
       
//       </UserContext.Consumer>
//     )
//   }
// }

function Header(){
  return (
    <UserContext.Consumer>
      {(value)=>{
        return( <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/all-users">All Users</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {getUser(value)}
      </ul>)}
      }
     
    </UserContext.Consumer>
  )
}
function getUser (value={}) {
  if (value.user) {
    return (
      <li>
        <Link to="/sign-out">Sign Out</Link>
      </li>
    )
  } else {
    return (
     <React.Fragment>

     <li>
        <Link to="/sign-in">Sign In</Link>
      </li>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
     </React.Fragment>
    )
  }
}

// Header.contextType = UserContext;

export default Header