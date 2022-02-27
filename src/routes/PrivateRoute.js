import React from 'react'
import {Redirect} from 'react-router-dom'
import { Routes } from '../routes'

const PrivateRoute = ({id_usuario,children}) => {
  return (!!id_usuario)
  ? children
  :<Redirect to={Routes.Login.path} />
}

export default PrivateRoute