import { charDefaults } from "../../GameData/CharDefaults";
import { spaceAndCapText } from "../../Display/Generic";
import { createTabBar } from "../../Display/TabBar";
import { select, deselect, hide } from "../../Display/UIActions";
// import { SelectField } from "../../Display/Fields";

export function displayCharList(button: HTMLElement, onChange: (key: string, name: string) => void) {

    //
    // A test switch to select element
    //

    // const charKeys = Object.keys(charDefaults);
    // const options: Record<string, { name: string, element: HTMLOptionElement }> = {};

    // const element = document.createElement('select');
    // for (const key of charKeys) {
    //     const option = document.createElement('option');
    //     option.value = key;
    //     option.textContent = spaceAndCapText(key);
    //     option.selected = false;
    //     options[key] = { name: option.textContent, element: option };
    //     element.appendChild(option);
    // }

    // element.addEventListener('change', () => {
    //     // option element ONLY supports string
    //     // use name to loop up value
    //     onChange(element.value, options[element.value].name);
    // });

    // const load = () => {
    //     // TODO: Change this to click on first load only
    //     options[charKeys[0]].element.click();
    // };

    //
    // End test
    //

    const element = document.createElement('div');
    element.id = 'char-list';

    const nameTable: Record<string, string> = {};
    const charKeys = Object.keys(charDefaults);
    for (const key of charKeys) {
        nameTable[key] = spaceAndCapText(key);
    }

    const tabBar = createTabBar('vertical', nameTable);
    element.appendChild(tabBar.element);

    for (const key of charKeys) {
        tabBar.buttons[key].addEventListener('click', function (this) {
            onChange(key, this.textContent || '');
            for (const buttonKey of charKeys) {
                if (this === tabBar.buttons[buttonKey])
                    select(this);
                else
                    deselect(tabBar.buttons[buttonKey]);
            }
            deselect(button);
            hide(element);
        });
    }

    const load = () => {
        // TODO: Change this to click on first load only
        tabBar.buttons[charKeys[0]].click();
    };

    return { element, load };
}
