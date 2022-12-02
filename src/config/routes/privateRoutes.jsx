import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../authentication/authentication"
import { HOME } from "./paths"

function RutasPrivadas() {
    const { autenticado } = useAuthContext()
    if (autenticado === false) {
        return <Navigate to={HOME} />
    }

    return (
        <div className="container-fluid">
            <Outlet />
        </div>
    )
}

export default RutasPrivadas