import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "40";
const gameVersion = "0.3.24";
const lastBreakingVersion = "40";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
