import { createFilterBar } from "./Display/Elements";
import { stringField } from "./Display/Fields";
import { Flags } from "./GameData/Flags";

export function loadFlagTab(flagContent: HTMLElement, save: Record<string, any>) {
    while (flagContent.firstChild)
        flagContent.removeChild(flagContent.firstChild);

    const filterBarDiv = document.createElement('div');
    filterBarDiv.className = 'filter-div dark';
    const filterBar = createFilterBar();

    const ulEl = document.createElement('ul');
    ulEl.className = 'flags';

    // Assume they are all strings or numbers
    const flagNameElPairs = Flags.map((name) => {
        const el = stringField(name, save.flags[name] || '', booleanStringOrNumber(save.flags, name));
        ulEl.appendChild(el);
        return { name, el };
    });

    filterBar.addEventListener('keyup', () => {
        const filterText = filterBar.value.toLocaleLowerCase();

        for (const pair of flagNameElPairs) {
            if (pair.name.toLocaleLowerCase().startsWith(filterText))
                pair.el.classList.remove('collapsed');
            else
                pair.el.classList.add('collapsed');
        }
    });

    filterBarDiv.appendChild(filterBar);
    flagContent.appendChild(filterBarDiv);
    flagContent.appendChild(ulEl);
}

function booleanStringOrNumber(obj: Record<string, any>, key: string) {
    return (element: HTMLInputElement | HTMLSelectElement) => () => {
        if (element.value === '' || element.value === undefined)
            delete obj[key];
        else if (element.value.toLocaleLowerCase() === 'true')
            obj[key] = true;
        else if (element.value.toLocaleLowerCase() === 'false')
            obj[key] = false;
        else if (!isNaN(+element.value))
            obj[key] = +element.value;
        else
            obj[key] = element.value;
    };
}
