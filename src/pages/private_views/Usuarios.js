import React, { useEffect, useState }from 'react'

import DataTable from '../../components/DataTable';

const Usuarios = () => {

  
  const [state, setstate] = useState({
    file:'',
    hola:"hola",
    chao:"cao amigo",
    imagen:""
  });

  let {file,hola,chao,imagen} = state

  const handleOnChange = ({target}) => {
    setstate({
      ...state,
      [ target.name ]: target.value
    })
    
  }


  const handleOnSubmit=(e)=>{
    e.preventDefault();

    console.log('Esta es el form',file)

    const formData=new FormData();
    formData.append("archivo",file)
    formData.append("hola",hola)
    formData.append("chao",chao)

    fetch('http://localhost:3002/app/upload',{
      method: 'POST',
      body: formData,
      redirect: 'follow'
    })
    .then(response => response.json())
    .then(data => console.log(data));
    
  }

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      
      console.log('Esta es la imagen',file)
      setstate({
        file,
        imagen: URL.createObjectURL(file)
      });
    }
  };

 
  return (
    <>

    <img src={imagen} alt="imagen"/>

    <form onSubmit={handleOnSubmit}>
      <input type="file" name="file" onChange={onImageChange} />
      <input type="text" name="hola" value={hola} onChange={handleOnChange} />
      <input type="text" name="chao" value={chao} onChange={handleOnChange} />
      <button type="submit"> Enviar</button>
    </form>
     </>
  )
}

export default Usuarios
