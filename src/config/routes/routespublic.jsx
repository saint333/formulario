import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../authentication/authentication"
import { PRIVADO } from "./paths"

function RutasPublicas() {
    const { autenticado } = useAuthContext()
    if (autenticado.sesion) {
        return <Navigate to={PRIVADO} />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default RutasPublicas