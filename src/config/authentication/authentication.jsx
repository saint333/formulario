import { useCallback, useMemo, useState, createContext, useContext } from "react";
import PropTypes from "prop-types"
import { RUTA } from "../routes/paths";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [autenticado, setAutenticado] = useState(false);

    const peticion = useCallback( async (conf) => {
        let response = await fetch(`${RUTA}api/user/${conf}`)
        let data = await response.json()
        return data
    },[])

    const logins = useCallback(async function (id) {
        const verficacion = await peticion(id)
        return verficacion
    }, [peticion]);

    const entrar = useCallback(function (data) {
        setAutenticado(data);
    },[])

    const logout = useCallback(function () {
        setAutenticado(false);
    }, []);

    const value = useMemo(
        () => ({
            peticion,
            logins,
            logout,
            entrar,
            autenticado,
        }),
        [peticion,logins, logout, entrar, autenticado]
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