import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

const TopNavbar = (props) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">My Final Project</Link>
        </Navbar.Brand>
        { props.showNavItems ? <Navbar.Toggle /> : null }
      </Navbar.Header>
      {
        props.showNavItems ?
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={props.onSignOut}>Sign Out</NavItem>
            </Nav>
            <Nav pullRight>
              <Link to="/secret"><Navbar.Text>User-information</Navbar.Text></Link>
            </Nav>

            <Nav pullRight>
              <Link to="/movies"><Navbar.Text>Movies</Navbar.Text></Link>
            </Nav>

            <Nav pullRight>
              <Link to="/listindex"><Navbar.Text>My Lists</Navbar.Text></Link>
            </Nav>
          </Navbar.Collapse>
          : null
      }
    </Navbar>
  );
}


TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  showNavItems: PropTypes.bool.isRequired
};

export default TopNavbar;
