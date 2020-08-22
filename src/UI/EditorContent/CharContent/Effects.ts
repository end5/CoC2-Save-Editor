import { CharAccessor } from "../../../Data/CharAccessor";
import { createTabBar } from "../../../Display/TabBar";
import { Component } from "../../../Display/Generic";
import { displayPowers } from "./EffectContent/Powers";
import { displayEffects } from "./EffectContent/GenericEffects";
import { hide, select, ButtonContentPair, toggleSelection } from "../../../Display/UIActions";
import { globalKeys } from "../../../GameData/GlobalKeys";

export function displayCharEffectsContent(char: CharAccessor) {
    const element = document.createElement('div');
    element.className = 'content';

    const tabBar = createTabBar('horizontal', { powers: 'Powers', perks: 'Perks', statusEffects: 'Status', combatEffects: 'Combat', boons: 'Boons' });

    element.appendChild(tabBar.element);

    const fields: Record<string, Component> = {
        powers: displayPowers(char),
        perks: displayEffects({ get: () => char.get().perks, set: (perks) => char.get().perks = perks }, globalKeys.Perks),
        statusEffects: displayEffects({ get: () => char.get().statusEffects, set: (effects) => char.get().statusEffects = effects }, globalKeys.StatusEffect),
        combatEffects: displayEffects({ get: () => char.get().combatEffects, set: (effects) => char.get().combatEffects = effects }, globalKeys.CombatEffect),
        boons: { element: document.createElement('div'), load: () => {} },
    };

    const fieldKeys = Object.keys(tabBar.buttons);
    const buttonContentPairList: ButtonContentPair[] = fieldKeys.map((key) => ({ button: tabBar.buttons[key], content: fields[key].element }));

    for (const fieldKey of fieldKeys) {
        tabBar.buttons[fieldKey].addEventListener('click', () => toggleSelection(tabBar.buttons[fieldKey], buttonContentPairList));

        // Hide everything but the first one
        if (fieldKey !== fieldKeys[0])
            hide(fields[fieldKey].element);
        else {
            select(tabBar.buttons[fieldKey]);
        }

        element.appendChild(fields[fieldKey].element);
    }

    const load = () => {
        for (const fieldKey of fieldKeys)
            fields[fieldKey].load();
    };

    return { element, load };
}
