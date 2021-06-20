import React, { Component }  from 'react';
import {withRouter} from 'react-router-dom'
import { Nav,Container, Row, Col, Form, FormControl,FormGroup,FormLabel, Button, Modal} from 'react-bootstrap'
import Navbar from './Navbar';
import LoadingBar from './LoadingBar';
import '../css/Reminder.css'
import { FaRegPlusSquare , FaTrash, FaEdit,FaCheckCircle} from "react-icons/fa";
import TimePicker from 'react-bootstrap-time-picker';

class Reminders extends Component{
    constructor(props){
        super(props);
        localStorage.setItem('method','POST')
        console.log("localstorage "+localStorage.getItem('method'));

        let temp=JSON.parse(localStorage.getItem('local'));
        console.log("here reminder  "+temp.user.idUser);
        this.state={
            reminder:{
                rTitle:'',
                rDesc:'',
                type:'',
                rDate:'',
                rTime:'',
                flag:'',
                scheduleId:'',
                setShow: false,
                reminders: [],
                idUser: temp.user.idUser,
               
            },
            idReminder:'',
            add:false,
            update: false,
            delete: false,
            get: false
            // show: false,
           
        }
        // this.handleDateChange = this.handleDateChange.bind (this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleEmptyDisplay = this.handleEmptyDisplay.bind(this);
        this.handleEmptyHide = this.handleEmptyHide.bind(this);
        // this.saveReminder = this.saveReminder.bind(this);
    }
    
    handleChange (event) {
        this.setState ({
          reminder: Object.assign ({}, this.state.reminder, {
              [event.target.name]: event.target.value,
          }),
        });
    }

    handleEmptyHide= () => {
      document. getElementById("emptyRem").style. display="none";
    }

    handleEmptyDisplay= () =>{
      document. getElementById("emptyRem").style. display="block";
    }
    
   handleClose = () => {
        this.setState ({
                setShow: false
            });
   }
   handleShow = () => {
       
        this.setState ({
            setShow: true
           
        });
   }

   padZero(string){
    return ("00" + string).slice(-2);
  }
    handleTimeChange (time) {
        console.log("time "+time);
        if (time < 0)
            time = 0;
            var hrs = ~~(time / 3600 % 24),
            mins = ~~((time % 3600) / 60),
            timeType = (hrs > 11 ? "PM" : "AM");
            if (hrs > 12)
            hrs = hrs - 12;
            if (hrs == 0)
            hrs = 12;
    
        this.setState ({
          reminder: Object.assign ({}, this.state.reminder, {
            rTime: hrs + ":" + this.padZero(mins) + timeType
          }),
        });
        console.log("time22 "+hrs + ":" + this.padZero(mins) + timeType);
    }

    handleInputChange (event) {
        this.setState ({
          reminder: Object.assign ({}, this.state.reminder, {
            type: event.target.value,
          }),
        });
        console.log("type "+this.state.reminder.type);
    }

    handleSave(){
        localStorage.setItem("method","POST");
        this.setState ({
            reminder: Object.assign ({}, this.state.reminder, {
                rTitle:'',
                rDesc:'',
                type:'',
                rDate:'',
                rTime:'',
            }),
          });
    }

    handleDelete(){
        console.log("in delete id "+this.state.idReminder);
        this.setState({
            delete: true
        })
              fetch('http://ntrs-backend.herokuapp.com/reminders/deleteReminder/'+this.state.idReminder, {
                method: 'DELETE',
                })
                .then(res =>res.json())
                  .then (res => {
                      this.setState({
                          delete:false
                      })
                      console.log("result "+JSON.stringify(res));
                    if (res.msg === "deleted") {
                      console.log("deleted");
                      alert('reminder deleted');
                      this.handleClose();
                      window.location.reload(true);
                    //   this.props.history.push('/reminders');
                    } else  {
                      console.log("Error in deleting");
                    }
                  })
                  .catch (err => {
                    this.setState({
                      delete: false,
                  })
                    console.log (err);
                  })
                
            
    }

