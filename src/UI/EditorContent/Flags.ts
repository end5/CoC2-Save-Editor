import { createFilterBar } from "../../Display/FilterBar";
import { StringField } from "../../Display/Fields";
import { Flags } from "../../GameData/Flags";
import { State } from "../../Data/State";

export function displayFlagContent(state: State) {
    const flagFields: Record<string, StringField> = {};

    const element = document.createElement('div');
    element.className = 'content';

    const filterBar = createFilterBar(flagFields);
    element.appendChild(filterBar);

    const flagListEl = document.createElement('ul');
    flagListEl.className = 'flags';

    for (const flag of Flags) {
        const field = new StringField(flag,
            () => convertValue(state.editObj?.flags[flag]),
            (value) => {
                if (state.editObj && state.editObj.flags)
                    if (value === '' || value === undefined)
                        delete state.editObj.flags[flag];
                    else
                        state.editObj.flags[flag] = convertValue(value);
            }
        );
        flagListEl.appendChild(field.element);
        flagFields[flag] = field;
    }

    element.appendChild(flagListEl);

    const load = () => {
        for (const flag of Object.keys(state.editObj?.flags)) {
            if (flagFields[flag] == null) {
                console.log('Flag not found in editor:', flag);
                continue;
            }
            flagFields[flag].load();
        }
    };

    return { element, load };
}

function convertValue(value: any) {
    if (value === '' || value === undefined)
        return '';
    else if (typeof value === 'string' && value.toLocaleLowerCase() === 'true')
        return true;
    else if (typeof value === 'string' && value.toLocaleLowerCase() === 'false')
        return false;
    else if (!isNaN(+value))
        return +value;
    else
        return value;
}
