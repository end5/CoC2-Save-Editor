import { createCheckBoxEl } from "../../../../Display/Input";
import { FilterBarHTML, FilterBar } from "../../../../Display/Fields/FilterBar";
import { GenericInfo } from "../../../../Data/GenericInfo";
import { EffectType } from "../../../../Data/CharTypes";
import { enable, disable } from "../../../../Display/UIActions";
import { FieldHTML, Field } from "../../../../Display/HTMLGenerics";
import { NumberField } from "../../../../Display/Fields/Number";
import { Label } from "../../../../Display/Fields/Label";
import { ValueLookup } from "../../../../Data/ValueLookup";
import { MAX_EFFECT_VALUES, createEffect } from "../../../../Data/Char";

class EffectFieldHTML implements FieldHTML<HTMLTableRowElement> {
    public readonly element: HTMLTableRowElement;
    public readonly equip: HTMLInputElement;
    public readonly radio: HTMLInputElement;
    public readonly title: HTMLLabelElement;

    public constructor() {
        this.element = document.createElement('tr');

        const equipCell = document.createElement('td');
        this.element.appendChild(equipCell);

        this.equip = createCheckBoxEl();
        equipCell.appendChild(this.equip);

        const tableCell = document.createElement('td');
        this.element.appendChild(tableCell);

        this.radio = document.createElement('input');
        this.radio.type = 'radio';
        this.title = document.createElement('label');

        tableCell.appendChild(this.radio);
        tableCell.appendChild(this.title);
    }
}

class EffectField<K extends string> implements Field {
    public readonly html: EffectFieldHTML;

    public constructor(
        public readonly key: string,
        text: string,
        private effectsLookup: ValueLookup<EffectType<K>[]>
    ) {
        this.html = new EffectFieldHTML();
        this.html.title.textContent = text;
        this.html.radio.id = key + '-' + text;
        this.html.title.htmlFor = this.html.radio.id;
    }

    public enable() {
        this.html.equip.disabled = false;
        this.html.equip.checked = !!this.effectsLookup.get().find((effect) => effect?.key === this.key);
        this.html.radio.disabled = !this.html.equip.checked;
    }

    public disable() {
        this.html.equip.disabled = true;
        this.html.equip.checked = false;
        this.html.radio.disabled = true;
    }
}

class EffectsFieldHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly filterBar: FilterBarHTML;
    public readonly tableBody: HTMLTableSectionElement;
    public readonly attrs: HTMLDivElement;

    public constructor() {
        // Element creation
        this.element = document.createElement('div');
        this.element.className = 'effects content boxed';

        // Filter Bar
        this.filterBar = new FilterBarHTML();
        this.element.appendChild(this.filterBar.element);

        const tableScroll = document.createElement('div');
        tableScroll.className = 'table-scroll';
        this.element.appendChild(tableScroll);

        const tableEl = document.createElement('table');
        tableScroll.appendChild(tableEl);

        // Table Head
        const tableHead = document.createElement('thead');
        tableEl.appendChild(tableHead);

        const labelRow = document.createElement('tr');
        tableHead.appendChild(labelRow);

        const activeLabel = document.createElement('th');
        activeLabel.textContent = 'Active';
        labelRow.appendChild(activeLabel);

        const nameLabel = document.createElement('th');
        nameLabel.textContent = 'Name';
        labelRow.appendChild(nameLabel);
        //

        this.tableBody = document.createElement('tbody');
        tableEl.appendChild(this.tableBody);

        this.attrs = document.createElement('div');
        this.attrs.className = 'item-attr';
        this.element.appendChild(this.attrs);
    }
}

// class EffectAttrLabel extends Label<FieldWithValue<NullableValueLookup<number>>> {
//     public constructor(
//         private index: number,
//         field: FieldWithValue<NullableValueLookup<number>>
//     ) {
//         super('Value ' + (index + 1), field);
//     }

//     public enable() {

//         this.html.label.textContent = 'Value ' + (this.index + 1);

//         super.enable();
//     }
// }

export class EffectsField<K extends string, G extends GenericInfo<K> = GenericInfo<K>> implements Field {
    public readonly html: EffectsFieldHTML;
    private effectFields: EffectField<K>[] = [];
    private attrFields: Label<NumberField>[] = [];
    private filterBar: FilterBar;
    private selected?: EffectField<K>;

    public constructor(name: string, infoList: readonly G[], effectsLookup: ValueLookup<EffectType<K>[]>) {
        this.html = new EffectsFieldHTML();

        for (const effectInfo of infoList) {
            const effectField = new EffectField(effectInfo.value, effectInfo.name, effectsLookup);

            effectField.html.equip.addEventListener('click', () => {
                const effects = effectsLookup.get();
                const index = effects.findIndex((value) => value?.key === effectInfo.value);
                const checked = effectField.html.equip.checked;

                if (checked) {
                    if (!~index)
                        effects.push(createEffect(effectInfo.value));

                    effectField.html.radio.disabled = false;
                    effectField.html.radio.click();
                }
                else {
                    if (~index)
                        effects.splice(index, 1);

                    if (this.selected === effectField)
                        this.selected = undefined;
                    effectField.html.radio.disabled = true;
                    effectField.html.radio.checked = false;
                }
            });

            effectField.html.radio.name = name;
            effectField.html.radio.addEventListener('click', () => {
                this.selected = effectField;

                for (const field of this.attrFields)
                    field.enable();
            });

            this.html.tableBody.appendChild(effectField.html.element);

            this.effectFields.push(effectField);
        }

        const filterList = this.effectFields.map((entry) => ({ key: entry.key, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);

        // Item Attribute List

        const getSelectedEffectIndex = () => effectsLookup.get().findIndex((effect) => effect.key === this.selected?.key);

        for (let index = 0; index < MAX_EFFECT_VALUES; index++) {
            const attrField = new Label('Value ' + (index + 1),
                new NumberField(
                    {
                        get: () => {
                            const effectIndex = getSelectedEffectIndex();
                            if (~effectIndex)
                                return effectsLookup.get()[effectIndex].values[index] ?? 0;
                            else
                                return 0;
                        },
                        set: (newValue) => {
                            const effectIndex = getSelectedEffectIndex();
                            if (~effectIndex)
                                effectsLookup.get()[effectIndex].values[index] = newValue;
                        }
                    }
                ));
            this.attrFields.push(attrField);
            this.html.attrs.appendChild(attrField.html.element);
        }
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
