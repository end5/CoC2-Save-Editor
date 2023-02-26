import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "62";
const gameVersion = "0.5.33";
const lastBreakingVersion = "62";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
