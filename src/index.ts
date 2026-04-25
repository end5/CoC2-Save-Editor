import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "69";
const gameVersion = "0.8.31";
const lastBreakingVersion = "62";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
