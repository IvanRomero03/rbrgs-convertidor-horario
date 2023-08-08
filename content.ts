// export {};
import { relay } from "@plasmohq/messaging/relay";
import { useMessage } from "@plasmohq/messaging/hook";
import type { PlasmoCSConfig } from "plasmo";

// const config: PlasmoCSConfig = {
//     matches: ["https://mitec.itesm.mx/Paginas/mitec/index.aspx#/horario"],
// };
export const config: PlasmoCSConfig = {
    all_frames: true,
};
console.log("[RBRGS-DEBUG] content.ts");
//console.log(document.querySelector("p.nx-mt-6.nx-leading-7.first\\:nx-mt-0").innerHTML);
// console.log("[RBRGS-DEBUG]", document.querySelector("p.nx-mt-6.nx-leading-7.first\\:nx-mt-0").innerHTML);
// mwl-calendar-week-view _ngcontent-brl-c545 
const calendar = document.querySelector("mwl-calendar-week-view");
console.log("[RBRGS-DEBUG] calendar", calendar);


const getMessage = () => {
    const { data } = useMessage<string, string>(
        async (req, res) => {
            console.log(req.body);
            res.send("Hello World!");
        }
    );
    return data;
};
export default getMessage;

relay({
    name: "scrape",
}, 
    async (req) => {
        console.log(req.body);
    }
)