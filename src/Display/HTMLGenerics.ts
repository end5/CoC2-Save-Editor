export interface FieldHTML<E extends HTMLElement = HTMLElement> {
    readonly element: E;
}

export interface Field {
    readonly html: FieldHTML;
    enable(): void;
    disable(): void;
}

export interface FieldWithValue<T> extends Field {
    readonly value: T;
}

export type FieldElement = ReturnType<typeof createField>;
export function createField() {
    const field = document.createElement('div');
    field.className = 'field';
    return field;
}

export type FieldLabelElement = ReturnType<typeof createFieldLabel>;
export function createFieldLabel() {
    const title = document.createElement('label');
    title.className = 'title';
    return title;
}

export type TextInputElement = ReturnType<typeof createTextInput>;
export function createTextInput() {
    const textAreaEl = document.createElement('input');
    textAreaEl.type = 'text';
    return textAreaEl;
}

export type CheckBoxElement = ReturnType<typeof createCheckBox>;
export function createCheckBox() {
    const checkBoxEl = document.createElement('input');
    checkBoxEl.type = 'checkbox';
    checkBoxEl.checked = false;
    return checkBoxEl;
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
