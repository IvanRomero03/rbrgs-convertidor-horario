import { useState } from "react"

import { sendToContentScript } from "@plasmohq/messaging"

import "styles/globals.css"

function IndexPopup() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex flex-col w-60 h-72 justify-between bg-white rounded-xl shadow-lg border border-blue-200 p-4">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 w-full rounded-lg py-3 mb-2">
        <h2 className="text-xl text-center text-white font-bold drop-shadow">
          Convertidor Horario
        </h2>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <a
          className="text-blue-700 hover:text-blue-900 underline text-center transition"
          href="https://drive.google.com/drive/folders/1vm55XHKsZ1FmipSqHp3riQBzsJ-gsLMn?usp=sharing"
          target="_blank">
          📹 Ver tutorial
        </a>
        <a
          className="text-blue-700 hover:text-blue-900 underline text-center transition"
          href="https://github.com/IvanRomero03/rbrgs-convertidor-horario/tree/main"
          target="_blank">
          📄 Ver README
        </a>
      </div>

      <button
        className={`rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white text-base font-semibold shadow-md py-2 px-4 mx-auto w-full flex items-center justify-center ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        disabled={loading}
        onClick={async () => {
          setLoading(true)
          try {
            const res = await sendToContentScript({
              name: "query-selector-text",
              body: "test"
            })
            console.log("Response:", res)
          } catch (error) {
            console.error("Error sending message to content script:", error)
            alert(
              "Error: Asegúrate de estar en la página de MiTec y recargar la página antes de usar la extensión."
            )
          }
          setLoading(false)
        }}>
        {loading ? (
          <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-blue-300 rounded-full"></span>
        ) : (
          <span className="mr-2">🕒</span>
        )}
        Generar Horario
      </button>
      <div className="text-xs text-gray-400 text-center mt-2">
        © RoBorregos 2025
      </div>
    </div>
  )
}

export default IndexPopup
