import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../config/authentication/authentication"
import { PRIVADO } from "../../../config/routes/paths";

function Logou() {
  const { logout, autenticado } = useAuthContext();
  const CerrarSesion = async() => {
    await fetch(
      `http://localhost:9000/api/user/sesion/${autenticado.dni}`,
      {
          method: "PUT",
          body: JSON.stringify({
              sesion: 0,
          }),
          headers : {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }
      }
  );
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