    handleEdit( reminder){
        if(reminder!=''){
            console.log("rem "+reminder.idReminder);
            this.setState({
                idReminder: reminder.idReminder
            })
            console.log('id '+this.state.reminder.show+" length "+this.state.reminder.reminders.length);
            for (let index = 0; index < this.state.reminder.reminders.length; index++) {
                console.log("inner lop");
                if (reminder.idReminder === this.state.reminder.reminders[index].idReminder) {
                    this.setState ({
                        reminder: Object.assign ({}, this.state.reminder, {
                            rTitle : this.state.reminder.reminders[index].rTitle,
                            rDesc:this.state.reminder.reminders[index].rDesc,
                            type:this.state.reminder.reminders[index].type,
                            rDate:this.state.reminder.reminders[index].rDate,
                            rTime:this.state.reminder.reminders[index].rTime,
                            flag:this.state.reminder.reminders[index].flag,
                            scheduleId:this.state.reminder.reminders[index].scheduleId,
                            
                        })
                    })
                    console.log("scheid "+this.state.reminder.reminders[index].scheduleId);

                    console.log("before "+this.state.reminder.reminders[index].rDate);
                    var mydate = new Date(this.state.reminder.reminders[index].rDate);
                    // console.log(" dateee "+mydate.toDateString());
                    console.log("date "+mydate.getDate()+" month"+mydate.getMonth())

                    console.log("before "+this.state.reminder.reminders[index].rTime);
                    var mytime = new Date(this.state.reminder.reminders[index].rTime);
                    console.log("time "+mytime.getHours()+" month"+mytime.getMinutes());

                    localStorage.setItem("method","PATCH");
                    console.log("later "+localStorage.getItem("method"));
                 
                    
                }
                
            }
           }
    }
    
    

    componentDidMount () {
        this.fetchAllReminders ();
        document.body.style.background= 'lightcyan' ;
    }

    componentWillUnmount(){
      document.body.style.background=null;
  }


    
    fetchAllReminders= () => {
        this.setState({
            get:true
        })
        console.log("here "+this.state.reminder.idUser);
        fetch('http://ntrs-backend.herokuapp.com/reminders/getReminderByIdUser/'+this.state.reminder.idUser, {
          headers: {Authorization: localStorage.getItem('token')},  
          method: 'GET',
           
            // responseType:"blob"
        })
        .then(response => response.json())
        .then (data => {
            console.log('result',data);
            this.setState({
                get:false
            })
            
            if(data.status==200){
              this.setState({
                reminder: Object.assign ({}, this.state.reminder, {
                    reminders: data.data
                })
                
              })

            if(this.state.reminder.reminders.length >0){
              let newDate = new Date()
              let date = newDate.getDate();
              let month = newDate.getMonth() + 1;
              let year = newDate.getFullYear();
              console.log("fetching "+newDate);
              for (let index = 0; index < this.state.reminder.reminders.length; index++) {
                
                var mydate = new Date(this.state.reminder.reminders[index].rDate);
                console.log("inner lop "+mydate.getMonth()+"  today "+newDate.getMonth());
                console.log("inner time "+this.state.reminder.reminders[index].rTime)
                // var time = new Date();
                // console.log(
                //   time.toLocaleString('en-US', { hour: 'numeric', hour12: true })
                // ); 
                function formatAMPM(newDate) {
                  var hours = newDate.getHours();
                  var minutes = newDate.getMinutes();
                  var ampm = hours >= 12 ? 'PM' : 'AM';
                  hours = hours % 12;
                  hours = hours ? hours : 12; // the hour '0' should be '12'
                  minutes = minutes < 10 ? '0'+minutes : minutes;
                  var strTime = hours + ':' + minutes + '' + ampm;
                  return strTime;
                }
                var currTime=formatAMPM(new Date);
                console.log(currTime);
                if (mydate.getMonth() === newDate.getMonth()) {
                  
                  if (mydate.getDate() === newDate.getDate()) {
                    if(currTime==this.state.reminder.reminders[index].rTime){
                    

                    this.setState ({
                        reminder: Object.assign ({}, this.state.reminder, {
                            flag:true
                            
                        })
                    })

                    alert('you have a reminder');
                    console.log("fetching1 "+newDate);
                  }
                  }
                  }
                    
                }
              }
            }
            else if(data.status==401){
              
                alert("session expired");
                this.props.history.push('/login');
            }
            else{
                console.log("error");
            }
            
        })
        .catch(error => {
          console.log('error', error)
          this.setState({
            get: false,
          })
        });
    }

