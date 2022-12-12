import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Editor from "@monaco-editor/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

function Diseno(prosp) {
    const detalle = prosp.detalle;
    const item = detalle.item;
    const [show, setShow] = useState(prosp.estado);
    const id = detalle.id
    const handleClose = (tipo) => {
        if (tipo === "eliminar") {
            const index = detalle.index
            setShow(false);
            prosp.cerrar(null,index,tipo);
        }else{

            const data = {
                tipo: item.tipo,
                type: item.type,
                input: document.getElementById(id).firstChild.innerHTML
            }
            const index = detalle.index
            setShow(false);
            prosp.cerrar(data,index,tipo);
        }
    };
    const [options, setOption] = useState(
        item.type === "radio" || item.type === "checkbox"
            ? [...document.querySelectorAll(`#${id} .terminos label`)]
            : [...document.querySelectorAll(`#${id} .terminos select option`)]
    );
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} backdrop='static'>
                <Offcanvas.Header >
                    <Offcanvas.Title>
                        EDITANDO CAMPO {detalle.index}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Col>
                        <div className='text-center mb-3'>
                            <Button
                                variant='danger'
                                onClick={() => {
                                    handleClose("eliminar");
                                }}
                            >
                                Eliminar campo
                            </Button>
                        </div>
                        {item.type === "html" ? (
                            <p className='mb-1'>
                                Editar contenido <code>html</code>
                            </p>
                        ): (
                            <p className='mb-1'>Editar Titulo</p>
                        )}
                        {item.type === "text" ||
                        item.type === "number" ||
                        item.type === "" ||
                        item.type === "tel" ||
                        item.type === "email" ||
                        item.type === "date" ||
                        item.type === "time" ||
                        item.type === "file" ||
                        item.type === "corta" ||
                        item.type === "textarea" ? (
                            <input
                                className='form-control'
                                type='text'
                                defaultValue={
                                    document.querySelector(`#${id} label span`)
                                        .textContent
                                }
                                onChange={(e) =>
                                    (document.querySelector(
                                        `#${id} label span`
                                    ).innerHTML = e.currentTarget.value)
                                }
                            />
                        ) : item.type === "radio" ||
                          item.type === "checkbox" ||
                          item.type === "select" ? (
                            <input
                                className='form-control'
                                type='text'
                                defaultValue={
                                    document.querySelector(
                                        `#${id} .terminos > span`
                                    ).textContent
                                }
                                onChange={(e) =>
                                    (document.querySelector(
                                        `#${id} .terminos > span`
                                    ).innerHTML = e.currentTarget.value)
                                }
                            />
                        ) : item.type === "html" ? (
                            <Editor
                                height='35vh'
                                defaultLanguage='html'
                                defaultValue={
                                    document.querySelector(`#${id} .html`)
                                        .innerHTML
                                }
                                theme='vs-dark'
                                options={{
                                    wordWrap: "on",
                                    minimap: { enabled: false },
                                }}
                                onChange={(e) =>
                                    (document.querySelector(
                                        `#${id} .html`
                                    ).innerHTML = e)
                                }
                            />
                        ) : (
                            ""
                        )}
                    </Col>
                    {item.type === "text" ||
                    item.type === "number" ||
                    item.type === "tel" ||
                    item.type === "email" ||
                    item.type === "date" ||
                    item.type === "time" ||
                    item.type === "file" ||
                    item.type === "corta" ||
                    item.type === "textarea" ? (
                        <Form.Check
                            type='switch'
                            id='ver-label'
                            label='Ocultar titulo'
                            onChange={(e) =>
                                e.target.checked
                                    ? document
                                          .querySelector(`#${id} label span`)
                                          .setAttribute(
                                              "style",
                                              "display: none"
                                          )
                                    : document
                                          .querySelector(`#${id} label span`)
                                          .setAttribute(
                                              "style",
                                              "display: unset"
                                          )
                            }
                            defaultChecked={
                                document
                                    .querySelector(`#${id} label span`)
                                    .getAttribute("style") === null ||
                                document
                                    .querySelector(`#${id} label span`)
                                    .getAttribute("style") === "display: unset"
                                    ? false
                                    : true
                            }
                            className='my-3'
                        />
                    ) : item.type === "radio" || item.type === "checkbox" ? (
                        <Form.Check
                            type='switch'
                            id='ver-label'
                            label='Ocultar titulo'
                            onChange={(e) =>
                                e.target.checked
                                    ? document
                                          .querySelector(
                                              `#${id} .terminos span`
                                          )
                                          .setAttribute(
                                              "style",
                                              "display: none"
                                          )
                                    : document
                                          .querySelector(
                                              `#${id} .terminos span`
                                          )
                                          .setAttribute(
                                              "style",
                                              "display: unset"
                                          )
                            }
                            defaultChecked={
                                document
                                    .querySelector(`#${id} .terminos > span`)
                                    .getAttribute("style") === null ||
                                document
                                    .querySelector(`#${id} .terminos > span`)
                                    .getAttribute("style") === "display: unset"
                                    ? false
                                    : true
                            }
                            className='my-3'
                        />
                    ) : item.type === "select" ? (
                        <Form.Check
                            type='switch'
                            id='ver-label'
                            label='Ocultar titulo'
                            onChange={(e) =>
                                e.target.checked
                                    ? document
                                          .querySelector(
                                              `#${id} .terminos span`
                                          )
                                          .setAttribute(
                                              "style",
                                              "display: none"
                                          )
                                    : document
                                          .querySelector(
                                              `#${id} .terminos span`
                                          )
                                          .setAttribute(
                                              "style",
                                              "display: unset"
                                          )
                            }
                            defaultChecked={
                                document
                                    .querySelector(`#${id} .terminos span`)
                                    .getAttribute("style") === null ||
                                document
                                    .querySelector(`#${id} .terminos span`)
                                    .getAttribute("style") === "display: unset"
                                    ? false
                                    : true
                            }
                            className='my-3'
                        />
                    ) : (
                        ""
                    )}
                    {item.type === "corta" ||
                    item.type === "text" ||
                    item.type === "number" ||
                    item.type === "tel" ||
                    item.type === "email" ? (
                        <>
                            <p className='mb-1'>Editar texto de ayuda</p>
                            <input
                                className='form-control'
                                type='text'
                                defaultValue={document
                                    .querySelector(`#${id} input`)
                                    .getAttribute("placeholder")}
                                onChange={(e) =>
                                    document
                                        .querySelector(`#${id} input`)
                                        .setAttribute(
                                            "placeholder",
                                            e.currentTarget.value
                                        )
                                }
                            />
                        </>
                    ) : item.type === "textarea" ? (
                        <>
                            <p className='mb-1'>Editar texto de ayuda</p>
                            <input
                                className='form-control'
                                type='text'
                                defaultValue={document
                                    .querySelector(`#${id} textarea`)
                                    .getAttribute("placeholder")}
                                onChange={(e) =>
                                    document
                                        .querySelector(`#${id} textarea`)
                                        .setAttribute(
                                            "placeholder",
                                            e.currentTarget.value
                                        )
                                }
                            />
                        </>
                    ) : (
                        ""
                    )}
                    {item.type === "radio" ||
                    item.type === "checkbox" ||
                    item.type === "select" ? (
                        <div>
                            {options &&
                                options.map((es, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className='d-flex gap-3'
                                        >
                                            {item.type === "select" ? (
                                                <input
                                                    type='text'
                                                    defaultValue={
                                                        es.textContent
                                                    }
                                                    className='mb-3'
                                                    onChange={(e) =>
                                                        (document.querySelectorAll(
                                                            `#${id} select option`
                                                        )[index].textContent =
                                                            e.target.value)
                                                    }
                                                />
                                            ) : (
                                                <input
                                                    type='text'
                                                    defaultValue={
                                                        document.querySelectorAll(
                                                            `#${id} .terminos label`
                                                        )[index].children[1]
                                                            .textContent
                                                    }
                                                    className='mb-3'
                                                    onChange={(e) =>
                                                        (document.querySelectorAll(
                                                            `#${id} .terminos label`
                                                        )[
                                                            index
                                                        ].children[1].textContent =
                                                            e.target.value)
                                                    }
                                                />
                                            )}
                                            {item.tipo === "terminos" ? (
                                                ""
                                            ) : (
                                                <Button
                                                    className='mb-3'
                                                    variant='danger'
                                                    onClick={(e) => {
                                                        if (
                                                            item.type ===
                                                            "select"
                                                        ) {
                                                            document
                                                                .querySelectorAll(
                                                                    `#${id} .terminos select option`
                                                                )
                                                                [
                                                                    index
                                                                ].remove();
                                                            setOption([
                                                                ...document.querySelectorAll(
                                                                    `#${id} .terminos select option`
                                                                ),
                                                            ]);
                                                        } else {
                                                            document
                                                                .querySelectorAll(
                                                                    `#${id} .terminos label`
                                                                )
                                                                [
                                                                    index
                                                                ].remove();
                                                            setOption([
                                                                ...document.querySelectorAll(
                                                                    `#${id} .terminos label`
                                                                ),
                                                            ]);
                                                        }
                                                    }}
                                                >
                                                    X
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}

                            <div className='text-center'>
                                {item.tipo === "terminos" ? (
                                    ""
                                ) : (
                                    <Button
                                        variant='sami'
                                        onClick={(e) => {
                                            const eti =
                                                document.createElement("label");
                                            const opt =
                                                document.createElement(
                                                    "option"
                                                );
                                            if (item.type === "radio") {
                                                eti.innerHTML = `<input type="radio" name=${document
                                                    .querySelector(
                                                        `#${id} .terminos input`
                                                    )
                                                    ?.getAttribute("name")} />
                                            <span>otra opcion</span>`;
                                            } else if (
                                                item.type === "checkbox"
                                            ) {
                                                eti.innerHTML = `<input type="checkbox" oninput="verificarMarcado()" value="opcion ${
                                                    document.querySelectorAll(
                                                        `#${id} .terminos label`
                                                    ).length + 1
                                                }"/>
                                            <span>otra opcion</span>`;
                                            } else {
                                                opt.innerText = "Nueva opcion";
                                                opt.setAttribute(
                                                    "value",
                                                    "nueva opcion"
                                                );
                                            }
                                            if (item.type === "select") {
                                                document
                                                    .querySelector(
                                                        `#${id} .terminos select`
                                                    )
                                                    .append(opt);
                                                setOption([
                                                    ...document.querySelectorAll(
                                                        `#${id} .terminos select option`
                                                    ),
                                                ]);
                                            } else {
                                                document
                                                    .querySelector(
                                                        `#${id} .terminos`
                                                    )
                                                    .append(eti);
                                                setOption([
                                                    ...document.querySelectorAll(
                                                        `#${id} .terminos label`
                                                    ),
                                                ]);
                                            }
                                        }}
                                    >
                                        Agregar
                                    </Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {
                        item.type === "text" ||
                        item.type === "corta" ||
                        item.type === "number" ||
                        item.type === "tel" ||
                        item.type === "radio" || 
                        item.type === "checkbox" || 
                        item.type === "email" || 
                        item.type === "date" || 
                        item.type === "time" || 
                        item.type === "file"
                         ? (<Form.Check
                            type='switch'
                            id='required'
                            label='Campo requerido'
                            onChange={(e) =>
                                {
                                    if (item.type === "radio") {
                                        e.target.checked
                                        ? document
                                          .querySelector(`#${id} label  input`)
                                          .setAttribute(
                                              "required",
                                              "true"
                                          )
                                    : document
                                          .querySelector(`#${id} label  input`)
                                          .setAttribute(
                                              "required",
                                              "false"
                                          )
                                    } else {
                                        e.target.checked
                                        ? document
                                          .querySelector(`#${id} label  input`)
                                          .setAttribute(
                                              "required",
                                              "true"
                                          )
                                        : document
                                          .querySelector(`#${id} label  input`)
                                          .setAttribute(
                                              "required",
                                              "false"
                                          )
                                    }
                                }
                            }
                            defaultChecked={
                                document
                                    .querySelector(`#${id} label  input`)
                                    .getAttribute("required") === null ||
                                document
                                    .querySelector(`#${id} label input`)
                                    .getAttribute("required") === "false"
                                    ? false
                                    : true
                            }
                            className='my-3'
                        />) : item.type === "textarea" ? (<Form.Check
                            type='switch'
                            id='required'
                            label='Campo requerido'
                            onChange={(e) =>
                                e.target.checked
                                    ? document
                                          .querySelector(`#${id} label textarea`)
                                          .setAttribute(
                                              "required",
                                              "true"
                                          )
                                    : document
                                          .querySelector(`#${id} label textarea`)
                                          .setAttribute(
                                              "required",
                                              "false"
                                          )
                            }
                            defaultChecked={
                                document
                                    .querySelector(`#${id} label textarea`)
                                    .getAttribute("required") === null ||
                                document
                                    .querySelector(`#${id} label textarea`)
                                    .getAttribute("required") === "false"
                                    ? false
                                    : true
                            }
                            className='my-3'
                        />) : item.type === "select" ? (<Form.Check
                            type='switch'
                            id='required'
                            label='Campo requerido'
                            onChange={(e) =>
                                e.target.checked
                                    ? document
                                          .querySelector(`#${id} .terminos select`)
                                          .setAttribute(
                                              "required",
                                              "true"
                                          )
                                    : document
                                          .querySelector(`#${id} .terminos select`)
                                          .setAttribute(
                                              "required",
                                              "false"
                                          )
                            }
                            defaultChecked={
                                document
                                    .querySelector(`#${id} .terminos select`)
                                    .getAttribute("required") === null ||
                                document
                                    .querySelector(`#${id} .terminos select`)
                                    .getAttribute("required") === "false"
                                    ? false
                                    : true
                            }
                            className='my-3'
                        />) : ""
                    }
                    <div className="text-center mt-3">
                    <Button variant="sami" onClick={() => {
                        handleClose()
                    }}>Guardar cambios</Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Diseno;
