import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useNavigate } from "react-router-dom";

import { appRoutes } from "../../appRoutes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import {  startLoginUserPassword } from "../../actions/auth";



const Login = () => {
  const dispatch=useDispatch();

  const [formValues, handleInputChange,reset] = useForm({
    user: "",
    password: "",
  });

  const { user, password } = formValues;
  const navigate = useNavigate()

  const handleLogin=(e)=>{
    e.preventDefault();
    dispatch(startLoginUserPassword(user,password))
    reset()
    navigate(appRoutes.Main.path,{replace:true});
  }

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500 mb-5">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Bienvenido</h3>
                </div>
                <Form className="mt-4" onSubmit={handleLogin}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Usuario</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        placeholder="usuario"
                        name='user'
                        value={user}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Contraseña"
                          name='password'
                          value={password}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                      Ingresar
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Login;
