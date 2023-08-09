import type { EventAttributes } from "ics"
import { createEvents } from "ics"
import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  all_frames: true,
  matches: ["https://mitec.itesm.mx/Paginas/mitec/index.aspx"]
}

function formatDateToISO8601(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0") // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0")
  const hours = String(date.getUTCHours()).padStart(2, "0")
  const minutes = String(date.getUTCMinutes()).padStart(2, "0")
  const seconds = String(date.getUTCSeconds()).padStart(2, "0")

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
}

const QueryTextAnywhere = () => {
  const { data } = useMessage<string, string>(async (req, res) => {
    const classInfo: EventAttributes[] = []
    // console.log(req.body)
    // <label _ngcontent-eju-c545="" class="btn tab ml-3 btn-calendar"><input _ngcontent-eju-c545="" type="radio" name="options" id="option2"> Detalle </label>
    const button = document
      .querySelector("label.btn.tab.ml-3.btn-calendar")
      .querySelector("input")
    // console.log(button)
    // click button
    button.click()
    // <div _ngcontent-jai-c545="" class="main-container-tarjetas p-0">
    const cards_containter = document.querySelector(
      "div.main-container-tarjetas.p-0"
    )
    //console.log(cards_containter);
    // get all <div class="container-tarjetas">
    const cards = cards_containter.querySelectorAll("div.container-tarjetas")
    const cards_info = cards.forEach((card) => {
      // <div class ="fecha-container">
      const date = card.querySelector("div.fecha-container")
      const fecha_inicio = date.querySelector("div.fecha_Inicio")
      const fecha_fin = date.querySelector("div.fecha_Fin")
      // console.log(fecha_inicio.textContent, " ", fecha_fin.textContent)
      // <div class="main-container-materia">
      const materia = card.querySelector("div.main-container-materia")
      const materia_nombre = materia.querySelector("div.materia-text")
      const maestro = materia.querySelector("div.nombre-profesor")
      // console.log(materia_nombre.textContent, " ", maestro.textContent)
      // <div class="main-container-horario">
      const horario = card.querySelector("div.main-container-horario")
      // <div class="list-fechas d-flex align-items-center">
      const horario_dias = horario.querySelector(
        "div.list-fechas.d-flex.align-items-center"
      )
      const horario_hora = horario.querySelector(
        "div.horas-text.d-flex.align-items-center"
      )
      // console.log(horario_dias, " ", horario_hora.textContent)
      // <div class="main-container-edificio">
      const Edificio_Info = card.querySelector("div.main-container-edificio")
      const Edificio = Edificio_Info.querySelector("div.edificio-text")
      const Salon = Edificio_Info.querySelector("div.salon-text")

      // console.log("Edificiooossss:", Edificio.textContent, " ", Salon.textContent)

      // RRULE:FREQ=WEEKLY;BYDAY=MO,WE,TH;UNTIL=20230217T180000Z

      const startDate = fecha_inicio.textContent.trim()
      let startDay = Number(startDate.slice(0, 2))
      let startMonth = Number(startDate.slice(3, 5))
      let startYear = Number(startDate.slice(6))

      const rawHours = horario_hora.textContent.trim()
      const startHourString = rawHours.slice(0, 5)
      const endHourString = rawHours.slice(8, 13)

      const startHour = Number(startHourString.slice(0, 2))
      const startMinute = Number(startHourString.slice(3, 5))

      const endHour = Number(endHourString.slice(0, 2))
      const endMinute = Number(endHourString.slice(3, 5))

      const endDate = fecha_fin.textContent.trim()
      let endDay = Number(endDate.slice(0, 2))
      let endMonth = Number(endDate.slice(3, 5)) - 1
      let endYear = Number(endDate.slice(6))

      let rrule = "FREQ=WEEKLY;BYDAY="
      const lPrev = rrule.length

      if (horario_dias.textContent.includes("Do")) rrule += "SU,"
      if (horario_dias.textContent.includes("Lu")) rrule += "MO,"
      if (horario_dias.textContent.includes("Ma")) rrule += "TU,"
      if (horario_dias.textContent.includes("Mi")) rrule += "WE,"
      if (horario_dias.textContent.includes("Ju")) rrule += "TH,"
      if (horario_dias.textContent.includes("Vi")) rrule += "FR,"
      if (horario_dias.textContent.includes("Sa")) rrule += "SA,"

      // If the length of rrule is the same as before, then no days were added. Skip class as it may be asynchronous.
      if (rrule.length != lPrev) {
        rrule = rrule.slice(0, -1)

        rrule +=
          ";UNTIL=" + formatDateToISO8601(new Date(endYear, endMonth, endDay))

        const event: EventAttributes = {
          title: materia_nombre.textContent.trim(),
          description: `${maestro.textContent.trim()}\n${Edificio.textContent.trim()}: ${Salon.textContent.trim()}`,
          start: [startYear, startMonth, startDay, startHour, startMinute],
          end: [startYear, startMonth, startDay, endHour, endMinute],
          recurrenceRule: rrule,
          location:
            Edificio.textContent.trim() + ": " + Salon.textContent.trim(),
        }
        classInfo.push(event)
      }
    })

    const filename = "Horario-Clases.ics"
    const file = await new Promise((resolve, reject) => {
      createEvents(classInfo, (error, value) => {
        if (error) {
          reject(error)
        }

        resolve(new Blob([value], { type: "text/calendar" }))
      })
    })

    const link = document.createElement("a")
    link.href = URL.createObjectURL(file as Blob)
    link.download = filename
    link.click()

    res.send("test")
    //res.send(document.querySelector(req.body).textContent)
  })
  return <></>
}

export default QueryTextAnywhere
