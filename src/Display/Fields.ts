import { createTextInput, createCheckBox, createCheckBoxEl } from "./Input";
import { createFilterBarEl } from "./FilterBar";
import { MultiOptionProp } from '../Data/MapProps';
import { GenericInfo } from '../Data/Globals';
import { Component } from "./Generic";
import { deselect, select } from "./UIActions";

export function createFieldLabel(key: string) {
    const title = document.createElement('label');
    title.className = 'title';
    title.textContent = key;
    return title;
}

function createFieldEl() {
    const field = document.createElement('div');
    field.className = 'field';
    return field;
}

export function createCategory(title: string) {
    const category = document.createElement('div');
    category.className = 'category';

    const label = document.createElement('h4');
    label.textContent = title;
    category.appendChild(label);

    category.appendChild(document.createElement('hr'));

    return category;
}

export function multiOptionField(label: string, initialValues: string[], mapValue: MultiOptionProp, changeFunc: (mapValue: MultiOptionProp, selectedValues: string[]) => void) {
    // Taken directly from fieldLabel
    const div = createFieldEl();
    const title = createFieldLabel(label);
    div.appendChild(title);

    const component = document.createElement('div');
    component.className = 'multioption-container';

    const listEl = document.createElement('ul');
    listEl.className = 'multioption-list';

    const options = mapValue.options.list.map((value) =>
        ({
            key: value.name,
            element: document.createElement('li'),
            selected: !!~initialValues.indexOf(value.value + '')
        }));

    const filter = createFilterBarEl();
    filter.addEventListener('keyup', () => {
        let filterText = filter.value.toLocaleLowerCase();
        let selectedOnly = false;

        if (filterText.startsWith('*')) {
            filterText = filterText.slice(1);
            selectedOnly = true;
        }

        for (const item of options) {
            if (
                (!selectedOnly || (selectedOnly && item.selected)) &&
                item.key.toLocaleLowerCase().startsWith(filterText)
            )
                item.element.classList.remove('collapsed');
            else
                item.element.classList.add('collapsed');
        }
    });

    // Counter on max number of selections
    if (mapValue.max)
        title.textContent += ' (' + options.filter((option) => option.selected).length + '/' + mapValue.max + ')';

    for (const option of options) {
        // const listItem = document.createElement('li');
        const listItem = option.element;
        listItem.className = 'multioption';
        listItem.textContent = option.key;

        if (option.selected)
            listItem.className += ' selected';

        listItem.addEventListener('click', () => {
            let selectedList = options.filter((item) => item.selected);

            // On
            if (!option.selected && (!mapValue.max || (mapValue.max && selectedList.length < mapValue.max))) {
                listItem.classList.add('selected');
                option.selected = true;
            }
            // Off
            else if (option.selected) {
                listItem.classList.remove('selected');
                option.selected = false;
            }

            // Filter again to have the correct items in a sorted order
            selectedList = options.filter((item) => item.selected);

            // Redraw the counter if there is a max
            if (mapValue.max) {
                title.textContent = label + ' (' + selectedList.length + '/' + mapValue.max + ')';
            }

            changeFunc(mapValue, selectedList.map((value) => value.key));
        });

        listEl.appendChild(listItem);
    }

    component.appendChild(filter);
    component.appendChild(listEl);
    div.appendChild(component);

    return div;
}

export class Label {
    public readonly element: HTMLElement;
    public constructor(title: string) {
        this.element = createFieldLabel(title);
    }

    public set(value: string) {
        this.element.textContent = value;
    }
}

export class StringField implements Component {
    public readonly element: HTMLElement;
    public readonly label: Label;
    public readonly input: HTMLInputElement;
    public constructor(title: string, private getValue: () => string | undefined, setValue: (value: string) => void) {
        this.element = createFieldEl();

        this.label = new Label(title);
        this.element.appendChild(this.label.element);

        this.input = createTextInput('', 'value', function (this) { setValue(this.value); });
        this.element.appendChild(this.input);
    }

    public load() {
        this.input.value = this.getValue() || '';
    }
}

export class NumberField implements Component {
    public readonly element: HTMLElement;
    public readonly label: Label;
    public readonly input: HTMLInputElement;
    public constructor(title: string, private getValue: () => number | undefined, setValue: (value: number) => void) {
        this.element = createFieldEl();

        this.label = new Label(title);
        this.element.appendChild(this.label.element);

        this.input = createTextInput('', 'value', function (this) { setValue(+this.value); });
        this.element.appendChild(this.input);
    }

    public load() {
        this.input.value = this.getValue() ? this.getValue() + '' : '';
    }
}

export class BooleanField implements Component {
    public readonly element: HTMLElement;
    public readonly label: Label;
    public readonly input: HTMLInputElement;
    public constructor(title: string, private getValue: () => boolean | undefined, setValue: (value: boolean) => void) {
        this.getValue = getValue;

        this.element = createFieldEl();

        this.label = new Label(title);
        this.element.appendChild(this.label.element);

        this.input = createCheckBox(false, 'value', function (this) { setValue(this.checked); });
        this.element.appendChild(this.input);
    }

    public load() {
        this.input.checked = this.getValue() || false;
    }
}

