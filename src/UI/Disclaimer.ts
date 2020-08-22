import { displayEditor } from "./Editor";

export function displayDisclaimer(editorVersion: string, gameVersion: string, lastBreakingVersion: string) {
    const disclaimer = document.createElement("div");
    disclaimer.className = "disclaimer";
    disclaimer.innerHTML = "<h2>CoC2 Save Editor v" + editorVersion + "</h2><h4>UNOFFICIAL - PUBLIC RELEASES ONLY - Must be version " + gameVersion + " or higher</h4><p>Disclaimer: Editing any saves may permanently mess up the save or cause unusual bugs or errors in the game. Edit at your own risk and remember to back up your saves.</p><p>Saves edited with v" + lastBreakingVersion + " or earlier will not work.</p><p>How to get save file: In the CoC2 save/load menu, on the right side under \"To File\", click the \"Save\" button to download a file to use in this save editor.</p>";

    const ok = document.createElement("button");
    ok.textContent = "Accept";
    ok.className = "tab";
    disclaimer.appendChild(ok);

    ok.addEventListener("click", () => {
        while (document.body.lastChild)
            document.body.removeChild(document.body.lastChild);

        const editor = displayEditor();
        document.body.appendChild(editor.element);
    });

    return disclaimer;
}
