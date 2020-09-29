export type TabButtonElement = ReturnType<typeof createTabButton>;
export function createTabButton() {
    const button = document.createElement('a');
    button.className = 'tab';

    return button;
}

export type TabBarElement = ReturnType<typeof createTabBar>;
export function createTabBar(style: 'vertical' | 'horizontal') {
    const element = document.createElement('div');
    element.className = 'tabs ' + style;
    return element;
}
