import React, { Component }  from 'react';
import {withRouter,Link} from 'react-router-dom'
import { Nav,Navbar,Container, Row, Col, Card, Jumbotron, CardDeck} from 'react-bootstrap'
import '../css/LandingPage.css'
import p1 from '../images/p1.jfif'
import avatar from '../images/img_avatar2.png'
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

class LandingPage extends Component{
    constructor(props){
        super(props);
        this.state={
            base:''
        }     
    }
   
    render()
    {
        return (
            <div className="text-center">
                <div id="nav">
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                        <Navbar.Brand href="#home">NTRS</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                {/* <Nav className="mr-auto"></Nav> */}
                                <Nav className="ml-auto  ">
                                    {/* <Nav.Link href="#">Home</Nav.Link>
                                    <Nav.Link href="#about">About</Nav.Link>
                                    <Nav.Link href="#features">Features</Nav.Link>
                                    <Nav.Link href="#team">Team</Nav.Link> */}
                                    <Nav.Link href="#login" >Login</Nav.Link>
                                    <Nav.Link href="#signup" >SignUp</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                    </Navbar>
                </div>
                
                <div className="text-center" id="home">
                <Jumbotron style={{background:'white'}}>
                    <h1>Capture What's on your mind</h1>
                    <p>
                        This is a simple way of storing your important information in a organized way.
                    </p>
                    <br></br>
                    <p>
                        {/* <Button variant="primary">Sign Up Now</Button> */}
                        <Link to="/signup" className="btn " style={{background:'#ffef5e ', color:'black', fontWeight:'600'}}>Sign Up Now</Link>
                        <br></br>
                        <p style={{fontWeight:'500'}} onClick={(e)=> this.props.history.push('/login')}>Already have an account? Login</p>
                    </p>
                    {/* <a href={"data:image/jpeg;base64,"+this.state.base64} download="filename.jpg">Download</a> */}

                </Jumbotron>
                </div>
                <div id="about" className="text-center" >
                    <h1>How it works?</h1>
                    <p>Add your notes, lists and reminders</p>
                    <Container>
                        <Row>
                            <Col xs={10} md={4}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Use It Everywhere</Card.Title>
                                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                        <Card.Text>
                                        Notes stay updated across all your devices, automatically. 
                                        </Card.Text>
                                        {/* <Card.Link href="#">Card Link</Card.Link> */}
                                        {/* <Card.Link href="#">Another Link</Card.Link> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={10} md={4}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Stay Organised</Card.Title>
                                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                        <Card.Text>
                                        Your Saved Notes, Reminders stays organised and saves your time.
                                        </Card.Text>
                                        {/* <Card.Link href="#">Card Link</Card.Link> */}
                                        {/* <Card.Link href="#">Another Link</Card.Link> */}
                                    </Card.Body>
                                </Card>
                            </Col>  
                        </Row>
                        <Row>
                            <Col xs={10} md={4}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Capture what matters</Card.Title>
                                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                        <Card.Text>
                                        Add notes, lists for shopping, set reminders etc
                                        </Card.Text>
                                        {/* <Card.Link href="#">Card Link</Card.Link>
                                        <Card.Link href="#">Another Link</Card.Link> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={10} md={4}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>It’s free</Card.Title>
                                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                        <Card.Text>
                                        Apps, backups, sharing – it’s all completely free.
                                        </Card.Text>
                                        {/* <Card.Link href="#">Card Link</Card.Link>
                                        <Card.Link href="#">Another Link</Card.Link> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>    
                    </Container>
                </div>
                <div id="features">
                <h1>Features</h1>
                    <Container>
                       
                        <p><span> &#x2714;</span> Keep important info handy by syncing your notes to all your devices. </p>
                        <p><span> &#x2714;</span> Go paperless. Keep the important information organised. </p>
                        <p><span> &#x2714;</span> Add text, images, audio, scans, PDFs, and documents to your notes. </p>             
                        <p><span> &#x2714;</span> Set a time-based reminder to make sure you never miss a thing. </p>
                        <p><span> &#x2714;</span> Share or add a to-do list </p>
                    </Container>
                </div>
                <div id="team">
                    <h1>Team</h1>
                    <Container>
                    <CardDeck>
                            <Card >
                                <Card.Img variant="top" src={avatar} roundedCircle/>
                                <Card.Body>
                                <Card.Title>Laya</Card.Title>
                                {/* <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </Card.Text> */}
                                <div id="icons">  <FaGithub/>
                                <FaLinkedin/>
                                <FaTwitter/></div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={avatar} roundedCircle/>
                                <Card.Body>
                                <Card.Title>Rama Lakshmi</Card.Title>
                                {/* <Card.Text>
                                    This card has supporting text below as a natural lead-in to additional
                                    content.{' '}
                                </Card.Text> */}
                                <div id="icons">  <FaGithub/>
                                <FaLinkedin/>
                                <FaTwitter/></div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={avatar} roundedCircle />
                                <Card.Body>
                                <Card.Title>Shivani</Card.Title>
                                {/* <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This card has even longer content than the first to
                                    show that equal height action.
                                </Card.Text> */}
                                <div id="icons">  <FaGithub/>
                                <FaLinkedin/>
                                <FaTwitter/></div>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Container>
                        
                </div>
                <div id="footer">
                    @2021.All Copyrights Reserved
                </div>
                {/* <button onClick={()=>this.props.history.push('/student')}  className="btn btn-primary">goto Student</button> */}
            </div>

        )
    }
}
export default withRouter(LandingPage);