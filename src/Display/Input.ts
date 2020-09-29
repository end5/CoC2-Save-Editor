
export type EventFunc<T> = (this: T, ev: Event) => any;

export function createTextInput(initialValue: string, className: string, changeFunc: EventFunc<HTMLInputElement>) {
    const textAreaEl = document.createElement('input');
    textAreaEl.type = 'text';
    textAreaEl.className = className;
    textAreaEl.value = initialValue;
    if (changeFunc)
        textAreaEl.addEventListener('input', changeFunc);
    return textAreaEl;
}

export function createCheckBox(checked: boolean, className: string, changeFunc: EventFunc<HTMLInputElement>) {
    const checkBoxEl = document.createElement('input');
    checkBoxEl.className = className;
    checkBoxEl.checked = checked;
    checkBoxEl.type = 'checkbox';
    if (changeFunc)
        checkBoxEl.addEventListener('change', changeFunc);
    return checkBoxEl;
}

export function createCheckBoxEl() {
    const checkBoxEl = document.createElement('input');
    checkBoxEl.checked = false;
    checkBoxEl.type = 'checkbox';
    return checkBoxEl;
}

export function spaceAndCapText(text: string) {
    if (text.length <= 0) return '';
    return text[0].toLocaleUpperCase() + text.slice(1).replace(/([A-Z])/g, ' $1').trim();
}
