
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {Nav, Image, Navbar, Dropdown, Container } from '@themesberg/react-bootstrap';
import { appRoutes } from "../appRoutes";


import Profile3 from "../assets/img/team/profile-picture.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { useEffect } from "react";

export default (props) => {

 
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const { identificacion,nombre } = useSelector((state) => state.auth);

  const handleSingOut=(e)=>{
    e.preventDefault()
    dispatch(logout())
    navigate(appRoutes.Login.path,{replace:true});
  }

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex flex-row-reverse w-100">
          
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{nombre}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item href="#">ID: {identificacion}</Dropdown.Item>
                <Dropdown.Item href="#">{nombre}</Dropdown.Item>
                <button className="button-no-style" onClick={handleSingOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> 
                    Cerrar sesión
                </button>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
