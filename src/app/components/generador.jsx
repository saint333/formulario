import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { RiInputCursorMove } from "react-icons/ri";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import {FaUserCircle, FaUser, FaCheckSquare} from "react-icons/fa"
import { IoTextOutline} from "react-icons/io5";
import { MdOutlineShortText, MdRadioButtonChecked, MdOutlineAlternateEmail} from "react-icons/md";
import { GrTextAlignFull, GrCheckboxSelected } from "react-icons/gr";
import { TiSortNumerically } from "react-icons/ti";
import { BsPhone, BsTelephone,BsCalendarDate, BsFillMenuButtonWideFill, BsCodeSlash } from "react-icons/bs";
import { BiTime } from "react-icons/bi";

const esquema = [
    {
        tipo: "nombre",
        type: "text",
        input: `<label><span>Escribe tu nombre</span><input type="text" name="Nombre" placeholder="escribe tu nombre" pattern='[a-zA-ZÀ-ÖØ-öø-ÿ]+ ?(( | )[a-zA-ZÀ-ÖØ-öø-ÿ]+ ?)*'></label>`
    },
    {
        tipo: "apellido",
        type: "text",
        input:`<label><span>Escribe tu apellido</span><input type="text" name="Apellido" placeholder="escribe tu apellido" pattern='[a-zA-ZÀ-ÖØ-öø-ÿ]+ ?(( | )[a-zA-ZÀ-ÖØ-öø-ÿ]+ ?)*'/></label>`
    },
    {
        tipo: "texto",
        type: "",
        input: '<label><span>Agregar texto</span></label>'
    },
    {
        tipo: "respuesta corta",
        type: "corta",
        input: '<label><span>Mensaje corto</span><input type="text" name="Mensaje corto" placeholder="escribe tu respuesta corta" /></label>'
    },
    {
        tipo: "respuesta larga",
        type: "textarea",
        input: '<label><span>Mensaje largo</span><textarea cols="80" rows="5" name="Mensaje largo" placeholder="escribe tu respuesta larga"></textarea></label>'
    },
    {
        tipo: "numero",
        type: "number",
        input: '<label><span>Agregue una cantidad</span><input type="number" placeholder="Digite un número" min="1" maxlength="9" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength) ;"/></label>'
    },
    {
        tipo: "celular",
        type: "number",
        input: '<label><span>Celular</span><input type="number" name="Celular" placeholder="Digite su numero celular" min="1" maxlength="9" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength) ;"/></label>'
    },
    {
        tipo: "telefono",
        type: "tel",
        input: '<label><span>Telefono</span><input type="tel" placeholder="Digite su numero telefonico" min="1" maxlength="9" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength) ;"/></label>'
    },
    {
        tipo: "radio",
        type: "radio",
        input:  `<div class="terminos"><span>Elige una opción</span>
                    <label><input type="radio" name="radio-${Date.now()} value="opcion 1" /><span>opcion 1</span></label>
                    <label><input type="radio" name="radio-${Date.now()} value="opcion 2" /><span>opcion 2</span></label>
                    <label><input type="radio" name="radio-${Date.now()} value="opcion 3" /><span>opcion 3</span></label>
                </div>`
    },
    {
        tipo: "check",
        type: "checkbox",
        input:  `<div class="terminos"><span>Elige una opción</span>
                    <label><input name="check-${Date.now()}" type="checkbox" value="opcion 1" oninput="verificarMarcado()"/><span>opcion 1</span></label>
                    <label><input name="check-${Date.now()}" type="checkbox" value="opcion 2" oninput="verificarMarcado()"/><span>opcion 2</span></label>
                    <label><input name="check-${Date.now()}" type="checkbox" value="opcion 3" oninput="verificarMarcado()"/><span>opcion 3</span></label>
                </div>`
    },
    {
        tipo: "terminos",
        type: "checkbox",
        input:  `<div class="terminos"><span>Terminos y condiciones</span>
                    <label><input type="checkbox" name="Terminos" id="termi-${Date.now()}" value="si" required/><span>opcion 1</span></label>
                </div>`
    },
    {
        tipo: "correo",
        type: "email",
        input: `<label><span>Correo electronico</span><input name="Correo" type="email" placeholder="Ingrese su correo electronico" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}"/></label>`
    },
    {
        tipo: "fecha",
        type: "date",
        input: `<label><span>Eliga la fecha</span><input name="Fecha" type="date" /></label>`
    },
    {
        tipo: "hora",
        type: "time",
        input: `<label><span>Eliga la hora</span><input name="Hora" type="time" /></label>`
    },
    {
        tipo: "lista",
        type: "select",
        input:  `<div class="terminos"><span>Selecciona una opción</span>
                    <select name="Selecciona una opción">
                        <option value="opcion 1">opcion 1</option>
                        <option value="opcion 2">opcion 2</option>
                        <option value="opcion 3">opcion 3</option>
                    </select>
                </div>`
    },
    {
        tipo: "archivos",
        type: "file",
        input:' <label><span>Eliga los archivos</span><input name="Archivo" type="file" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></label>'
    },
    {
        tipo: "imagenes",
        type: "file",
        input: '<label><span>Eliga los imagenes</span><input name="Imagen" type="file" accept="image/*" /></label>'
    },
    {
        tipo: "html",
        type: "html",
        input: '<div class=html>Insertar html</div>'
    },
]