export class SelectField<G extends GenericInfo> implements Component {
    public readonly element: HTMLElement;
    public readonly label: Label;
    public readonly selector: HTMLSelectElement;
    public readonly options: Record<string, { info: G, element: HTMLOptionElement }> = {};
    public constructor(title: string, infoList: G[], private getValue: () => G['value'] | undefined, setValue: (value: G['value']) => void) {
        this.element = createFieldEl();

        this.label = new Label(title);
        this.element.appendChild(this.label.element);

        this.selector = document.createElement('select');
        this.selector.className = 'value';
        for (const info of infoList) {
            const option = document.createElement('option');
            option.value = info.name;
            option.textContent = info.name;
            option.selected = false;
            this.options[info.name] = { info, element: option };
            this.selector.appendChild(option);
        }

        this.selector.addEventListener('change', () => {
            // option element ONLY supports string
            // use name to loop up value
            setValue(this.options[this.selector.value].info.value);
        });

        this.element.appendChild(this.selector);
    }

    public load() {
        const value = this.getValue();
        for (const key of Object.keys(this.options))
            if (this.options[key].info.value === value)
                this.options[key].element.selected = true;
    }
}

export class MultiOptionField<G extends GenericInfo> implements Component {
    public readonly element: HTMLElement;
    public readonly label: Label;
    public readonly list: MultiOptionItem<G>[] = [];
    public constructor(title: string, values: G[], private getValue: () => G['value'][] | undefined, setValue: (value: G['value'][]) => void) {
        this.element = createFieldEl();

        this.label = new Label(title);
        this.element.appendChild(this.label.element);

        const listEl = document.createElement('ul');
        listEl.className = 'multioption-list';
        this.element.appendChild(listEl);

        for (const info of values) {
            const multiOptionItem = new MultiOptionItem(info);
            multiOptionItem.checkbox.addEventListener('click', () => {
                setValue(
                    this.list.filter((item) => item.checked())
                        .map((item) => item.info.value)
                );
            });
            listEl.appendChild(multiOptionItem.element);

            this.list.push(multiOptionItem);
        }
    }

    public load() {
        const values = this.getValue();
        if (values)
            for (const value of values)
                for (const item of this.list)
                    if (value === item.info.value) {
                        item.check();
                        break;
                    }
    }
}

class MultiOptionItem<G extends GenericInfo> {
    public readonly element: HTMLElement;
    public readonly checkbox: HTMLInputElement;

    public constructor(public readonly info: G) {
        this.element = document.createElement('li');
        this.element.className = 'multioption';

        this.checkbox = createCheckBoxEl();

        const title = document.createElement('label');
        title.appendChild(this.checkbox);
        title.appendChild(document.createTextNode(info.name));
        this.element.appendChild(title);
    }

    public check() { this.checkbox.checked = true; }
    public uncheck() { this.checkbox.checked = false; }
    public checked() { return this.checkbox.checked; }
}

export class ArrayField<T> implements Component {
    public readonly element: HTMLElement;
    public readonly fields: Component[];
    private itemList: ArrayFieldItem[] = [];
    private listEl: HTMLUListElement;
    private selectedItem?: ArrayFieldItem;

    public constructor(
        private itemTitle: string,
        private getValue: () => T[] | undefined,
        private itemConstr: () => T,
        fields: (getObj: () => T | undefined) => Component[]
    ) {
        this.element = createFieldEl();

        this.fields = fields(() => {
            const value = getValue();
            if (value && this.selectedItem) return value[this.selectedItem.index];
            else return undefined;
        });

        const addItemButton = document.createElement('button');
        addItemButton.textContent = 'Add';
        addItemButton.addEventListener('click', () => {
            this.addItemEl();
            this.getValue()?.push(this.itemConstr());
        });
        this.element.appendChild(addItemButton);

        const removeItemButton = document.createElement('button');
        removeItemButton.textContent = 'Remove';
        removeItemButton.addEventListener('click', () => {
            this.removeItemEl();
            this.getValue()?.pop();
        });
        this.element.appendChild(removeItemButton);

        this.listEl = document.createElement('ul');
        this.listEl.className = 'multioption-list';
        this.element.appendChild(this.listEl);
    }

    private addItemEl() {
        const newItem = new ArrayFieldItem(this.itemTitle, this.itemList.length);
        newItem.element.addEventListener('click', () => {
            if (this.selectedItem)
                deselect(this.selectedItem.element);

            this.selectedItem = newItem;
            select(this.selectedItem.element);

            for (const field of this.fields)
                field.load();
        });
        this.itemList.push(newItem);
        this.listEl.appendChild(newItem.element);
    }

    private removeItemEl() {
        const item = this.itemList.pop();
        if (item) {
            this.listEl.removeChild(item.element);

            if (this.itemList.length > 0)
                this.itemList[this.itemList.length - 1].element.click();
        }
    }

    public load() {
        const arr = this.getValue();
        if (!arr)
            while (this.itemList.length > 0)
                this.removeItemEl();
        else {
            while (arr.length > this.itemList.length)
                this.addItemEl();
            while (arr.length < this.itemList.length)
                this.removeItemEl();
        }
    }
}

class ArrayFieldItem {
    public readonly element: HTMLElement;
    public constructor(title: string, public readonly index: number) {
        this.element = document.createElement('li');
        this.element.textContent = title + ' ' + (index + 1);

    }
}
