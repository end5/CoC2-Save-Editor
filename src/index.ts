import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "49";
const gameVersion = "0.3.45";
const lastBreakingVersion = "49";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
