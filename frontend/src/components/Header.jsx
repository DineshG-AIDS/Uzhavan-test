import React from "react";
import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import { FaCartPlus, FaUserShield } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

import logo from "../assets/logo1.png";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="rounded-header"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="IconUzhavan" />
              Uzhavan
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaCartPlus className="medi" /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUserShield className="medi" /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