    onSubmit(e){
        e.preventDefault();
        let temp=JSON.parse(localStorage.getItem('local'));
        // console.log("reminder localstorage "+JSON.stringify(temp.user.idUser));
        console.log("here save "+temp.user.idUser+" has title "+this.state.reminder.rTitle);
        console.log("onsubmit "+localStorage.getItem("method")); 
        {localStorage.getItem("method")=="POST"? this.setState({ add: true}): this.setState({ update: true})}
        {localStorage.getItem("method")=="POST"? 

       
        fetch('http://localhost:3300/reminders/addReminder', {
          // fetch('http://ntrs-backend.herokuapp.com/reminders/addReminder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            // body: data
              body: JSON.stringify ({
                idUser: temp.user.idUser,  
                rTitle : this.state.reminder.rTitle,
                rDesc:this.state.reminder.rDesc,
                type:this.state.reminder.type,
                rDate:this.state.reminder.rDate,
                rTime:this.state.reminder.rTime,
                flag:false,
                scheduleId: this.state.reminder.scheduleId
                
              }),
            })
            .then(res =>res.json())
              .then (res => {
                this.setState({ add: false, update:false})
                  console.log("result "+JSON.stringify(res));
                if (res.msg === "reminder inserted") {
                  console.log("Inserted");
                  alert('reminder added');
                  this.setState({
                    add: false,
                    update:false
                })
                  this.handleClose();
                  window.location.reload(true);
                //   this.props.history.push('/reminders');
                } else  {
                  this.setState({
                    add: false,
                    update:false
                })
                  console.log("not");
                  alert('failed to add');
                  console.log("Error in inserting");
                }
              })
              .catch (err => {
                this.setState({
                  add: false,
                  update:false
              })
                console.log("not");
                  alert('failed to add');
                console.log (err);
              })
              :
              console.log("in update "+this.state.idReminder);
              fetch('http://localhost:3300/reminders/updateReminder/'+this.state.idReminder, {
              // fetch('http://ntrs-backend.herokuapp.com/reminders/updateReminder/'+this.state.idReminder, {  
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                // body: data
                  body: JSON.stringify ({
                    idUser: temp.user.idUser,  
                    rTitle : this.state.reminder.rTitle,
                    rDesc:this.state.reminder.rDesc,
                    type:this.state.reminder.type,
                    rDate:this.state.reminder.rDate,
                    rTime:this.state.reminder.rTime,
                    flag:this.state.reminder.flag,
                    scheduleId: this.state.reminder.scheduleId
                    
                  }),
                })
                .then(res =>res.json())
                  .then (res => {
                    this.setState({ add: false, update:false})
                      console.log("result "+JSON.stringify(res));
                    if (res.msg === "updated") {
                      console.log("updated");
                      alert('reminder updated');
                      this.setState({
                        add: false,
                        update:false
                    })
                      this.handleClose();
                      window.location.reload(true);
                    //   this.props.history.push('/reminders');
                    } else  {
                      console.log("Error in updating");
                      alert('failed to update');
                      this.setState({
                        add: false,
                        update:false
                      })
                    }
                  })
                  .catch (err => {
                    this.setState({
                      add: false,
                      update:false
                    })
                    console.log (err);
                  })
                }
        


              
    }

