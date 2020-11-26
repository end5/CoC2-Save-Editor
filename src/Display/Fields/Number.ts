import { createField, FieldHTML, createTextInput, FieldElement, TextInputElement, FieldWithValue } from "../HTMLGenerics";
import { NullableValueLookup } from "../../Data/ValueLookup";

export class NumberFieldHTML implements FieldHTML<FieldElement> {
    public readonly element: FieldElement;
    public readonly input: TextInputElement;

    public constructor() {
        this.element = createField();
        this.input = createTextInput();
        this.element.appendChild(this.input);
    }
}

export class NumberField implements FieldWithValue<NullableValueLookup<number>> {
    public constructor(
        public readonly value: NullableValueLookup<number>,
        public readonly html = new NumberFieldHTML()
    ) {
        this.html.input.addEventListener('change', function () { value.set(!isNaN(+this.value) ? +this.value : 0); });
    }

    public enable() {
        const value = this.value.get();
        this.html.input.value = value && !isNaN(value) ? value + '' : '0';
        this.html.input.disabled = false;
    }

    public disable() {
        this.html.input.disabled = true;
        this.html.input.value = '';
    }
}
