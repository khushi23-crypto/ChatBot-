import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
                    <Nav className="mx-auto">
                        <Nav.Link href="#docs">Docs</Nav.Link>
                        <Nav.Link href="#showcase">Showcase</Nav.Link>
                        <Nav.Link href="#example">Example</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;
