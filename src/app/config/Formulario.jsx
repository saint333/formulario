import { useRef } from "react";
import "./forms.css";

export default function Formulario(props) {
    console.log(JSON.stringify(props.json));
    const guardar = async () => {
        await fetch("http://localhost:9000/api/forms",{
            method: "POST",
            body: JSON.stringify(props.json),
            headers : {
              "Accept": "*/*",
              "User-Agent": "Thunder Client (https://www.thunderclient.com)",
              "Content-Type": "application/json"
             }
        })
    }
    guardar()
    const vista = useRef();
    console.log(vista);
    setTimeout(() => {
        vista.current.innerHTML = props.json.estructura;
    }, 1000);
    return (
        <div className='vista'>
            <div ref={vista}></div>
            <div className='text-center'>
                <code className='bg-black d-inline-block my-5 p-2' style={{width: '700px', margin: 'auto', maxWidth: '87%;'}}>
                    {`<script>
                          if (window.form === undefined) {
                            window.form = [];
                        }
                        window.form.push(${props.json.id});
                    </script>`}
                    <br />
                    {`<script src="http://localhost:3000/forms/form.js"></script>`}
                </code>
            </div>
        </div>
    );
}
