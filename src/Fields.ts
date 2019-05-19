import { createAccordButton, createTextInput, createCheckBox } from "./Elements";
import { GlobalOptions } from "./Globals";
import { MultiOptionProp } from "./MapProps";

export function fieldTitle(key: string) {
    const title = document.createElement("div");
    title.className = "fieldTitle";
    title.textContent = key;
    return title;
}

export function fieldLabel(key: string) {
    const entry = document.createElement("label");
    entry.className = "fieldEntry";
    const title = fieldTitle(key);
    entry.appendChild(title);
    return entry;
}

export function objectField(text: string, panel: HTMLElement) {
    const accordButton = createAccordButton("", panel);
    accordButton.className += " fieldTitle";
    accordButton.textContent = "⬥ " + text;
    accordButton.addEventListener("click", {
        open: false,
        fieldName: text,
        button: accordButton,
        handleEvent() {
            this.open = !this.open;
            this.button.textContent = (this.open ? '⬦ ' : '⬥ ') + this.fieldName;
        }
    } as any);
    return accordButton;
}

export function stringField(name: string, initialValue: string, changeFunc: (element: HTMLInputElement) => () => void) {
    const div = fieldLabel(name);
    const input = createTextInput(initialValue, "", changeFunc);
    div.appendChild(input);
    return div;
}

export function booleanField(name: string, initialValue: boolean, changeFunc: (element: HTMLInputElement) => () => void) {
    const div = fieldLabel(name);
    const input = createCheckBox(initialValue, "", changeFunc);
    div.appendChild(input);
    return div;
}

export function selectField(name: string, initialValue: string | number, options: GlobalOptions, changeFunc: (element: HTMLSelectElement) => () => void) {
    const div = fieldLabel(name);
    const selector = document.createElement("select");
    options.list.forEach((value, index) => {
        const option = document.createElement("option");
        option.value = index + '';
        option.textContent = value;
        if (options.fromSave && !isNaN(options.fromSave(+initialValue)))
            option.selected = options.fromSave(+initialValue) === index;
        else
            option.selected = initialValue === index || initialValue === value;
        selector.appendChild(option);
    });
    selector.addEventListener("change", changeFunc(selector));
    div.appendChild(selector);
    return div;
}

export function multiOptionField(obj: Record<string, any>, key: string, mapValue: MultiOptionProp) {
    const listEl = document.createElement('ul');
    const options = mapValue.options;
    options.list.forEach((option, index) => {
        const selected = obj[key].reduce((prev: boolean, curr: any) => prev = prev || (option === curr) || (index === curr), false);
        const label = fieldLabel(option);
        label.className += ' multioption' + (selected ? ' selected' : '');
        label.addEventListener('click', () => {
            const list = Array.from(listEl.getElementsByTagName('label'));
            const selectedList = list.filter((el) => el.classList.contains('selected'));
            // On
            if (!mapValue.max || (mapValue.max && selectedList.length < mapValue.max)) {
                label.classList.toggle('selected');
                selectedList.push(label);
            }
            // Off
            else if (label.classList.contains('selected'))
                label.classList.toggle('selected');

            if (mapValue.transform)
                obj[key] = selectedList.map((el) => mapValue.transform!(el.textContent));
            else {
                obj[key] = list.reduce((numList, el, numIndex) => {
                    if (el.classList.contains('selected') && el.textContent)
                        numList.push(numIndex);
                    return numList;
                }, [] as any[]);
            }
        });
        listEl.appendChild(label);
    });
    return listEl;
}
