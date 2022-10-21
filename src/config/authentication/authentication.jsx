import { useCallback, useMemo, useState, createContext, useContext } from "react";
import PropTypes from "prop-types"

const LOGEADO = "Logeado"

const MY_AUTH_APP = {
    email: "david@gmail.com",
    contrasena: "hola"
};

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [autenticado, setAutenticado] = useState(
        window.localStorage.getItem(LOGEADO) ?? false
    );

    const login = useCallback(function (email, password) {
        const verficacion = {
            email: false,
            password: false
        }
        if (email === MY_AUTH_APP.email) {
            verficacion.email = true
        }
        if (password === MY_AUTH_APP.contrasena) {
            verficacion.password = true
        }
        return verficacion
    }, []);

    const entrar = useCallback(function () {
        window.localStorage.setItem(LOGEADO, true);
        setAutenticado(true);
    },[])

    const logout = useCallback(function () {
        window.localStorage.removeItem(LOGEADO);
        setAutenticado(false);
    }, []);

    const value = useMemo(
        () => ({
            login,
            logout,
            entrar,
            autenticado,
        }),
        [login, logout, entrar, autenticado]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;

AuthContextProvider.propType = {
    children: PropTypes.object
}

export function useAuthContext() {
    return useContext(AuthContext)
}