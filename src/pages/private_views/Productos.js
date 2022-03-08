import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@themesberg/react-bootstrap';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import DataTable from '../../components/DataTable';
import { fetchConToken, fetchMultipartToken, fetchSinToken } from '../../helpers/fetch';
import { useForm } from '../../hooks/useForm';
import settings from '../../setting';
import ProductModal from '../modals/ProductsModal';

const Productos = () => {
  useEffect(() => {
    chargeProducts()
  }, [])


  const [productos, setproductos] = useState([]);
  const columns=[
    {
      title:'Código',
      field:'codigo'
    },
    {
      title:'Nombre',
      field:'nombre'
    },
    {
      title:'Categoria',
      field:'categoria'
    },
    {
      title:'Costo',
      field:'precio_costo'
    },
    {
      title:'Precio Venta',
      field:'precio_venta'
    },
    {
      title:'Estado',
      field:'activo'
    },
    {
      title:'Acciones',
      field:'acciones'
    },       
  ]

  const [showDefaultCreate, setShowDefaultCreate] = useState(false);
  const handleCloseCreate = () => setShowDefaultCreate(false);
  const [ formValuesCreate, handleInputChangeCreateProduct,resetCreate,setManualCreate ]=useForm({
    crear_nombre:'',
    crear_id_categoria:'',
    crear_codigo:'',
    crear_precio_venta:'',
    crear_precio_costo:'',
    crear_imagen:'',
    crear_file:''
  })

  const { 
    crear_nombre, 
    crear_id_categoria, 
    crear_codigo,
    crear_precio_venta,
    crear_precio_costo,
    crear_imagen,
    crear_file
  }=formValuesCreate;

  const [ formValuesEdit, handleInputChangeEditProduct , resetEdit,setManualEdit]=useForm({
    editar_id_producto:'',
    editar_nombre:'',
    editar_codigo:'',
    editar_id_categoria:'',
    editar_precio_venta:'',
    editar_precio_costo:'',
    editar_imagen:'',
    editar_file:''
  })
  const { 
    editar_id_producto,
    editar_nombre, 
    editar_id_categoria, 
    editar_codigo,
    editar_precio_venta,
    editar_precio_costo,
    editar_imagen,
    editar_file
  }=formValuesEdit;

  const chargeProducts = async ()=>{

    try {
      const resp= await fetchSinToken(settings.products);
      const {productos:respuesta}=await resp.json() 
      const productos_aux=await Promise.all(
        respuesta.map( async ({id_producto,id_categoria,nombre,codigo,precio_costo,precio_venta,activo})=>{
          const res_categoria= await fetchSinToken(`${settings.categories}/${id_categoria}`);
          const {categoria}=await res_categoria.json() 
          let button_state=buttonState(activo,id_producto);
          let actions_products = actionsProducts(id_producto)
          return  {
            codigo,
            categoria:categoria.nombre,
            nombre,
            precio_costo,
            precio_venta,
            activo:button_state,
            acciones:actions_products
          }
          
        })
      )
      setproductos(productos_aux)
    } catch (error) {
      console.log('Error',error)
    }
  }

  const buttonState=(activo,id_producto)=>{
    return (
      (activo===1) 
      ? <Button variant="tertiary" id_producto={id_producto}  size="sm" onClick={handleChangeStateProduct}>Activo</Button>
      : <Button variant="danger" id_producto={id_producto} size="sm" onClick={handleChangeStateProduct}>InActivo</Button>
    )
  }

  const actionsProducts =(id_producto)=>{
    
    return (
      <div>
          <button className="btn btn-button-no-style" onClick={()=> openModalEditProduct(id_producto)}>
            <FontAwesomeIcon icon={faPencilAlt}  />
          </button>
      </div>
    )
  }

  const handleChangeStateProduct=async (event) => {
    event.preventDefault();
    let id_producto=event.target.getAttribute("id_producto");
    let url_req=`${settings.products}/${id_producto}`
    let method='DELETE'
    await fetchRquest(url_req,{},method)

  }

  //CREAR PRODUCTO
  const handleCreateProduct=async (event) => {
    event.preventDefault();
    let data={
      nombre:crear_nombre,
      codigo:crear_codigo,
      id_categoria:crear_id_categoria,
      precio_venta:crear_precio_venta,
      precio_costo:crear_precio_costo,
      archivo:crear_file
    }
    let url_req=settings.products;
    let method='POST'

    // await fetchRquest(url_req,data,method)
    await fetchRquestMultiData(url_req,data)

  } 

  // EDITAR CATEGORIA
  const [showDefaultEdit, setShowDefaultEdit] = useState(false);
  const handleCloseEdit = () => setShowDefaultEdit(false);

  const openModalEditProduct= async (id_producto) => {
    try {
      const resp= await fetchSinToken(`${settings.products}/id_producto/${id_producto}`);
      const {producto}=await resp.json();
      setShowDefaultEdit(true);
      setManualEdit({
        editar_id_producto:producto.id_producto,
        editar_nombre:producto.nombre, 
        editar_codigo:producto.codigo, 
        editar_id_categoria:producto.id_categoria, 
        editar_precio_venta:producto.precio_venta,
        editar_precio_costo:producto.precio_costo,
        editar_imagen:producto.imagen
      }) 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor comuniquese con el administrador',
      })
    }    
  }

  const  handleEditCategory= async (event) => {
    event.preventDefault();
    let data={
      id_producto:editar_id_producto,
      nombre:editar_nombre,
      codigo:editar_codigo, 
      id_categoria:editar_id_categoria, 
      precio_venta:editar_precio_venta,
      precio_costo:editar_precio_costo,
      archivo:editar_file
    }
    let url_req=`${settings.products}/${editar_id_producto}`
    let method='PUT'
    await fetchRquestMultiData(url_req,data,method)
  }

  const fetchRquestMultiData=async (url,data,method='POST')=>{

    try {
      const resp= await fetchMultipartToken(url,data,method);
      const body=await resp.json()

      if(!body.ok){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: body.msg,
        })
        setShowDefaultEdit(false)
        setShowDefaultCreate(false)
      }else{
        
        Swal.fire({
          icon: 'success',
          title: 'Perfecto !!!  ',
          text: body.msg,
        })
        chargeProducts();
        resetCreate();
        resetEdit();
        setShowDefaultEdit(false)
        setShowDefaultCreate(false)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor comuniquese con el administrador',
      })
    }
  }

  const fetchRquest=async (url,data={},method)=>{
    try {
      const resp= await fetchConToken(url,data,method);
      const body=await resp.json()
      if(!body.ok){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: body.msg,
        })
        setShowDefaultEdit(false)
        setShowDefaultCreate(false)
      }else{
        
        Swal.fire({
          icon: 'success',
          title: 'Perfecto !!!  ',
          text: body.msg,
        })
        chargeProducts();
        setShowDefaultEdit(false)
        setShowDefaultCreate(false)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor comuniquese con el administrador',
      })
    }
  }
  
  return (
    <>

      <div className="mb-4">
        <Button variant="success" onClick={()=>setShowDefaultCreate(true)}>
          Crear Producto
        </Button>
      </div>
      <DataTable data={productos} columns={columns} actions={[]} title='Control Productos' />

       {/* CREAR CATEGORIA */}
      <ProductModal
        titulo='Crear producto'
        handleOnSubmit={handleCreateProduct}
        handleHide={handleCloseCreate}
        handleShow={showDefaultCreate}
        input={{

          id_producto:null,
      
          nombreName:'crear_nombre',
          nombreValue:crear_nombre, 
          nombrePlaceHolder:'Nombre del producto',

          codigoName:'crear_codigo',
          codigoValue:crear_codigo, 
          codigoPlaceHolder:'Codigo del producto',
          
          costoName:'crear_precio_costo',
          costoValue:crear_precio_costo, 
          costoPlaceHolder:'Costo',
          
          ventaName:'crear_precio_venta',
          ventaValue:crear_precio_venta, 
          ventaPlaceHolder:'Precio Venta',

          imagenUrl:crear_imagen,
          imagenUrlName:'crear_imagen',

          imagenFile:crear_file,
          imagenFileName:'crear_file',

          idCategoriaName:'crear_id_categoria',
          idCategoriaValue:crear_id_categoria, 
        }}
        handleOnChange={handleInputChangeCreateProduct}
        setManual={setManualCreate}
      />

      {/* EDITAR CATEGORIA */}
      <ProductModal
        titulo='Editar producto'
        handleOnSubmit={handleEditCategory}
        handleHide={handleCloseEdit}
        handleShow={showDefaultEdit}
        input={{
          
          id_producto:editar_id_producto,

          nombreName:'editar_nombre',
          nombreValue:editar_nombre, 
          nombrePlaceHolder:'Nombre del producto',

          codigoName:'editar_codigo',
          codigoValue:editar_codigo, 
          codigoPlaceHolder:'Codigo del producto',
          
          costoName:'editar_precio_costo',
          costoValue:editar_precio_costo, 
          costoPlaceHolder:'Costo',
          
          ventaName:'editar_precio_venta',
          ventaValue:editar_precio_venta, 
          ventaPlaceHolder:'Precio Venta',

          imagenUrl:editar_imagen,
          imagenUrlName:'editar_imagen',

          imagenFile:editar_file,
          imagenFileName:'editar_file',

          idCategoriaName:'editar_id_categoria',
          idCategoriaValue:editar_id_categoria, 
        }}
        handleOnChange={handleInputChangeEditProduct}
        setManual={setManualEdit}
      />
      
    </>
  )
}

export default Productos