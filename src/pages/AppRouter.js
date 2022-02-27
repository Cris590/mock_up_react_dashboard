import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { Routes } from "../routes";

//Sahred Views
import NotFoundPage from "./shared_views/NotFound";
import ServerError from "./shared_views/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

//Pages Cristian
import Login from './public_views/Login';
import Usuarios from './private_views/Usuarios';
import Productos from './private_views/Productos';
import Categorias from './private_views/Categorias';
import Permisos from './private_views/Permisos';
import Main from './private_views/Main';
import { useDispatch } from 'react-redux';
import { startChecking } from '../actions/auth';
import { useSelector } from 'react-redux';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';



const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

export default () => {
    //Cada vez que cambie valida el token y lo renueva
    const dispatch = useDispatch();
    const {checking,id_usuario=''}=useSelector(state=>state.auth)
    useEffect(() => {
      dispatch(startChecking())
    },[dispatch]);

    console.log('checking',checking,id_usuario);

    if(checking) {
      return <Preloader/>
    }else{
      return (
      
        <Switch> 
           <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
           <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

           {/* Paginas Cristian */}

           {/* Public */}
           {/* <Route path={Routes.Login.path} element={
              <PublicRoute id_usuario={id_usuario}>
                <RouteWithLoader exact path={Routes.Login.path} component={Login} />
              </PublicRoute>
           }/> */}
          

          {/* <RouteWithLoader exact path={Routes.Login.path} component={Login} /> */}


          <PublicRoute id_usuario={id_usuario} >
            <RouteWithLoader exact path={Routes.Login.path} component={Login} />
          </PublicRoute>

          <PrivateRoute id_usuario={id_usuario}>
              <RouteWithSidebar exact path={Routes.Main.path} component={Main} />
              <RouteWithSidebar exact path={Routes.AdminUsuarios.path} component={Usuarios} />
              <RouteWithSidebar exact path={Routes.AdminPermisos.path} component={Permisos} />
              <RouteWithSidebar exact path={Routes.PanelProductos.path} component={Productos} />
              <RouteWithSidebar exact path={Routes.PanelCategorias.path} component={Categorias} />
            </PrivateRoute>


           
           {/* Private */}
           {/* <Route path={Routes.Main.path} element={
              <PrivateRoute id_usuario={id_usuario}>
                <RouteWithSidebar exact path={Routes.Main.path} component={Main} />
                <RouteWithSidebar exact path={Routes.AdminUsuarios.path} component={Usuarios} />
                <RouteWithSidebar exact path={Routes.AdminPermisos.path} component={Permisos} />
                <RouteWithSidebar exact path={Routes.PanelProductos.path} component={Productos} />
                <RouteWithSidebar exact path={Routes.PanelCategorias.path} component={Categorias} />
              </PrivateRoute>
           }/> */}

           <Redirect to={Routes.NotFound.path} />
         </Switch>
   )
    }
   
}
  
