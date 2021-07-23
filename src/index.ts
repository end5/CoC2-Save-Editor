import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "50";
const gameVersion = "0.4.5";
const lastBreakingVersion = "49";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
