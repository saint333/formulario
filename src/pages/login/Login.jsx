import "./login.css";
import Logo from "../../assets/IMG_LOGO_SAMISHOP2022.png";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import  Button  from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner"
import { useAuthContext } from "../../config/authentication/authentication";

function Login() {
    const [emailId, setEmailId] = useState("")
    const [passwordId, setPasswordId] = useState("")
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cargar, setCargar] = useState("d-none")
    const { login, entrar } = useAuthContext()
    
    const enviarData = (e) => {
        e.preventDefault()
        const respuesta = login(email, password)
        if (respuesta.email && respuesta.password) {
            setEmailId("is-valid")
            setPasswordId("is-valid")
            setCargar("mx-3")
            setTimeout(() => {
                setCargar("d-none")
                entrar()
            }, 2000);
        }
        if (respuesta.email === false && respuesta.password === false) {
            setEmailId("is-invalid")
            setPasswordId("is-invalid")
            setCargar("d-none")
        }
        if (respuesta.email === false && respuesta.password) {
            setEmailId("is-invalid")
            setPasswordId("is-valid")
            setCargar("d-none")
        }
        if (respuesta.email && respuesta.password === false) {
            setEmailId("is-valid")
            setPasswordId("is-invalid")
            setCargar("d-none")
        }
    }   

    return (
        <div className='card-container align-items-start align-items-md-center'>
            <Card className='rounded-0'>
                <Card.Body>
                    <Figure className='w-100 text-center mt-3'>
                        <Figure.Image
                            src={Logo}
                            alt='logo de samishop'
                            width={250}
                        />
                    </Figure>
                    <Form
                        noValidate
                        onSubmit={enviarData}
                    >
                        <Form.Group className='mb-3'>
                            <Form.Label className='small'>
                                Escriba su correo
                            </Form.Label>
                            <Form.Control
                                type='email'
                                name="email"
                                placeholder='Correo Electronico'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={emailId}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label className='small'>
                                Escriba su contraseña
                            </Form.Label>
                            <Form.Control
                                type='password'
                                name="password"
                                placeholder='Contraseña'
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={passwordId}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3 mt-4'>
                            <Button type="submit" variant="sami" className="w-100">Iniciar Sesión <Spinner animation="border" variant="light" size="sm" className={cargar}/></Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
