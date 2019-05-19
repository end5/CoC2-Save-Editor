document.addEventListener("DOMContentLoaded", () => {
    var disclaimer = document.createElement("div");
    disclaimer.className = "disclaimer content";
    disclaimer.innerHTML = "<h2>CoC2 Save Editor v" + editorVersion + "</h2><h4>For use with versions of CoC2 " + gameVersion + " or higher</h4><p>Disclaimer: Editing any saves may permanently mess up the save or cause unusual bugs or errors in the game. Edit at your own risk and remember to back up your saves.</p><p>Saves edited with v" + lastBreakingVersion + " or earlier will not work.</p>";
    document.body.appendChild(disclaimer);

    var ok = document.createElement("button");
    ok.textContent = "Accept";
    ok.className = "tabbutton";
    disclaimer.appendChild(ok);

    ok.addEventListener("click", () => {
        while (document.body.lastChild) {
            document.body.removeChild(document.body.lastChild);
        }

        var mainScreen = new PersistantTabMenu('main');
        document.body.appendChild(mainScreen.element);



        var charTab = mainScreen.createTab('Characters');
        charTab.button.addEventListener('click', () => {
            if (!saveEdit.editObj)
                alert("No Save File loaded");
            else if (charTab.content.children.length <= 0)
                generateCharList(saveEdit.editObj, charTab.content);
        });

        var flagTab = mainScreen.createTab('Flags');
        flagTab.button.addEventListener('click', () => {
            if (!saveEdit.editObj)
                alert("No Save File loaded");
            else if (!saveEdit.editObj.flags)
                alert("No Flags in save file");
            else if (flagTab.content.children.length <= 0)
                generateFields(saveEdit.editObj.flags, flagTab.content);
        });

        var rawTab = mainScreen.createTab('Raw');
        rawTab.button.addEventListener('click', () => {
            if (!saveEdit.editObj)
                alert("No Save File loaded");
            else if (rawTab.content.children.length <= 0)
                generateFields(saveEdit.editObj, rawTab.content);
        });

        var saveLoadTab = mainScreen.createTab('Save/Load');
        loadSaveLoadTab(saveLoadTab.content);

    });
});
