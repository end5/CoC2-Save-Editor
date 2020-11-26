import { createField, createFieldLabel, FieldHTML, Field, FieldElement, FieldLabelElement } from "../HTMLGenerics";
import { enable, disable } from "../UIActions";

export class LabelHTML implements FieldHTML<FieldElement> {
    public readonly element: FieldElement;
    public readonly label: FieldLabelElement;

    public constructor() {
        this.element = createField();
        this.label = createFieldLabel();
        this.element.appendChild(this.label);
    }
}

export class Label<T extends Field> implements Field {
    public constructor(
        title: string,
        public field: T,
        public readonly html = new LabelHTML()
    ) {
        this.html.label.textContent = title;
        this.html.element.appendChild(field.html.element);
    }

    public enable() {
        this.field.enable();
        enable(this.html.element);
    }

    public disable() {
        disable(this.html.element);
        this.field.disable();
    }
}
