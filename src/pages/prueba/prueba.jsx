import { useRef } from "react";
import Webcam from "react-webcam";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import Modal from "react-bootstrap/Modal";
import "./registro.css";
import * as faceapi from "face-api.js";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useAuthContext } from "../../config/authentication/authentication";

function Prueba() {
    const webcam = useRef();
    const [imagen, setImagen] = useState(null);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [alerta, setAlerta] = useState("d-none");
    const [botones, setBotones] = useState("d-none");
    const canvas = useRef();
    const image = useRef();
    const { entrar } = useAuthContext()

    const handleClose = () => {
        setShow(false);
        setBotones("d-none");
    };

    const handleClose2 = () => setShow2(false);

    const handleImage = async () => {
        const detecciones = await faceapi
            .detectAllFaces(
                image.current,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptors()
            .withFaceExpressions();

        canvas.current.innerHtml = faceapi.createCanvasFromMedia(image.current);
        faceapi.matchDimensions(canvas.current, {
            width: 500,
            height: 574,
        });
        const resized = faceapi.resizeResults(detecciones, {
            width: 500,
            height: 574,
        });
        faceapi.draw.drawDetections(canvas.current, resized);
        faceapi.draw.drawFaceLandmarks(canvas.current, resized);
        faceapi.draw.drawFaceExpressions(canvas.current, resized);
        console.log(image.current);
        console.log(detecciones.length);
        if (detecciones.length === 0) {
            setShow(false);
            setAlerta("d-block");
            setTimeout(() => {
                setAlerta("d-none");
            }, 2500);
        } else {
            setShow(true);
            setBotones("d-flex");
        }
    };
    async function captura() {
        setShow(true);
        const modelos = () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            ])
                .then(handleImage)
                .catch((e) => console.log(e));
        };
        modelos();
        setImagen(webcam.current.getScreenshot());
    }

    const guardarFoto = async () => {
        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(",")[0].indexOf("base64") >= 0)
                byteString = atob(dataURI.split(",")[1]);
            else byteString = unescape(dataURI.split(",")[1]);

            // separate out the mime component
            var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], { type: mimeString });
        }
        var blob = dataURItoBlob(imagen);
        let parseoImg = new File([blob], `foto.png`, { type: "image/jpeg" });
        var payload = new FormData();
        payload.append("file", parseoImg);
        // https://api-formularios.gnxcode.dev/api/user/upload
        let prueba = await fetch("http://localhost:9000/api/user/upload", {
            method: "POST",
            body: payload,
        });
        let url_foto = await prueba.json();
        setShow(false);
        setImagen({
            url: url_foto.body.url,
            id_foto: url_foto.body.info.insertId,
        });
        setShow2(true);
    };

    const [validated, setValidated] = useState(false);
    const [vertexto, setVertexto] = useState("Registrar datos")

    const handleSubmit = async (event) => {
        setVertexto("Registrando...")
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        const u = new FormData(event.target);
        const us = [...u.entries()];
        const datos = Object.fromEntries(us)
        const usuario = {
            dni: datos.dni,
            nombre: datos.nombres,
            sexo: datos.sexo === "hombre" ? 1 : 2,
            correo: datos.correo,
            telefono: datos.telefono,
            empresa_ruc: "09876543215",
            fotos_usuarios_idfotos_usuarios: imagen.id_foto,
            sesion_activa: 1,
            apellido: datos.apellidos,
        };
        event.preventDefault();
        let prueba = await fetch("http://localhost:9000/api/user/", {
            method: "POST",
            body: JSON.stringify(usuario),
            headers : {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
               }
        });
        let response = await prueba.json();
        console.log(event);
        if (response.estado) {
            setValidated(true);
            setTimeout(() => {
                setVertexto("Registrar Usuario")
                event.target.reset()
                entrar({sesion: 1, correo: datos.correo})
            }, 2000);
        }
    };

    return (
        <Container className='text-center mt-4'>
            <Webcam
                ref={webcam}
                className='col-md-9 col-xl-6'
                width={"100%"}
                audio={false}
                screenshotFormat='image/jpeg'
            />
            <Col md='12'>
                <Button variant='sami' onClick={captura}>
                    Guardar Foto
                </Button>
            </Col>

            <Col md='12' className='mt-3'>
                <Alert variant={"danger"} className={alerta}>
                    Rostro no detectado
                </Alert>
            </Col>

            <Modal
                size='lg'
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Vista previa de imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col md='12'>
                        <div className='position-relative'>
                            <Image
                                src={imagen}
                                className='w-100'
                                ref={image}
                                crossOrigin='anonymous'
                            />
                            <canvas
                                ref={canvas}
                                className='w-100 h-100 card-img-overlay'
                            ></canvas>
                        </div>
                    </Col>
                </Modal.Body>
                <Modal.Footer className={botones}>
                    <Button variant='danger' onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant='sami' onClick={guardarFoto}>
                        Guardar Imagen
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                size='lg'
                show={show2}
                onHide={handleClose2}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Registro de Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col md='12' className='text-center'>
                        <Image
                            src={imagen ? imagen.url : ""}
                            className='foto-usuario'
                        />
                    </Col>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                        className='mt-4'
                    >
                        <Row className='mb-3'>
                            <Form.Group
                                as={Col}
                                md='6'
                                controlId='validationCustom01'
                                className='mb-3'
                            >
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    name='nombres'
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md='6'
                                controlId='validationCustom02'
                            >
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    name='apellidos'
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md='12'
                                controlId='validationCustomUsername'
                            >
                                <Form.Label>Correo Electronico</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id='inputGroupPrepend'>
                                        @
                                    </InputGroup.Text>
                                    <Form.Control
                                        type='email'
                                        aria-describedby='inputGroupPrepend'
                                        required
                                        name='correo'
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Ingrese un correo valido
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                            <Form.Group
                                as={Col}
                                md='6'
                                controlId='validationCustom03'
                            >
                                <Form.Label>Télefono</Form.Label>
                                <Form.Control
                                    type='number'
                                    required
                                    maxLength={"9"}
                                    minLength={"9"}
                                    name='telefono'
                                />
                                <Form.Control.Feedback type='invalid'>
                                    El nuemero tiene que tener 9 digitos
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md='6'
                                controlId='validationCustom04'
                            >
                                <Form.Label>DNI:</Form.Label>
                                <Form.Control
                                    type='number'
                                    required
                                    maxLength={"8"}
                                    minLength={"8"}
                                    name='dni'
                                />
                                <Form.Control.Feedback type='invalid'>
                                    El numero tiene que tener 8 digitos
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Check
                            type='radio'
                            label='Hombre'
                            name='sexo'
                            id='formHorizontalRadios1'
                            defaultChecked
                            defaultValue={"hombre"}
                        />
                        <Form.Check
                            type='radio'
                            label='Mujer'
                            name='sexo'
                            id='formHorizontalRadios2'
                            defaultValue={"mujer"}
                        />
                        <Button
                            type='submit'
                            variant='sami'
                            className='d-flex m-auto'
                        >
                            {vertexto}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Prueba;
