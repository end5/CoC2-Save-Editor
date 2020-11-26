import { createField, FieldHTML, createCheckBox, FieldElement, CheckBoxElement, FieldWithValue } from "../HTMLGenerics";
import { NullableValueLookup } from "../../Data/ValueLookup";

class BooleanFieldHTML implements FieldHTML<FieldElement> {
    public readonly element: FieldElement;
    public readonly input: CheckBoxElement;

    public constructor() {
        this.element = createField();
        this.input = createCheckBox();
        this.element.appendChild(this.input);
    }
}

export class BooleanField implements FieldWithValue<NullableValueLookup<boolean>> {
    public constructor(
        public readonly value: NullableValueLookup<boolean>,
        public readonly html = new BooleanFieldHTML()
    ) {
        this.html.input.addEventListener('change', function () { value.set(this.checked); });
    }

    public enable() {
        this.html.input.disabled = false;
        this.html.input.checked = this.value.get() ?? false;
    }

    public disable() {
        this.html.input.disabled = true;
        this.html.input.checked = false;
    }
}
