const data = []
document.addEventListener("DOMContentLoaded", async() => {
  window.form.map(async(element,index) => {
    let div = document.createElement("div")
    let dato = await obtenerFormularios(element)
    data.push(dato)
    div.id = data[index].body[0].idformularios
    div.innerHTML = div.innerHTML + data[index].body[0].estructura
    document.body.appendChild(div)
  })
})

const obtenerFormularios = async (id) => {
    const response = await fetch(`http://localhost:9000/api/forms/obtener/${id}`)
    const objeto = await response.json()
  return objeto
}

document.addEventListener("submit", (e) => {
  e.preventDefault()
  // let dato = [...e.target]
  // dato.shift()
  // dato.pop()
  // console.log(dato);
  // let input = dato.map(el => {
  //   let ob = {}
  //   ob[el.parentElement.childNodes[0].innerText === "" ? el.parentElement.parentElement.childNodes[0].innerText : el.parentElement.childNodes[0].innerText] = el.value
  //   return ob
  // })
  // console.log(input);
  let ji = new FormData(e.target)
  ji = [...ji.entries()]
  let input = Object.fromEntries(ji)
  console.log(input);
})

function verificarMarcado(e){
  console.log(e);
  console.log(this);
} 