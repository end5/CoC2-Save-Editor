import { createTextInput, EventFunc, createCheckBox, createFilterBar } from './Elements';
import { MultiOptionProp } from '../Data/MapProps';
import { GlobalOptions } from '../Data/Globals';

export function fieldTitle(key: string) {
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = key;
    return title;
}

function fieldLabel(key: string) {
    const entry = document.createElement('label');
    entry.className = 'field dark';
    const title = fieldTitle(key);
    entry.appendChild(title);
    return entry;
}

export function objectField(text: string) {
    const button = document.createElement('button');
    button.className = 'collapsing-button title dark';
    button.textContent = '⬥';
    if (text)
        button.textContent += ' ' + text;

    const content = document.createElement('div');
    content.className = 'field-content collapsed light';

    button.addEventListener('click', () => {
        if (content.classList.contains('collapsed')) {
            button.classList.replace('dark', 'light');
            content.classList.remove('collapsed');
            button.textContent = '⬦';
        }
        else {
            button.classList.replace('light', 'dark');
            content.classList.add('collapsed');
            button.textContent = '⬥';
        }

        if (text)
            button.textContent += ' ' + text;
    });
    return { button, content };
}

export function stringField(name: string, initialValue: string, changeFunc: EventFunc<HTMLInputElement>) {
    const div = fieldLabel(name);
    const input = createTextInput(initialValue, 'value', changeFunc);
    div.appendChild(input);
    return div;
}

export function booleanField(name: string, initialValue: boolean, changeFunc: EventFunc<HTMLInputElement>) {
    const div = fieldLabel(name);
    const input = createCheckBox(initialValue, 'value', changeFunc);
    div.appendChild(input);
    return div;
}

export function selectField(name: string, initialValue: string, options: GlobalOptions, changeFunc: EventFunc<HTMLSelectElement>) {
    const div = fieldLabel(name);
    const selector = document.createElement('select');
    selector.className = 'value';
    options.list.forEach((value, index) => {
        const option = document.createElement('option');
        option.value = index + '';
        option.textContent = value;
        option.selected = initialValue === value;
        selector.appendChild(option);
    });
    selector.addEventListener('change', changeFunc(selector));
    div.appendChild(selector);
    return div;
}

export function multiOptionField(label: string, initialValues: string[], mapValue: MultiOptionProp, changeFunc: (mapValue: MultiOptionProp, selectedValues: string[]) => void) {
    // Taken directly from fieldLabel
    const div = document.createElement('label');
    div.className = 'field dark';
    const title = fieldTitle(label);
    div.appendChild(title);

    const component = document.createElement('div');
    component.className = 'multioption-container';

    const listEl = document.createElement('ul');
    listEl.className = 'multioption-list';

    const options = mapValue.options.list.map((value) =>
        ({
            key: value,
            element: document.createElement('li'),
            selected: !!~initialValues.indexOf(value)
        }));

    const filter = createFilterBar();
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

export function setNumberCallback(obj: Record<string, any>, key: string) {
    return (element: HTMLInputElement) => () => {
        obj[key] = +element.value;
    };
}

export function setStringCallback(obj: Record<string, any>, key: string) {
    return (inputElement: HTMLInputElement) => () => {
        obj[key] = inputElement.value;
    };
}

export function setSelectorCallback(obj: Record<string, any>, key: string, modFunc?: (num: string) => any) {
    return (inputElement: HTMLSelectElement) => () => {
        if (modFunc)
            obj[key] = modFunc(inputElement[+inputElement.value].textContent!);
        else
            obj[key] = inputElement[+inputElement.value].textContent;
    };
}

export function setBooleanCallback(obj: Record<string, any>, key: string) {
    return (inputElement: HTMLInputElement) => () => {
        obj[key] = inputElement.checked;
    };
}
