import { useCallback, useMemo, useState, createContext, useContext } from "react";
import PropTypes from "prop-types"

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [autenticado, setAutenticado] = useState(false);

    const peticion = useCallback( async (conf) => {
        let response = await fetch(`https://api-formularios.gnxcode.dev/api/user/${conf.id}`)
        let data = await response.json()
        return data
    },[])

    const login = useCallback(async function (email, password) {
        const verficacion = await peticion({email,password,id: 1})
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
            login,
            logout,
            entrar,
            autenticado,
        }),
        [peticion,login, logout, entrar, autenticado]
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