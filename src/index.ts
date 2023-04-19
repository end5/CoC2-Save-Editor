import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "63";
const gameVersion = "0.6.2";
const lastBreakingVersion = "62";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
