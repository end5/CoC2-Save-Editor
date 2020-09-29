import { createField, FieldHTML, Field, FieldElement } from "../HTMLGenerics";
import { GenericInfo } from "../../Data/GenericInfo";
import { NullableValueLookup } from "../../Data/ValueLookup";

export class SelectFieldHTML implements FieldHTML<FieldElement> {
    public readonly element: FieldElement;
    public readonly selector: HTMLSelectElement;

    public constructor() {
        this.element = createField();
        this.selector = document.createElement('select');
        this.element.appendChild(this.selector);
    }
}

export class SelectField<G extends GenericInfo> implements Field {
    public constructor(
        private infoList: G[],
        private value: NullableValueLookup<G['value']>,
        public readonly html = new SelectFieldHTML()
    ) {
        for (const info of infoList) {
            const option = document.createElement('option');
            // An HTMLOptionElement.value can only be string
            // The info.name is used as the ".value" for the option elements
            // getValue needs to convert the given value ("this.getValue()") to info.name
            // setValue needs to convert the given name ("<HTMLOptionElement>this.value") to info.value
            option.value = info.name;
            option.textContent = info.name;
            option.selected = false;
            this.html.selector.appendChild(option);
        }

        this.html.selector.addEventListener('change', function () {
            const infoMatch = infoList.find((info) => info.name === this.value);
            if (infoMatch)
                value.set(infoMatch.value);
        });
    }

    public enable() {
        const value = this.value.get();
        const infoMatch = this.infoList.find((info) => info.value === value);

        this.html.selector.value = infoMatch != null ? infoMatch.name + '' : '';
        this.html.selector.disabled = false;
    }

    public disable() {
        this.html.selector.disabled = true;
        this.html.selector.value = '';
    }
}
