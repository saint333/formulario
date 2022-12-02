import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./app/pages/home/home";
import Logou from "./app/components/logout/logout";
import NavbarDefauld from "./components/navbar/navbar";
import AuthContextProvider from "./config/authentication/authentication";
import { EDITAR_CON_BASE, EDITAR_SIN_BASE, HOME, LOGOUT, NOFOUND, PRIVADO, REGISTRO } from "./config/routes/paths";
import RutasPrivadas from "./config/routes/privateRoutes";
import RutasPublicas from "./config/routes/routespublic";
import NoFound from "./pages/404/nofound";
import Login from "./pages/login/Login";
import Prueba from "./pages/prueba/prueba";
import NuevoFormulario from "./app/pages/crear_formulario/nuevo_formulario";
import BaseFormulario from "./app/pages/base_formulario/base_formulario";
import Registrosformularios from "./app/components/registrosformularios";

function App() {
    return (
            <AuthContextProvider>
                <BrowserRouter>
                    <NavbarDefauld />
                    <Routes>
                        <Route path={HOME} element={<RutasPublicas />}>
                            <Route path={HOME} element={<Login />} />
                            <Route path={NOFOUND} element={<NoFound />} />
                            <Route path={REGISTRO} element={<Prueba />} />
                        </Route>

                        <Route path={PRIVADO} element={<RutasPrivadas />}>
                            <Route path={PRIVADO} element={<Home />} />
                            <Route path={LOGOUT} element={<Logou />} />
                            <Route path={EDITAR_SIN_BASE} element={<NuevoFormulario />} />
                            <Route path={EDITAR_CON_BASE} element={<BaseFormulario />} />
                            <Route path="app/home/registros/:id" element={<Registrosformularios />}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                
            </AuthContextProvider>
    );
}

export default App;
