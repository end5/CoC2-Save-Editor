import { createTabBar } from "../../Display/TabBar";
import { displayCharInfo } from "./CharContent/Info";
import { toggleSelection, hide, ButtonContentPair, select } from "../../Display/UIActions";
import { displayCharEffectsContent } from "./CharContent/Effects";
import { displayCharInventory } from "./CharContent/Inventory";
import { State } from "../../Data/State";
import { displayCharStats } from "./CharContent/Stats";
import { displayCharBodyContent } from "./CharContent/Body";
import { Component } from "../../Display/Generic";
import { CharAccessor } from "../../Data/CharAccessor";

export function displayCharContent(state: State) {
    const charAccessor = new CharAccessor(state);

    const element = document.createElement('div');
    element.className = 'content';

    const tabBar = createTabBar('horizontal', { info: 'Info', stats: 'Stats', effects: 'Effects', inv: 'Inventory', body: 'Body' });
    element.appendChild(tabBar.element);

    const content: Record<string, Component> = {
        info: displayCharInfo(charAccessor),
        stats: displayCharStats(charAccessor),
        effects: displayCharEffectsContent(charAccessor),
        inv: displayCharInventory(charAccessor),
        body: displayCharBodyContent(charAccessor),
    };

    const fieldKeys = Object.keys(tabBar.buttons);
    const buttonContentPairList: ButtonContentPair[] = fieldKeys.map((key) => ({ button: tabBar.buttons[key], content: content[key].element }));

    for (const fieldKey of fieldKeys) {
        tabBar.buttons[fieldKey].addEventListener('click', () => toggleSelection(tabBar.buttons[fieldKey], buttonContentPairList));

        // Hide everything but the first one
        if (fieldKey !== fieldKeys[0])
            hide(content[fieldKey].element);
        else {
            select(tabBar.buttons[fieldKey]);
        }

        element.appendChild(content[fieldKey].element);
    }

    const load = () => {
        for (const key of fieldKeys) {
            content[key].load();
        }
    };

    return { element, load };
}
