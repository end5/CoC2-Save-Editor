import { state } from "../Data/State";
import { displaySaveLoadBar } from "./EditorContent/SaveLoadBar";
import { createTabBar } from "../Display/TabBar";
import { displayCharList } from "./EditorContent/CharList";
import { select, isSelected, deselect, hide, show } from "../Display/UIActions";
import { displayCharContent } from "./EditorContent/Char";
import { displayFlagContent } from "./EditorContent/Flags";

export function displayEditor() {
    const element = document.createElement('div');
    element.className = 'content';

    // Nav bar
    const navBar = document.createElement('div');
    navBar.id = 'nav-bar';

    // Tab bar
    const tabBar = createTabBar('horizontal', { charList: '▼', charContent: 'No Save Loaded', flagContent: 'Flags' });

    tabBar.buttons.charList.addEventListener('click', () => {
        if (!state.editObj) return;

        if (isSelected(tabBar.buttons.charList)) {
            deselect(tabBar.buttons.charList);
            hide(charList.element);
        }
        else {
            select(tabBar.buttons.charList);
            show(charList.element);
        }
    });

    tabBar.buttons.charContent.addEventListener('click', () => {
        if (!state.editObj) return;

        if (!isSelected(tabBar.buttons.charContent)) {
            deselect(tabBar.buttons.charList);
            select(tabBar.buttons.charContent);
            deselect(tabBar.buttons.flagContent);
            hide(charList.element);
            show(charContent.element);
            hide(flagContent.element);
        }
    });

    tabBar.buttons.flagContent.addEventListener('click', () => {
        if (!state.editObj) return;

        if (!state.editObj.flags)
            alert("No Flags in save file");
        else if (!isSelected(tabBar.buttons.flagContent)) {
            deselect(tabBar.buttons.charList);
            deselect(tabBar.buttons.charContent);
            select(tabBar.buttons.flagContent);
            hide(charList.element);
            hide(charContent.element);
            show(flagContent.element);
        }
    });
    navBar.appendChild(tabBar.element);
    //

    // Save Load bar
    const saveLoadBar = displaySaveLoadBar(state, () => {
        flagContent.load();

        // If no character is loaded yet, load the first one
        if (tabBar.buttons.charContent.textContent === 'No Save Loaded') {
            charList.load();
            tabBar.buttons.charContent.click();
        }
    });
    navBar.appendChild(saveLoadBar);
    //

    element.append(navBar);
    //

    // Char List
    const charList = displayCharList(tabBar.buttons.charList, (key, title) => {
        state.activeChar = key;
        charContent.load();
        tabBar.buttons.charContent.textContent = title;
    });
    hide(charList.element);
    element.appendChild(charList.element);
    //

    // Char Content
    const charContent = displayCharContent(state);
    hide(charContent.element);
    element.appendChild(charContent.element);
    //

    // Flag Content
    const flagContent = displayFlagContent(state);
    hide(flagContent.element);
    element.appendChild(flagContent.element);
    //

    return { element };
}
