import { hide, show } from "../UIActions";
import { FieldHTML, Field } from "../HTMLGenerics";

export class FilterBarHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly input: HTMLInputElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.className = 'filter-div';

        this.input = document.createElement('input');
        this.input.className = 'filter-bar';
        this.input.type = 'text';
        this.input.placeholder = 'Filter...';

        this.element.appendChild(this.input);
    }
}

export class FilterBar implements Field {
    public constructor(
        fields: { key: string, element: HTMLElement; }[],
        public readonly html = new FilterBarHTML()
    ) {
        this.html.input.addEventListener('keyup', function () {
            const filterText = this.value.toLocaleLowerCase();

            for (const entry of fields) {
                if (!filterText || entry.key.toLocaleLowerCase().startsWith(filterText))
                    show(entry.element);
                else
                    hide(entry.element);
            }
        });
    }

    public enable(): void {
        this.html.input.disabled = false;
    }

    public disable(): void {
        this.html.input.disabled = true;
    }
}
