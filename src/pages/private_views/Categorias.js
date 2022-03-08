import React, { useEffect, useState } from 'react'
import { Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import DataTable from '../../components/DataTable';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import settings from '../../setting';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import CategoryModal from '../modals/CategoryModal';

const Categorias = () => {

  useEffect(() => {
    chargeCategorias()
  }, [])


  const [categorias, setcategorias] = useState([]);
  const columns=[
    {
      title:'ID',
      field:'id_categoria'
    },
    {
      title:'Nombre',
      field:'nombre'
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
  const [ formValuesCreate, handleInputChangeCreateCategorie ]=useForm({
    crear_nombre:''
  })

  const [ formValuesEdit, handleInputChangeEditCategory , ,setManualEdit]=useForm({
    editar_nombre:'',
    editar_id_categoria:'',
  })
  let {editar_nombre , editar_id_categoria}=formValuesEdit;

 

 
  const chargeCategorias = async ()=>{

    try {

      const resp= await fetchSinToken(settings.categories);
      const {categorias:respuesta}=await resp.json()    
      let categorias_aux=respuesta.map(({nombre,activo,id_categoria}) =>{
        let button_state=buttonState(activo,id_categoria);
        let actions_categories = actionsCategories(id_categoria,nombre)
        return  {
          id_categoria,
          nombre,
          activo:button_state,
          acciones:actions_categories
        }
      })

      setcategorias(categorias_aux)
    
    } catch (error) {
      console.log('Error',error)
    }
  }

  const buttonState=(activo,id_categoria)=>{
    return (
      (activo===1) 
      ? <Button variant="tertiary" id_categoria={id_categoria}  size="sm" onClick={handleChangeStateCategorie}>Activo</Button>
      : <Button variant="danger" id_categoria={id_categoria} size="sm" onClick={handleChangeStateCategorie}>InActivo</Button>
    )
  }

  const actionsCategories =(id_categoria,nombre)=>{
    return (
      
      <div>
          <button className="btn btn-button-no-style" id_categoria={id_categoria} nombre={nombre} onClick={()=> openModalEditCategory(id_categoria,nombre)}>
            <FontAwesomeIcon icon={faPencilAlt}  />
          </button>
      </div>
    )
  }

  

  const handleChangeStateCategorie=async (event) => {
    event.preventDefault();
    let id_categoria=event.target.getAttribute("id_categoria");
    let url_req=`${settings.categories}/${id_categoria}`
    let method='DELETE'
    await fetchRquest(url_req,{},method)

  }

  //CREAR CATEGORIA
  const {crear_nombre}=formValuesCreate;

  const handleCreateCategory=async (event) => {
    event.preventDefault();
    let data={
      nombre:crear_nombre
    }
    let url_req=settings.categories;
    let method='POST'

    await fetchRquest(url_req,data,method)

  } 

  // EDITAR CATEGORIA
  const [showDefaultEdit, setShowDefaultEdit] = useState(false);
  const handleCloseEdit = () => setShowDefaultEdit(false);

  const openModalEditCategory=(id_categoria,nombre) => {
    setShowDefaultEdit(true);
    setManualEdit({
      'editar_nombre':nombre,
      'editar_id_categoria':id_categoria
    }) 
  }

  const  handleEditCategory= async (event) => {
    event.preventDefault();
    let data={nombre:editar_nombre}
    let url_req=`${settings.categories}/${editar_id_categoria}`
    let method='PUT'
    await fetchRquest(url_req,data,method)
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

      }else{
        setShowDefaultCreate(false)
        Swal.fire({
          icon: 'success',
          title: 'Perfecto !!!  ',
          text: body.msg,
        })
        chargeCategorias();
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
          Crear Categoría
        </Button>
      </div>
      <DataTable data={categorias} columns={columns} actions={''} title='Control Categorias' />

       {/* CREAR CATEGORIA */}
      <CategoryModal
        titulo='Crear Categoria'
        handleOnSubmit={handleCreateCategory}
        handleHide={handleCloseCreate}
        handleShow={showDefaultCreate}
        input={{
          nameInput:'crear_nombre',
          valueInput:crear_nombre,
          placeholderInput:'nuevo nombre categoria'
        }}
        handleOnChange={handleInputChangeCreateCategorie}
      />

      {/* EDITAR CATEGORIA */}

      <CategoryModal
        titulo='Editar Categoria'
        handleOnSubmit={handleEditCategory}
        handleHide={handleCloseEdit}
        handleShow={showDefaultEdit}
        input={{
          nameInput:'editar_nombre',
          valueInput:editar_nombre,
          placeholderInput:'editar nombre categoria'
        }}
        handleOnChange={handleInputChangeEditCategory}
      />
    </>
  )

}

export default Categorias