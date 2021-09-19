import "./Window";
import { displayDisclaimer } from "./UI/Disclaimer";

const editorVersion = "51";
const gameVersion = "0.4.14";
const lastBreakingVersion = "49";

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(displayDisclaimer(editorVersion, gameVersion, lastBreakingVersion));
});
