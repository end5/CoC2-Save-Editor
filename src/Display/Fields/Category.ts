import { createCategory, Field, FieldHTML } from "../HTMLGenerics";

export class CategoryHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.className = 'content boxed wrap';
    }
}

export class Category implements Field {
    public constructor(
        private readonly categories: { title: string; list: Field[]; }[],
        public readonly html = new CategoryHTML()
    ) {
        for (const category of categories) {
            const categoryEl = createCategory(category.title);

            for (const field of category.list)
                categoryEl.appendChild(field.html.element);

            this.html.element.appendChild(categoryEl);
        }
    }

    public enable() {
        for (const category of this.categories)
            for (const field of category.list)
                field.enable();
    }

    public disable() {
        for (const category of this.categories)
            for (const field of category.list)
                field.disable();
    }
}
