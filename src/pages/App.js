import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

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

export default () => (
  <Switch>
    
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* Paginas Cristian */}

    {/* Publicas */}
    <RouteWithLoader exact path={Routes.Login.path} component={Login} />
    
    {/* Privadas */}

    <RouteWithSidebar exact path={Routes.Main.path} component={Main} />
    <RouteWithSidebar exact path={Routes.AdminUsuarios.path} component={Usuarios} />
    <RouteWithSidebar exact path={Routes.AdminPermisos.path} component={Permisos} />
    <RouteWithSidebar exact path={Routes.PanelProductos.path} component={Productos} />
    <RouteWithSidebar exact path={Routes.PanelCategorias.path} component={Categorias} />
  e4edx
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
