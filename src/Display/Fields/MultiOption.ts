
import { createField, FieldHTML, Field, createCheckBox, FieldElement, FieldWithValue } from "../HTMLGenerics";
import { NullableValueLookup } from "../../Data/ValueLookup";
import { GenericInfo, sortGenericInfo } from "../../Data/GenericInfo";

class MultiOptionItemHTML implements FieldHTML<HTMLLIElement> {
    public readonly element: HTMLLIElement;
    public readonly checkbox: HTMLInputElement;
    public readonly title: Text;

    public constructor() {
        this.element = document.createElement('li');

        this.checkbox = createCheckBox();
        this.title = document.createTextNode('');

        this.element.appendChild(this.checkbox);
        this.element.appendChild(this.title);
    }
}

class MultiOptionItem<T, G extends GenericInfo<T> = GenericInfo<T>> implements Field {
    public constructor(
        public readonly info: G,
        private getValue: NullableValueLookup<G['value'][]>['get'],
        public readonly html = new MultiOptionItemHTML()
    ) {
        this.html.title.textContent = info.name;
    }

    public enable() {
        this.html.checkbox.checked = this.getValue()?.includes(this.info.value) ?? false;
        this.html.checkbox.disabled = false;
    }

    public disable() {
        this.html.checkbox.disabled = true;
        this.html.checkbox.checked = false;
    }
}

class MultiOptionFieldHTML implements FieldHTML<FieldElement> {
    public readonly element: FieldElement;
    public readonly list: HTMLUListElement;

    public constructor() {
        this.element = createField();

        this.list = document.createElement('ul');
        this.list.className = 'multioption-list';
        this.element.appendChild(this.list);
    }
}

export class MultiOptionField<T, G extends GenericInfo<T> = GenericInfo<T>> implements FieldWithValue<NullableValueLookup<G['value'][]>> {
    public readonly list: MultiOptionItem<T, G>[];

    public constructor(
        infoList: readonly G[],
        public readonly value: NullableValueLookup<G['value'][]>,
        public readonly html = new MultiOptionFieldHTML()
    ) {
        this.list = sortGenericInfo(infoList).map((info) => {
            const multiOptionItem = new MultiOptionItem(info, value.get);
            this.html.list.appendChild(multiOptionItem.html.element);
            multiOptionItem.html.checkbox.addEventListener('click', () => {
                value.set(
                    this.list.filter((item) => item.html.checkbox.checked)
                        .map((item) => item.info.value)
                );
            });
            return multiOptionItem;
        });
    }

    public enable() {
        for (const item of this.list)
            item.enable();
    }

    public disable() {
        for (const item of this.list)
            item.disable();
    }
}
