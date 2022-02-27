import React from 'react'
import { Redirect } from 'react-router-dom'
import { Routes } from '../routes'

const PublicRoute = ({id_usuario,children}) => {
    return (!!id_usuario)
    ?<Redirect to={Routes.Login.path} />
    :children
  }

export default PublicRoute