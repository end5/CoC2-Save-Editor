import { createCheckBoxEl } from "../../../../Display/Input";
import { FilterBarHTML, FilterBar } from "../../../../Display/Fields/FilterBar";
import { GenericInfo, sortGenericInfo } from "../../../../Data/GenericInfo";
import { PerkType } from "../../../../Data/CharTypes";
import { enable, disable } from "../../../../Display/UIActions";
import { FieldHTML, Field } from "../../../../Display/HTMLGenerics";
import { NumberField } from "../../../../Display/Fields/Number";
import { Label } from "../../../../Display/Fields/Label";
import { ValueLookup } from "../../../../Data/ValueLookup";
import { MAX_EFFECT_VALUES, createPerk } from "../../../../Data/Char";

class PerkFieldHTML implements FieldHTML<HTMLTableRowElement> {
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

class PerkField<K extends string> implements Field {
    public readonly html: PerkFieldHTML;

    public constructor(
        public readonly key: string,
        text: string,
        private perksLookup: ValueLookup<PerkType<K>[]>
    ) {
        this.html = new PerkFieldHTML();
        this.html.title.textContent = text;
        this.html.radio.id = key + '-' + text;
        this.html.title.htmlFor = this.html.radio.id;
    }

    public enable() {
        this.html.equip.disabled = false;
        this.html.equip.checked = !!this.perksLookup.get().find((perk) => perk?.key === this.key);
        this.html.radio.disabled = !this.html.equip.checked;
    }

    public disable() {
        this.html.equip.disabled = true;
        this.html.equip.checked = false;
        this.html.radio.disabled = true;
    }
}

class PerksFieldHTML implements FieldHTML<HTMLDivElement> {
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

// class PerkAttrLabel extends Label<FieldWithValue<NullableValueLookup<number>>> {
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

export class PerksField<K extends string, G extends GenericInfo<K> = GenericInfo<K>> implements Field {
    public readonly html: PerksFieldHTML;
    private perkFields: PerkField<K>[] = [];
    private attrFields: Label<NumberField>[] = [];
    private filterBar: FilterBar;
    private selected?: PerkField<K>;

    public constructor(name: string, infoList: readonly G[], perksLookup: ValueLookup<PerkType<K>[]>) {
        this.html = new PerksFieldHTML();

        const sortedInfoList = sortGenericInfo(infoList);
        for (const perkInfo of sortedInfoList) {
            const perkField = new PerkField(perkInfo.value, perkInfo.name, perksLookup);

            perkField.html.equip.addEventListener('click', () => {
                const perks = perksLookup.get();
                const index = perks.findIndex((value) => value?.key === perkInfo.value);
                const checked = perkField.html.equip.checked;

                if (checked) {
                    if (!~index)
                        perks.push(createPerk(perkInfo.value));

                    perkField.html.radio.disabled = false;
                    perkField.html.radio.click();
                }
                else {
                    if (~index)
                        perks.splice(index, 1);

                    if (this.selected === perkField)
                        this.selected = undefined;
                    perkField.html.radio.disabled = true;
                    perkField.html.radio.checked = false;
                }
            });

            perkField.html.radio.name = name;
            perkField.html.radio.addEventListener('click', () => {
                this.selected = perkField;

                for (const field of this.attrFields)
                    field.enable();
            });

            this.html.tableBody.appendChild(perkField.html.element);

            this.perkFields.push(perkField);
        }

        const filterList = this.perkFields.map((entry) => ({ key: entry.key, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);

        // Item Attribute List

        const getSelectedPerkIndex = () => perksLookup.get().findIndex((perk) => perk.key === this.selected?.key);

        for (let index = 0; index < MAX_EFFECT_VALUES; index++) {
            const attrField = new Label('Value ' + (index + 1),
                new NumberField(
                    {
                        get: () => {
                            const perkIndex = getSelectedPerkIndex();
                            if (~perkIndex)
                                return perksLookup.get()[perkIndex].values[index] ?? 0;
                            else
                                return 0;
                        },
                        set: (newValue) => {
                            const perkIndex = getSelectedPerkIndex();
                            if (~perkIndex)
                                perksLookup.get()[perkIndex].values[index] = newValue;
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

        for (const field of this.perkFields)
            field.enable();

        this.filterBar.enable();

        for (const field of this.attrFields)
            field.enable();
    }

    public disable() {
        disable(this.filterBar.html.element);
        disable(this.html.tableBody);

        for (const field of this.perkFields)
            field.disable();

        this.filterBar.disable();

        for (const field of this.attrFields)
            field.disable();
    }
}
