import { State } from "./Data/State";
import { PersistantTabMenu } from "./Menus";
import { generateCharList } from "./CharTab";
import { generateFields } from "./RawTab";
import { loadSaveLoadTab } from "./SaveLoadTab";

export function loadPage(element: HTMLElement, state: State) {
    while (element.lastChild)
        element.removeChild(element.lastChild);

    const mainScreen = new PersistantTabMenu('main');
    element.appendChild(mainScreen.element);

    const charTab = mainScreen.createTab('Characters');
    charTab.button.addEventListener('click', () => {
        if (!state.editObj)
            alert("No Save File loaded");
        else if (charTab.content.children.length <= 0)
            generateCharList(state.editObj, charTab.content, state);
    });

    const flagTab = mainScreen.createTab('Flags');
    flagTab.button.addEventListener('click', () => {
        if (!state.editObj)
            alert("No Save File loaded");
        else if (!state.editObj.flags)
            alert("No Flags in save file");
        else if (flagTab.content.children.length <= 0)
            generateFields(state.editObj.flags, flagTab.content);
    });

    const rawTab = mainScreen.createTab('Raw');
    rawTab.button.addEventListener('click', () => {
        if (!state.editObj)
            alert("No Save File loaded");
        else if (rawTab.content.children.length <= 0)
            generateFields(state.editObj, rawTab.content);
    });

    const saveLoadTab = mainScreen.createTab('Save/Load');
    loadSaveLoadTab(saveLoadTab.content, state);
}
