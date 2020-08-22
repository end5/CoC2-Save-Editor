import { CharAccessor } from "../../../../Data/CharAccessor";
import { createCheckBoxEl } from "../../../../Display/Input";
import { createFilterBar } from "../../../../Display/FilterBar";
import { spaceAndCapText } from "../../../../Display/Generic";
import { createFieldLabel } from "../../../../Display/Fields";
import { globalKeys } from "../../../../GameData/GlobalKeys";

export function displayPowers(char: CharAccessor) {
    // Values for logic
    const powerRecords: Record<string, PowerField> = {};
    //

    // Element creation
    const element = document.createElement('div');
    element.className = 'powers content';

    // Filter Bar
    const filterBar = createFilterBar(powerRecords);
    element.appendChild(filterBar);

    // Power Table
    const tableEl = document.createElement('table');
    element.appendChild(tableEl);

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

    const tableBody = document.createElement('tbody');
    tableEl.appendChild(tableBody);

    for (const powerInfo of globalKeys.Powers) {
        let name = powerInfo.name;
        if (powerRecords[name] != null)
            name = spaceAndCapText(powerInfo.value + '');

        if (powerRecords[name] != null) {
            console.log('Power name:', powerInfo.name, 'value:', powerInfo.value, 'already exists. Skipping.');
            continue;
        }

        const powerField = new PowerField(name);
        powerField.knownCheckbox.addEventListener('click', knownOnClick(char, name));
        powerField.equipCheckbox.addEventListener('click', equipOnClick(char, name));
        tableBody.appendChild(powerField.element);

        powerRecords[name] = powerField;
    }

    const load = () => {
        // Clear everything
        for (const key of Object.keys(powerRecords)) {
            const powerField = powerRecords[key];
            powerField.unlearn();
            powerField.unequip();
        }

        // Set known powers
        for (const power of char.get().powers)
            if (power && powerRecords[power.key])
                powerRecords[power.key].known();

        // Set equipped powers
        for (const power of char.get().equippedPowers)
            if (power && powerRecords[power.key])
                powerRecords[power.key].equipped();

    };

    return { element, load };
}

class PowerField {
    public readonly element: HTMLElement;
    public readonly key: string;
    public readonly knownCheckbox: HTMLInputElement;
    public readonly equipCheckbox: HTMLInputElement;

    public constructor(key: string) {
        this.key = key;

        this.element = document.createElement('tr');

        const knownCell = document.createElement('td');
        this.element.appendChild(knownCell);

        this.knownCheckbox = createCheckBoxEl();
        knownCell.appendChild(this.knownCheckbox);

        const equipCell = document.createElement('td');
        this.element.appendChild(equipCell);

        this.equipCheckbox = createCheckBoxEl();
        equipCell.appendChild(this.equipCheckbox);

        const titleCell = document.createElement('td');
        this.element.appendChild(titleCell);

        const title = createFieldLabel(key);
        titleCell.appendChild(title);
    }

    public learn() { this.knownCheckbox.checked = true; }
    public unlearn() { this.knownCheckbox.checked = false; }
    public known() { return this.knownCheckbox.checked; }

    public equip() { this.equipCheckbox.checked = true; }
    public unequip() { this.equipCheckbox.checked = false; }
    public equipped() { return this.equipCheckbox.checked; }
}

function knownOnClick(char: CharAccessor, key: string) {
    return function (this: HTMLInputElement) {
        const powers = char.get().powers;
        if (this.checked)
            powers.push({ key });
        else {
            const index = powers.findIndex((value) => value?.key === key);
            if (~index)
                char.get().powers = powers.splice(index, 1);
        }
    };
}

function equipOnClick(char: CharAccessor, key: string) {
    return function (this: HTMLInputElement) {
        const equipped = char.get().equippedPowers;
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
