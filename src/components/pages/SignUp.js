import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import LoadingBar from './LoadingBar';
import {Form, InputGroup,FormControl,FormGroup }from "react-bootstrap";
// import Timer from 'react-timer'
import '../css/SignUp.css';

class SignUp extends Component {
  constructor(props){
    super(props); 
   this.state = {
      firstName: '',
      lastName: '',
      password: '',
      confirmpassword: '',
      email: '',
      phone: '',
      code: '',
      time:'',
      seconds:10,
        
      signup:false
    };

    this.timer=0
    this.handleChange = this.handleChange.bind(this);
    this.checkOnSubmit = this.checkOnSubmit.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  handleChange (e)  {
    this.setState({
      [e.target.name]: e.target.value
      
    });
  }
  secondsToTime = (secs) =>{
    let hours = Math.floor(secs / (60*60));
    let divisor_for_min = secs % (60*60);
    let minutes = Math.floor(divisor_for_min/60);
    let divisor_for_sec = divisor_for_min % 60;
    let seconds = Math.ceil(divisor_for_sec);
    let obj = {
        'h' : hours,
        'm' : minutes,
        's' : seconds
    };
    return obj;
  }
  
  startTimer = ()=>{
    console.log("Timer");
    console.log(this.timer)
    // document.getElementById("text").style.display="none"
    if(this.timer==0 && this.state.seconds>0){
      console.log("Timer1");
        this.timer = setInterval(this.countDown,1000);
    }
  }
  
  countDown = ()=>{
    const seconds = this.state.seconds-1;
    this.setState({
        time : this.secondsToTime(seconds),
        seconds : seconds
    });
  
    if(seconds == 0){
        document.getElementById("text").style.display="none"
        document.getElementById("resendbtn").style.display="unset"
        clearInterval(this.timer);
        alert("time is up");
        // this.submitTest();
    }
  }
  
  
  resendOTP = () => {
    this.timer=0
    this.setState({
      seconds:10
    },() => {
        console.log(this.state.seconds)
        document.getElementById("resendbtn").style.display="none"
        document.getElementById("text").style.display="unset"
        this.startTimer()
    })
  }

  sendCode(){
    let regexEmail=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,20})?$/;
    let regexPassword=/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,20}$/;
    let regexPhn=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   
    if(
        this.state.firstName.trim()==''||
        this.state.lastName.trim()==''||
        // this.state.user.gender.trim()==''||
        // this.state.user.mobile.trim()==''||
        this.state.email.trim()==''||
        // this.state.user.aadhar.trim()==''||
        this.state.password.trim()==''||
        this.state.confirmpassword.trim()==''
    ){
      document.getElementById ('signup').innerHTML =
        'Fields Cannot be Empty';
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexPhn.test(this.state.phone))
    {
      document.getElementById('signup').innerHTML="Mobile number is invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexEmail.test(this.state.email))
    {
      document.getElementById('signup').innerHTML="Email is invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexPassword.test(this.state.password))
    {
      document.getElementById('signup').innerHTML="Password is invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    else{
        document. getElementById("verify").style. display="block";
        document. getElementById("vphn").style. display="none";
        document. getElementById("vphn1").style. display="none";
        console.log("phn verify"+this.state.phone);
        document.getElementById ('signup').style.display='none';
      
        this.startTimer()
        var newPhn="+91"+this.state.phone
        console.log("send newphn "+newPhn);

        fetch('http://ntrs-backend.herokuapp.com/user/sendCode', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
          // body: data
            body: JSON.stringify ({ 
              phone:newPhn,
              
            }),
          })
          .then(res =>res.json())
            .then (res => {
              // this.setState({ add: false, update:false})
                console.log("signup result "+JSON.stringify(res));
              if (res.msg === "sent") {
                console.log("sent code");
                // alert('registered!!!');
                // this.handleClose();
                // window.location.reload(true);
                // this.props.push('/login');
              } else  {
                console.log("Error in sending");
              }
            })
            .catch (err => {
              console.log (err);
            })
        }
    // this.timerId = setInterval(() => {
    //   this.setState((prevState) => ({ time: prevState.time + 1 }));
    // }, 1000);
    // return () => clearInterval(this.timerId);
  }

  verifyCode(){
    let regexCode=/^[0-9]*$/;
    if( this.state.code.trim()==''){
        document.getElementById ('signup').innerHTML ='Fields Cannot be Empty';
        document.getElementById ('signup').style.visibility='visible';
    }else if(!regexCode.test(this.state.code)){
        document.getElementById('signup').innerHTML="Code is invalid";
        document.getElementById ('signup').style.visibility='visible';
    }
    else{
      var newPhn="+91"+this.state.phone
      console.log("verify newphn "+newPhn);
      fetch('http://ntrs-backend.herokuapp.com/user/verifyCode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        // body: data
          body: JSON.stringify ({
            phone:newPhn,
            code:this.state.code,
            
          }),
        })
        .then(res =>res.json())
          .then (res => {
            // this.setState({ add: false, update:false})
              console.log("verify result "+JSON.stringify(res));
            if (res.msg === "approved") {
              console.log("verified");
              // alert('registered!!!');
              this.checkOnSubmit();
              // window.location.reload(true);
              // this.props.push('/login');
            } else  {
              console.log("Error in verifying");
            }
          })
          .catch (err => {
            console.log (err);
          })
      }
  }


 

 

  checkOnSubmit() {
    let regexEmail=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,20})?$/;
    let regexPassword=/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,20}$/;
    let regexPhn=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   
    if(
        this.state.firstName.trim()==''||
        this.state.lastName.trim()==''||
        // this.state.user.gender.trim()==''||
        // this.state.user.mobile.trim()==''||
        this.state.email.trim()==''||
        // this.state.user.aadhar.trim()==''||
        this.state.password.trim()==''||
        this.state.confirmpassword.trim()==''
    ){
      document.getElementById ('signup').innerHTML ='Fields Cannot be Empty';
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexPhn.test(this.state.phone))
    {
      document.getElementById('signup').innerHTML="Mobile number is invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexEmail.test(this.state.email))
    {
      document.getElementById('signup').innerHTML="Emailis invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexPassword.test(this.state.password))
    {
      document.getElementById('signup').innerHTML="Password is invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    
    else{
      console.log("signing up");
      document.getElementById ('signup').style.display='none';
      var newPhn="+91"+this.state.phone
      console.log("newphn "+newPhn);
      fetch('http://ntrs-backend.herokuapp.com/user/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            // body: data
              body: JSON.stringify ({
                idUser: this.state.phone,  
                firstName : this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                phone:newPhn,
                password:this.state.password,
                
              }),
            })
            .then(res =>res.json())
              .then (res => {
                // this.setState({ add: false, update:false})
                  console.log("signup result "+JSON.stringify(res));
                if (res.msg === "user inserted") {
                  console.log("registered");
                  alert('registered!!!');
                  this.props.history.push('/login');
                } else  {
                  console.log("Error in inserting");
                }
              })
              .catch (err => {
                console.log (err);
              })
    }

      
    
  }

  render() {
    if(this.state.signup){
      return(
       <LoadingBar text="Logging in..."></LoadingBar>
      )
    }
    else{
    
      return (
        <div className="container">
        
          <div className="signupCard" style={{borderRadius:'3%'}}>
                  
                  <h1 style={{ 'text-align': 'center', marginBottom:'20px'}}>Sign Up</h1>
                  <Form className="signup">

                    <Form.Group >
                    <p id='signp' > First Name</p>
                    <Form.Control type="text" name="firstName" placeholder="Enter first" style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp' > Last Name</p>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp' > Phone</p>
                    <Form.Control type="phone" name="phone" placeholder="Enter phone" style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp' > Email</p>
                    <Form.Control type="email" name="email" placeholder="Enter email" style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp' > Password</p>
                    <Form.Control type="password" name="password" placeholder="Enter password" style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp'>Confirm Password</p>
                    <Form.Control type="password" name="confirmpassword" placeholder="Enter confirm password" style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                    </Form.Group>

                  
                  </Form>

                  <p id="signup" className="warning" style={{color:'red', fontSize:'15px', fontWeight:'bold'}}/>
                    <button id="vphn" onClick={this.sendCode } value="submit" style={{width: '80%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>
                    VERIFY PHONE
                  </button>
                  <h5 onClick={(e)=> this.props.history.push('/login')} id="vphn1" style={{ 'text-align': 'right',fontSize:'13px', margin:'10px' }}>Already have an account?</h5>
              
            
            {/* <button id="vphn" className="sb-btn" type="button" onClick={this.sendCode }>VERIFY PHONE</button>             */}

            <div  id="verify" style={{ display:"none"}} >
                <Form.Group >
                <p style={{ "text-align": 'left', 'font-weight':'400'}}>Enter Code</p>
                <Form.Control type="text" name="code" placeholder="Enter code" onChange={(e) => this.handleChange(e, "code")}  style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                </Form.Group>
                    
              {/* <div> */}
              <div id="text" ><p>OTP Will Expire in  <b>{this.state.time.m} : {this.state.time.s} </b></p></div>
                  <button id="resendbtn" type="button" onClick={this.resendOTP} style={{display:"none",margin:'10px',width: '40%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>RESEND</button>            
                        
                  {/* <button  type="button" onClick={this.resendOTP} style={{width: '80%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>RESEND</button>             */}
                  <button  type="button" onClick={this.verifyCode} style={{width: '40%',margin:'10px', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>SUBMIT</button>            
              {/* </div>  */}
            </div>

          </div>
          
        </div>
                
          
              
          
        
      
    );}
  } 
  
}


export default withRouter(SignUp);