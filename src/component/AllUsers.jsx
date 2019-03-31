import React from 'react'
import{get} from "../api"
import { UserContext } from '../context/userContext';
class AllUsers extends React.Component {
  state = {
    pages:0,
    size:25,
    loading:false,
    data:[]
  }
  fetchData=(loading)=>{
    if(loading){
      this.setState({loading:true})
    }
    if(this.state.totalPages && this.state.pages>this.state.totalPages){
      return;
    }
    return get('',{
      page:this.state.pages,
      size:this.state.size
    },{
      headers:{
        "X-AUTH-TOKEN":this.context.token,
      }
    }).then(data=>{
      this.setState({totalPages:data.totalPages,data:[...this.state.data,...data.content],pages:this.state.pages+1})
    })
  }
  listenScrollEvent(event) {
    var node = event.target
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight
    if (bottom) {
      this.fetchData(true)
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  populateListRow = (props) => {
    return props.data.map(row => {
      return (
        <div
          title={row.userName}
          onClick={_ => {
            return;
            // props.history.push('star-wars/' + id)
          }}
          key={row.id}
        >
          <label>Name : </label>
          <span >{row.userName}</span>
          <br/>
          <label>Gender : </label>
          <span >{row.gender}</span>
        </div>
      )
    })
  }
  render() {
    return (
      <div
        style={{
          marginLeft: '10%'
        }}
      >
        <div
            key="list"
            className="flex-container"
            onScroll={this.listenScrollEvent.bind(this)}
          >
            {this.populateListRow(this.state)}
          </div>
      </div>
    )
  }
}

AllUsers.contextType=UserContext
export default AllUsers
