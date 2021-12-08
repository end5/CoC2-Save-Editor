import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "52";
const gameVersion = "0.4.23";
const lastBreakingVersion = "52";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
