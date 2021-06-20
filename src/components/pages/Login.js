import React, { Component }  from 'react';
import {withRouter} from 'react-router-dom'
import LoadingBar from './LoadingBar';
import {Form, InputGroup,FormControl,FormGroup }from "react-bootstrap";
import Button from "react-bootstrap/Button";
import '../css/Login.css';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            phone: '',
            password: '',
            login:false,
            forgot:false,
            otp:false,
            time:'',
            seconds:10,
            code:'',
            
        }

       
        this.timer=0
         this.handleChange = this.handleChange.bind(this);
         this.handleForgot = this.handleForgot.bind(this);
         this.handleOtp = this.handleOtp.bind(this);
         this.onSubmit = this.onSubmit.bind(this);


    }
    handleForgot(e){
      this.setState({
        forgot: true,
        otp: false,
        login:false
      })
    }

    handleOtp(e){

      let regexPhn=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  
        if(this.state.phone.trim() == '' ){
          document.getElementById ('forgot').innerHTML = 'Fields Cannot be Empty.';
          document.getElementById ('forgot').style.visibility='visible';
        }
        else if(!regexPhn.test(this.state.phone)){
          document.getElementById('forgot').innerHTML='Please Enter Valid Mobile'
          document.getElementById ('forgot').style.visibility='visible';
        }
        else{
          this.setState({
            forgot: false,
            otp: true,
            login:false
          })
          this.sendOTP();
        }
    }


     handleChange (e)  {
        this.setState({
          [e.target.name]: e.target.value
          
        });
        console.log("file  "+ e.target.value);
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

      sendOTP = () => {
        console.log("sendotp")
       
          this.timer=0
          this.setState({
            otp:true,
            login:false,
            forgot:false,
            seconds:10
          })
        this.startTimer()

        localStorage.setItem('idUser',this.state.phone);
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

      verifyOTP=() => {
        
        console.log("herree change "+this.state.code);
        let regexCode=/^[0-9]*$/;
        if(this.state.code.trim() == '' ){
          document.getElementById ('code').innerHTML = 'Fields Cannot be Empty.';
          document.getElementById ('code').style.visibility='visible';
        }
        else if(!regexCode.test(this.state.code)){
          document.getElementById('code').innerHTML='Please Enter Valid Code'
          document.getElementById ('code').style.visibility='visible';
        }
        else{
        
          this.setState({
            otp:false,
            login:true,
            forgot:false
          })
        console.log("herree after");
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
              //  this.checkOnSubmit();
              localStorage.setItem('idUser',this.state.phone)
              this.props.history.push('/changePassword');
               // window.location.reload(true);
               // this.props.push('/login');
             } else  {
              this.setState({
                otp:false,
                login:false,
                forgot:false
              })
              console.log('wrong code');
               console.log("Error in verifying");
             }
           })
           .catch (err => {
             console.log (err);
           })
        }
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
            // alert("time is up");
            // this.submitTest();
        }
      }
      
     
      onSubmit(e) {
        e.preventDefault()
        let regexPhn=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  
        if(this.state.phone.trim() == '' || this.state.password.trim()==''){
          document.getElementById ('login').innerHTML = 'Fields Cannot be Empty.';
          document.getElementById ('login').style.visibility='visible';
        }
        else if(!regexPhn.test(this.state.phone)){
          document.getElementById('login').innerHTML='Please Enter Valid Mobile'
          document.getElementById ('login').style.visibility='visible';
        }
        else{
          console.log("here "+this.state.phone);
          this.setState({
            login: true
          })
          const data = new FormData()
          data.append('phone',this.state.phone)
          data.append('password',this.state.password)   
          console.log("ghds "+data);
            fetch("http://ntrs-backend.herokuapp.com/user/loginUser", {
              
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify ({
                phone:this.state.phone,
                password:this.state.password
              })
              
            }).then(res =>res.json())
            .then (res => {
              this.setState({
                  login: false
              })
              if (res.code === 200) {
                    console.log("Updated")
                    console.log("j "+res.data);
                    console.log("jahj "+JSON.stringify(res.data));
                    localStorage.setItem("local",JSON.stringify(res.data))
                    let temp=JSON.parse(localStorage.getItem('local'));
                    localStorage.setItem('token',`Bearer ${res.token}`)
                    console.log("localstorage "+JSON.stringify(temp));
                    console.log("localstorage "+JSON.stringify(temp.reminders));
                    alert("Logged In")
                    this.props.history.push('/notes')
                    // this.props.history.goBack();
                    // document.getElementById ('register').innerHTML = 'Updated';
              } else if (res.code === 401) {
                  this.setState({
                    login: false
                })
                console.log("Error in Updating");
                alert("Invalid Password")
              }
              else if(res.code===402){
                this.setState({
                  login: false
                 })
                alert("Invalid User")
              }
            })
            .catch (err => {
              console.log (err);
              alert("Mobile Number or Password is incorrect")
              this.setState({
                login:false
              })
            });
        }

          this.setState({ phone: '', password: '' })
          
        }

   
    render()
    {
         if(this.state.login){
           return(
            <LoadingBar text="Logging in..."></LoadingBar>
           )
         }
         else if(this.state.otp){
           this.startTimer()
            return(
                // <div id="backdesign">
                <div className="loginCard" >
                  
                <h1 style={{ 'text-align': 'center', marginBottom:'20px'}}>Verify OTP</h1>
                
                      <Form.Group >
                      <p style={{ "text-align": 'left', 'font-weight':'400'}}>Enter Code</p>
                      <Form.Control type="text" name="code" placeholder="Enter code" onChange={(e) => this.handleChange(e, "code")}  style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                      </Form.Group>
                      
                      <div id="text" ><p>OTP Will Expire in  <b>{this.state.time.m} : {this.state.time.s} </b></p></div>
                        {/* <button  id="resendbtn" onClick={this.resendOTP} style={{display:"none",marginTop:"25px",marginBottom:"25px"}}>Resend</button>  */}
                
                        <p id="code" className="warning" style={{color:'red', fontWeight:'bold'}}/>

                        <button id="resendbtn" type="button" onClick={this.resendOTP} style={{display:"none",margin:'10px',width: '40%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>RESEND</button>            
                        <button  type="button" onClick={this.verifyOTP} style={{width: '40%',margin:'10px', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>SUBMIT</button>            
                    {/* </div>  */}
                  
                    
                    

                  </div>
                // </div> 
            )
         }else if(this.state.forgot){
           return(
                // <div>
                  <div className="loginCard" >
                  
                  <h1 style={{ 'text-align': 'center', marginBottom:'20px'}}>Forgot Password?</h1>
                  
                  <Form.Group >
                  <p style={{ "text-align": 'left', 'font-weight':'400'}}>Enter Phone</p>
                  <Form.Control type="text" name="phone" placeholder="Enter Phone" onChange={(e) => this.handleChange(e,"phone")}  style={{width:'100%',fontSize:'16px'}} />
                  </Form.Group>

                  <p id="forgot" className="warning" style={{color:'red', fontWeight:'bold'}}/>
        
                  <button  type="button" onClick={this.handleOtp} style={{width: '80%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>VERIFY</button>            
                  
                  </div>
      
              // </div>
           )

         }
         else{
            return(

                <div className="container" id="cont1" style={{backgroundSize: 'cover'}}>

                  <div className="loginCard" >
                  
                  <h1 style={{ 'text-align': 'center', marginBottom:'20px'}}> Log In</h1>
                  <Form className="login">

                    <Form.Group >
                    <p id="loginp" > Phone</p>
                    <Form.Control type="phone" name="phone" placeholder="Enter phone number" style={{width:'100%',fontSize:'16px'}}   onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group >
                      <p id="loginp" > Password</p>
                      <Form.Control type="password" name="password" placeholder="Enter Password"  style={{width:'100%', fontSize:'16px'}} onChange={this.handleChange} />
                    </Form.Group>


                    
                    <p id="login" className="warning" style={{color:'red', fontWeight:'bold'}}/>
               
                  </Form>
                    <button  onClick={this.onSubmit} value="submit" type="submit" style={{width: '80%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>
                    Submit
                  </button>
                  <p onClick={this.handleForgot} style={{ 'text-align': 'right',fontSize:'13px', margin:'10px' }}>Forgot password?</p>
                  </div>
                </div>
              
              
              // </div>
          // <button  onClick={()=>this.props.history.goBack()} className="btn btn-primary">Go back</button>
                
           );
         } 

        
    }
}
export default withRouter(Login);