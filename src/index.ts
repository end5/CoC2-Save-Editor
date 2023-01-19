import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "61";
const gameVersion = "0.5.29";
const lastBreakingVersion = "54";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
