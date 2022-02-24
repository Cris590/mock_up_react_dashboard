
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {Nav, Image, Navbar, Dropdown, Container } from '@themesberg/react-bootstrap';
import { Routes } from "../routes";


import Profile3 from "../assets/img/team/profile-picture.jpg";
import { Link } from "react-router-dom";


export default (props) => {


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
                    <span className="mb-0 font-small fw-bold">Bonnie Green</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <button class="button-no-style">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> 
                  <Link to={Routes.Login.path}>
                    Cerrar sesión
                  </Link>
                </button>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
