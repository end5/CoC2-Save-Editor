import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "68";
const gameVersion = "0.7.42";
const lastBreakingVersion = "62";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
