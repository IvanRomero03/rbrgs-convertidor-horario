import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  all_frames: true,
  matches: ["https://mitec.itesm.mx/Paginas/mitec/index.aspx"]
};

const QueryTextAnywhere = () => {
  const { data } = useMessage<string, string>(async (req, res) => {
    console.log(req.body);
    // <label _ngcontent-eju-c545="" class="btn tab ml-3 btn-calendar"><input _ngcontent-eju-c545="" type="radio" name="options" id="option2"> Detalle </label>
    const button = document.querySelector("label.btn.tab.ml-3.btn-calendar").querySelector("input");
    console.log(button);
    // click button
    button.click();
    // <div _ngcontent-jai-c545="" class="main-container-tarjetas p-0">
    const cards_containter = document.querySelector("div.main-container-tarjetas.p-0");
    //console.log(cards_containter);
    // get all <div class="container-tarjetas">
    const cards = cards_containter.querySelectorAll("div.container-tarjetas");
    const cards_info = cards.forEach((card) => {
        // <div class ="fecha-container">
        const date = card.querySelector("div.fecha-container");
        const fecha_inicio = date.querySelector("div.fecha_Inicio");
        const fecha_fin = date.querySelector("div.fecha_Fin");
        console.log(fecha_inicio.textContent, " ", fecha_fin.textContent);
        // <div class="main-container-materia">
        const materia = card.querySelector("div.main-container-materia");
        const materia_nombre = materia.querySelector("div.materia-text");
        const maestro = materia.querySelector("div.nombre-profesor");
        console.log(materia_nombre.textContent, " ", maestro.textContent);
        // <div class="main-container-horario">
        const horario = card.querySelector("div.main-container-horario");
        // <div class="list-fechas d-flex align-items-center">
        const horario_dias = horario.querySelector("div.list-fechas.d-flex.align-items-center");
        const horario_hora = horario.querySelector("div.horas-text.d-flex.align-items-center");
        console.log(horario_dias, " ", horario_hora);
        // <div class="main-container-edificio">
        const Edificio_Info = card.querySelector("div.main-container-edificio");
        const Edificio = Edificio_Info.querySelector("div.edificio-text");
        const Salon = Edificio_Info.querySelector("div.salon-text");
        console.log(Edificio, " ", Salon);

    });

    res.send("test");
    //res.send(document.querySelector(req.body).textContent)
  })
  return (
    <></>
  )
}

export default QueryTextAnywhere