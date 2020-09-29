import { PowersField } from "./EffectContent/Powers";
import { EffectsField } from "./EffectContent/GenericEffects";
import { globalKeys } from "../../../GameData/GlobalKeys";
import { displayBoon } from "./EffectContent/Boon";
import { TabbedContent } from "../../../Display/Fields/TabbedContent";
import { createValueLookup } from "../../../Data/ValueLookup";
import { CharType } from "../../../Data/CharTypes";

export function displayCharEffectsContent(getChar: () => CharType) {
    return new TabbedContent([{
        key: 'powers',
        title: 'Powers',
        content: new PowersField(getChar),
    }, {
        key: 'perks',
        title: 'Perks',
        content: new EffectsField(createValueLookup(getChar, 'perks'), globalKeys.Perks),
    }, {
        key: 'statusEffects',
        title: 'Status',
        content: new EffectsField(createValueLookup(getChar, 'statusEffects'), globalKeys.StatusEffect),
    }, {
        key: 'combatEffects',
        title: 'Combat',
        content: new EffectsField(createValueLookup(getChar, 'combatEffects'), globalKeys.CombatEffect),
    }, {
        key: 'boon',
        title: 'Boon',
        content: displayBoon(getChar)
    }]);
}
