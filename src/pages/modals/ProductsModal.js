import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Modal, Row } from '@themesberg/react-bootstrap';
import { fetchSinToken } from '../../helpers/fetch';
import settings from '../../setting';
import Swal from 'sweetalert2';

const ProductModal = ({titulo,handleOnSubmit,handleHide,handleShow,input,handleOnChange,setManual}) => {
    let {
        id_producto,

        nombreName,
        nombreValue, 
        nombrePlaceHolder,
        
        codigoName,
        codigoValue, 
        codigoPlaceHolder,
        
        costoName,
        costoValue, 
        costoPlaceHolder,
        
        ventaName,
        ventaValue, 
        ventaPlaceHolder,

        imagenUrl,
        imagenUrlName,
        imagenFile,
        imagenFileName,

        idCategoriaName,
        idCategoriaValue,
    } = input

    const [categorias, setcategorias] = useState([]);

    const [state, setState] = useState({
        lastCodigo:''
    });
    
    let lastCodigo='';

    useEffect(() => {
        chargeCategorias();
       
    }, []);

    const chargeCategorias = async ()=>{
        lastCodigo=(!!id_producto) ? codigoValue :'';
        try {
    
          const resp= await fetchSinToken(settings.categories);
          const {categorias:respuesta}=await resp.json()  
          setcategorias(respuesta)
        } catch (error) {
          console.log('Error',error)
        }
    }

    const handleOnBlurCheckCodigo= async (e)=>{
     
        try {
            const resp= await fetchSinToken(`${settings.products}/codigo/${codigoValue}`);
            
            const {producto}=await resp.json();
        
            if(producto){
                if(!id_producto && producto){
                    isNotValidCodigo(producto.codigo)
                }else if (id_producto && id_producto!==producto.id_producto){
                    isNotValidCodigo(producto.codigo)
                }
            }
            
        } catch (error) {
            setManual({
                [codigoName]:state.lastCodigo
            })
            Swal.fire({
                icon: 'error',
                title: 'Oops... error al buscar el codigo',
                text: 'Por favor comuniquese con el administrador',
            })
        } 

    }

    const handleOnFocus=()=>{
        let lastCodigo=(!!id_producto) ? codigoValue :'';
        setState({lastCodigo})
    }

    const isNotValidCodigo=(codigo)=>{
        setManual({
            [codigoName]:state.lastCodigo
        })
        Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: `El código ${codigo} ya existe, por favor intente con uno valido`,
        })
    }

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            setManual({
                [imagenUrlName]: URL.createObjectURL(file),
                [imagenFileName]:file
            })
        }
      };

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
                    <Form.Control type="text" required name={nombreName} onChange={handleOnChange} value={nombreValue} placeholder={nombrePlaceHolder} />           
                </Form.Group> 

                <Form.Group>
                    <Form.Label>Codigo: </Form.Label>
                    <Form.Control 
                        type="text" 
                        required 
                        name={codigoName} 
                        onChange={handleOnChange} 
                        value={codigoValue} 
                        placeholder={codigoPlaceHolder} 
                        onBlur={handleOnBlurCheckCodigo}
                        onFocus={handleOnFocus}
                    />           
                </Form.Group> 

                

                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Costo</Form.Label>
                        <Form.Control type="number" required name={costoName} onChange={handleOnChange} value={costoValue} placeholder={costoPlaceHolder} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Precio Venta</Form.Label>
                        <Form.Control type="number" required name={ventaName} onChange={handleOnChange} value={ventaValue} placeholder={ventaPlaceHolder} />
                    </Form.Group>
                </Row>

                <Form.Group>
                    <Form.Label>Categoria: </Form.Label>
                    <Form.Select id="categoria" required name={ idCategoriaName} onChange={handleOnChange} value={ idCategoriaValue}>
                        <option value="">Seleccione la categoria ... </option>
                        {
                            categorias.map((categoria) =>{
                                if(categoria.activo){
                                    return (
                                        <option key={categoria.id_categoria} value={categoria.id_categoria}> {categoria.nombre} </option>
                                    )
                                }
                            })
                        }
                    </Form.Select>        
                </Form.Group> 

                <Form.Group style={{width: '60%'}} >
                    <Form.Label>Seleccionar imagen: </Form.Label>
                    <Form.Control 
                        type="file"  
                        name=""
                        onChange={onImageChange}
                    />  
                    <br/>
                    <Image src={imagenUrl} fluid={true} thumbnail={true} style={{width: '100%'}} />  
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

export default ProductModal