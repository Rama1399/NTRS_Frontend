import React, { Component }  from 'react';
import {withRouter} from 'react-router-dom'
import LoadingBar from './LoadingBar';
import {Form }from "react-bootstrap";


class ChangePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            firstName:'User',
            lastName:'One',
            email:'abc@gmail.com',
            password:'',
            confirmPassword:'',
            flag: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e)  {
        this.setState({
          [e.target.name]: e.target.value
          
        });
      }

      onSubmit(e) {
        e.preventDefault()
        let regexPassword=/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,20}$/;
  
        if(this.state.password.trim() == '' || this.state.confirmPassword.trim()==''){
          document.getElementById ('change').innerHTML = 'Fields Cannot be Empty.';
          document.getElementById ('change').style.visibility='visible';
        }
        else if(!regexPassword.test(this.state.password)){
          document.getElementById('change').innerHTML='Please Enter Valid Password'
          document.getElementById ('change').style.visibility='visible';
        }
        else if(!regexPassword.test(this.state.password)){
            document.getElementById('change').innerHTML='Please Enter Valid Confirm Password'
            document.getElementById ('change').style.visibility='visible';
        }
        else if(this.state.password != this.state.confirmPassword){
            document.getElementById('change').innerHTML='Confirm Password dont match! '
            document.getElementById ('change').style.visibility='visible';
        }
        else{
          console.log("here "+this.state.password);
          this.setState({
            flag: true
          })
          let temp=JSON.parse(localStorage.getItem('idUser'));
          console.log("changePassword "+temp);
        fetch('http://ntrs-backend.herokuapp.com/user/updateUser/'+temp, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                // body: data
                  body: JSON.stringify ({
                    idUser: temp,  
                    firstName : this.state.firstName,
                    lastName:this.state.lastName,
                    email:this.state.email,
                    phone: temp,
                    password:this.state.password
                    
                  }),
                })
                .then(res =>res.json())
                  .then (res => {
                    this.setState({  flag:false})
                      console.log("result "+JSON.stringify(res));
                      console.log("result "+this.state.password);
                      if (res.msg === "updated") {
                        console.log("updted profile");
                        alert('updated Password!!!');
                        this.props.history.push('/login');
                      } else  {
                        console.log("Error in updating");
                      }
                  })
                  .catch (err => {
                    this.setState({  flag:false})
                    console.log (err);
                  })
                
                }
        
          
        }
      

    render()
    {
      if(this.state.flag){
        return(
         <LoadingBar text="Changing Password..."></LoadingBar>
        )
      }
      else{
        return (
            <div className="loginCard" >
                  
                <h1 style={{ 'text-align': 'center', marginBottom:'20px'}}>Change Password</h1>
                
                      <Form.Group >
                      <p style={{ "text-align": 'left', 'font-weight':'400'}}>Enter New Password</p>
                      <Form.Control type="text" name="password" placeholder="Enter atleast 8 characters"  style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                      </Form.Group>

                      <Form.Group >
                      <p style={{ "text-align": 'left', 'font-weight':'400'}}>Enter Confirm Password</p>
                      <Form.Control type="text" name="confirmPassword" placeholder="Enter Confirm Password"  style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                      </Form.Group>
                      
                      <p id="change" className="warning" style={{color:'red', fontWeight:'bold'}}/>
                        {/* <button id="resendbtn" type="button" onClick={this.resendOTP} style={{display:"none",margin:'10px',width: '40%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>RESEND</button>             */}
                        <button  type="button" onClick={this.onSubmit} style={{width: '40%',margin:'10px', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>SAVE PASSWORD</button>            
                    
                
            </div>
        )
      }
    }
}
export default withRouter(ChangePassword);