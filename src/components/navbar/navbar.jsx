import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { HOME, LOGIN, LOGOUT, PRIVADO, SAMI } from "../../config/routes/paths";
import Figure from "react-bootstrap/Figure";
import Logo from "../../assets/IMG_LOGO_SAMISHOP2022.png";
import "./navbar.css"
import { useAuthContext } from "../../config/authentication/authentication";

function NavbarDefauld() {
    const { autenticado } = useAuthContext()
    return (
        <Navbar bg='light' variant='light' expand='md'>
            <Container>
                <Navbar.Brand>
                    <NavLink to={autenticado ? PRIVADO : LOGIN} end>
                        <Figure>
                            <Figure.Image
                                src={Logo}
                                alt='logo de samishop'
                                width={200}
                                className='mt-3'
                            />
                        </Figure>
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-end">
                    {autenticado ? <Nav className='m-auto'>
                        <a
                            className='nav-link'
                            target='_blank'
                            rel="noreferrer"
                            href={SAMI}
                        >
                            SamiShop
                        </a>
                        <NavLink end to={PRIVADO} className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            Crear Formularios
                        </NavLink>
                    </Nav> : ""}
                    <Nav>
                        <NavLink end to={autenticado ? LOGOUT : LOGIN} className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            { autenticado ? autenticado.nombre.split(" ")[0] : "Iniciar sesión"}
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarDefauld;
