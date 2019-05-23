import { State } from "./Data/State";
import { loadCharTab } from "./CharTab";
import { loadSaveLoadBar } from "./SaveLoadBar";
import { TabMenu } from "./Display/TabMenu";
import { loadFlagTab } from "./FlagsTab";
// import { loadRawTab } from "./RawTab";

export function loadEditor(element: HTMLElement, state: State) {
    while (element.lastChild)
        element.removeChild(element.lastChild);

    const mainScreen = new TabMenu({ tabsPos: 'top', activeStyle: 'light', inactiveStyle: 'dark' });
    mainScreen.element.id = 'main';

    const charTab = mainScreen.createTab('Characters', (content) => {
        if (!state.editObj)
            alert("No Save File loaded");
        else
            try {
                loadCharTab(content, state.editObj);
            }
            catch (e) {
                alert(e);
            }
    });

    mainScreen.createTab('Flags', (content) => {
        if (!state.editObj)
            alert("No Save File loaded");
        else if (!state.editObj.flags)
            alert("No Flags in save file");
        else
            try {
                loadFlagTab(content, state.editObj);
            }
            catch (e) {
                alert(e);
            }
    });

    // mainScreen.createTab('Raw', (content) => {
    //     if (!state.editObj)
    //         alert("No Save File loaded");
    //     else
    //         loadRawTab(content, state.editObj);
    // });

    loadSaveLoadBar(element, state, charTab.button);

    element.appendChild(mainScreen.element);
}
