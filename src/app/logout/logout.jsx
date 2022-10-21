import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../config/authentication/authentication"
import { PRIVADO } from "../../config/routes/paths";

function Logou() {
  const { logout } = useAuthContext();
  const CerrarSesion = () => {
    logout()
  }
  return (
    <main className="d-flex justify-content-center flex-column align-items-center my-5">
      <h4 className="my-3">¿Quieres cerrar sesión?</h4>
      <div className="d-flex gap-4 flex-wrap">
      <Button variant="sami" onClick={CerrarSesion}>Si</Button>
      <Link to={PRIVADO} className="btn btn-danger">NO</Link>
      </div>
    </main>
  )
}

export default Logou