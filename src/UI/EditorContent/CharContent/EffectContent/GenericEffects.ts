import { createCheckBoxEl } from "../../../../Display/Input";
import { createFilterBar } from "../../../../Display/FilterBar";
import { GenericInfo } from "../../../../Data/Globals";
import { NumberField, createFieldLabel } from "../../../../Display/Fields";
import { EffectType } from "../../../../GameData/CharTypes";
import { select, deselect } from "../../../../Display/UIActions";

export interface EffectsAccess {
    get: () => EffectType[];
    set: (effects: EffectType[]) => void;
}

class SelectedFields {
    public effect?: EffectField;
}

const MAX_EFFECT_VALUES = 6;

export function displayEffects(effects: EffectsAccess, infoList: GenericInfo[]) {
    // Values for logic
    const selected = new SelectedFields();
    const effectRecord: Record<string, EffectField> = {};
    const effectValueFields: NumberField[] = [];
    //

    // Element creation
    const element = document.createElement('div');
    element.className = 'effects content';

    // Filter Bar
    const filterBar = createFilterBar(effectRecord);
    element.appendChild(filterBar);

    // Effect Table
    const tableEl = document.createElement('table');
    element.appendChild(tableEl);

    // Table Head
    const tableHead = document.createElement('thead');
    tableEl.appendChild(tableHead);

    const labelRow = document.createElement('tr');
    tableHead.appendChild(labelRow);

    const equippedLabel = document.createElement('th');
    equippedLabel.textContent = 'Equipped';
    labelRow.appendChild(equippedLabel);

    const nameLabel = document.createElement('th');
    nameLabel.textContent = 'Name';
    labelRow.appendChild(nameLabel);
    //

    const tableBody = document.createElement('tbody');
    tableEl.appendChild(tableBody);

    for (const effectInfo of infoList) {
        const effectField = new EffectField(effectInfo.name);
        effectField.element.addEventListener('click', () => {
            if (selected.effect)
                deselect(selected.effect.element);

            selected.effect = effectField;
            select(effectField.element);

            for (const effectValue of effectValueFields)
                effectValue.load();
        });
        effectField.equipCheckbox.addEventListener('click', equipOnClick(effects, effectInfo.name));
        tableBody.appendChild(effectField.element);

        effectRecord[effectInfo.name] = effectField;
    }

    // Item Attribute List
    const effectValuesList = document.createElement('div');
    effectValuesList.className = 'item-attr';
    element.appendChild(effectValuesList);

    const getEffectIndex = () => effects.get().findIndex((effect) => effect.key === selected.effect?.key);

    for (let index = 0; index < MAX_EFFECT_VALUES; index++) {
        // Item Attribute
        const effectValue = new NumberField('Value ' + (index + 1),
            () => {
                const effectIndex = getEffectIndex();
                if (~effectIndex)
                    return effects.get()[effectIndex].values[index];
                else
                    return undefined;
            },
            (value) => {
                const effectIndex = getEffectIndex();
                if (~effectIndex)
                    effects.get()[effectIndex].values[index] = value;
            });
        effectValuesList.appendChild(effectValue.element);

        effectValueFields.push(effectValue);
    }

    const load = () => {
        // Clear everything
        for (const key of Object.keys(effectRecord)) {
            const effectField = effectRecord[key];
            effectField.unequip();
        }

        // Set equipped effects
        for (const effect of effects.get())
            if (effect && effectRecord[effect.key])
                effectRecord[effect.key].equipped();

        for (const effectValue of effectValueFields)
            effectValue.load();

    };

    return { element, load };
}

class EffectField {
    public readonly element: HTMLElement;
    public readonly key: string;
    public readonly equipCheckbox: HTMLInputElement;

    public constructor(key: string) {
        this.key = key;

        this.element = document.createElement('tr');

        const equipCell = document.createElement('td');
        this.element.appendChild(equipCell);

        this.equipCheckbox = createCheckBoxEl();
        equipCell.appendChild(this.equipCheckbox);

        const titleCell = document.createElement('td');
        this.element.appendChild(titleCell);

        const title = createFieldLabel(key);
        titleCell.appendChild(title);
    }

    public equip() { this.equipCheckbox.checked = true; }
    public unequip() { this.equipCheckbox.checked = false; }
    public equipped() { return this.equipCheckbox.checked; }
}

function equipOnClick(effects: EffectsAccess, key: string) {
    return function (this: HTMLInputElement) {
        const equipped = effects.get();
        const index = equipped.findIndex((value) => value?.key === key);
        if (this.checked) {
            if (~index) {
                equipped[index] = { key, values: [] };
            }
            else {
                equipped.push({ key, values: [] });
            }
        }
        else {
            if (~index)
                effects.set(equipped.splice(index, 1));
        }
    };
}
