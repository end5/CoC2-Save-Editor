import { State } from "./Data/State";
import { loadCharTab } from "./CharTab";
import { loadSaveLoadBar } from "./SaveLoadBar";
import { TabMenu } from "./Display/TabMenu";
import { loadFlagTab } from "./FlagsTab";
import { loadRawTab } from "./RawTab";

export function loadEditor(element: HTMLElement, state: State) {
    while (element.lastChild)
        element.removeChild(element.lastChild);

    loadSaveLoadBar(element, state);

    const mainScreen = new TabMenu({ tabsPos: 'top', activeStyle: 'light', inactiveStyle: 'dark' });
    mainScreen.element.id = 'main';

    mainScreen.createTab('Characters', (content) => {
        if (!state.editObj)
            alert("No Save File loaded");
        else
            loadCharTab(content, state.editObj);
    });

    mainScreen.createTab('Flags', (content) => {
        if (!state.editObj)
            alert("No Save File loaded");
        else if (!state.editObj.flags)
            alert("No Flags in save file");
        else
            loadFlagTab(content, state.editObj);
    });

    mainScreen.createTab('Raw', (content) => {
        if (!state.editObj)
            alert("No Save File loaded");
        else
            loadRawTab(content, state.editObj);
    });

    element.appendChild(mainScreen.element);
}
