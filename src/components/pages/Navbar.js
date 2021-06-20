import React, { Component } from 'react';
import {withRouter,Link} from 'react-router-dom'
import {FaBook,FaBell,FaCheckSquare,FaUser,FaBars, FaCheckCircle}  from 'react-icons/fa';
import {IoMdHelpCircle} from 'react-icons/io';
import {AiOutlineClose} from 'react-icons/ai'
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import {Dropdown} from 'react-bootstrap'

class Navbar extends Component{
  constructor(props){
      super(props);
      let temp=JSON.parse(localStorage.getItem('local'));
      console.log("here navbar  "+temp.user.idUser);
      this.state={
        
        sidebar: false,
        setSidebar: false,
        user: temp.user.firstName,
      }
      

  }
  showSidebar = () => {(
    this.setState({
      sidebar:true
    })
  )};

  closeSidebar = () => {(
    this.setState({
      sidebar:false
    })
  )};

 render(){
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaBars onClick={this.showSidebar} />
          </Link>
          <div class="filler" style={{flexGrow:'1', textAlign:'center'}}></div>
          {/* <div className="user">
            <p style={{color: 'white', fontSize:'16px'}}>Hello {this.state.user}!</p>
          </div> */}
          <div className="form-inline" style={{display:" block ruby"}}>
            <FaUser  style={{fontSize:'18px'}} />{" "}<Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{fontSize:'16px', fontWeight:'bold', color: 'aliceblue',marginRight: '10px'}}>
              My Account
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/notes" >Home</Dropdown.Item>
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item  onClick={()=>{console.log("hii");
            if(window.confirm('Are you sure You want to logout?'))
            {
                // this.setState({
                //     logout:true
                // })
                localStorage.clear()
                this.props.history.push('/')
              }
              else{
                // this.setState({
                //   logout:false
                // })
              }
              }}>Logout</Dropdown.Item>
        
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
        <nav style={{zIndex: '10'}} className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' >
            <li className='navbar-toggle' >
              <Link to='#' className='menu-bars' >
                <AiOutlineClose onClick={this.closeSidebar} />
              </Link>
            </li>
            {/* <li> */}
              <h3 style={{color: 'white', fontSize:'26px', fontStyle:'bold'}}>Hello {this.state.user}!</h3>
            {/* </li> */}
             <li className="nav-text">
                    <Link to="/notes">
                        <FaBook/>
                        <span>Notes</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/reminders">
                        <FaBell/>
                        <span>Reminders</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/todolists">
                        <FaCheckCircle/>
                        <span>TodoLists</span>
                    </Link>
                </li>
                {/* <li className="nav-text">
                    <Link to="/support">
                        <IoMdHelpCircle/>
                        <span>Support</span>
                    </Link>
                </li> */}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
   
  );
 }
}

export default withRouter(Navbar);
