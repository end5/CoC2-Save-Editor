import { Flags } from "../../GameData/Flags";
import { FieldHTML, Field, createTextInput } from "../../Display/HTMLGenerics";
import { FlagType, FlagNames } from "../../Data/GameSave";
import { FilterBarHTML, FilterBar } from "../../Display/Fields/FilterBar";
import { disable, enable } from "../../Display/UIActions";

// export class FlagContentHTML implements FieldHTML<HTMLDivElement> {
//     public readonly element: HTMLDivElement;
//     public readonly filterBar: FilterBarHTML;
//     public readonly flagListEl: HTMLUListElement;

//     public constructor() {
//         this.element = document.createElement('div');
//         this.element.className = 'content boxed';

//         this.filterBar = new FilterBarHTML();
//         this.element.appendChild(this.filterBar.element);

//         this.flagListEl = document.createElement('ul');
//         this.flagListEl.className = 'flags';

//         this.element.appendChild(this.flagListEl);
//     }
// }

// export class FlagContent implements Field {
//     private fields: { key: string, field: StringField }[] = [];
//     private filterBar: FilterBar;

//     public constructor(
//         getFlag: (key: FlagNames) => FlagType | undefined,
//         setFlag: (key: FlagNames, value?: FlagType) => void,
//         public readonly html = new FlagContentHTML()
//     ) {
//         for (const flag of Flags) {
//             const field = new StringField(
//                 flag,
//                 () => (getFlag(flag) ?? '') + '',
//                 (value) => setFlag(flag, toValue(value))
//             );
//             this.html.flagListEl.appendChild(field.html.element);
//             this.fields.push({ key: flag, field });
//         }

//         const filterList = this.fields.map((entry) => ({ key: entry.key, element: entry.field.html.element }));
//         this.filterBar = new FilterBar(filterList, this.html.filterBar);
//     }

//     public enable() {
//         for (const entry of this.fields)
//             entry.field.enable();
//         this.filterBar.enable();
//     }

//     public disable() {
//         for (const entry of this.fields)
//             entry.field.disable();
//         this.filterBar.disable();
//     }
// }

// function toValue(value: string) {
//     if (typeof value === 'string' && value.toLocaleLowerCase() === 'true')
//         return true;
//     else if (typeof value === 'string' && value.toLocaleLowerCase() === 'false')
//         return false;
//     else if (!isNaN(+value))
//         return +value;
//     else
//         return value;
// }

class FlagFieldHTML implements FieldHTML<HTMLTableRowElement> {
    public readonly element: HTMLTableRowElement;
    public readonly title: HTMLTableDataCellElement;
    public readonly input: HTMLInputElement;

    public constructor() {
        this.element = document.createElement('tr');

        this.title = document.createElement('td');
        this.element.appendChild(this.title);

        const textCell = document.createElement('td');
        this.element.appendChild(textCell);

        this.input = createTextInput();
        textCell.appendChild(this.input);
    }
}

class FlagField implements Field {
    public readonly html: FlagFieldHTML;

    public constructor(public readonly key: FlagNames, private readonly getValue: () => string, setValue: (value: string) => void) {
        this.html = new FlagFieldHTML();
        this.html.title.textContent = key;
        this.html.input.addEventListener('change', function () { setValue(this.value); });
    }

    public enable() {
        this.html.input.disabled = false;
        this.html.input.value = this.getValue();
    }

    public disable() {
        this.html.input.disabled = true;
        this.html.input.value = '';
    }
}

export class FlagContentHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly filterBar: FilterBarHTML;
    public readonly tableBody: HTMLTableSectionElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.className = 'content boxed';

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

        const equippedLabel = document.createElement('th');
        equippedLabel.textContent = 'Name';
        labelRow.appendChild(equippedLabel);

        const nameLabel = document.createElement('th');
        nameLabel.textContent = 'Value';
        labelRow.appendChild(nameLabel);
        //

        this.tableBody = document.createElement('tbody');
        tableEl.appendChild(this.tableBody);
    }
}

export class FlagContent implements Field {
    private fields: FlagField[] = [];
    private filterBar: FilterBar;

    public constructor(
        getFlag: (key: FlagNames) => FlagType | undefined,
        setFlag: (key: FlagNames, value?: FlagType) => void,
        public readonly html = new FlagContentHTML()
    ) {
        this.fields = Flags.map((flag) => {
            const field = new FlagField(
                flag,
                () => (getFlag(flag) ?? '') + '',
                (value) => setFlag(flag, toValue(value))
            );
            this.html.tableBody.appendChild(field.html.element);
            return field;
        });

        const filterList = this.fields.map((entry) => ({ key: entry.key, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);
    }

    public enable() {
        enable(this.filterBar.html.element);
        enable(this.html.tableBody);
        for (const field of this.fields)
            field.enable();
        this.filterBar.enable();
    }

    public disable() {
        disable(this.filterBar.html.element);
        disable(this.html.tableBody);
        for (const field of this.fields)
            field.disable();
        this.filterBar.disable();
    }
}

function toValue(value: string) {
    if (typeof value === 'string' && value.toLocaleLowerCase() === 'true')
        return true;
    else if (typeof value === 'string' && value.toLocaleLowerCase() === 'false')
        return false;
    else if (!isNaN(+value))
        return +value;
    else
        return value;
}
