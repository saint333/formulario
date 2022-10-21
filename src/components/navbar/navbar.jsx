import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { HOME, LOGIN, PRIVADO, PRUEBA, SAMI } from "../../config/routes/paths";
import Figure from "react-bootstrap/Figure";
import Logo from "../../assets/IMG_LOGO_SAMISHOP2022.png";
import "./navbar.css"

function NavbarDefauld() {
    return (
        <Navbar bg='light' variant='light' expand='md'>
            <Container>
                <Navbar.Brand>
                    <NavLink to={HOME}>
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
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='m-auto'>
                        <NavLink exact="true" to={PRUEBA} className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            Prueba
                        </NavLink>

                        <a
                            className='nav-link'
                            target='_blank'
                            rel="noreferrer"
                            href={SAMI}
                        >
                            SamiShop
                        </a>
                        <NavLink exact="true" to={PRIVADO} className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            App
                        </NavLink>
                    </Nav>
                    <Nav>
                        <NavLink exact="true" to={LOGIN} className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            Iniciar Sesión
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarDefauld;
