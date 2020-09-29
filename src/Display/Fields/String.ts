import { createField, FieldHTML, Field, createTextInput, FieldElement, TextInputElement } from "../HTMLGenerics";
import { NullableValueLookup } from "../../Data/ValueLookup";

class StringFieldHTML implements FieldHTML<FieldElement> {
    public readonly element: FieldElement;
    public readonly input: TextInputElement;

    public constructor() {
        this.element = createField();
        this.input = createTextInput();
        this.element.appendChild(this.input);
    }
}

export class StringField implements Field {
    public constructor(
        private value: NullableValueLookup<string>,
        public readonly html = new StringFieldHTML()
    ) {
        this.html.input.addEventListener('change', function () { value.set(this.value); });
    }

    public enable() {
        this.html.input.value = this.value.get() ?? '';
        this.html.input.disabled = false;
    }

    public disable() {
        this.html.input.disabled = true;
        this.html.input.value = '';
    }
}
