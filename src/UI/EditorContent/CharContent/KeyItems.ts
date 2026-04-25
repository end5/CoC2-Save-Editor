import { createKeyItem } from "../../../Data/Char";
import { CharType } from "../../../Data/CharTypes";
import { sortGenericInfo } from "../../../Data/GenericInfo";
import { ValueLookup } from "../../../Data/ValueLookup";
import { FilterBar, FilterBarHTML } from "../../../Display/Fields/FilterBar";
import { createTextInput, Field, FieldHTML } from "../../../Display/HTMLGenerics";
import { createCheckBoxEl } from "../../../Display/Input";
import { disable, enable } from "../../../Display/UIActions";
import { globalKeys } from "../../../GameData/GlobalKeys";

class KeyItemFieldHTML implements FieldHTML<HTMLTableRowElement> {
    public readonly element: HTMLTableRowElement;
    public readonly owns: HTMLInputElement;
    public readonly title: HTMLTableDataCellElement;
    public readonly input: HTMLInputElement;

    public constructor() {
        this.element = document.createElement('tr');

        const ownsCell = document.createElement('td');
        this.element.appendChild(ownsCell);
        this.owns = createCheckBoxEl();
        ownsCell.appendChild(this.owns);

        this.title = document.createElement('td');
        this.element.appendChild(this.title);

        const state = document.createElement('td');
        this.element.appendChild(state);
        this.input = createTextInput();
        state.appendChild(this.input);
    }
}

class KeyItemField implements Field {
    public readonly html: KeyItemFieldHTML;
    public constructor(
        public readonly key: string,
        text: string,
        private readonly keyItemLookup: ValueLookup<CharType['keyItems']>
    ) {
        this.html = new KeyItemFieldHTML();
        this.html.title.textContent = text;
        this.html.input.value = '';
    }

    public enable() {
        this.html.owns.disabled = false;
        const keyItem = this.keyItemLookup.get().find((keyItem) => keyItem?.key === this.key);
        this.html.owns.checked = !!keyItem;
        this.html.input.disabled = !this.html.owns.checked;
        this.html.input.value = keyItem ? keyItem.state + '' : '';
    }
    
    public disable() {
        this.html.owns.disabled = true;
        this.html.owns.checked = false;
        this.html.input.disabled = !this.html.owns.checked;
        this.html.input.value = '';
    }
}

class KeyItemsFieldHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly filterBar: FilterBarHTML;
    public readonly tableBody: HTMLTableSectionElement;
    public readonly equipped: HTMLUListElement;

    public constructor() {
        // Element creation
        this.element = document.createElement('div');
        this.element.className = 'keyItems content boxed';

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

        const ownsLabel = document.createElement('th');
        ownsLabel.textContent = 'Own';
        labelRow.appendChild(ownsLabel);

        const nameLabel = document.createElement('th');
        nameLabel.textContent = 'Name';
        labelRow.appendChild(nameLabel);
        
        const stateLabel = document.createElement('th');
        stateLabel.textContent = 'State';
        labelRow.appendChild(stateLabel);
        //

        this.tableBody = document.createElement('tbody');
        tableEl.appendChild(this.tableBody);
    }
}

export class KeyItemsField implements Field {
    public readonly html: KeyItemsFieldHTML;
    private keyItemFields: KeyItemField[] = [];
    private filterBar: FilterBar;

    public constructor(
        readonly keyItemsLookup: ValueLookup<CharType['keyItems']>,
    ) {
        this.html = new KeyItemsFieldHTML();

        const sortedKeyItemInfo = sortGenericInfo(globalKeys.KeyItems);

        for (const keyItemInfo of sortedKeyItemInfo) {
            const keyItemField = new KeyItemField(keyItemInfo.value, keyItemInfo.name, keyItemsLookup);

            keyItemField.html.owns.addEventListener('click', function () {
                const keyItems = keyItemsLookup.get();
                const index = keyItems.findIndex((value) => value?.key === keyItemInfo.value);
                if (this.checked && !~index) {
                    const newKeyItem = createKeyItem(keyItemInfo.value);
                    keyItems.push(newKeyItem);
                    keyItemField.html.input.disabled = !this.checked;
                    keyItemField.html.input.value = newKeyItem.state + '';
                }
                else if (!this.checked && ~index) {
                    keyItems.splice(index, 1);
                    keyItemField.html.input.disabled = !this.checked;
                    keyItemField.html.input.value = '';
                }
            });

            keyItemField.html.input.addEventListener('change', function () {
                const keyItems = keyItemsLookup.get();
                const index = keyItems.findIndex((value) => value?.key === keyItemInfo.value);
                if (!~index) {
                    keyItemField.html.input.value = '';
                }
                else {
                    keyItems[index].state = Number(keyItemField.html.input.value);
                }
            });

            this.html.tableBody.appendChild(keyItemField.html.element);

            this.keyItemFields.push(keyItemField);
        }

        const filterList = this.keyItemFields.map((entry) => ({ key: entry.key, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);
    }

    public enable() {
        enable(this.filterBar.html.element);
        enable(this.html.tableBody);

        this.filterBar.enable();

        for (const entry of this.keyItemFields)
            entry.enable();
    }

    public disable() {
        disable(this.filterBar.html.element);
        disable(this.html.tableBody);

        for (const entry of this.keyItemFields)
            entry.disable();

        this.filterBar.disable();
    }
}
