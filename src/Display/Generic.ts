export function spaceAndCapText(text: string) {
    if (text.length <= 0) return '';
    return text[0].toLocaleUpperCase() + text.slice(1).replace(/([A-Z])/g, ' $1').trim();
}

export interface Component {
    element: HTMLElement;
    load: () => void;
}
