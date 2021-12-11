import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "53";
const gameVersion = "0.4.23";
const lastBreakingVersion = "53";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
