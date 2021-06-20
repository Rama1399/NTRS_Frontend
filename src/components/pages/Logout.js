import React, { Component }  from 'react';
import { AiFillPauseCircle } from 'react-icons/ai';
import {withRouter,Redirect,Link} from 'react-router-dom'
import Navbar from './Navbar';
import { Button, Confirm } from 'semantic-ui-react'


class Logout extends Component{
   
    constructor(props){
        super(props);
        this.state={
            name:''
        }
   
        
    
 
}
 render()   

{
    return (
    
        <div className="text-center">
                {/* <h1>account</h1> */}
                <div className="nav-text" onClick={()=>{
            if(window.confirm('Are you sure You want to logout?'))
            {
                this.setState({
                    logout:true
                })
                localStorage.clear()
                this.props.history.push('/')
              }
              else{
                this.setState({
                  logout:false
                })
              }
            }}>
              <Link to={this.state.logout ?"/":"#"}></Link>
            </div>
            </div>
        
    )
}
}




export default withRouter(Logout);
