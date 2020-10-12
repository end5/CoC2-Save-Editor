import { FieldHTML, Field } from "../HTMLGenerics";
import { RadioFieldHTML } from "./Radio";
import { ValueLookup } from "../../Data/ValueLookup";

class ArrayFieldItem implements Field {
    public constructor(
        private name: string,
        public readonly index: number,
        private getTitle: () => string,
        onClick: () => void,
        public readonly html = new RadioFieldHTML()
    ) {
        this.html.radio.name = name;
        this.html.radio.id = this.name + this.index;
        this.html.radio.addEventListener('click', onClick);

        this.html.label.htmlFor = this.name + this.index;
    }

    public enable() {
        this.html.label.textContent = this.getTitle();
        this.html.radio.disabled = false;
    }

    public disable() {
        this.html.radio.disabled = true;
        this.html.radio.checked = false;
    }
}

class ArrayFieldHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly addItemButton: HTMLButtonElement;
    public readonly removeItemButton: HTMLButtonElement;
    public readonly listEl: HTMLUListElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.className = 'category';

        this.addItemButton = document.createElement('button');
        this.addItemButton.textContent = 'Add';
        this.element.appendChild(this.addItemButton);

        this.removeItemButton = document.createElement('button');
        this.removeItemButton.textContent = 'Remove';
        this.element.appendChild(this.removeItemButton);

        this.listEl = document.createElement('ul');
        this.listEl.className = 'array-list';
        this.element.appendChild(this.listEl);

        this.element.appendChild(document.createElement('hr'));
    }
}

export class ArrayField<T> implements Field {
    private itemList: ArrayFieldItem[] = [];
    private selected?: ArrayFieldItem;
    private fields: Field[];

    public constructor(
        private name: string,
        private value: ValueLookup<T[]>,
        private itemConstr: () => T,
        private title: (getObj: () => T) => string,
        fields: (createKeyLookup: <K extends keyof T>(key: K) => ValueLookup<T[K]>) => Field[],
        public readonly html = new ArrayFieldHTML()
    ) {
        this.html.addItemButton.addEventListener('click', () => this.addToValue());
        this.html.removeItemButton.addEventListener('click', () => this.removeFromValue());

        const defaultItem = itemConstr();
        this.fields = fields((key) => ({
            get: () => (this.selected ? this.value.get()[this.selected.index] : defaultItem)[key],
            set: (newValue) => {
                if (this.selected) {
                    this.value.get()[this.selected.index][key] = newValue;
                    this.selected.enable();
                }
            }
        }));

        for (const field of this.fields)
            this.html.element.appendChild(field.html.element);
    }

    private addToValue() {
        this.value.get().push(this.itemConstr());

        this.addArrayItemField();

        this.enable();
    }

    private addArrayItemField() {
        const index = this.itemList.length;
        const newItem = new ArrayFieldItem(
            this.name,
            index,
            () => this.title(() => this.value.get()?.[index]),
            () => {
                this.selected = newItem;
                for (const field of this.fields)
                    field.enable();
            });
        newItem.enable();

        this.itemList.push(newItem);
        this.html.listEl.appendChild(newItem.html.element);

        // Select first item if none are selected
        if (!this.selected)
            this.itemList[0].html.radio.click();
    }

    private removeFromValue() {
        const arr = this.value.get() ?? [];
        this.value.set(arr.slice(0, arr.length - 1));

        this.removeArrayItemField();

        this.enable();
    }

    private removeArrayItemField() {
        const item = this.itemList.pop();
        if (item) {
            this.html.listEl.removeChild(item.html.element);

            // Select one before last item if there is one
            if (this.selected === item && this.itemList.length > 0)
                this.itemList[this.itemList.length - 1].html.radio.click();
        }
    }

    public enable() {
        const arr = this.value.get() ?? [];
        this.value.set([...arr]);

        while (arr.length > this.itemList.length)
            this.addArrayItemField();
        while (arr.length < this.itemList.length)
            this.removeArrayItemField();

        const emptyField = arr.length === 0;

        this.html.addItemButton.disabled = false;
        this.html.removeItemButton.disabled = emptyField;

        for (const item of this.itemList)
            item.enable();

        if (emptyField)
            for (const field of this.fields)
                field.disable();
        else
            for (const field of this.fields)
                field.enable();
    }

    public disable() {
        this.html.addItemButton.disabled = true;
        this.html.removeItemButton.disabled = true;

        for (const field of this.fields)
            field.disable();
    }
}
