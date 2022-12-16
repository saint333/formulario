let data = [];
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
        `https://api-formularios.gnxcode.dev/api/forms/obtener/${id}`
    );
    const objeto = await response.json();
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
    input["fecha"] = new Date()
    registros.push(input);
    const datas = await fetch(`https://api-formularios.gnxcode.dev/api/forms/agregar/`, {
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
    if (response.estado) {
        let nuevo = await obtenerFormularios(e.target.parentElement.id)
        let index = data.findIndex(e => e.body[0].idformularios === nuevo.body[0].idformularios)
        data.splice(index,1,nuevo)
        e.target.reset()
    }
});

function verificarMarcado(e){
  console.log(e);
  console.log(this);
}
