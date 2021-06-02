import { PowersField } from "./EffectContent/Powers";
import { EffectsField } from "./EffectContent/GenericEffects";
import { globalKeys } from "../../../GameData/GlobalKeys";
import { displayBoon } from "./EffectContent/Boon";
import { TabbedContent } from "../../../Display/Fields/TabbedContent";
import { createValueLookup } from "../../../Data/ValueLookup";
import { CharType } from "../../../Data/CharTypes";
import { PerksField } from "./EffectContent/Perks";

export function displayCharEffectsContent(getChar: () => CharType) {
    return new TabbedContent([{
        key: 'powers',
        title: 'Powers',
        content: new PowersField(createValueLookup(getChar, 'powers'), createValueLookup(getChar, 'equippedPowers')),
    }, {
        key: 'perks',
        title: 'Perks',
        content: new PerksField('perks', globalKeys.Perks, createValueLookup(getChar, 'perks')),
    }, {
        key: 'statusEffects',
        title: 'Status',
        content: new EffectsField('status', globalKeys.StatusEffect, createValueLookup(getChar, 'statusEffects')),
    }, {
        key: 'combatEffects',
        title: 'Combat',
        content: new EffectsField('combat', globalKeys.CombatEffect, createValueLookup(getChar, 'combatEffects')),
    }, {
        key: 'boon',
        title: 'Boon',
        content: displayBoon(getChar)
    }]);
}
