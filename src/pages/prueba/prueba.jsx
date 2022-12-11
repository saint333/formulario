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
import { useEffect } from "react";
import { RUTA } from "../../config/routes/paths";

function Prueba() {
    const webcam = useRef();
    const [imagen, setImagen] = useState(null);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [alerta, setAlerta] = useState("d-none");
    const [botones, setBotones] = useState("d-none");
    const canvas = useRef();
    const image = useRef();
    const { entrar } = useAuthContext();
    const [imag, setImag] = useState("");
    const [msg, setMgs] = useState("Rostro no detectado");
    const [error, seterror] = useState({msg: "",clase: "d-none"})

    useEffect(() => {
        const imagenes = async () => {
            const response = await fetch(
                `${RUTA}api/user/upload`
            );
            const data = await response.json();

            setImag(data);
        };
        imagenes();
    }, []);

    let descriptor = [];
    const compararImagen = async (imagen, id_foto) => {
        const deteccion = await faceapi
            .detectSingleFace(imagen, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!descriptor.find((des) => des.id === id_foto)) {
            descriptor.push({
                id: id_foto,
                deteccion,
            });
        }
    };

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
        if (detecciones.length === 0) {
            setShow(false);
            setAlerta("d-block");

            setTimeout(() => {
                setAlerta("d-none");
            }, 2500);
        } else {
            let data = imag;
            data.body.forEach((imagen) => {
                const img = document.createElement("img");
                img.src = imagen.foto;
                // let id = imagen.idfotos_usuarios;
                let id = imagen.idfoto_usuario;
                img.crossOrigin = "anonymos";
                console.log(img);
                compararImagen(img, id);
            });
            let matche;
            let id_imagen
            setTimeout(() => {
                try {
                    matche = new faceapi.FaceMatcher(
                        descriptor.map((descripto) => {
                            return new faceapi.LabeledFaceDescriptors(
                                descripto.id.toString(),
                                [descripto.deteccion.descriptor]
                            );
                        })
                    );
                    const betsMatch = matche.findBestMatch(
                        detecciones[0].descriptor
                    );
                    id_imagen = betsMatch.label;
                    if (id_imagen > 0) {
                        setShow(false);
                        setAlerta("d-block");
                        setMgs("Usuario ya existe")
                        setTimeout(() => {
                            setAlerta("d-none");
                        }, 2500)
                    }else{
                        setBotones("d-flex");
                        setShow(true);
                    }
                    console.log(matche,id_imagen);
                } catch (e) {
                    console.log(e);
                    if (descriptor.length === 0) {
                        setShow(true);
                        setBotones("d-flex");
                    }else{
                    setShow(false);
                    setAlerta("d-block");
                    setTimeout(() => {
                        setAlerta("d-none");
                    }, 2500);}
                    console.log(descriptor);
                }
            }, 1000);
            // setBotones("d-flex");
            // setShow(true);
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
        let prueba = await fetch(`${RUTA}api/user/upload`, {
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

    // const [validated, setValidated] = useState(false);
    const [vertexto, setVertexto] = useState("Registrar datos");

    const handleSubmit = async (event) => {
        setVertexto("Registrando...");
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        const u = new FormData(event.target);
        const us = [...u.entries()];
        const datos = Object.fromEntries(us);
        const usuario = {
            dni: datos.dni,
            nombre: datos.nombres,
            sexo: datos.sexo === "hombre" ? 1 : 2,
            correo: datos.correo,
            telefono: datos.telefono,
            // empresa_ruc: "09876543215",
            // fotos_usuarios_idfotos_usuarios: imagen.id_foto,
            idfoto_usuario: imagen.id_foto,
            sesion_activa: 1,
            apellido: datos.apellidos,
        };
        event.preventDefault();
        let prueba = await fetch(`${RUTA}api/user/`, {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                Accept: "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json",
            },
        });
        let response = await prueba.json();
        if (response.estado) {
            seterror({msg: "",clase: "d-none"})
            setVertexto("Registrar Usuario");
            event.target.reset();
            entrar({
                sesion_activa: 1,
                correo: datos.correo,
                nombre: datos.nombres,
                dni: datos.dni
            });
        }else{
            setVertexto("Registrar");
            let mensaje = response.body.includes("correo_UNIQUE") ? "correo" : response.body.includes("dni_UNIQUE") ? "dni": response.body.includes("telefono_UNIQUE") ? "celular" : ""
            seterror({msg: mensaje, clase: 'unset'})
            console.log(response);
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
                    {msg}
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
                        // noValidate
                        // validated={validated}
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
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    name='nombres'
                                    minLength={"4"}
                                    pattern="[a-zA-ZÀ-ÖØ-öø-ÿ]+?(( | )[a-zA-ZÀ-ÖØ-öø-ÿ]+?)*"
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md='6'
                                controlId='validationCustom02'
                            >
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    name='apellidos'
                                    minLength={"4"}
                                    pattern="[a-zA-ZÀ-ÖØ-öø-ÿ]+?(( | )[a-zA-ZÀ-ÖØ-öø-ÿ]+?)*"
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
                                        title="El formato debe ser ejemplo@gmail.com"
                                        pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{3,5}"
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
                                <Form.Label>Celular</Form.Label>
                                <input
                                    className="form-control"
                                    type='text'
                                    required
                                    min={"1"}
                                    maxLength={"9"}
                                    pattern="[0-9]{9,9}"
                                    name='telefono'
                                    onInput={(e) => (e.target.value.length > e.target.maxLength ? (e.target.value = e.target.value.slice(0, e.target.maxLength)) : "")}
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
                                    type='text'
                                    required
                                    min={"1"}
                                    maxLength={"8"}
                                    pattern="[0-9]{8,8}"
                                    name='dni'
                                    onInput={(e) => (e.target.value.length > e.target.maxLength ? (e.target.value = e.target.value.slice(0, e.target.maxLength)) : "")}
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
                        <Col md='12' className='mt-3'>
                <Alert variant={"danger"} className={`text-center ${error.clase}`}>
                    Campo {error.msg} ya registrado.
                </Alert>
            </Col>
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
