import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaGithub, FaUsers } from "react-icons/fa";
import Logo from "../images/chatbot.png";

function Navigationbar() {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={Logo} alt='Logo' width="60" height="60" className="d-inline-block align-top me-2" />
                    ChatBot App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="mx-auto gap-4">
                        <Nav.Link href="#docs">Docs</Nav.Link>
                        <Nav.Link href="#showcase">Showcase</Nav.Link>
                        <Nav.Link href="#example">Example</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                    </Nav>
                    <div className='d-flex align-items-center gap-3'>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            <Button variant="outline-dark">Search</Button>
                        </Form>
                        <Nav.Link href="https://github.com/khushi23-crypto/ChatBot-" target="_blank" rel="noopener noreferrer" className="fs-5">
                            <FaGithub />
                        </Nav.Link>
                        <Nav.Link href="#community" className="fs-5">
                            <FaUsers />
                        </Nav.Link>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;
