export function createTabButton(text: string) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'tab';

    return button;
}

export function createTabBar(style: 'vertical' | 'horizontal', buttonTexts: Record<string, string>) {
    const element = document.createElement('div');
    element.className = 'tabs ' + style;

    const buttons = {} as Record<string, HTMLButtonElement>;
    for (const text of Object.keys(buttonTexts)) {
        const buttonEl = createTabButton(buttonTexts[text]);
        element.appendChild(buttonEl);
        buttons[text] = buttonEl;
    }

    return { element, buttons };
}
