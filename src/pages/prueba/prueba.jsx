import { useRef } from "react";
import Webcam from "react-webcam";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import Modal from "react-bootstrap/Modal";
import * as faceapi from "face-api.js";
// import imagenp  from "../../assets/bebe-63838.jpg";

function Prueba() {
    const webcam = useRef();
    const [imagen, setImagen] = useState(null);
    const [show, setShow] = useState(false);
    const canvas = useRef();
    const image = useRef();

    const handleClose = () => setShow(false);

    const handleImage = async () => {
        const detecciones = await faceapi
            .detectAllFaces(
                image.current,
                new faceapi.TinyFaceDetectorOptions()
            ).withFaceLandmarks().withFaceDescriptors()
            .withFaceExpressions()
        
        canvas.current.innerHtml = faceapi.createCanvasFromMedia(image.current)
        faceapi.matchDimensions(canvas.current, {
            width: 500,
            height: 574
        })
        const resized = faceapi.resizeResults(detecciones,{
            width: 500,
            height: 574
        })
        faceapi.draw.drawDetections(canvas.current, resized)
        faceapi.draw.drawFaceLandmarks(canvas.current, resized)
        faceapi.draw.drawFaceExpressions(canvas.current,resized)
        console.log(image.current);
        console.log(detecciones);
    };

    const captura = async () => {
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
        modelos()
        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);
        
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        
            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
        
            return new Blob([ia], { type: mimeString });
        }
        var blob = dataURItoBlob(webcam.current.getScreenshot());
        let parseoImg = new File([blob],`foto.png`,{type: "image/jpeg"})
        var payload = new FormData();
        payload.append('file', parseoImg);
        let foto = webcam.current.getScreenshot();
        let prueba = await fetch("http://localhost:9000/api/user/upload",{
            method: "POST",
            body: payload
        })
        console.log(prueba);
        setImagen({
            url: foto
        });
        setShow(true);
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
                    Subir Foto
                </Button>
            </Col>

            <Modal
                size='lg'
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Registro de Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col md='12'>
                        <div  className="position-relative">
                        <Image src={imagen ? imagen.url : ""} className='w-100' ref={image} crossOrigin="anonymous"/>
                        <canvas ref={canvas} className="w-100 h-100 card-img-overlay"></canvas>
                        </div>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant='sami'>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Prueba;
