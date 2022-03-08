import React from 'react'
import MaterialTable from "material-table";

const DataTable = ({columns,data,title,actions} ) => {

  return (
    <>

    <MaterialTable 
      columns={columns}
      data={data}
      title={title}
      actions={actions}

      options={{
        actionsColumnIndex:-1
      }}
      localization={{
        header:{
          actions:'Acciones'
        },
        toolbar:{
          searchTooltip:'Busqueda',
          searchPlaceholder:'Busqueda'
        },
        pagination:{
          nextTooltip:'Siguiente',
          lastTooltip:'Ultima pagina',
          previousTooltip:'Anterior',
          firstTooltip:'Primera Página',
          labelRowsSelect:'Filas'
        }
      }}
    />
    </>
  )
}

export default DataTable
