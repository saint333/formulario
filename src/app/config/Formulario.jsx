import { useRef } from "react";
import { RUTA } from "../../config/routes/paths";
import "./forms.css";

export default function Formulario(props) {
    const guardar = async (data,tipo) => {
        await fetch(`${RUTA}api/forms`,{
            method: tipo,
            body: JSON.stringify(data),
            headers : {
              "Accept": "*/*",
              "User-Agent": "Thunder Client (https://www.thunderclient.com)",
              "Content-Type": "application/json"
             }
        })
    }
    if (props.json.actualizar) {
        
        guardar(props.json.json,"PUT")
    }
    guardar(props.json.json,"POST")
    const vista = useRef();
    setTimeout(() => {
        vista.current.innerHTML = props.json.json.estructura;
    }, 1000);
    let ruta = window.location.origin
    return (
        <div className='vista'>
            <div ref={vista}></div>
            <div className='d-flex'>
                <code className='bg-black d-inline-block my-5 p-2 mx-auto' style={{width: '700px', margin: 'auto', maxWidth: '87%'}}>
                    {`<script>
                          if (window.form === undefined) {
                            window.form = [];
                        }
                        window.form.push(${props.json.json.id});
                    </script>`}
                    <br />
                    {`<script src="${ruta}/forms/form.js"></script>`}
                </code>
            </div>
        </div>
    );
}
