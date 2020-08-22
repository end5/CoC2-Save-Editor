import { hide, show } from "./UIActions";

export function createFilterBarEl() {
    const el = document.createElement('input');
    el.className = 'filter-bar';
    el.type = 'text';
    el.placeholder = 'Filter...';
    return el;
}

export function createFilterBar(fields: Record<string, { element: HTMLElement; }>) {
    const element = document.createElement('div');
    element.className = 'filter-div';

    const filterBar = createFilterBarEl();
    filterBar.addEventListener('keyup', () => {
        const filterText = filterBar.value.toLocaleLowerCase();

        for (const key of Object.keys(fields)) {
            if (!filterText || key.toLocaleLowerCase().startsWith(filterText))
                show(fields[key].element);
            else
                hide(fields[key].element);
        }
    });

    element.appendChild(filterBar);
    return element;
}
