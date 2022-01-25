import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "55";
const gameVersion = "0.4.30";
const lastBreakingVersion = "54";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
