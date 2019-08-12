import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import logo from './logo.svg'
import './style.css'
import {Navbar, Nav} from "react-bootstrap";
import {connect} from "react-redux";

const Header = props => {

  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [props.isLoginSuccess])
  return (
    <Navbar bg={'dark'} variant={'dark'}>
      <Navbar.Brand>
        <img src={logo} alt="logo" className='d-inline-block align-top logo'/>
        <NavLink to={'/'}>
          {'Rick And Morty'}
        </NavLink>
      </Navbar.Brand>
      { token ?
        <Nav>
          <NavLink to={'/episodes'}>Episodios</NavLink>
          <NavLink to={'/characters'}>Personajes</NavLink>
        </Nav>
      : null}
    </Navbar>
  );
};

const mapStateToProps = state => ({
  isLoginSuccess: state.users.loginSuccess,
})

export default connect(mapStateToProps)(Header);