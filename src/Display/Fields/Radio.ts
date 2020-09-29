import { FieldHTML } from "../HTMLGenerics";

export class RadioFieldHTML implements FieldHTML<HTMLLIElement> {
    public readonly element: HTMLLIElement;
    public readonly radio: HTMLInputElement;
    public readonly label: HTMLLabelElement;

    public constructor() {
        this.element = document.createElement('li');

        this.radio = document.createElement('input');
        this.radio.type = 'radio';

        this.label = document.createElement('label');

        this.element.appendChild(this.radio);
        this.element.appendChild(this.label);
    }
}
