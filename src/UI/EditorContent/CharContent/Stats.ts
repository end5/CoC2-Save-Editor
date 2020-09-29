import { Category } from "../../../Display/Fields/Category";
import { NumberField } from "../../../Display/Fields/Number";
import { Label } from "../../../Display/Fields/Label";
import { createValueLookup } from "../../../Data/ValueLookup";
import { CharType } from "../../../Data/CharTypes";

export function displayCharStats(getChar: () => CharType) {
    return new Category([{
        title: 'General',
        list: [
            new Label('HP', new NumberField(createValueLookup(getChar, 'hitPoints'))),
            new Label('HP Max Mod', new NumberField(createValueLookup(getChar, 'hitPointsMaxMod'))),
            new Label('Resolve Points', new NumberField(createValueLookup(getChar, 'resolvePoints'))),
            new Label('Resolve Points Max Mod', new NumberField(createValueLookup(getChar, 'resolveMaxMod'))),
            new Label('Threat Mod', new NumberField(createValueLookup(getChar, 'threatMod'))),
            new Label('Strength Level', new NumberField(createValueLookup(getChar, 'strengthAlloc'))),
            new Label('Strength Mod', new NumberField(createValueLookup(getChar, 'strengthMod'))),
            new Label('Toughness Level', new NumberField(createValueLookup(getChar, 'toughnessAlloc'))),
            new Label('Toughness Mod', new NumberField(createValueLookup(getChar, 'toughnessMod'))),
            new Label('Agility Level', new NumberField(createValueLookup(getChar, 'agilityAlloc'))),
            new Label('Agility Mod', new NumberField(createValueLookup(getChar, 'agilityMod'))),
            new Label('Cunning Level', new NumberField(createValueLookup(getChar, 'cunningAlloc'))),
            new Label('Cunning Mod', new NumberField(createValueLookup(getChar, 'cunningMod'))),
            new Label('Willpower Level', new NumberField(createValueLookup(getChar, 'willpowerAlloc'))),
            new Label('Willpower Mod', new NumberField(createValueLookup(getChar, 'willpowerMod'))),
            new Label('Presence Level', new NumberField(createValueLookup(getChar, 'presenceAlloc'))),
            new Label('Presence Mod', new NumberField(createValueLookup(getChar, 'presenceMod'))),
            new Label('Libido Mod', new NumberField(createValueLookup(getChar, 'libidoMod'))),
            new Label('Corruption Mod', new NumberField(createValueLookup(getChar, 'corruptionMod'))),
            new Label('Exhibition Raw', new NumberField(createValueLookup(getChar, 'exhibRaw'))),
            new Label('Feracity Raw', new NumberField(createValueLookup(getChar, 'feracityRaw'))),
            new Label('Feracity Mod', new NumberField(createValueLookup(getChar, 'feracityMod'))),
            new Label('Fertility Mod', new NumberField(createValueLookup(getChar, 'fertilityMod'))),
            new Label('Virility Mod', new NumberField(createValueLookup(getChar, 'virilityMod')))
        ]
    }, {
        title: 'Resistance',
        list: [
            new Label('Penetrating', new NumberField(createValueLookup(getChar, 'penetratingResist'))),
            new Label('Crushing', new NumberField(createValueLookup(getChar, 'crushingResist'))),
            new Label('Holy', new NumberField(createValueLookup(getChar, 'holyResist'))),
            new Label('Blight', new NumberField(createValueLookup(getChar, 'blightResist'))),
            new Label('Acid', new NumberField(createValueLookup(getChar, 'acidResist'))),
            new Label('Fire', new NumberField(createValueLookup(getChar, 'fireResist'))),
            new Label('Frost', new NumberField(createValueLookup(getChar, 'frostResist'))),
            new Label('Storm', new NumberField(createValueLookup(getChar, 'stormResist'))),
            new Label('Tease', new NumberField(createValueLookup(getChar, 'teaseResist'))),
            new Label('Drug', new NumberField(createValueLookup(getChar, 'drugResist'))),
            new Label('Pheromone', new NumberField(createValueLookup(getChar, 'pheromoneResist'))),
            new Label('Fatigue', new NumberField(createValueLookup(getChar, 'fatigueResist'))),
            new Label('Mind', new NumberField(createValueLookup(getChar, 'mindResist')))
        ]
    }]);
}
