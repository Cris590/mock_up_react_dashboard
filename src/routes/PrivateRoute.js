import React from 'react'
import {Navigate} from 'react-router-dom'
import { appRoutes } from '../appRoutes'

const PrivateRoute = ({id_usuario,children}) => {
  return (!!id_usuario)
  ? children
  :<Navigate to={appRoutes.Login.path} />
}

export default PrivateRoute