import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import { useState } from "react";
import NuevoFormulario from "../pages/crear_formulario/nuevo_formulario";
import BaseFormulario from "../pages/base_formulario/base_formulario";
import {AiOutlinePlus} from "react-icons/ai"
import {GrTemplate} from "react-icons/gr"

function Tarjetas() {
  const [page, setPage] = useState("")

  const cambiarvista = tipo => {
    tipo === 1 
    ? setPage(<NuevoFormulario/>)
    : setPage(<BaseFormulario/>)
  }
    return (
      page === "" ?
      <Container>
      <Row className="justify-content-evenly opciones-card">
        <Col sm="4">
          <Card onClick={e=>cambiarvista(1)} className="bg-transparent text-center" style={{cursor: 'pointer'}}>
            <Card.Body>
              <Card.Text className="py-5 rounded-4 bg-card">
                <AiOutlinePlus style={{fontSize: '45px'}}/>
              </Card.Text>
            <Card.Title className="text-center my-5">Comenzar desde cero</Card.Title>
            <Card.Subtitle className="my-5">
              Una hoja en blanco es lo que necesitas
            </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="4" className="d-none">
        <Card onClick={e=>cambiarvista(2)} className="bg-transparent text-center" style={{cursor: 'pointer'}}>
            <Card.Body>
            <Card.Text className="py-5 rounded-4 bg-card">
                <GrTemplate style={{fontSize: '45px'}}/>
              </Card.Text>
            <Card.Title className="text-center my-5">Usar plantillas</Card.Title>
            <Card.Subtitle className="my-5">
              Elige una de los formularios prefabricados
            </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
      : page
    );
}

export default Tarjetas;
