import { useState } from "react"
import { sendToContentScript } from "@plasmohq/messaging"

const asd = () => {
  console.log("asd");
  return "asd";
}

function IndexPopup() {
  const [data, setData] = useState("")
  const handleToContentScript = async () => {
    console.log("handleToContentScript");
    const res = await sendToContentScript({
      name: "scrape",
      body: {
        test: asd()
      }
    });
    console.log(res);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
        asd
      <h2>
        Welcome to your
        <a href="https://www.plasmo.com" target="_blank">
          {" "}
          Plasmo
        </a>{" "}
        Extension! aaa
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <p>
        {data}
      </p>
      <button onClick={() => {
        handleToContentScript();
      }
      }>Send Message</button>
      <button onClick={() => {
        setData("");
        // search p class="nx-mt-6 nx-leading-7 first:nx-mt-0"
        console.log(document.querySelector("p.nx-mt-6.nx-leading-7.first\\:nx-mt-0").innerHTML);
        document.querySelector("p.nx-mt-6.nx-leading-7.first\\:nx-mt-0").innerHTML = "Hello World";
    }}>Clear</button>
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
      <button
        onClick={async () => {
          const res = await sendToContentScript({
            name: "query-selector-text",
            body: "test"
          })
          console.log(res)
        }}>
        Query Selector Text
      </button>
        Open Plasmo
    </div>
  )
}

export default IndexPopup
