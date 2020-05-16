import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../css/lemmling_Cartoon_dog.svg";
import "../css/Navbar-Footer.css";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  //NavbarText,
} from "reactstrap";

const NavMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="nav-menu" light expand="md">
        <NavbarBrand className="nav-menu-logo" href="/">
          <img src={logo} width="50" height="50" alt="logo"></img>
          DogHouse Premium
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/home/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/About">About</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Contact
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Button className="btn-nav" color="primary">
            Sign Up
          </Button>
          <Button className="btn-nav" color="info">
            Log In
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavMenu;
