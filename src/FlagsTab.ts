import { createFilterBar } from "./Display/Elements";
import { stringField } from "./Display/Fields";
import { Flags } from "./Data/Flags";

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
        const el = stringField(name, save.flags[name] ? save.flags[name] : '', booleanStringOrNumber(save.flags, name));
        ulEl.appendChild(el);
        return { name, el };
    });

    filterBar.addEventListener('keyup', () => {
        for (const pair of flagNameElPairs) {
            if (pair.name.toLocaleLowerCase().startsWith(filterBar.value.toLocaleLowerCase())) {
                if (pair.el.classList.contains('collapsed')) {
                    pair.el.classList.toggle('collapsed');
                }
            }
            else if (!pair.el.classList.contains('collapsed')) {
                pair.el.classList.toggle('collapsed');
            }
        }
    });

    filterBarDiv.appendChild(filterBar);
    flagContent.appendChild(filterBarDiv);
    flagContent.appendChild(ulEl);
}

function booleanStringOrNumber(obj: Record<string, any>, key: string) {
    return (element: HTMLInputElement | HTMLSelectElement) => () => {
        if (element.value.toLocaleLowerCase() === 'true')
            obj[key] = true;
        else if (element.value.toLocaleLowerCase() === 'false')
            obj[key] = false;
        else if (!isNaN(+element.value))
            obj[key] = +element.value;
        else
            obj[key] = element.value;
    };
}
