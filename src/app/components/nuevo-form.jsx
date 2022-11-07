import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { EDITAR_CON_BASE, EDITAR_SIN_BASE } from "../../config/routes/paths";
import Col from "react-bootstrap/esm/Col";

function Tarjetas() {
    return <main className="tarjetas">
      <Container>
        
        <Row className="gap-5 gap-lg-0 justify-content-between">
          <Col lg="5" className="text-center">
            <Link to={EDITAR_SIN_BASE} className="card-nuevo">
              <Card>
                <Card.Body>
                  Crear un formulario desde cero
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg="5" className="text-center">
            <Link to={EDITAR_CON_BASE} className="card-nuevo">
              <Card>
                <Card.Body>
                  Crear un formulario desde una plantilla
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </main>;
}

export default Tarjetas;
