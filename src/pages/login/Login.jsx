import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../config/authentication/authentication";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { REGISTRO, RUTA } from "../../config/routes/paths";
import "./login.css"

function Login() {
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [captureVideo, setCaptureVideo] = useState(false);
    const [imag, setImag] = useState("");
    const { entrar, logins } = useAuthContext();
    const [cerrar, setCerrar] = useState({ estado: false, dni: "" });

    const videoRef = useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = useRef();

    const [alerta, setAlerta] = useState({
        class: "col-9 col-md-7 m-auto mt-3 d-none",
        msg: "",
    });

    useEffect(() => {
        const imagenes = async () => {
            const response = await fetch(`${RUTA}api/user/upload`);
            const data = await response.json();

            setImag(data);
        };
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + "/models";

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(setModelsLoaded(true));
        };
        imagenes();
        loadModels();
    }, []);

    const startVideo = () => {
        setAlerta({ class: "col-9 col-md-7 m-auto mt-3 d-none", msg: "" });
        setCerrar({ estado: false, dni: "" });
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error("error:", err);
            });
    };

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

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
                    videoRef.current
                );
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight,
                };

                faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await faceapi
                    .detectSingleFace(
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    .withFaceDescriptor();

                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                );

                canvasRef &&
                    canvasRef.current &&
                    canvasRef.current
                        .getContext("2d")
                        .clearRect(0, 0, videoWidth, videoHeight);
                canvasRef &&
                    canvasRef.current &&
                    faceapi.draw.drawDetections(
                        canvasRef.current,
                        resizedDetections
                    );
                canvasRef &&
                    canvasRef.current &&
                    faceapi.draw.drawFaceLandmarks(
                        canvasRef.current,
                        resizedDetections
                    );
                canvasRef &&
                    canvasRef.current &&
                    faceapi.draw.drawFaceExpressions(
                        canvasRef.current,
                        resizedDetections
                    );
                if (detections) {
                    let data = imag;
                    data.body.forEach((imagen) => {
                        const img = document.createElement("img");
                        img.src = imagen.foto;
                        // let id = imagen.idfotos_usuarios;
                        let id = imagen.idfoto_usuario;
                        img.crossOrigin = "anonymos";
                        compararImagen(img, id);
                    });
                    let matche;
                    if (data.body.length > 0) {
                        matche = new faceapi.FaceMatcher(
                            descriptor.map((descripto) => {
                                return new faceapi.LabeledFaceDescriptors(
                                    descripto.id.toString(),
                                    [descripto.deteccion.descriptor]
                                );
                            })
                        );
                    } else {
                        closeWebcam();
                        setAlerta({
                            class: "col-9 col-md-7 m-auto mt-3 text-center",
                            msg: `Usuario no registrado`,
                        });
                    }
                    const betsMatch = matche.findBestMatch(
                        detections.descriptor
                    );
                    let id_imagen = betsMatch.label;
                    if (id_imagen === "unknown") {
                        closeWebcam();
                        setAlerta({
                            class: "col-9 col-md-7 m-auto mt-3 text-center",
                            msg: `Usuario no registrado`,
                        });
                    }
                    let usuarios = await logins(id_imagen);
                    if (usuarios.body[0].sesion_activa === 1) {
                        closeWebcam();
                        setAlerta({
                            class: "col-9 col-md-7 m-auto mt-3 text-center",
                            msg: `El usuario ${usuarios.body[0].nombre} ya inicio sesión`,
                        });
                        setCerrar({ estado: true, dni: usuarios.body[0].dni });
                    }
                    let sesion = await fetch(
                        `${RUTA}api/user/sesion/${usuarios.body[0].dni}`,
                        {
                            method: "PUT",
                            body: JSON.stringify({
                                sesion: 1,
                            }),
                            headers: {
                                Accept: "*/*",
                                "User-Agent":
                                    "Thunder Client (https://www.thunderclient.com)",
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    closeWebcam();
                    let auth = await sesion.json();
                    entrar(auth.body[0]);
                } else {
                    console.log("encender");
                }
            }
        }, 1000);
    };

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    };

    const cerrarSesion = async () => {
        if (cerrar.estado) {
            let sesion = await fetch(`${RUTA}api/user/sesion/${cerrar.dni}`, {
                method: "PUT",
                body: JSON.stringify({
                    sesion: 0,
                }),
                headers: {
                    Accept: "*/*",
                    "User-Agent":
                        "Thunder Client (https://www.thunderclient.com)",
                    "Content-Type": "application/json",
                },
            });
            let auth = await sesion.json();
            setCerrar({ estado: false, dni: "" });
            setAlerta({
                class: "col-9 col-md-7 m-auto mt-3 text-center",
                msg: `El usuario ${auth.body[0].nombre} cerro sesión en todos los dispositivos`,
            });
        }
    };

    return (
        <div>
            <div style={{ textAlign: "center", padding: "10px" }}>
                {captureVideo && modelsLoaded ? (
                    <button onClick={closeWebcam} className='btn btn-sami'>
                        Cerrar camara
                    </button>
                ) : (
                    <button onClick={startVideo} className='btn btn-sami'>
                        Abrir camara
                    </button>
                )}
            </div>
            {captureVideo ? (
                modelsLoaded ? (
                    <div style={{
                        padding: "10px"
                    }}>
                        <div
                            style={{
                                position: "relative",
                                margin: "auto",
                                width: 'fit-content'
                            }}
                        >
                            <video
                                ref={videoRef}
                                height={videoHeight}
                                width={videoWidth}
                                onPlay={handleVideoOnPlay}
                                style={{
                                    borderRadius: "10px",
                                    maxWidth: "100%",
                                    height: "100%"
                                }}
                            />
                            <canvas
                                ref={canvasRef}
                                className="canvas-1"
                            />
                        </div>
                    </div>
                ) : (
                    <div>loading...</div>
                )
            ) : (
                <></>
            )}
            <Row>
                <Col className='col-9 col-md-7 m-auto mt-3 text-center'>
                    ¿No tienes una cuenta? <Link to={REGISTRO}>registrate</Link>
                </Col>
            </Row>
            <Alert variant={"danger"} className={alerta.class}>
                {alerta.msg}
            </Alert>

            <div className='text-center mt-3'>
                <button
                    onClick={() => cerrarSesion()}
                    className={
                        cerrar.estado
                            ? "btn btn-outline-danger d-block m-auto"
                            : "btn btn-outline-danger d-none m-auto"
                    }
                >
                    Cerrar sesion
                </button>
            </div>
        </div>
    );
}

export default Login;
