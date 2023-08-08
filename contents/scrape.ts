import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  all_frames: true
}

const Scrape = () => {
  const { data } = useMessage<string, string>(async (req, res) => {
    console.log("[DEBUG:SCRAPE]: ", req.body)
    res.send(document.querySelector(req.body).textContent)
  })
  return "Hello World! " + data
}

export default Scrape