import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../authentication/authentication"
import { LOGIN } from "./paths"

function RutasPrivadas() {
    const { autenticado } = useAuthContext()
    if (!autenticado) {
        return <Navigate to={LOGIN} />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default RutasPrivadas