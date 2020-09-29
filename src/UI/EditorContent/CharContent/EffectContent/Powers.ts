import { createCheckBoxEl } from "../../../../Display/Input";
import { FilterBarHTML, FilterBar } from "../../../../Display/Fields/FilterBar";
import { spaceAndCapText } from "../../../../Display/Input";
import { globalKeys } from "../../../../GameData/GlobalKeys";
import { FieldHTML, Field } from "../../../../Display/HTMLGenerics";
import { disable, enable } from "../../../../Display/UIActions";
import { CharType } from "../../../../Data/CharTypes";

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
    public constructor(public readonly key: string, private readonly getChar: () => CharType) {
        this.html = new PowerFieldHTML();
        this.html.title.textContent = key;
    }

    public enable() {
        this.html.known.disabled = false;
        this.html.equip.disabled = false;
        this.html.known.checked = !!this.getChar().powers.find((power) => power?.key === this.key) ?? false;
        this.html.equip.checked = !!this.getChar().equippedPowers.find((power) => power?.key === this.key) ?? false;
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

    public constructor() {
        // Element creation
        this.element = document.createElement('div');
        this.element.className = 'powers content boxed';

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

    public constructor(getChar: () => CharType) {
        this.html = new PowersFieldHTML();

        const set = new Set();
        for (const powerInfo of globalKeys.Powers) {
            let name = powerInfo.name;
            if (set.has(name))
                name = spaceAndCapText(powerInfo.value + '');

            if (set.has(name)) {
                console.log('Power name:', powerInfo.name, 'value:', powerInfo.value, 'already exists. Skipping.');
                continue;
            }

            const powerField = new PowerField(name, getChar);
            powerField.html.known.addEventListener('click', knownOnClick(getChar, name));
            powerField.html.equip.addEventListener('click', equipOnClick(getChar, name));
            this.html.tableBody.appendChild(powerField.html.element);

            this.powerFields.push(powerField);
        }

        const filterList = this.powerFields.map((entry) => ({ key: entry.key, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);
    }

    public enable() {
        enable(this.filterBar.html.element);
        enable(this.html.tableBody);

        for (const entry of this.powerFields)
            entry.enable();

        this.filterBar.enable();
    }

    public disable() {
        disable(this.filterBar.html.element);
        disable(this.html.tableBody);

        for (const entry of this.powerFields)
            entry.disable();

        this.filterBar.disable();
    }
}

function knownOnClick(getChar: () => CharType, key: string) {
    return function (this: HTMLInputElement) {
        const powers = getChar().powers;
        if (this.checked)
            powers.push({ key });
        else {
            const index = powers.findIndex((value) => value?.key === key);
            if (~index)
                getChar().powers = powers.splice(index, 1);
        }
    };
}

function equipOnClick(getChar: () => CharType, key: string) {
    return function (this: HTMLInputElement) {
        const equipped = getChar().equippedPowers;
        const index = equipped.findIndex((value) => value?.key === key);
        if (this.checked) {
            if (~index)
                equipped[index] = { key };
            else
                for (let emptyIndex = 0; emptyIndex < equipped.length; emptyIndex++)
                    if (equipped[emptyIndex] == null)
                        equipped[emptyIndex] = { key };
        }
        else {
            if (~index)
                equipped[index] = undefined;
        }
    };
}
