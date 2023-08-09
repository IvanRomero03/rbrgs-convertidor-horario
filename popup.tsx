import { useState } from "react"

import { sendToContentScript } from "@plasmohq/messaging"

import "styles/globals.css"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-col w-52 h-60 justify-between">
      <div className="bg-blue-300 w-full">
        <h2 className="text-lg m-2 text-center text-white font-semibold">Convertidor Horario</h2>
      </div>

      <a className="text-blue-600 underline decoration-blue-700 text-center" href="https://drive.google.com/drive/folders/1vm55XHKsZ1FmipSqHp3riQBzsJ-gsLMn?usp=sharing" target="_blank">
        Ver tutorial
      </a>
      <a className="text-blue-600 underline decoration-blue-700 text-center" href="https://github.com/IvanRomero03/rbrgs-convertidor-horario/tree/main" target="_blank">
        Ver README
      </a>
      <button
        className="rounded-md bg-blue-300 m-5 p-3 text-white text-base"
        onClick={async () => {
          const res = await sendToContentScript({
            name: "query-selector-text",
            body: "test"
          })
        }}>
        Generar Horario
      </button>
    </div>
  )
}

export default IndexPopup
