import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./app/home/home";
import Logou from "./app/logout/logout";
import NavbarDefauld from "./components/navbar/navbar";
import AuthContextProvider from "./config/authentication/authentication";
import { HOME, LOGIN, LOGOUT, NOFOUND, PRIVADO, PRUEBA } from "./config/routes/paths";
import RutasPrivadas from "./config/routes/privateRoutes";
import RutasPublicas from "./config/routes/routespublic";
import NoFound from "./pages/404/nofound";
import HomeInicial from "./pages/home/home";
import Login from "./pages/login/Login";
import Prueba from "./pages/prueba/prueba";

function App() {
    return (
            <AuthContextProvider>
                <BrowserRouter>
                    <NavbarDefauld />
                    <Routes>
                        <Route path={HOME} element={<RutasPublicas />}>
                            <Route path={LOGIN} element={<Login />} />
                            <Route path={NOFOUND} element={<NoFound />} />
                            <Route path={PRUEBA} element={<Prueba />} />
                            <Route index element={<HomeInicial />} />
                        </Route>

                        <Route path={PRIVADO} element={<RutasPrivadas />}>
                            <Route path={PRIVADO} element={<Home />} />
                            <Route path={LOGOUT} element={<Logou />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                
            </AuthContextProvider>
    );
}

export default App;
