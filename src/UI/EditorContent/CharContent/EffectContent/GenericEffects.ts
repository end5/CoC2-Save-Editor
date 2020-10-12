import { createCheckBoxEl } from "../../../../Display/Input";
import { FilterBarHTML, FilterBar } from "../../../../Display/Fields/FilterBar";
import { GenericInfo } from "../../../../Data/GenericInfo";
import { EffectType } from "../../../../Data/CharTypes";
import { select, deselect, enable, disable } from "../../../../Display/UIActions";
import { FieldHTML, Field } from "../../../../Display/HTMLGenerics";
import { NumberField, NumberFieldHTML } from "../../../../Display/Fields/Number";
import { Label } from "../../../../Display/Fields/Label";
import { ValueLookup } from "../../../../Data/ValueLookup";
import { MAX_EFFECT_VALUES } from "../../../../Data/Char";

class EffectFieldHTML implements FieldHTML<HTMLTableRowElement> {
    public readonly element: HTMLTableRowElement;
    public readonly equip: HTMLInputElement;
    public readonly title: HTMLTableDataCellElement;

    public constructor() {
        this.element = document.createElement('tr');

        const equipCell = document.createElement('td');
        this.element.appendChild(equipCell);

        this.equip = createCheckBoxEl();
        equipCell.appendChild(this.equip);

        this.title = document.createElement('td');
        this.element.appendChild(this.title);
    }
}

class EffectField implements Field {
    public readonly html: EffectFieldHTML;

    public constructor(public readonly key: string, private value: ValueLookup<EffectType[]>) {
        this.html = new EffectFieldHTML();
        this.html.title.textContent = key;
    }

    public enable() {
        this.html.equip.disabled = false;
        this.html.equip.checked = !!this.value.get().find((effect) => effect?.key === this.key);
    }

    public disable() {
        this.html.equip.disabled = true;
        this.html.equip.checked = false;
    }
}

class EffectsFieldHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly filterBar: FilterBarHTML;
    public readonly tableBody: HTMLTableSectionElement;
    public readonly effectValues: HTMLDivElement;
    public readonly attrFields: NumberFieldHTML[] = [];

    public constructor() {
        // Element creation
        this.element = document.createElement('div');
        this.element.className = 'effects content boxed';

        // Filter Bar
        this.filterBar = new FilterBarHTML();
        this.element.appendChild(this.filterBar.element);

        // Power Table
        const tableEl = document.createElement('table');
        this.element.appendChild(tableEl);

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

        this.tableBody = document.createElement('tbody');
        tableEl.appendChild(this.tableBody);

        this.effectValues = document.createElement('div');
        this.effectValues.className = 'item-attr';
        this.element.appendChild(this.effectValues);

        for (let index = 0; index < MAX_EFFECT_VALUES; index++) {
            const attr = new NumberFieldHTML();
            this.attrFields.push(attr);
            this.effectValues.appendChild(attr.element);
        }
    }
}

export class EffectsField<T, G extends GenericInfo<T> = GenericInfo<T>> implements Field {
    public readonly html: EffectsFieldHTML;
    private effectFields: EffectField[] = [];
    private attrFields: Label[];
    private filterBar: FilterBar;
    private selected?: EffectField;

    public constructor(value: ValueLookup<EffectType[]>, infoList: G[]) {
        this.html = new EffectsFieldHTML();

        for (const effectInfo of infoList) {
            const effectField = new EffectField(effectInfo.name, value);
            effectField.html.element.addEventListener('click', () => {
                if (this.selected)
                    deselect(this.selected.html.element);

                this.selected = effectField;
                select(effectField.html.element);

                for (const field of this.attrFields)
                    field.enable();
            });
            effectField.html.equip.addEventListener('click', equipOnClick(value, effectInfo.name));
            this.html.tableBody.appendChild(effectField.html.element);

            this.effectFields.push(effectField);
        }

        const filterList = this.effectFields.map((entry) => ({ key: entry.key, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);

        // Item Attribute List

        const getEffectIndex = () => value.get().findIndex((effect) => effect.key === this.selected?.key);

        this.attrFields = this.html.attrFields.map((html, index) =>
            new Label('Value ' + (index + 1),
                new NumberField(
                    {
                        get: () => {
                            const effectIndex = getEffectIndex();
                            if (~effectIndex)
                                return value.get()[effectIndex].values[index] ?? 0;
                            else
                                return 0;
                        },
                        set: (newValue) => {
                            const effectIndex = getEffectIndex();
                            if (~effectIndex)
                                value.get()[effectIndex].values[index] = newValue;
                        }
                    },
                    html
                )));
    }

    public enable() {
        enable(this.filterBar.html.element);
        enable(this.html.tableBody);

        for (const field of this.effectFields)
            field.enable();

        this.filterBar.enable();

        for (const field of this.attrFields)
            field.enable();
    }

    public disable() {
        disable(this.filterBar.html.element);
        disable(this.html.tableBody);

        for (const field of this.effectFields)
            field.disable();

        this.filterBar.disable();

        for (const field of this.attrFields)
            field.disable();
    }
}

function equipOnClick(effects: ValueLookup<EffectType[]>, key: string) {
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
