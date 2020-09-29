
import { createField, FieldHTML, Field, createCheckBox, FieldElement } from "../HTMLGenerics";
import { NullableValueLookup } from "../../Data/ValueLookup";
import { GenericInfo } from "../../Data/GenericInfo";

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

class MultiOptionItem<G extends GenericInfo> implements Field {
    public constructor(
        public readonly name: G['name'],
        private getValue: NullableValueLookup<G['value'][]>['get'],
        public readonly html = new MultiOptionItemHTML()
    ) {
        this.html.title.textContent = name;
    }

    public enable() {
        this.html.checkbox.checked = this.getValue()?.includes(this.name) ?? false;
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

export class MultiOptionField<G extends GenericInfo> implements Field {
    public readonly list: MultiOptionItem<G>[];

    public constructor(
        infoList: G[],
        value: NullableValueLookup<G['value'][]>,
        public readonly html = new MultiOptionFieldHTML()
    ) {
        this.list = infoList.map((info) => {
            const multiOptionItem = new MultiOptionItem(info.name, value.get);
            this.html.list.appendChild(multiOptionItem.html.element);
            multiOptionItem.html.checkbox.addEventListener('click', () => {
                value.set(
                    this.list.filter((item) => item.html.checkbox.checked)
                        .map((item) => item.name)
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
