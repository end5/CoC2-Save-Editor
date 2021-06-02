import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "48";
const gameVersion = "0.3.45";
const lastBreakingVersion = "48";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
