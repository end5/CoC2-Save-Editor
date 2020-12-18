import { createField, FieldHTML, FieldElement, FieldWithValue } from "../HTMLGenerics";
import { GenericInfo, sortGenericInfo } from "../../Data/GenericInfo";
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

export class SelectField<T, G extends GenericInfo<T> = GenericInfo<T>> implements FieldWithValue<NullableValueLookup<G['value']>> {
    public constructor(
        private infoList: readonly G[],
        public readonly value: NullableValueLookup<G['value']>,
        public readonly html = new SelectFieldHTML()
    ) {
        const sortedInfoList = sortGenericInfo(infoList);
        for (const info of sortedInfoList) {
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
