import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "57";
const gameVersion = "0.5.2";
const lastBreakingVersion = "54";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
