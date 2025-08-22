import Container from 'react-bootstrap/Container';
import { FaGithub, FaUsers, FaSun, FaMoon } from "react-icons/fa";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Logo from "../images/chatbot.png";

function Navigationbar({darkMode, setDarkMode}) {
    const [showLogin, setShowLogin] = useState(false);
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("bg-dark");
        document.body.classList.toggle("text-light");
    };

    return (
        <>
            <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} className="shadow-sm py-1" expand="lg" >
                <Container>
                    <Navbar.Brand href="#home" className="d-flex align-items-center">
                        <img src={Logo} alt='Logo' width="60" height="60" className="d-inline-block align-top me-2" />
                        <span className='fw-bold'>ChatBot App</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse id="main-navbar" className="justify-content-center">
                        <Nav className="mx-auto gap-4">
                            <Nav.Link href="#docs" style={{ fontWeight: 600, color: darkMode ? "white" : "black" }} >Docs</Nav.Link>
                            <Nav.Link href="#showcase" style={{ fontWeight: 600, color: darkMode ? "white" : "black" }}>Showcase</Nav.Link>
                            <Nav.Link href="#example" style={{ fontWeight: 600, color: darkMode ? "white" : "black" }}>Example</Nav.Link>
                            <Nav.Link href="#pricing" style={{ fontWeight: 600, color: darkMode ? "white" : "black" }}>Pricing</Nav.Link>
                            <Nav.Link href="#dashboard" style={{ fontWeight: 600, color: darkMode ? "white" : "black" }}>Dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div className='d-flex align-items-center gap-4'>

                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            <Button variant={darkMode ? "outline-light" : "outline-dark"}>Search</Button>
                        </Form>
                        <Nav.Link href="https://github.com/khushi23-crypto/ChatBot-" target="_blank" rel="noopener noreferrer" className="fs-5" size={22}><FaGithub /></Nav.Link>
                        <Nav.Link href="#community" className=" fs-5" size={22}><FaUsers /></Nav.Link>
                        <Button variant={darkMode ? "light" : "dark"} size="sm" onClick={toggleTheme} > {darkMode ? <FaMoon /> : <FaSun />} </Button>
                        <Button variant={darkMode ? "outline-light" : "outline-dark"} size="sm" onClick={() => setShowLogin(!showLogin)}>Login</Button>
                    </div>
                </Container>
            </Navbar>
            {showLogin && (
                <div
                    style={{
                        position: "fixed",      // ✅ floating effect
                        top: "100px",           // ✅ navbar se thoda niche
                        right: "20px",          // ✅ screen ke right side
                        width: "300px",
                        padding: "15px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.1)", // ✅ light transparent
                        backdropFilter: "blur(6px)",         // ✅ glassy floating effect
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        zIndex: 1000
                    }}
                >

                    <h5 className="text-center mb-3 text-white">Login</h5>
                    <Form>
                        <Form.Group className="mb-2 text-white">
                            <Form.Label style={{ fontSize: "14px" }}>Email</Form.Label>
                            <Form.Control type="email" size="sm" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3 text-white">
                            <Form.Label style={{ fontSize: "14px" }}>Password</Form.Label>
                            <Form.Control type="password" size="sm" placeholder="Enter password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 btn-sm">
                            Login
                        </Button>
                    </Form>
                </div>
            )}
        </>
    );
}

export default Navigationbar;