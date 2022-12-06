const data = [];
document.addEventListener("DOMContentLoaded", async () => {
    window.form.map(async (element, index) => {
        let div = document.createElement("div");
        let dato = await obtenerFormularios(element);
        data.push(dato);
        div.id = data[index].body[0].idformularios;
        div.innerHTML = div.innerHTML + data[index].body[0].estructura;
        document.body.appendChild(div);
    });
});

const obtenerFormularios = async (id) => {
    const response = await fetch(
        `http://localhost:9000/api/forms/obtener/${id}`
    );
    const objeto = await response.json();
    console.log(JSON.parse(objeto.body[0].campos_registro));
    return objeto;
};

document.addEventListener("submit", async (e) => {
    let registros = JSON.parse(
        data.find(
            (es) => es.body[0].idformularios === Number(e.target.parentElement.id)
        ).body[0].campos_registro
    );
    e.preventDefault();
    let ji = new FormData(e.target);
    ji = [...ji.entries()];
    let input = Object.fromEntries(ji);
    console.log(ji);
    registros.push(input);
    const datas = await fetch(`http://localhost:9000/api/forms/agregar/`, {
        method: "POST",
        body: JSON.stringify({
            cantidad: data.find(
                (es) =>
                    es.body[0].idformularios ===
                    Number(e.target.parentElement.id)
            ).body[0].cantidad_de_registro,
            data: JSON.stringify(registros),
            id: e.target.parentElement.id,
        }),
        headers: {
            Accept: "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }
    });
    const response = await datas.json();
    console.log(response);
});

// function verificarMarcado(e){
//   console.log(e);
//   console.log(this);
// }
