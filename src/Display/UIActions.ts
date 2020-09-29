import { TabButtonElement } from "./TabBar";

export function isVisible(el: HTMLElement) {
    return !el.classList.contains('collapsed');
}

export function hide(el: HTMLElement) {
    el.classList.add('collapsed');
}

export function show(el: HTMLElement) {
    el.classList.remove('collapsed');
}

export function toggleSelection(button: TabButtonElement, list: { button: TabButtonElement; content: HTMLElement; }[]) {
    for (const pair of list) {
        if (button === pair.button) {
            select(button);
            show(pair.content);
        }
        else {
            deselect(pair.button);
            hide(pair.content);
        }
    }
}

export function isSelected(element: HTMLElement) {
    return element.classList.contains('active');
}

export function select(element: HTMLElement) {
    element.classList.add('active');
}

export function deselect(element: HTMLElement) {
    element.classList.remove('active');
}

export function enable(element: HTMLElement) {
    element.classList.remove('disabled');
}

export function disable(element: HTMLElement) {
    element.classList.add('disabled');
}
