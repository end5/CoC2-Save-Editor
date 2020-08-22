import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "39";
const gameVersion = "0.2.40";
const lastBreakingVersion = "27";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
