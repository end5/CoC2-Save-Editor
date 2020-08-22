
export function isVisible(el: HTMLElement) {
    return !el.classList.contains('collapsed');
}

export function hide(el: HTMLElement) {
    el.classList.add('collapsed');
}

export function show(el: HTMLElement) {
    el.classList.remove('collapsed');
}

export interface ButtonContentPair { button: HTMLButtonElement; content: HTMLElement; }

export function toggleSelection(button: HTMLButtonElement, list: ButtonContentPair[]) {
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
    return element.classList.contains('selected');
}

export function select(element: HTMLElement) {
    element.classList.add('selected');
}

export function deselect(element: HTMLElement) {
    element.classList.remove('selected');
}
