import React, { Component }  from 'react';
import {withRouter} from 'react-router-dom'
import Navbar from './Navbar';
import { Nav,Container, Row, Col, Form, FormControl,FormGroup,FormLabel, Button, Modal} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import LoadingBar from './LoadingBar';
import '../css/Notes.css'
import { FaRegPlusSquare , FaTrash, FaEdit} from "react-icons/fa";

class Notes extends Component{
    constructor(props){
        super(props);
        localStorage.setItem('method','POST')
        console.log("localstorage "+localStorage.getItem('method'));

        let temp=JSON.parse(localStorage.getItem('local'));
        console.log("here notes  "+temp.user.idUser);
        this.state={
            note:{
                noteTitle:'',
                noteDesc:'',
                noteImg:null,
                noteFile:null,
                setShow: false,
                notes: [],
                image:null,
                document:null,
                idUser: temp.user.idUser,
               
            },
            idNote:'',
            add:false,
            update: false,
            delete: false,
            get: false,
            // show: false,
            colors: ["green","yellow","black","blue","orange","pink","cyan"],
           
        }
        // this.handleDateChange = this.handleDateChange.bind (this);
        // this.handleInputChange=this.handleInputChange.bind(this);
        // this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.handleEmptyDisplay = this.handleEmptyDisplay.bind(this);
        // this.handleEmptyHide = this.handleEmptyHide.bind(this);
        
    }

    handleImage(event) {
        this.setState({
          note: Object.assign ({}, this.state.note, {
            [event.target.name]: event.target.files[0],
        }),
        //   image: event.target.files[0],
    
        })
        console.log(event.target.name+" : "+event.target.files[0])
    } 
   
    getColor=()=>{
      var len = this.state.colors.length;
      var randomNum = Math.floor(Math.random()*len);
      var color = this.state.colors[randomNum];
      this.state.colors.splice(randomNum, 1);
      return color;
    }

    handleChange (event) {
        this.setState ({
          note: Object.assign ({}, this.state.note, {
              [event.target.name]: event.target.value,
          }),
        });
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

    handleSave(){
        localStorage.setItem("method","POST");
        this.setState ({
            note: Object.assign ({}, this.state.note, {
                noteTitle:'',
                noteDesc:''
            }),
          });
    }

    handleDelete(){
        console.log("in delete id "+this.state.idNote);
        this.setState({
            delete: true
        })
              fetch('http://ntrs-backend.herokuapp.com/notes/deleteNotes/'+this.state.idNote, {
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
                      alert('note deleted');
                      this.setState({
                        delete: false
                    })
                      this.handleClose();
                      window.location.reload(true);
                    //   this.props.history.push('/reminders');
                    } else  {
                        this.setState({
                            delete: false
                        })
                        alert('failed to delete')
                      console.log("Error in deleting");
                    }
                  })
                  .catch (err => {
                    this.setState({
                        delete: false
                    })
                    alert('failed to delete')
                    console.log (err);
                  })
                
            
    }

    handleEdit( note){
        if(note!=''){
            console.log("note "+note.idNote);
            this.setState({
                idNote: note.idNote
            })
            console.log('id '+this.state.note.show+" length "+this.state.note.notes.length);
            for (let index = 0; index < this.state.note.notes.length; index++) {
                console.log("inner lop");
                if (note.idNote === this.state.note.notes[index].idNote) {
                    this.setState ({
                        note: Object.assign ({}, this.state.note, {
                            noteTitle : this.state.note.notes[index].noteTitle,
                            noteDesc:this.state.note.notes[index].noteDesc,
                            // noteImg:this.state.note.notes[index].noteImg,
                            // noteFile: this.state.note.notes[index].noteFile
                        })
                    })

                    localStorage.setItem("method","PATCH");
                    console.log("later "+localStorage.getItem("method"));
                 
                }
                
            }
           }
    }
    
    

    componentDidMount () {
        this.fetchAllNotes ();
        // document.body.style.backgroundImage='../images/bg1.jpg' ;
        document.body.style.background='lavender'; 
    }

