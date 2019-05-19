import { loadPage } from "./Page";
import { state } from "./State";

const editorVersion = "23";
const gameVersion = "0.1.17";
const lastBreakingVersion = "22";

document.addEventListener("DOMContentLoaded", () => {
    const disclaimer = document.createElement("div");
    disclaimer.className = "disclaimer content";
    disclaimer.innerHTML = "<h2>CoC2 Save Editor v" + editorVersion + "</h2><h4>For use with versions of CoC2 " + gameVersion + " or higher</h4><p>Disclaimer: Editing any saves may permanently mess up the save or cause unusual bugs or errors in the game. Edit at your own risk and remember to back up your saves.</p><p>Saves edited with v" + lastBreakingVersion + " or earlier will not work.</p>";
    document.body.appendChild(disclaimer);

    const ok = document.createElement("button");
    ok.textContent = "Accept";
    ok.className = "tabbutton";
    disclaimer.appendChild(ok);

    ok.addEventListener("click", () => loadPage(document.body, state));
});