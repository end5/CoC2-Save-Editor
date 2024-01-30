import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "65";
const gameVersion = "0.6.32";
const lastBreakingVersion = "62";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
