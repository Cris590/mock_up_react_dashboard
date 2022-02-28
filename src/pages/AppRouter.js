import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import { appRoutes } from "../appRoutes";

//Sahred Views
import NotFoundPage from "./shared_views/NotFound";
import ServerError from "./shared_views/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

//Pages Cristian
import Login from "./public_views/Login";
import Usuarios from "./private_views/Usuarios";
import Productos from "./private_views/Productos";
import Categorias from "./private_views/Categorias";
import Permisos from "./private_views/Permisos";
import Main from "./private_views/Main";
import { useDispatch } from "react-redux";
import { startChecking } from "../actions/auth";
import { useSelector } from "react-redux";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import ScrollToTop from "../components/ScrollToTop";




const RouteWithSidebar = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      <Preloader show={loaded ? false : true} />
      <Sidebar />

      <main className="content">
        <Navbar />
        <Routes>
   
          <Route exact path={appRoutes.Main.path} element={<Main/>} />
          <Route exact path={appRoutes.AdminUsuarios.path} element={<Usuarios/>} />
          <Route exact path={appRoutes.AdminPermisos.path} element={<Permisos/>} />
          <Route exact path={appRoutes.PanelProductos.path} element={<Productos/>} />
          <Route exact path={appRoutes.PanelCategorias.path} element={<Categorias/>} />
                 
        </Routes>
        <Footer
          toggleSettings={toggleSettings}
          showSettings={showSettings}
        />
      </main>
    </>
  )

}

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
        <>
          {" "}
          <Preloader show={loaded ? false : true} />
          <Routes>
            <Route exact path="/" element={<Login/>} />
          </Routes>
        </>
      )
  
};

export default () => {
  //Cada vez que cambie valida el token y lo renueva
  const dispatch = useDispatch();
  const { checking, id_usuario = "" } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <Preloader />;
  } else {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            exact
            path={appRoutes.NotFound.path}
            element={<NotFoundPage/>}
          />
          <Route
            exact
            path={appRoutes.ServerError.path}
            element={<ServerError/>}
          />

          {/* Private */}
            <Route path="/*" element={
              <PrivateRoute id_usuario={id_usuario}>
                {/* <Route exact path={appRoutes.Main.path} element={<RouteWithSidebar/>} /> */}
                <RouteWithSidebar/>
              </PrivateRoute> 
           }/>

           {/* Public */}
           <Route path={appRoutes.LoginInit.path} element={
              <PublicRoute id_usuario={id_usuario}>
                <RouteWithLoader/>
              </PublicRoute> 
           }/>

    
        </Routes>
      </BrowserRouter>
    );
  }
};
