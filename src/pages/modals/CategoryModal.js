import React from 'react'
import { Button, Form, Modal } from '@themesberg/react-bootstrap';

const CategoryModal = ({titulo,handleOnSubmit,handleHide,handleShow,input,handleOnChange}) => {
    let {nameInput,valueInput,placeholderInput} = input
  return (
    <Modal as={Modal.Dialog} centered show={handleShow} onHide={handleHide}>
        <Modal.Header>
          <Modal.Title className="h6">{titulo}</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleHide} />
        </Modal.Header>
        <Form onSubmit={handleOnSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nombre: </Form.Label>
              <Form.Control type="text" required name={nameInput} onChange={handleOnChange} value={valueInput} placeholder={placeholderInput}/>           
            </Form.Group> 
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" type="submit">
              Aceptar
            </Button>
            <Button variant="link" className="text-gray ms-auto" onClick={handleHide}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
  )
}

export default CategoryModal