    componentWillUnmount(){
        document.body.style.background=null;
    }

    
    fetchAllNotes= () => {
        this.setState({
            get:true
        })
        console.log("here "+this.state.idNote);
        fetch('http://ntrs-backend.herokuapp.com/notes/getNoteByidUser/'+this.state.note.idUser, {
            headers: {Authorization: localStorage.getItem('token')},
            method: 'GET',
            responseType:"blob"
        })
        .then(response => response.json())
        .then (data => {

            this.setState({
                get:false
            })

            if(data.status== 200){
                console.log('result',data);
    
                this.setState({
                    note: Object.assign ({}, this.state.note, {
                        notes: data.data
                    })
                    
                })
            }
            else if(data.status==401){
                
                alert("session expired");
                this.props.history.push('/login');
            }
            else{
                console.log("error");
            }
           

            // if(this.state.note.notes.length >0){
            //   this.handleEmptyHide();
            // }else{
            //   this.handleEmptyDisplay();
            // }
        })
        .catch(error => {
            console.log('error', error)
            this.setState({
                get: false
            })
        });
    }

    onSubmit(e){
        e.preventDefault();
        let temp=JSON.parse(localStorage.getItem('local'));
        // console.log("reminder localstorage "+JSON.stringify(temp.user.idUser));
        const data=new FormData()
        data.append('idUser',temp.user.idUser);
        data.append('noteTitle',this.state.note.noteTitle);
        data.append('noteDesc',this.state.note.noteDesc);
        // data.append('noteImg',this.state.note.noteImg);
        // data.append('noteFile',this.state.note.noteFile);

        console.log("here save "+temp.user.idUser+" has title "+this.state.note.noteTitle);
        console.log("onsubmit "+localStorage.getItem("method")); 
        {localStorage.getItem("method")=="POST"? this.setState({ add: true}): this.setState({ update: true})}
        {localStorage.getItem("method")=="POST"? 

        fetch('http://ntrs-backend.herokuapp.com/notes/addNotes', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            //   },
            body: data
            //   body: JSON.stringify ({
            //     idUser: temp.user.idUser,  
            //     noteTitle : this.state.note.noteTitle,
            //     noteDesc:this.state.note.noteDesc,
            //     noteImg:this.state.note.noteImg,
            //     noteFile: this.state.note.noteFile
                
            //   }),
            })
            .then(res =>res.json())
              .then (res => {
                this.setState({ add: false, update:false})
                  console.log("result "+JSON.stringify(res));
                if (res.msg === "notes inserted") {
                  console.log("Inserted");
                  alert('note added');
                  this.setState({
                    add: false,
                    update:false
                })
                  this.handleClose();
                  window.location.reload(true);
                  return;
                //   this.props.history.push('/reminders');
                } else  {
                    this.setState({
                        add: false,
                        update:false
                    })
                  console.log("Error in inserting");
                }
              })
              .catch (err => {
                this.setState({
                    add: false,
                    update:false
                })
                console.log (err);
              })

           
              :

              console.log("in update "+this.state.idNote);
              fetch('http://ntrs-backend.herokuapp.com/notes/updateNotes/'+this.state.idNote, {
                method: 'PUT',
                // headers: {
                //     'Content-Type': 'application/json',
                //   },
                body: data
                })
                .then(res =>res.json())
                  .then (res => {
                    this.setState({ add: false, update:false})
                      console.log("result "+JSON.stringify(res));
                    if (res.msg === "updated") {
                      console.log("updated");
                      alert('note updated');
                      this.setState({
                        add: false,
                        update: false
                    })
                      this.handleClose();
                      window.location.reload(true);
                    //   this.props.history.push('/reminders');
                    } else  {
                        this.setState({
                            add: false,
                            update:false
                        })
                        alert('failed to update')
                      console.log("Error in updating");
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
        if(this.state.add || this.state.update || this.state.delete || this.state.get){
            if(this.state.add){
                return(
                    <LoadingBar text="Adding Notes..."></LoadingBar>
                )
            }
            else if(this.state.update){
                return(
                    <LoadingBar text="Updating Notes..."></LoadingBar>
                )
            }
            else if(this.state.delete){
                return(
                    <LoadingBar text="Deleting Notes..."></LoadingBar>
                )
            }
            else{
                return(
                    <LoadingBar text="Fetching your Notes..."></LoadingBar>
                )
            }
        }
        else{
            return (
                <div className="noted">
                    <Navbar/>
                    
                    <div className='text-center'>
                    <div id="add">
                        <div className="noteAdd">
                            
                            
                            <div onClick={(newFavorite) => {this.handleShow(); this.handleSave();}}>
                            <h2>Add New NOTE   {"  "}   <FaRegPlusSquare/></h2>
                            </div>
                            
                        </div>
                        <Modal 
                        // size="sm"
                                className="customModal"
                                show={this.state.setShow}
                                onHide={this.handleClose}
                                backdrop="static"
                                keyboard={false}
                             >
                                {/* <Modal.Header closeButton> */}
                                <p style={{textAlign: 'center',marginTop: '20px'}}>
                                {localStorage.getItem("method")=="POST"? <h2>ADD NOTE</h2>:<h2>EDIT NOTE</h2>}
                    
                                </p>
                                {/* </Modal.Header> */}
                                {/* <Modal.Body> */}
                                
                               
                                <div className="notePopup">
                                {/* {localStorage.getItem("method")=="POST" ? null: */}
                                <table style={{width:'80%'}}>
                                    <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}>Title</td>
                                        <td style={{fontSize:'16px'}}><FormGroup className="form-inline">
                                        <FormControl
                                            type="text"
                                            name="noteTitle"
                                            placeholder="Name"
                                            onChange={this.handleChange}
                                            value={this.state.note.noteTitle}
                                            className="input col-xl-12"
                                            required
                                            style={{border:'1px solid grey'}}
                                        /> 
                                        </FormGroup> </td>
                                    </tr>
                                    <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}>Description</td>
                                        <td style={{fontSize:'16px'}}><FormGroup className="form-inline">
                                        <FormControl
                                            // type="textarea"
                                            as="textarea"
                                            name="noteDesc"
                                            placeholder="Desc"
                                            onChange={this.handleChange}
                                            value={this.state.note.noteDesc}
                                            className="input col-xl-12"
                                            required
                                            style={{border:'1px solid grey'}}
                                        />
                                        </FormGroup> </td>
                                    </tr>
                                    {/* <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}>Add Image</td>
                                        <td style={{fontSize:'16px'}}>
                                            <FormGroup className="form-inline">
                                            <FormControl
                                                type="file"
                                                name="noteImg"
                                                placeholder="Upload Image"
                                                onChange={this.handleImage}
                                                // value={this.state.house.housePic}
                                                className="input ml-3 noteImg"
                                                
                                            />
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{fontSize:'18px', fontWeight:'600'}}>Add File</td>
                                        <td style={{fontSize:'16px'}}>
                                            <FormGroup className="form-inline">
                                            <FormControl
                                                type="file"
                                                name="noteFile"
                                                // value={this.state.house.houseDocument}
                                                onChange={this.handleImage}
                                                placeholder="Upload Document"
                                                // disabled={this.state.method=="PATCH"?true:false}
                                                className="input ml-3 noteFile"
                                                
                                            />
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
                                </div>
                                {/* </Modal.Footer> */}
                            </Modal>
                    </div>
                    <div id="rem-card">
                        <Container style={{marginTop: '20px'}}>

                            {/* <div id="emptyRem " style={{textAlign: "center", marginTop:"60px"}}>
                              <h4>No reminders added</h4>
                            </div> */}
                            { this.state.note.notes.map((note, index) => {

                                return(
                                    <Row>
                                        <Col xs={10} md={4}>
                                            <div class="noteCard">
                                            <div  onClick={(newFavorite) => {this.handleShow(); this.handleEdit(note);}} >
                            
                                                <h4 >{note.noteTitle}</h4>
                                                <p style={{fontSize: '16px'}}>{note.noteDesc}</p>
                                                {/* {note.noteImg===null ? null : <Image className="noteImg" src={"data:image/png;base64,"+ note.noteImg} width="250px" height="250px"/>} */}
                                                
                                            </div>
                                            {/* <div>{note.noteFile===null ? null : <p style={{marginTop: '15px'}}><a style={{padding:'5px', background:'lightgrey', color:'black'}} href={"data:application/pdf;base64,"+note.noteFile} download="file.pdf">Download File</a></p>} */}
                                            </div>
                                            {/* </div> */}
                                        </Col>
                                    </Row>
                                )
                            })

                            }
                            
                             
                        </Container>
                    </div>     
                    </div>
                </div>

            )
        }
    }
}
export default withRouter(Notes);