    render()
    {
        if(this.state.add || this.state.update || this.state.delete || this.state.get ){
            if(this.state.add){
                return(
                    <LoadingBar text="Adding Reminder..."></LoadingBar>
                )
            }
            else if(this.state.update){
                return(
                    <LoadingBar text="Updating Reminder..."></LoadingBar>
                )
            }
            else if(this.state.delete){
                return(
                    <LoadingBar text="Deleting Reminder..."></LoadingBar>
                )
            }
            else{
                return(
                    <LoadingBar text="Fetching your Reminders..."></LoadingBar>
                )
            }
        }
        else{

        
        return (
            <div className="text-center">
                <Navbar/>
                {/* <div id="rem"> */}
                <Container>
                    <div id="add">
                        <div className="reminderAdd" >
                            
                            
                            <div onClick={(newFavorite) => {this.handleShow(); this.handleSave();}}>
                            <h2>Add new Reminder       <FaRegPlusSquare/></h2>
                            </div>
                            
                        </div>
                        <Modal 
                        // size="lg"
                                className="customModal"
                                show={this.state.setShow}
                                onHide={this.handleClose}
                                backdrop="static"
                                keyboard={false}
                                // className="custom"
                             >
                                {/* <Modal.Header closeButton> */}
                                <p id="heading" style={{textAlign: 'center',marginTop: '20px'}}>
                                {localStorage.getItem("method")=="POST"? <h2>ADD REMINDER</h2>:<h2>UPDATE REMINDER</h2>}
                    
                                </p>
                                {/* </Modal.Header> */}
                                {/* <Modal.Body> */}
                                
                               
                                <div className="reminderPopup">

                                    <table style={{width:'90%'}}>
                                      <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}>Title</td>
                                        <td style={{fontSize:'16px'}}><FormGroup className="form-inline">
                                        <FormControl
                                            type="text"
                                            name="rTitle"
                                            placeholder="Name"
                                            onChange={this.handleChange}
                                            value={this.state.reminder.rTitle}
                                            className="input col-xl-10"
                                            required
                                            style={{border:'1px solid grey',color:'black'}}
                                        /> 
                                        </FormGroup> </td>
                                      </tr>
                                      <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}>Description</td>
                                        <td style={{fontSize:'16px'}}><FormGroup className="form-inline">
                                        <FormControl
                                            type="textarea"
                                            name="rDesc"
                                            placeholder="Desc"
                                            onChange={this.handleChange}
                                            value={this.state.reminder.rDesc}
                                            className="input col-xl-10"
                                            required
                                            style={{border:'1px solid grey',color:'black'}}
                                        />
                                        </FormGroup></td>
                                      </tr>
                                      <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}>Date</td>
                                        <td style={{fontSize:'16px'}}><FormGroup className="form-inline">
                                        <FormControl
                                            type="date"
                                            name="rDate"
                                            placeholder="Dob"
                                            onChange={this.handleChange}
                                            value={this.state.reminder.rDate}
                                            className="input col-xl-10"
                                            required
                                            style={{border:'1px solid grey', color:'black'}}
                                        />
                                        </FormGroup></td>
                                      </tr>
                                      <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}>Time</td>
                                        <td style={{fontSize:'16px'}}><FormGroup className="form-inline">
                                        <TimePicker  onChange={this.handleTimeChange} name="rTime" value={this.state.reminder.rTime} format="12" style={{border:'1px solid grey',color:'black'}} />
                                        </FormGroup>
                                        </td>
                                      </tr>
                                      {/* <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}> Type</td>
                                        <td style={{fontSize:'16px'}}><FormGroup  className="form-inline">
                                        <select className="form-control" id="type" name="type" onChange={this.handleChange} style={{border:'1px solid grey',color:'black'}}>
                                            
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                        </select>
                                     </FormGroup>
                                     </td>
                                      </tr> */}
                                    </table>
                                     
                                </div>

                                {/* </Modal.Body> */}
                                
                                {/* <Modal.Footer> */}
                                <div id="noteBtn" style={{textAlign: 'center'}}>
                                    {localStorage.getItem("method")=="POST"?
                                    null
                                    : <button id="noteBtn3" onClick={this.handleClose}>Cancel</button>}

                                    {localStorage.getItem("method")=="POST"?
                                    <button id="noteBtn3" onClick={this.handleClose}>Cancel</button>
                                    : <button id="noteBtn1" onClick={this.onSubmit}>Update</button>}
                                    
                                    {localStorage.getItem("method")=="POST"?
                                    <button id="noteBtn2"  onClick={this.onSubmit}>Save</button>
                                    : <button id="noteBtn2" onClick={this.handleDelete}>Delete</button>}
                                {/* </Modal.Footer> */}
                                </div>
                            </Modal>
                    </div>
                    <div id="rem-card">
                        <Container style={{marginTop: '20px'}}>

                            {/* <div id="emptyRem " style={{textAlign: "center", marginTop:"60px"}}>
                              <h4>No reminders added</h4>
                            </div> */}
                            { this.state.reminder.reminders.map((reminder, index) => {

                                return(
                                    <Row>
                                        <Col xs={10} md={4}>
                                            <div class="reminderCard" onClick={(newFavorite) => {this.handleShow(); this.handleEdit(reminder);}} >
                                                {reminder.flag? <div style={{fontSize:'30px', color:'green', marginBottom:'15px'}}><FaCheckCircle/></div> :null}
                                                <h4>{reminder.rTitle}</h4>
                                                <table width='100%'>
                                                  <tr>
                                                    {/* <td><b>Description:</b></td> */}
                                                    <td style={{fontSize: '16px'}}>{reminder.rDesc}</td>
                                                  </tr>
                                                  {/* <tr>
                                                    <td>Type:</td>
                                                    <td>{reminder.type}</td>
                                                  </tr> */}
                                               
                                                  <tr>
                                                    {/* <td>Time:</td> */}
                                                    
                                                    <td>{reminder.rDate}{" "}{reminder.rTime}</td>
                                                    {/* <td>{reminder.rTime}</td> */}
                                                  </tr>
                                                </table>
                                             
                                               
                                            </div>
                                        </Col>
                                    </Row>
                                )
                            })

                            }
                            
                             
                        </Container>
                    </div>     
                    </Container>
                {/* </div> */}
            </div>
        )
        }
    }
}
export default withRouter(Reminders);