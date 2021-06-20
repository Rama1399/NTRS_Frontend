import React, { Component }  from 'react';
import {withRouter} from 'react-router-dom'
import Navbar from './Navbar';
import { Button, Modal,InputGroup,ListGroup,  Container,Row, Col,FormControl,FormGroup,FormLabel, } from 'react-bootstrap';
import LoadingBar from './LoadingBar';
import { FaRegPlusSquare , FaTrash, FaEdit} from "react-icons/fa";
import '../css/ToDoLists.css'

class ToDoLists extends Component{
    constructor(props){
        super(props);
        localStorage.setItem('method','POST')
        console.log("localstorage "+localStorage.getItem('method'));
        let temp=JSON.parse(localStorage.getItem('local'));
        console.log("here todolist  "+temp.user.idUser);
        this.state={
            todolist:{
                idUser:temp.user.idUser,
                todolistTitle: '',
                items:[],
                taskList: [],
                setShow: false,
                
            },
            idTodo:'',
            add:false,
            update: false,
            delete: false,
            get: false,
            checked:[],
            userInput : "",
            list:[]
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        

    }

    handleCheck(event) {  
        console.log("check id")
        var isChecked = event.target.checked;  
        var item = event.target.value;  
        console.log("checkbox "+isChecked+"  item "+item);   
        if(isChecked){
            document.getElementById(item).style.textDecoration= 'line-through'
            console.log("if len "+this.state.checked.length);
            this.state.checked.push(item);
            // for(let i=0; i<this.state.list.length; i++){
            //     console.log("if1");
            //     if(this.state.list.length[i].idItem===item){
            //         console.log("if2");
            //         this.state.list.length[i].flag=true;
            //         console.log("checkbox22 "+this.state.list.length[i].idDesc+"  item "+this.state.list.length[i].flag);
            //     }
            // }
            console.log("if out");
        }else
        {
            document.getElementById(item).style.textDecoration = 'none';
            console.log("else");
            function arrayRemove(arr, value) {
  
                return arr.filter(function(other){
                    return other != value;
                });
               
             }
               
             this.state.checked=arrayRemove(this.state.checked, item);
             console.log("else len "+this.state.checked.length);
           
        }
        
        // this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));  
  }  
    updateInput(value){
        this.setState({
          userInput: value,
        });
      }
      
      // Add item if user input in not empty
      addItem(){
        localStorage.setItem("method","POST");
        if(this.state.userInput !== '' ){
          const userInput = {
      
            // Add a random id which is used to delete
            idItem :  Math.random(),
      
            // Add a user value to list
            idDesc : this.state.userInput,
            flag: false
          };
      
          // Update list
          const list = [...this.state.list];
          list.push(userInput);
      
          // reset state
          this.setState({
            list,
            userInput:""
          });

          console.log("add lsit "+JSON.stringify(this.state.list));
        }
      }
      
      // Function to delete item from list use id to delete
      deleteItem(key){
        const list = [...this.state.list];
      
        // Filter values and leave value which we need to delete
        const updateList = list.filter(item => item.idItem !== key);
      
        // Update list in state
        this.setState({
          list:updateList,
        });
        console.log("delete lsit "+this.state.list);
      }
    // appendInput() {
    //     // var newInput = `input-${this.state.inputs.length}`;
    //     // this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    //     var inputs=this.state.inputs;
    //     inputs.push()
    // }

    // disAppendInput(index) {
    //     var inputs=this.state.inputs;
    //     inputs=inputs.filter((input,i) => {
    //         return i !== index;
    //     })
    //     this.setState({
    //         inputs: inputs
    //     })
    // }

    
    handleChange (event) {
        this.setState ({
            todolist: Object.assign ({}, this.state.todolist, {
              [event.target.name]: event.target.value,
          }),
        },
        () =>{
            console.log("this ");
            console.log(this.state.todolist.items);
        }
        ); 


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


    // handleInputChange (event) {
    //     this.setState ({
    //         todolist: Object.assign ({}, this.state.todolist, {
    //         type: event.target.value,
    //       }),
    //     });
    //     console.log("type "+this.state.reminder.type);
    // }

    handleSave(){
        localStorage.setItem("method","POST");
        this.setState ({
            todolist: Object.assign ({}, this.state.todolist, {
                todolistTitle: '',
                items:[],
            }),
          });
    }

    handleDelete(){
        console.log("in delete id "+this.state.idTodo);
        this.setState({
            delete: true
        })
              fetch('http://ntrs-backend.herokuapp.com/todolist/deleteTodolists/'+this.state.idTodo, {
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
                      alert('todolist deleted');
                      this.handleClose();
                      window.location.reload(true);
                    //   this.props.history.push('/reminders');
                    } else  {
                      console.log("Error in deleting");
                    }
                  })
                  .catch (err => {
                    console.log (err);
                  })
                
            
    }

    handleEdit( todo){
        if(todo!=''){
            console.log("todo "+todo.idTodo);
            this.setState({
                idTodo: todo.idTodo,
            })
            console.log('id '+this.state.todolist.show+" length "+this.state.todolist.taskList.length);
            for (let index = 0; index < this.state.todolist.taskList.length; index++) {
                console.log("inner lop");
                if (todo.idTodo === this.state.todolist.taskList[index].idTodo) {
                    this.setState ({
                        todolist: Object.assign ({}, this.state.todolist, {
                            todolistTitle : this.state.todolist.taskList[index].todolistTitle,
                            items:this.state.todolist.taskList[index].items,
                            
                        })
                    })
                    localStorage.setItem("method","PATCH");
                    console.log("later "+localStorage.getItem("method"));
                    
                }
                
            }
           }
    }
    
    

    componentDidMount () {
        this.fetchAllReminders ();
        document.body.style.background= 'lightgoldenrodyellow' ;
    }

    componentWillUnmount(){
        document.body.style.background=null;
    }

    
    fetchAllReminders= () => {
        console.log("in todo get");
        this.setState({
            get:true
        })
        
        let temp=JSON.parse(localStorage.getItem('local'));
        console.log("locsl here "+temp.user.idUser);
        fetch('http://ntrs-backend.herokuapp.com/todolist/getTodolistByidUser/'+temp.user.idUser, {
            headers: {Authorization: localStorage.getItem('token')},
            method: 'GET',
           
            // responseType:"blob"
        })
        .then(response => response.json())
        .then (data => {
            this.setState({
                get:false
            })
            if(data.status==200){
                console.log('result todolist',data);
                
                this.setState({
                    todolist: Object.assign ({}, this.state.todolist, {
                        taskList: data.data
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
        })
        .catch(error => console.log('error', error));

        console.log("todolist items ater "+this.state.todolist.taskList.length);
    }

    onSubmit(e){
        e.preventDefault();
        // for(let i=0;i< this.state.todolist.taskList.length;i++){
         
           
        // }
        this.setState ({
            todolist: Object.assign ({}, this.state.todolist, {
                items:this.state.list,
            }),
          });

        let temp=JSON.parse(localStorage.getItem('local'));
        // console.log("reminder localstorage "+JSON.stringify(temp.user.idUser));
        console.log("here save "+temp.user.idUser+" has title "+this.state.todolist.todolistTitle);
        console.log("items "+JSON.stringify(this.state.list));
        console.log("edit items "+JSON.stringify(this.state.todolist.taskList.length));
        console.log("onsubmit "+localStorage.getItem("method")); 
        {localStorage.getItem("method")=="POST"? this.setState({ add: true}): this.setState({ update: true})}
        {localStorage.getItem("method")=="POST"? 

       
        fetch('http://ntrs-backend.herokuapp.com/todolist/addTodolist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            // body: data
              body: JSON.stringify ({
                idUser: temp.user.idUser,  
                todolistTitle : this.state.todolist.todolistTitle,
                items:this.state.list,
                
              }),
            })
            .then(res =>res.json())
              .then (res => {
                this.setState({ add: false, update:false})
                  console.log("result "+JSON.stringify(res));
                if (res.msg === "todolist inserted") {
                  console.log("Inserted");
                  alert('todolist added');
                  this.handleClose();
                  window.location.reload(true);
                //   this.props.history.push('/reminders');
                } else  {
                  console.log("Error in inserting");
                }
              })
              .catch (err => {
                console.log (err);
              })
              :


              console.log("in update userid "+temp.user.idUser);
              console.log("items list "+JSON.stringify(this.state.list));
              console.log("items ietms "+JSON.stringify(this.state.todolist.items));
              console.log("onsubmit checked"+this.state.checked.length);
              console.log("onsubmit2 items "+this.state.todolist.items.length);
              for(let j=0;j< this.state.checked.length;j++){
                  

                console.log("onsubmit3 "+this.state.checked[j]);
                   

                   for(let i=0;i<this.state.todolist.items.length;i++){
                    console.log("onsubmit4 "+this.state.todolist.items[i].idItem);
                        if(this.state.checked[i]===this.state.todolist.items[j].idItem){
                            this.state.todolist.items[j].flag=true;
                            console.log("onsubmit1 "+this.state.todolist.items[j].idDesc);
                        }
                   }
                  
              }
              console.log("in update "+this.state.idTodo+" userid "+temp.user.idUser);
              fetch('http://ntrs-backend.herokuapp.com/todolist/updateTodolists/'+this.state.idTodo, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                // body: data
                  body: JSON.stringify ({
                    idUser: temp.user.idUser,  
                    todolistTitle : this.state.todolist.todolistTitle,
                    items:this.state.todolist.items,
                    
                  }),
                })
                .then(res =>res.json())
                  .then (res => {
                    this.setState({ add: false, update:false})
                      console.log("result "+JSON.stringify(res));
                    if (res.msg === "updated") {
                      console.log("updated");
                      alert('todolist updated');
                      this.handleClose();
                      window.location.reload(true);
                    //   this.props.history.push('/reminders');
                    } else  {
                      console.log("Error in updating");
                    }
                  })
                  .catch (err => {
                    this.setState({ add: false, update:false})
                    console.log (err);
                  })
                }
       
    }


    render()
    {
        if(this.state.add || this.state.update || this.state.delete || this.state.get ){
            if(this.state.add){
                return(
                    <LoadingBar text="Adding todolist..."></LoadingBar>
                )
            }
            else if(this.state.update){
                return(
                    <LoadingBar text="Updating todolist..."></LoadingBar>
                )
            }
            else if(this.state.delete){
                return(
                    <LoadingBar text="Deleting todolist..."></LoadingBar>
                )
            }
            else{
                return(
                    <LoadingBar text="Fetching your Todos..."></LoadingBar>
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
                        <div className="todoAdd" >
                            
                            <div onClick={(newFavorite) => {this.handleShow(); this.handleSave();}}>
                            <h2>Add new TodoList       <FaRegPlusSquare/></h2>
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
                                <p style={{textAlign: 'center',marginTop: '20px'}}>
                                {localStorage.getItem("method")=="POST"? <h2>ADD TODOLIST</h2>:<h2>UPDATE TODOLIST</h2>}
                    
                                </p>
                                {/* </Modal.Header> */}
                                {/* <Modal.Body> */}
                                
                               
                                <div className="todoPopup">
                                {/* {localStorage.getItem("method")=="POST" ? null: */}
                                       <table style={{width:'80%'}}>
                                           <tr>
                                               <td style={{fontSize:'18px', fontWeight:'600'}}>Title</td>
                                               <td style={{fontSize:'16px'}}> <FormGroup className="form-inline">
                                        <FormControl
                                            type="text"
                                            name="todolistTitle"
                                            placeholder="Name"
                                            onChange={this.handleChange}
                                            value={this.state.todolist.todolistTitle}
                                            className="input col-xl-10"
                                            required
                                            style={{border:'1px solid grey'}}
                                        /> 
                                        </FormGroup> </td>
                                           </tr>
                                           <tr>
                                               <td style={{fontSize:'18px', fontWeight:'600'}}>Items</td>
                                               <td style={{fontSize:'16px'}}>

                                             

                                {/* <FormLabel style={{marginBottom: '10px'}}>Items</FormLabel> */}
                                        
                                {localStorage.getItem("method")=="POST"?     
                                <Container>

                                        <Row style={{padding:'0px'}}>
                                            <Col md={{ span: 12 }}>
                                
                                            <InputGroup>
                                            <FormControl
                                                placeholder="add item . . . "
                                                size="md"
                                                value = {this.state.userInput}
                                                onChange = {item => this.updateInput(item.target.value)}
                                                aria-label="add something"
                                                aria-describedby="basic-addon2"
                                                style={{border:'1px solid grey'}}
                                            />
                                            <InputGroup.Append>
                                                <Button
                                                variant="dark"
                                                size="md"
                                                onClick = {()=>this.addItem()}
                                                >
                                                ADD
                                                </Button>
                                            </InputGroup.Append>
                                            </InputGroup>
                                    
                                            </Col>
                                        </Row>
                                    <hr/>
                                        <Row style={{padding:'0px'}}>
                                            <Col md={{ span: 12 }}>
                                                <ListGroup>
                                                {/* map over and print items */}
                                                {this.state.list.map(item => {return(
                                        
                                                    <ListGroup.Item variant="dark" action 
                                                    onClick = { () => this.deleteItem(item.idItem) }>
                                                    {item.idDesc}
                                                    </ListGroup.Item>
                                        
                                                )})}
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </Container>

                                    :
                                        this.state.todolist.items.map(item => (  
                                      
                                            <div  style={{marginRight:'10px',marginTop: '10px'}}>
                                            
                                            {item.flag ?
                                                <p id={item.idItem} style={{display: 'inline-flex',marginLeft: '10px'}}>
                                                <input  
                                                    type="checkbox"  
                                                    value={item.idItem} 
                                                    checked='true'
                                                    onChange={this.handleCheck}  
                                                    style={{fontSize:'16px', textAlign:'right',marginRight: '18px'}}
                                                /><p id={item.idItem} style={{textDecoration:'line-through'}} >{item.idDesc} </p>  
                                                </p> 
                                            :
                                                <p id={item.idItem} style={{display: 'inline-flex',marginLeft: '10px'}}>
                                                <input  
                                                    type="checkbox"  
                                                    value={item.idItem} 
                                                    onChange={this.handleCheck}  
                                                    style={{fontSize:'16px', textAlign:'right',marginRight: '18px'}}
                                                /><p id={item.idItem} >{item.idDesc} </p>  
                                                </p> 
                                            }
                                            <br></br>
                                            </div>
                                           
                                        ))  
                                    
                                }
                                  </td>
                                           </tr>
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
                            { this.state.todolist.taskList.map((todolist, index) => {

                                return(
                                    <Row>
                                        <Col xs={10} md={4}>
                                            <div class="todoCard" onClick={(newFavorite) => {this.handleShow(); this.handleEdit(todolist);}} >
                            
                                                <h4>{todolist.todolistTitle}</h4>
                                                {/* <p><b>Items:</b></p> */}
                                                
                                                {
                                                    todolist.items.map((subitem, i) => {
                                                    return (
                                                        <div>
                                                            
                                                      {subitem.flag ? <ul ><li style={{fontSize: '16px', textDecoration:'line-through'}}>{subitem.idDesc}</li></ul>: 
                                                        <ul ><li style={{fontSize: '16px'}}>{subitem.idDesc}</li></ul>}
                                                        </div>
                                                    )
                                                    })
                                                }
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
export default withRouter(ToDoLists);