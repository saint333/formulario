import { Link } from "react-router-dom"
import { LOGOUT } from "../../config/routes/paths"

function Home(){
    return (
        <main className="d-flex justify-content-center flex-column align-items-center my-5">
      <h4 className="my-3">Dentro de la aplicacion</h4>
      <Link to={LOGOUT} className="btn btn-outline-success">Cerrar sesión</Link>
    </main>
    )
}

export default Home