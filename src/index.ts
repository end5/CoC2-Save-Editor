import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "67";
const gameVersion = "0.7.18";
const lastBreakingVersion = "62";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
