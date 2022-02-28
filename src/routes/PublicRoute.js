import React from 'react'
import { Navigate } from 'react-router-dom'
import { appRoutes } from '../appRoutes'

const PublicRoute = ({id_usuario,children}) => {
  return (!!id_usuario)
  ?<Navigate to={appRoutes.Main.path} />
  :children
}


export default PublicRoute