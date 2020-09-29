import { createTabBar, TabBarElement, createTabButton, TabButtonElement } from "../TabBar";
import { toggleSelection, hide, select } from "../UIActions";
import { Field, FieldHTML } from "../HTMLGenerics";

export class TabbedContentHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly tabBar: TabBarElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.className = 'content';

        this.tabBar = createTabBar('horizontal');

        this.element.appendChild(this.tabBar);
    }
}

export class TabbedContent implements Field {
    private readonly list: { button: TabButtonElement, content: Field }[] = [];

    public constructor(
        fields: { key: string, title: string, content: Field }[],
        public readonly html = new TabbedContentHTML()
    ) {
        const toggleList: { button: TabButtonElement, content: HTMLElement }[] = [];
        for (const field of fields) {
            const button = createTabButton();
            button.textContent = field.title;
            button.addEventListener('click', () => toggleSelection(button, toggleList));

            this.list.push({ button, content: field.content });
            toggleList.push({ button, content: field.content.html.element });

            // Hide everything but the first one
            if (field !== fields[0])
                hide(field.content.html.element);
            else {
                select(button);
            }

            this.html.tabBar.appendChild(button);
            this.html.element.appendChild(field.content.html.element);
        }
    }

    public enable() {
        for (const pair of this.list)
            pair.content.enable();
    }

    public disable() {
        for (const pair of this.list)
            pair.content.disable();
    }
}
