import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import "./home.css"
import { AiOutlineFolder } from "react-icons/ai"
function Home() {
    return (
      <Row>
        <Col xs="12" md="3" className="px-4 border border-1 border-dark border-opacity-25">
          <Button className="w-100" variant="sami">CREAR FORMULARIO</Button>
        </Col>
        <Col xs="12" md="9" className="px-4 border border-1 border-dark border-opacity-25 border-top-0">
          <div className="d-flex">
            <div className="primer-grupo">
              <Button>
                <AiOutlineFolder />
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    )
}

export default Home;
