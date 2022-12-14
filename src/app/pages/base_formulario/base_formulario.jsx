import { useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RiPaintBrushLine } from "react-icons/ri";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Editor from "@monaco-editor/react";
import Generador from "../../components/generador";
import { FiEdit } from "react-icons/fi";
import Diseno from "../../components/disign";
import { useAuthContext } from "../../../config/authentication/authentication";
import Formulario from "../../config/Formulario";
import { RUTA } from "../../../config/routes/paths";
import { useEffect } from "react";

function BaseFormulario(params) {
    const [forms, setforms] = useState(null)
    useEffect(() => {
        const llamar = async () => {
            const response = await fetch(`${RUTA}api/forms/obtener/${params.idform.idformularios}`);
            const objeto = await response.json();
            setforms(objeto.body[0])
        }
        llamar()
    }, [params])
    return (
        <>
        {forms === null ? "" : <VerFormulario formEditar={forms}/>}
        </>
    )
}

function VerFormulario({formEditar}) {
    const [diseno_forms] = JSON.parse(formEditar.diseno_general)
    const { autenticado } = useAuthContext();
    const contenido = useRef();
    const formulario = useRef();
    const [tiutlo, setTitulo] = useState(diseno_forms.titulo.texto);
    const [tiutlo1, setTitulo1] = useState(diseno_forms.subtitulo.texto);
    const titulo = useRef();
    const titulo1 = useRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [background, setBackground] = useState(diseno_forms.formulario.fondo);
    const [color, setColor] = useState(diseno_forms.formulario.texto);
    const [ancho, setAncho] = useState(diseno_forms.formulario.ancho);
    const [texto, setTexto] = useState(diseno_forms.formulario.orientacion);
    const [forma, setforma] = useState(diseno_forms.titulo.forma);
    const [tamano, setTamano] = useState(diseno_forms.titulo.tamano);
    const [forma1, setforma1] = useState(diseno_forms.subtitulo.forma);
    const [tamano1, setTamano1] = useState(diseno_forms.subtitulo.tamano);
    const [estilo, setEstilo] = useState(formEditar.estilo);
    const envio = useRef();
    const [btn, setBtn] = useState(diseno_forms.boton.texto);
    const [tamano2, setTamano2] = useState(diseno_forms.boton.tamano_texto);
    const [background2, setBackground2] = useState(diseno_forms.boton.fondo);
    const [color2, setColor2] = useState(diseno_forms.boton.color_texto);
    const [texto2, setTexto2] = useState(diseno_forms.boton.orientacion);
    const [forma2, setforma2] = useState(diseno_forms.boton.forma);
    const [padding, setPadding] = useState(diseno_forms.boton.espacio_y);
    const [padding1, setPadding1] = useState(diseno_forms.boton.espacio_x);
    const [border, setBorder] = useState(diseno_forms.boton.borde);
    const [tborder, setTborder] = useState(diseno_forms.boton.tipo);
    const [cborder, setCborder] = useState(diseno_forms.boton.color_borde);
    const [radius, setRadius] = useState(diseno_forms.boton.redondeo[0]);
    const [rtipo, setRtipo] = useState(diseno_forms.boton.redondeo[1]);
    const [display1, setDisplay1] = useState(diseno_forms.titulo.activo)
    const [display2, setDisplay2] = useState(diseno_forms.subtitulo.activo)
    const valores = [
        { id: 1, valor: "left" },
        { id: 2, valor: "center" },
        { id: 3, valor: "right" },
        { id: 4, valor: "justify" },
    ];

    const display = [
        { id: false, valor: "none" },
        { id: true, valor: "block" },
    ];

    const orientaciontexto = (tipo) => {
        setTexto(valores.find((e) => e.id === tipo).valor);
    };

    const orientaciontexto1 = (tipo) => {
        setTexto2(valores.find((e) => e.id === tipo).valor);
    };

    const cambiartitulo = (tipo) => {
        titulo.current.style.textAlign = valores.find(
            (e) => e.id === tipo
        ).valor;
    };
    const cambiartitulo1 = (tipo) => {
        titulo1.current.style.textAlign = valores.find(
            (e) => e.id === tipo
        ).valor;
    };

    const visibilidad = (tipo) => {
        setDisplay1(display.find((e) => e.id === tipo).valor)
    };
    const visibilidad1 = (tipo) => {
        setDisplay2(display.find(
            (e) => e.id === tipo
        ).valor);
    };
    const [inputs, setInputs] = useState(JSON.parse(formEditar.campos));
    const dragItem = useRef();
    const dragOverItem = useRef();
    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...inputs];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setInputs(copyListItems);
    };
    const prueba = (value) => {
        const copyListItems = [...inputs].concat(value);
        setInputs(copyListItems);
    };
    const [estado, setEstado] = useState({ estado: false });
    const modalce = (datos, posicion,tipo) => {
        if (tipo === "eliminar") {
            let copyListItems = [...inputs];
            copyListItems.splice(posicion,1)
            setInputs(copyListItems);
        } else {
            const copyListItems = [...inputs];
            copyListItems.splice(posicion,1,datos)
            setInputs(copyListItems);
        }
        setEstado({ estado: false });
    };
    const [json, setJson] = useState(null);
    const guardar = () => {
        let fecha = new Date(formEditar.fecha_creacion).toLocaleString().replace(",", "").split(" ");
        let date = fecha[0].split("/");
        const json = {
            titulo: tiutlo,
            fecha: `${date[2]}-${date[1]}-${date[0]} ${fecha[1]}`,
            campos: inputs,
            estilo: estilo,
            estructura: contenido.current.innerHTML,
            registro: formEditar.cantidad_registro,
            usuario: autenticado.dni,
            id: formEditar.idformularios,
            diseno_general: [
                {
                    formulario: {
                        fondo: background,
                        texto: color,
                        ancho: ancho,
                        orientacion: texto
                    },
                    titulo: {
                        texto: tiutlo,
                        activo: display1,
                        orientacion: titulo.current.style.textAlign,
                        forma: forma,
                        tamano: tamano
                    },
                    subtitulo: {
                        texto: tiutlo1,
                        activo: display1,
                        orientacion: titulo1.current.style.textAlign,
                        forma: forma1,
                        tamano: tamano1
                    },
                    boton: {
                        texto: btn,
                        fondo: background2,
                        color_texto: color2,
                        orientacion: texto2,
                        forma: forma2,
                        tamano_texto: tamano2,
                        espacio_y: padding,
                        espacio_x: padding1,
                        borde: border,
                        tipo: tborder,
                        color_borde: cborder,
                        redondeo: [radius, rtipo]
                    }
                },
            ],
        };
        setJson({json,actualizar:true});
        setScrit(true);
    };
    const [scrit, setScrit] = useState(null);
    return (
        <>
            {scrit === null ? (
                <>
                    {inputs.length > 0 ? (
                        <Button
                            variant='sami'
                            className='d-flex mx-auto mt-4'
                            onClick={() => guardar()}
                        >
                            Guardar
                        </Button>
                    ) : (
                        ""
                    )}
                    <section ref={contenido} className='pt-3 pt-sm-5 mt-3 mb-5'>
                        <style>
                            {`*{margin: 0;padding: 0;box-sizing: border-box;}fieldset{border: 0;}label{display:flex;flex-direction: column}.terminos label {flex-direction: row;}.terminos {display: flex;flex-direction: column;}input[type="text"],input[type="file"],input[type="number"],input[type="tel"],input[type="email"],input[type="date"],input[type="time"], textarea{display: block;width: 100%;padding: 0.375rem 0.75rem;font-size: 1rem;font-weight: 400;line-height: 1.5;color: #212529;background-color: #fff;background-clip: padding-box;border: 1px solid #ced4da;appearance: none;border-radius: 0.375rem;transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;}input[type='button']{width: auto;}input[type=checkbox], input[type=radio] {border-radius: 0.25em;width: 1em;height: 1em;margin-top: 0.25em;vertical-align: top;background-color: #fff;background-repeat: no-repeat;background-position: center;background-size: contain;border: 1px solid rgba(0,0,0,.25);outline: none;-webkit-print-color-adjust: exact;margin-right: 10px;}input[type=radio]{border-radius: 50%;}select {display: block;width: 100%;padding: 0.375rem 2.25rem 0.375rem 0.75rem;-moz-padding-start: calc(.75rem - 3px);font-size: 1rem;font-weight: 400;line-height: 1.5;color: #212529;background-color: #fff;background-image: url(https://res.cloudinary.com/dmbma2idu/image/upload/v1669410557/Fotos%20de%20Registrados/descarga_r30or6.svg);background-repeat: no-repeat;background-position: right 0.75rem center;background-size: 16px 12px;border: 1px solid #ced4da;border-radius: 0.375rem;transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-appearance: none;appearance: none;}input[type=file] {overflow: hidden;padding: 0;}input[type=file]::file-selector-button {margin-right: 20px;border: none;background: #e9ecef;padding: 0.375rem 0.75rem;border-radius: 0px;color: #212529;cursor: pointer;transition: background .2s ease-in-out;}input[type=file]::file-selector-button:hover {background: #ced4da;}*{margin: 0;padding: 0;box-sizing: border-box;}form .card{border-radius: 0.375rem;}form .card-body{padding: 1rem;}.editar{display: none;}form input,form textarea {outline: none!important;appearance: auto !important;}#btn-envio{cursor:pointer}`}
                            {estilo}
                        </style>
                        <form
                            ref={formulario}
                            style={{ width: `${ancho}px`, margin: "auto", maxWidth: "87%" }}
                            className='formulario'
                            encType="multipart/form-data"
                        >
                            <Card
                                style={{
                                    background: background,
                                    color: color,
                                    textAlign: texto,
                                }}
                            >
                                <Card.Body>
                                    <Card.Title
                                        ref={titulo}
                                        style={{
                                            textTransform: forma,
                                            fontSize: tamano,
                                            display: display1
                                        }}
                                        className='titulo'
                                    >
                                        {tiutlo}
                                    </Card.Title>
                                    <Card.Subtitle
                                        ref={titulo1}
                                        style={{
                                            textTransform: forma1,
                                            fontSize: tamano1,
                                            display : display2
                                        }}
                                        className='subtitulo'
                                    >
                                        {tiutlo1}
                                    </Card.Subtitle>
                                    <fieldset>
                                        {inputs &&
                                            inputs.map((item, index) => (
                                                <div
                                                    onDragStart={(e) =>
                                                        dragStart(e, index)
                                                    }
                                                    onDragEnter={(e) =>
                                                        dragEnter(e, index)
                                                    }
                                                    onDragEnd={drop}
                                                    key={index}
                                                    draggable
                                                    onClick={(e) =>
                                                        setEstado({
                                                            estado: true,
                                                            id: e.currentTarget
                                                                .id,
                                                            index,
                                                            item,
                                                        })
                                                    }
                                                    id={"campo-" + index}
                                                    style={{ margin: "1rem 0" }}
                                                    className='position-relative'
                                                >
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.input,
                                                        }}
                                                    />
                                                    <div className='editar'>
                                                        <FiEdit />
                                                    </div>
                                                </div>
                                            ))}
                                    </fieldset>
                                    <Card.Footer
                                        style={{
                                            textAlign: texto2,
                                            background: "inherit",
                                            border: "none",
                                            padding: "10px 0",
                                        }}
                                        className='position-relative'
                                    >
                                        <button
                                            id='btn-envio'
                                            style={{
                                                fontSize: tamano2,
                                                color: color2,
                                                background: background2,
                                                textTransform: forma2,
                                                padding: `${padding} ${padding1}`,
                                                border: `${border} ${tborder} ${cborder}`,
                                                borderRadius: `${radius}${rtipo}`,
                                            }}
                                            ref={envio}
                                            onClick={(e) => e.preventDefault()}
                                            onBlur={(e) =>
                                                setBtn(e.target.outerText)
                                            }
                                        >
                                            {btn}
                                        </button>
                                        <div className='editar'>
                                            
                                        </div>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </form>
                    </section>
                    <>
                        {estado.estado ? (
                            <Diseno
                                estado={true}
                                cerrar={(datos,posicion,tipo) => modalce(datos,posicion,tipo)}
                                detalle={estado}
                            />
                        ) : (
                            ""
                        )}
                        <Generador items={(name) => prueba(name)} />
                        <Button
                            variant='primary'
                            onClick={handleShow}
                            className='diseno_formulario d-grid justify-content-center align-items-center'
                        >
                            <RiPaintBrushLine />
                        </Button>

                        <Offcanvas
                            show={show}
                            onHide={handleClose}
                            {...{ scroll: true, backdrop: false }}
                            placement={"end"}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    Dise??ador General
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Accordion defaultActiveKey='0'>
                                    <Accordion.Item eventKey='0'>
                                        <Accordion.Header>
                                            Dise??o del Formulario
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {/* color fondo */}
                                            <Form.Label htmlFor='background'>
                                                Color de fondo
                                            </Form.Label>
                                            <div className='d-flex'>
                                                <Form.Control
                                                    type='color'
                                                    id='background'
                                                    defaultValue={background}
                                                    value={background}
                                                    title='Choose your color'
                                                    onChange={(e) =>
                                                        setBackground(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Form.Control
                                                    type='text'
                                                    value={background}
                                                    onChange={(e) =>
                                                        setBackground(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            {/* color texto */}
                                            <div className='my-3'>
                                                <Form.Label htmlFor='color'>
                                                    Color de texto
                                                </Form.Label>
                                                <div className='d-flex'>
                                                    <Form.Control
                                                        type='color'
                                                        id='color'
                                                        defaultValue={color}
                                                        value={color}
                                                        title='Choose your color'
                                                        onChange={(e) =>
                                                            setColor(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Form.Control
                                                        type='text'
                                                        value={color}
                                                        onChange={(e) =>
                                                            setColor(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {/* ancho formulario */}
                                            <div className='my-3'>
                                                <Form.Label htmlFor='color'>
                                                    Ancho de formulario
                                                </Form.Label>
                                                <div className='d-flex'>
                                                    <Form.Control
                                                        type='number'
                                                        id='ancho'
                                                        defaultValue={ancho}
                                                        onChange={(e) =>
                                                            setAncho(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Form.Control
                                                        type='text'
                                                        disabled
                                                        value={"px"}
                                                    />
                                                </div>
                                            </div>
                                            {/* orientacion texto */}
                                            <div className='my-3'>
                                                <div className='my-1'>
                                                    Orientaci??n de texto
                                                </div>
                                                <Form.Check
                                                    inline
                                                    label='Izquierda'
                                                    name='group2'
                                                    type='radio'
                                                    id={"group21"}
                                                    defaultChecked={texto === "left" ? true : false}
                                                    onChange={(e) =>
                                                        orientaciontexto(1)
                                                    }
                                                />
                                                <Form.Check
                                                    inline
                                                    label='Centro'
                                                    name='group2'
                                                    type='radio'
                                                    id={"group22"}
                                                    defaultChecked={texto === "center" ? true : false}
                                                    onChange={(e) =>
                                                        orientaciontexto(2)
                                                    }
                                                />
                                                <Form.Check
                                                    inline
                                                    label='Derecha'
                                                    name='group2'
                                                    type='radio'
                                                    id={"group24"}
                                                    defaultChecked={texto === "right" ? true : false}
                                                    onChange={(e) =>
                                                        orientaciontexto(3)
                                                    }
                                                />
                                                <Form.Check
                                                    inline
                                                    label='Justificado'
                                                    name='group2'
                                                    type='radio'
                                                    id={"group23"}
                                                    defaultChecked={texto === "justify" ? true : false}
                                                    onChange={(e) =>
                                                        orientaciontexto(4)
                                                    }
                                                />
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey='1'>
                                        <Accordion.Header>
                                            Dise??o del titulo
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Label
                                                htmlFor='titulo-titulo'
                                                className='mt-1'
                                            >
                                                Texto del titulo
                                            </Form.Label>
                                            <Form.Control
                                                className='mb-3'
                                                defaultValue={tiutlo}
                                                id='titulo-titulo'
                                                value={tiutlo}
                                                onChange={(e) =>
                                                    setTitulo(e.target.value)
                                                }
                                            />
                                            {["radio"].map((type) => (
                                                <div
                                                    key={`inline-${type}`}
                                                    className='mb-3'
                                                >
                                                    <Form.Check
                                                        type='switch'
                                                        id='custom-switch'
                                                        label='Titulo de formulario'
                                                        onChange={(e) =>
                                                            visibilidad(
                                                                e.target.checked
                                                            )
                                                        }
                                                        defaultChecked={diseno_forms.titulo.activo === "" ? true : false}
                                                        className='my-3'
                                                    />
                                                    <div className='mb-2'>
                                                        Orientaci??n de texto
                                                    </div>
                                                    <Form.Check
                                                        inline
                                                        label='Izquierda'
                                                        name='group1'
                                                        type={type}
                                                        id={"1"}
                                                        defaultChecked={diseno_forms.titulo.orientacion === "left" || diseno_forms.titulo.orientacion === "" ? true && setTimeout(() => {
                                                            cambiartitulo(1)
                                                        }, 0): false}
                                                        onChange={(e) =>
                                                            cambiartitulo(1)
                                                        }
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label='Centro'
                                                        name='group1'
                                                        type={type}
                                                        id={"2"}
                                                        defaultChecked={diseno_forms.titulo.orientacion === "center" ? true && setTimeout(() => {
                                                            cambiartitulo(2)
                                                        }, 0) : false}
                                                        onChange={(e) =>
                                                            cambiartitulo(2)
                                                        }
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label='Derecha'
                                                        name='group1'
                                                        type={type}
                                                        id={"3"}
                                                        defaultChecked={diseno_forms.titulo.orientacion === "right" ? true && setTimeout(() => {
                                                            cambiartitulo(3)
                                                        }, 0) : false}
                                                        onChange={(e) =>
                                                            cambiartitulo(3)
                                                        }
                                                    />
                                                </div>
                                            ))}
                                            <Form.Label htmlFor='forma'>
                                                Forma de texto
                                            </Form.Label>
                                            <Form.Select
                                                aria-label='Default select example'
                                                id='forma'
                                                defaultValue={forma}
                                                onChange={(e) =>
                                                    setforma(e.target.value)
                                                }
                                            >
                                                <option value='none'>
                                                    Ninguna
                                                </option>
                                                <option value='uppercase'>
                                                    Mayuscula
                                                </option>
                                                <option value='lowercase'>
                                                    Minuscula
                                                </option>
                                                <option value='capitalize'>
                                                    Capital
                                                </option>
                                            </Form.Select>
                                            <Form.Label
                                                htmlFor='tamano'
                                                className='mt-3'
                                            >
                                                Tama??o de texto
                                            </Form.Label>
                                            <Form.Select
                                                aria-label='Default select example'
                                                id='tamano'
                                                defaultValue={tamano}
                                                onChange={(e) =>
                                                    setTamano(e.target.value)
                                                }
                                            >
                                                <option value='14px'>14</option>
                                                <option value='16px'>16</option>
                                                <option value='18px'>18</option>
                                                <option value='20px'>20</option>
                                                <option value='22px'>22</option>
                                                <option value='24px'>24</option>
                                                <option value='26px'>26</option>
                                            </Form.Select>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey='2'>
                                        <Accordion.Header>
                                            Dise??o del subtitulo
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Label
                                                htmlFor='titulo-subtitulo'
                                                className='mt-1'
                                            >
                                                Texto del subtitulo
                                            </Form.Label>
                                            <Form.Control
                                                className='mb-3'
                                                defaultValue={tiutlo1}
                                                id='titulo-subtitulo'
                                                value={tiutlo1}
                                                onChange={(e) =>
                                                    setTitulo1(e.target.value)
                                                }
                                            />
                                            {["radio"].map((type) => (
                                                <div
                                                    key={`inline1-${type}`}
                                                    className='mb-3'
                                                >
                                                    <Form.Check
                                                        type='switch'
                                                        id='custom-switch2'
                                                        label='subtitulo de formulario'
                                                        defaultChecked={diseno_forms.subtitulo.activo === "none" ? false && 
                                                        setTimeout(() => {
                                                            visibilidad1(false)
                                                        }, 0) : true && setTimeout(() => {
                                                            visibilidad1(true)
                                                        }, 0)}
                                                        onChange={(e) =>
                                                            visibilidad1(
                                                                e.target.checked
                                                            )
                                                        }
                                                        className='my-3'
                                                    />
                                                    <div className='mb-2'>
                                                        Orientaci??n de texto
                                                    </div>
                                                    <Form.Check
                                                        inline
                                                        label='Izquierda'
                                                        name='group11'
                                                        type={type}
                                                        id={"group11"}
                                                        defaultChecked={diseno_forms.subtitulo.orientacion === "left" || diseno_forms.subtitulo.orientacion === "" ? true && setTimeout(() => {
                                                            cambiartitulo1(1)
                                                        }, 0) : false}
                                                        onChange={(e) =>
                                                            cambiartitulo1(1)
                                                        }
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label='Centro'
                                                        name='group11'
                                                        type={type}
                                                        id={"group12"}
                                                        defaultChecked={diseno_forms.subtitulo.orientacion === "center" ? true && setTimeout(() => {
                                                            cambiartitulo1(2)
                                                        }, 0) : false}  
                                                        onChange={(e) =>
                                                            cambiartitulo1(2)
                                                        }
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label='Derecha'
                                                        name='group11'
                                                        type={type}
                                                        id={"group13"}
                                                        defaultChecked={diseno_forms.subtitulo.orientacion === "right" ? true && setTimeout(() => {
                                                            cambiartitulo1(3)
                                                        }, 0) : false} 
                                                        onChange={(e) =>
                                                            cambiartitulo1(3)
                                                        }
                                                    />
                                                </div>
                                            ))}
                                            <Form.Label htmlFor='forma1'>
                                                Forma de texto
                                            </Form.Label>
                                            <Form.Select
                                                aria-label='Default select example'
                                                id='forma1'
                                                defaultValue={forma1}
                                                onChange={(e) =>
                                                    setforma1(e.target.value)
                                                }
                                            >
                                                <option value='none'>
                                                    Ninguna
                                                </option>
                                                <option value='uppercase'>
                                                    Mayuscula
                                                </option>
                                                <option value='lowercase'>
                                                    Minuscula
                                                </option>
                                                <option value='capitalize'>
                                                    Capital
                                                </option>
                                            </Form.Select>
                                            <Form.Label
                                                htmlFor='tamano1'
                                                className='mt-3'
                                            >
                                                Tama??o de texto
                                            </Form.Label>
                                            <Form.Select
                                                aria-label='Default select example'
                                                id='tamano1'
                                                defaultValue={tamano1}
                                                onChange={(e) =>
                                                    setTamano1(e.target.value)
                                                }
                                            >
                                                <option value='14px'>14</option>
                                                <option value='16px'>16</option>
                                                <option value='18px'>18</option>
                                                <option value='20px'>20</option>
                                                <option value='22px'>22</option>
                                                <option value='24px'>24</option>
                                                <option value='26px'>26</option>
                                            </Form.Select>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey='3'>
                                        <Accordion.Header>
                                            Dise??o del boton de envio
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Form.Label
                                                htmlFor='titulo-boton'
                                                className='mt-1'
                                            >
                                                Texto del boton
                                            </Form.Label>
                                            <Form.Control
                                                className='mb-3'
                                                defaultValue={btn}
                                                id='titulo-boton'
                                                value={btn}
                                                onChange={(e) =>
                                                    setBtn(e.target.value)
                                                }
                                            />
                                            {/* color fondo */}
                                            <Form.Label htmlFor='background1'>
                                                Color de fondo
                                            </Form.Label>
                                            <div className='d-flex'>
                                                <Form.Control
                                                    type='color'
                                                    id='background1'
                                                    defaultValue={background2}
                                                    value={background2}
                                                    title='Choose your color'
                                                    onChange={(e) =>
                                                        setBackground2(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Form.Control
                                                    type='text'
                                                    value={background2}
                                                    onChange={(e) =>
                                                        setBackground2(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            {/* color texto */}
                                            <div className='my-3'>
                                                <Form.Label htmlFor='color22'>
                                                    Color de texto
                                                </Form.Label>
                                                <div className='d-flex'>
                                                    <Form.Control
                                                        type='color'
                                                        id='color22'
                                                        defaultValue={color2}
                                                        value={color2}
                                                        title='Choose your color'
                                                        onChange={(e) =>
                                                            setColor2(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Form.Control
                                                        type='text'
                                                        value={color2}
                                                        onChange={(e) =>
                                                            setColor2(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='mb-2'>
                                                Orientaci??n de texto
                                            </div>
                                            <Form.Check
                                                inline
                                                label='Izquierda'
                                                name='group132'
                                                type={"radio"}
                                                id={"13"}
                                                defaultChecked={texto2 === "left" ? true : false}
                                                onChange={(e) =>
                                                    orientaciontexto1(1)
                                                }
                                            />
                                            <Form.Check
                                                inline
                                                label='Centro'
                                                name='group132'
                                                type={"radio"}
                                                id={"14"}
                                                defaultChecked={texto2 === "center" ? true : false}
                                                onChange={(e) =>
                                                    orientaciontexto1(2)
                                                }
                                            />
                                            <Form.Check
                                                inline
                                                label='Derecha'
                                                name='group132'
                                                type={"radio"}
                                                id={"15"}
                                                defaultChecked={texto2 === "right" ? true : false}
                                                onChange={(e) =>
                                                    orientaciontexto1(3)
                                                }
                                            />
                                            <Form.Label
                                                htmlFor='forma12'
                                                className='my-3'
                                            >
                                                Forma de texto
                                            </Form.Label>
                                            <Form.Select
                                                aria-label='Default select example'
                                                id='forma12'
                                                defaultValue={forma2}
                                                onChange={(e) =>
                                                    setforma2(e.target.value)
                                                }
                                            >
                                                <option value='none'>
                                                    Ninguna
                                                </option>
                                                <option value='uppercase'>
                                                    Mayuscula
                                                </option>
                                                <option value='lowercase'>
                                                    Minuscula
                                                </option>
                                                <option value='capitalize'>
                                                    Capital
                                                </option>
                                            </Form.Select>
                                            <Form.Label
                                                htmlFor='tamano1'
                                                className='mt-3'
                                            >
                                                Tama??o de texto
                                            </Form.Label>
                                            <Form.Select
                                                aria-label='Default select example'
                                                id='tamano1'
                                                defaultValue={tamano2}
                                                onChange={(e) =>
                                                    setTamano2(e.target.value)
                                                }
                                            >
                                                <option value='14px'>14</option>
                                                <option value='16px'>16</option>
                                                <option value='18px'>18</option>
                                                <option value='20px'>20</option>
                                                <option value='22px'>22</option>
                                                <option value='24px'>24</option>
                                                <option value='26px'>26</option>
                                            </Form.Select>
                                            <div className='my-3'>
                                                <Form.Label htmlFor='padding'>
                                                    Espacio interno arriba y
                                                    abajo del boton
                                                </Form.Label>
                                                <div className='d-flex'>
                                                    <Form.Control
                                                        type='number'
                                                        id='padding'
                                                        defaultValue={padding.split("px")[0]}
                                                        min={"1"}
                                                        onChange={(e) =>
                                                            setPadding(
                                                                `${e.target.value}px`
                                                            )
                                                        }
                                                    />
                                                    <Form.Control
                                                        type='text'
                                                        disabled
                                                        value={"px"}
                                                    />
                                                </div>
                                            </div>
                                            <div className='my-3'>
                                                <Form.Label htmlFor='padding1'>
                                                    Espacio interno derecha e
                                                    izquierda del boton
                                                </Form.Label>
                                                <div className='d-flex'>
                                                    <Form.Control
                                                        type='number'
                                                        id='padding1'
                                                        defaultValue={padding1.split("px")[0]}
                                                        min={"1"}
                                                        onChange={(e) =>
                                                            setPadding1(
                                                                `${e.target.value}px`
                                                            )
                                                        }
                                                    />
                                                    <Form.Control
                                                        type='text'
                                                        disabled
                                                        value={"px"}
                                                    />
                                                </div>
                                            </div>
                                            <div className='my-3'>
                                                <Form.Label htmlFor='border-colo'>
                                                    Grosor del borde
                                                </Form.Label>
                                                <div className='d-flex'>
                                                    <Form.Control
                                                        type='number'
                                                        id='border-colo'
                                                        defaultValue={border.split("px")[0]}
                                                        min={"1"}
                                                        onChange={(e) =>
                                                            setBorder(
                                                                `${e.target.value}px`
                                                            )
                                                        }
                                                    />
                                                    <Form.Control
                                                        type='text'
                                                        disabled
                                                        value={"px"}
                                                    />
                                                </div>
                                            </div>
                                            <Form.Label htmlFor='tborde'>
                                                Tipo de borde
                                            </Form.Label>
                                            <Form.Select
                                                aria-label='Default select example'
                                                id='tborde'
                                                defaultValue={tborder}
                                                onChange={(e) =>
                                                    setTborder(e.target.value)
                                                }
                                            >
                                                <option value='dashed'>
                                                    dashed
                                                </option>
                                                <option value='dotted'>
                                                    dotted
                                                </option>
                                                <option value='double'>
                                                    double
                                                </option>
                                                <option value='groove'>
                                                    groove
                                                </option>
                                                <option value='hidden'>
                                                    hidden
                                                </option>
                                                <option value='inset'>
                                                    inset
                                                </option>
                                                <option value='solid'>
                                                    solid
                                                </option>
                                            </Form.Select>
                                            <Form.Label
                                                htmlFor='color-b'
                                                className='mt-3'
                                            >
                                                Color de borde
                                            </Form.Label>
                                            <div className='d-flex'>
                                                <Form.Control
                                                    type='color'
                                                    id='color-b'
                                                    defaultValue={cborder}
                                                    value={cborder}
                                                    title='Choose your color'
                                                    onChange={(e) =>
                                                        setCborder(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Form.Control
                                                    type='text'
                                                    value={cborder}
                                                    onChange={(e) =>
                                                        setCborder(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className='my-3'>
                                                <Form.Label htmlFor='radius-borde'>
                                                    Redondeo de borde
                                                </Form.Label>
                                                <div className='d-flex'>
                                                    <Form.Control
                                                        type='number'
                                                        id='radius-borde'
                                                        defaultValue={radius}
                                                        min={"1"}
                                                        onChange={(e) =>
                                                            setRadius(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <Form.Select
                                                        defaultValue={rtipo}
                                                        onChange={(e) =>
                                                            setRtipo(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value='px'>
                                                            px
                                                        </option>
                                                        <option value='%'>
                                                            %
                                                        </option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey='4'>
                                        <Accordion.Header>
                                            Estilos avanzados
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p>
                                                Copia las siguientes clases y/o
                                                id para dar estilos m??s
                                                personalizado a tu formulario
                                            </p>
                                            <ul className='mb-1'>
                                                <li>.formulario</li>
                                                <li>.titulo</li>
                                                <li>.subtitulo</li>
                                                <li>#campos</li>
                                                <li>#btn-envio</li>
                                            </ul>
                                            <small className='mb-1 d-inline-block'>
                                                <i>
                                                    Utilize un{" "}
                                                    <code>!important</code> si
                                                    no se aplica el estilo
                                                </i>
                                            </small>
                                            <Editor
                                                height='35vh'
                                                defaultLanguage='css'
                                                defaultValue={
                                                    `/*Da tus propios estilos*/` +
                                                    estilo
                                                }
                                                theme='vs-dark'
                                                options={{
                                                    wordWrap: "on",
                                                    minimap: { enabled: false },
                                                }}
                                                onChange={(e) => setEstilo(e)}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </>
                </>
            ) : (
                <Formulario json={json} />
            )}
        </>
    );
}

export default BaseFormulario;
