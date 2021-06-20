import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import '../css/Profile.css';
import Navbar from './Navbar'
import {Card,Container, Row, Col,FormControl,FormGroup,FormLabel, Button} from 'react-bootstrap'
import img_avatar from '../images/img_avatar.png'
import LoadingBar from './LoadingBar';

class Profile extends Component{
  constructor(props){
      super(props);
      console.log("localstorage "+localStorage.getItem('method'));

      let temp=JSON.parse(localStorage.getItem('local'));
      console.log("here profile  "+temp.user.idUser);
      this.state={
        firstName: temp.user.firstName,
        lastName: temp.user.lastName,
        password: temp.user.password,
        confirmpassword: '',
        email: temp.user.email,
        phone: temp.user.phone,
        password: temp.user.password,
        update: false,
      }
      
      this.handleSave = this.handleSave.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){
    document.body.style.background= 'white' ;
  }

  componentWillUnmount(){
    document.body.style.background=null;
}


  handleCancel(e){
    document.getElementById("card1").style.display="block";
    document.getElementById("card2").style.display="none";
  }

  handleEdit(e){
    document.getElementById("card1").style.display="none";
    document.getElementById("card2").style.display="block";
  }

  handleChangePassword(e){
    this.props.history.push('/change');
  }

  handleSave(e){
    let temp=JSON.parse(localStorage.getItem('local'));
    this.setState({  update:true})
    fetch('http://ntrs-backend.herokuapp.com/user/updateUser/'+temp.user.idUser, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                // body: data
                  body: JSON.stringify ({
                    idUser: temp.user.idUser,  
                    firstName : this.state.firstName,
                    lastName:this.state.lastName,
                    email:this.state.email,
                    phone:  temp.user.idUser,
                    password:temp.user.idUser
                    
                  }),
                })
                .then(res =>res.json())
                  .then (res => {
                    this.setState({  update:false})
                      console.log("result "+JSON.stringify(res));
                      if (res.msg === "updated") {
                        console.log("updted profile");
                        alert('updated!!!');
                        // this.props.history.push('/login');
                      } else  {
                        console.log("Error in inserting");
                      }
                  })
                  .catch (err => {
                    console.log (err);
                  })
                
  }
  
  handleChange (event) {
    this.setState ({
     
          [event.target.name]: event.target.value
    });
}

  render()
  {

    if(this.state.update){
      return(
          <LoadingBar text="Updating..."></LoadingBar>
      )
    }
    else{
        return (
         <div className="text-center">
                  <Navbar/>
                  
                  {/* <Container> */}
                          
                      <div id="profile-card" >
                          <Container
                          
                          >
                            <h1 id="headProfile" style={{marginTop:'10px'}}>Account Profile</h1>
                                      <Row>
                                          <Col xs={10} md={4}>
                                              <div class="profileCard"  id="card1">
                                                  <img src={img_avatar} style={{width:'50%', borderRadius:'50%',marginTop: '20px'}}/>
                                                  <div style={{textAlign: 'center',margin: '30px'}}>
                                                    <h4>FirstName</h4>
                                                    <p>{this.state.firstName}</p>
                                                    <br></br>
                                                    <h4>LastName</h4>
                                                    <p>{this.state.lastName}</p>
                                                    <br></br>
                                                    <h4>Email</h4>
                                                    <p>{this.state.email}</p>
                                                    <br></br>
                                                    <h4>Phone</h4>
                                                    <p>{this.state.phone}</p>
                                                  </div>
                                                  <div >
                                                    <button id="pEditBtn" onClick={this.handleEdit} >Edit Profile</button>
                                                    {/* <button id="pEditBtn" onClick={this.handleChangePassword} >Change Password</button> */}
                                                    
                                                  </div>
                                              </div>
                                              <div class="profileCard" id="card2" style={{display:'none' }}>
                                                  <img src={img_avatar} style={{width:'50%', borderRadius:'50%',marginTop: '20px'}}/>
                                   
                                                    <div style={{margin: '50px'}}>
                                                    <h4>FirstName</h4>
                                                    <FormGroup  >
                                                    <FormControl
                                                        type="text"
                                                        name="firstName"
                                                        placeholder="firstname"
                                                        onChange={this.handleChange}
                                                        value={this.state.firstName}
                                                        className="input col-xl-12"
                                                        required
                                                    />
                                                    </FormGroup>
                                                    <br></br>
                                                    <h4>LastName</h4>
                                                    <FormGroup className="form-inline">
                                                    <FormControl
                                                        type="text"
                                                        name="lastName"
                                                        placeholder="lastname"
                                                        onChange={this.handleChange}
                                                        value={this.state.lastName}
                                                        className="input col-xl-12"
                                                        required
                                                    />
                                                    </FormGroup>
                                                    <br></br>
                                                    <h4>Email</h4>
                                                    <FormGroup >
                                                    <FormControl
                                                        type="text"
                                                        name="email"
                                                        placeholder="email"
                                                        onChange={this.handleChange}
                                                        value={this.state.email}
                                                        className="input col-xl-12"
                                                        required
                                                    />
                                                    </FormGroup>
                                                    <br></br>
                                                    <h4>Phone</h4>
                                                    <FormGroup className="form-inline">
                                                    <FormControl
                                                        type="text"
                                                        name="phone"
                                                        placeholder="phone"
                                                        onChange={this.handleChange}
                                                        value={this.state.phone}
                                                        className="input col-xl-12"
                                                        disabled='true'
                                                        required
                                                    />
                                                    </FormGroup>
                                                    </div>
                                                 
                                                  <div style={{display: 'flex-inline'}}>
                                                    <button id="pEditBtn" onClick={this.handleSave}>Save </button>
                                                    <button id="pEditBtn" onClick={this.handleCancel}>Cancel </button>
                                                  </div>
                                              </div>
                                          </Col>
                                      </Row>
                          </Container>
                      </div>     
                      {/* </Container> */}
                
            </div>
        )
        }
  }
}

export default withRouter(Profile);
