import { createCheckBoxEl } from "../../../../Display/Input";
import { FilterBarHTML, FilterBar } from "../../../../Display/Fields/FilterBar";
import { spaceAndCapText } from "../../../../Display/Input";
import { globalKeys } from "../../../../GameData/GlobalKeys";
import { FieldHTML, Field } from "../../../../Display/HTMLGenerics";
import { disable, enable } from "../../../../Display/UIActions";
import { CharType } from "../../../../Data/CharTypes";
import { MAX_POWER_EQUIP_SLOTS, createPower } from "../../../../Data/Char";
import { ValueLookup } from "../../../../Data/ValueLookup";

class PowerFieldHTML implements FieldHTML<HTMLTableRowElement> {
    public readonly element: HTMLTableRowElement;
    public readonly title: HTMLTableDataCellElement;
    public readonly known: HTMLInputElement;
    public readonly equip: HTMLInputElement;

    public constructor() {
        this.element = document.createElement('tr');

        const knownCell = document.createElement('td');
        this.element.appendChild(knownCell);

        this.known = createCheckBoxEl();
        knownCell.appendChild(this.known);

        const equipCell = document.createElement('td');
        this.element.appendChild(equipCell);

        this.equip = createCheckBoxEl();
        equipCell.appendChild(this.equip);

        this.title = document.createElement('td');
        this.element.appendChild(this.title);
    }
}

class PowerField implements Field {
    public readonly html: PowerFieldHTML;
    public constructor(
        public readonly key: string,
        text: string,
        private readonly hasEmptyEquippedSlot: () => boolean,
        private readonly powersLookup: ValueLookup<CharType['powers']>,
        private readonly equippedPowersLookup: ValueLookup<CharType['equippedPowers']>
    ) {
        this.html = new PowerFieldHTML();
        this.html.title.textContent = text;
    }

    public enable() {
        this.html.known.disabled = false;
        this.html.equip.disabled = !this.html.equip.checked && !this.hasEmptyEquippedSlot();
        this.html.known.checked = !!this.powersLookup.get().find((power) => power?.key === this.key);
        this.html.equip.checked = !!this.equippedPowersLookup.get().find((power) => power?.key === this.key);
    }

    public disable() {
        this.html.known.disabled = true;
        this.html.equip.disabled = true;
        this.html.known.checked = false;
        this.html.equip.checked = false;
    }
}

class PowersFieldHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly filterBar: FilterBarHTML;
    public readonly tableBody: HTMLTableSectionElement;
    public readonly equipped: HTMLUListElement;

    public constructor() {
        // Element creation
        this.element = document.createElement('div');
        this.element.className = 'powers content boxed';

        this.equipped = document.createElement('ul');

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

        const knownLabel = document.createElement('th');
        knownLabel.textContent = 'Known';
        labelRow.appendChild(knownLabel);

        const equippedLabel = document.createElement('th');
        equippedLabel.textContent = 'Equipped';
        labelRow.appendChild(equippedLabel);

        const nameLabel = document.createElement('th');
        nameLabel.textContent = 'Name';
        labelRow.appendChild(nameLabel);
        //

        this.tableBody = document.createElement('tbody');
        tableEl.appendChild(this.tableBody);
    }
}

export class PowersField implements Field {
    public readonly html: PowersFieldHTML;
    private powerFields: PowerField[] = [];
    private filterBar: FilterBar;

    public constructor(
        readonly powersLookup: ValueLookup<CharType['powers']>,
        private readonly equippedPowersLookup: ValueLookup<CharType['equippedPowers']>
    ) {
        this.html = new PowersFieldHTML();

        const hasEmptyEquipSlot = () => indexOfEmptyEquipSlot() < MAX_POWER_EQUIP_SLOTS;
        const indexOfEmptyEquipSlot = () => {
            const equipped = this.equippedPowersLookup.get();
            let nextEmptyIndex = 0;
            for (; nextEmptyIndex < MAX_POWER_EQUIP_SLOTS; nextEmptyIndex++)
                if (equipped[nextEmptyIndex] == null)
                    break;
            return nextEmptyIndex;
        };

        const set = new Set<string>();
        for (const powerInfo of globalKeys.Powers) {
            const name = spaceAndCapText(powerInfo.value + '');
            if (!set.has(name))
                set.add(name);
            else {
                console.log(powerInfo.name, '/', name, 'already exists. Skipping.');
                continue;
            }

            const powerField = new PowerField(powerInfo.value, name, hasEmptyEquipSlot, powersLookup, equippedPowersLookup);

            powerField.html.known.addEventListener('click', function () {
                const powers = powersLookup.get();
                const index = powers.findIndex((value) => value?.key === powerInfo.value);
                if (this.checked && !~index)
                    powers.push(createPower(powerInfo.value));
                else if (!this.checked && ~index)
                    powers.splice(index, 1);
            });

            powerField.html.equip.addEventListener('click', () => {
                const equipped = equippedPowersLookup.get();
                const index = equipped.findIndex((value) => value?.key === powerInfo.value);
                const checked = powerField.html.equip.checked;

                if (checked) {
                    if (~index) {
                        equipped[index] = createPower(powerInfo.value);
                    }
                else {
                    const idx = indexOfEmptyEquipSlot();
                    if (idx < MAX_POWER_EQUIP_SLOTS) {
                            equipped[idx] = createPower(powerInfo.value);
                    }
                    }
                }
                else {
                    equipped[index] = undefined;
                }

                for (const entry of this.powerFields)
                    entry.enable();
            });
            this.html.tableBody.appendChild(powerField.html.element);

            this.powerFields.push(powerField);
        }

        const filterList = this.powerFields.map((entry) => ({ key: entry.key, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);
    }

    public enable() {
        enable(this.filterBar.html.element);
        enable(this.html.tableBody);

        this.filterBar.enable();

        for (const entry of this.powerFields)
            entry.enable();
    }

    public disable() {
        disable(this.filterBar.html.element);
        disable(this.html.tableBody);

        for (const entry of this.powerFields)
            entry.disable();

        this.filterBar.disable();
    }
}