export default function Generador(props) {
    const {items} = props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const armar = (valor) => {
        const data = esquema.find(element => element.tipo === valor)
        items(data)
    }
    return (
        <>
            <Button
                variant='primary'
                className='diseno_formulario-input d-grid justify-content-center align-items-center'
                onClick={handleShow}
            >
                <RiInputCursorMove />
            </Button>
            <Offcanvas
                show={show}
                onHide={handleClose}
                {...{ scroll: true, backdrop: false }}
                placement={"end"}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Agregar Campos</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Accordion defaultActiveKey='0'>
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>Tipo texto</Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("nombre")}><FaUserCircle />Nombre</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("apellido")}><FaUser />Apellido</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("texto")}><IoTextOutline />Agregar texto</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("respuesta corta")}><MdOutlineShortText />Respuesta corta</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("respuesta larga")}><GrTextAlignFull />Respuesta larga</Button>
                                {/* <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("nombre")}><FaMapMarkerAlt />Dirección</Button> */}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1'>
                            <Accordion.Header>
                                Tipo numero
                            </Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3 d-none" onClick={()=>armar("numero")}><TiSortNumerically />Agregar campo numero</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("celular")}><BsPhone />Celular</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3 d-none" onClick={()=>armar("telefono")}><BsTelephone />Telefono</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='2'>
                            <Accordion.Header>
                                Tipo radio
                            </Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("radio")}><MdRadioButtonChecked />Opción unica</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='3'>
                            <Accordion.Header>
                                Tipo checkbox
                            </Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("check")}><GrCheckboxSelected />Multiples opciones</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("terminos")}><FaCheckSquare />Terminos y Condiciones</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='4'>
                            <Accordion.Header>
                                Tipo correo
                            </Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("correo")}><MdOutlineAlternateEmail />Correo electronico</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='5'>
                            <Accordion.Header>
                                Tipo fecha y hora
                            </Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("fecha")}><BsCalendarDate />Fecha</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("hora")}><BiTime />Hora</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='6'>
                            <Accordion.Header>
                                Tipo desplegable
                            </Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("lista")}><BsFillMenuButtonWideFill />Select</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                        {/* <Accordion.Item eventKey='7'>
                            <Accordion.Header>
                                Tipo archivo
                            </Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("archivos")}><MdOutlineDriveFolderUpload />Subir archivos</Button>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("imagenes")}><MdOutlineImage />Subir imagenes</Button> 
                            </Accordion.Body>
                        </Accordion.Item> */}
                        <Accordion.Item eventKey='8'>
                            <Accordion.Header>
                                Tipo html
                            </Accordion.Header>
                            <Accordion.Body>
                                <Button variant="light" className="mb-3 w-100 d-flex align-items-center gap-3" onClick={()=>armar("html")}><BsCodeSlash />Insertar html</Button> 
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
