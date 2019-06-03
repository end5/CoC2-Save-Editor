import { charDefaults } from "./Data/CharDefaults";
import { charMap } from "./Data/CharMap";
import { objectField, multiOptionField, selectField, stringField, booleanField, setSelectorCallback, setStringCallback, setNumberCallback, setBooleanCallback } from "./Display/Fields";
import { PropDict, AnyProp, AnyLabeledProp, hasPropLabel, ObjectProp, ArrayProp, MultiOptionProp, SelectorProp } from "./Data/MapProps";
import { TabMenu } from "./Display/TabMenu";

export function loadCharTab(charContent: HTMLElement, save: Record<string, any>) {
    while (charContent.firstChild)
        charContent.removeChild(charContent.firstChild);

    generateCharList(charContent, save.chars);
}

function generateCharList(el: HTMLElement, charObj: Record<string, any>) {
    const menu = new TabMenu({ tabsPos: 'left', inactiveStyle: 'light', activeStyle: 'dark' });

    const charKeys = Object.keys(charObj).filter((key) => key in charDefaults);

    let firstTab;
    let name;
    for (const charKey of charKeys) {
        name = charKey;
        if (charObj[charKey].name)
            name = charObj[charKey].name;

        if (!firstTab)
            firstTab = menu.createTab(name, generateCharInfo(charObj[charKey]));
        else
            menu.createTab(name, generateCharInfo(charObj[charKey]));
    }

    el.appendChild(menu.element);

    if (firstTab)
        firstTab.button.click();
}

function generateCharInfo(char: Record<string, any>) {
    return (charsContentEl: HTMLElement) => {
        while (charsContentEl.firstChild)
            charsContentEl.removeChild(charsContentEl.firstChild);

        const infoMenu = new TabMenu({ tabsPos: 'top', inactiveStyle: 'dark', activeStyle: 'light' });

        const starterTags = ['Info', 'Stats', 'Effects', 'Inventory', 'Body'];
        for (const starterTag of starterTags) {
            infoMenu.createTab(starterTag, (charContentEl) => {
                while (charContentEl.firstChild)
                    charContentEl.removeChild(charContentEl.firstChild);

                try {
                    generateMappedFields(
                        { [starterTag]: { button: undefined, content: charContentEl } },
                        Object.keys(charMap).reverse()
                            // Filter out tags not in this group
                            .filter((key) => charMap[key].groupTag && charMap[key].groupTag!.startsWith(starterTag))
                            .map((key) => generateInfo(char, key, charContentEl, charMap[key]))
                    );
                }
                catch (e) {
                    alert(e);
                }
            });
        }
        const infoButton = infoMenu.getTab('Info');
        if (infoButton)
            infoButton.button.click();

        charsContentEl.appendChild(infoMenu.element);
    };
}

export type Tags = Tag | TagDict;
export interface TagDict { [x: string]: Tags; }

export interface Tag {
    button?: HTMLElement;
    content?: HTMLElement;
}

interface Info {
    obj: Record<string, any>;
    key: string;
    element: HTMLElement;
    map: PropDict | AnyLabeledProp | AnyProp;
}

function generateInfo<P extends PropDict | AnyProp | AnyLabeledProp>(obj: Record<string, any>, key: string, element: HTMLElement, map: P): Info {
    return {
        obj,
        key,
        element,
        map,
    };
}

function generateMappedFields(tags: Tags, startInfo?: Info | Info[]) {
    if (!startInfo)
        return;

    let queue = Array.isArray(startInfo) ? startInfo : [startInfo];

    while (queue.length > 0) {
        const results = processInfo(tags, queue.pop()!);
        if (results)
            queue = queue.concat(results);
    }
}

function processInfo(tags: Tags, info: Info) {
    const obj = info.obj;
    const key = info.key;
    let mapEntry: AnyLabeledProp | AnyProp = (info.map as PropDict)[key];
    let parentElement = info.element;
    let label = key;

    if (!mapEntry) {
        mapEntry = info.map as AnyProp;
    }

    if (hasPropLabel(mapEntry)) {
        label = mapEntry.label;

        if (mapEntry.groupTag) {
            mapEntry.groupTag.split(".").reduce((parentTag, curTag) => {
                if (!parentTag[curTag])
                    parentTag[curTag] = { button: undefined, content: undefined };
                if (!parentTag[curTag].content) {
                    const objField = objectField(curTag);
                    parentElement.appendChild(objField.button);
                    parentElement.appendChild(objField.content);
                    parentTag[curTag] = objField;
                }
                parentElement = (parentTag[curTag] as Tag).content!;
                return parentTag[curTag] as TagDict;
            }, tags as TagDict);
        }
    }

    if (!obj[key] && (mapEntry.type !== 'object' || (mapEntry.type === 'object' && !mapEntry.canBeNull)))
        obj[key] = generateValue(mapEntry);

    if (mapEntry.type === 'multioption') {
        parentElement.appendChild(multiOptionField(
            label,
            maybeFromSave(mapEntry, obj[key]),
            mapEntry,
            (multiMapEntry, selValues) => {
                if (multiMapEntry.options.toSave)
                    obj[key] = selValues.map((value) => multiMapEntry.options.toSave!(value));
                else
                    obj[key] = selValues;
            }
        ));
    }
    else if (mapEntry.type === 'object') {
        const objField = objectField(label);

        if (mapEntry.canBeNull) {
            generateAddRemoveButtons(
                objField.content,
                objectAddCallback(tags, objField.content, obj, key, mapEntry),
                objectRemoveCallback(objField.content, obj, key)
            );
        }

        parentElement.appendChild(objField.button);
        parentElement.appendChild(objField.content);

        if (obj[key])
            return Object.keys(obj[key]).concat(Object.keys(mapEntry.properties))
                .filter((objKey, index, self) => self.indexOf(objKey) === index)
                .reverse()
                .map((objKey) => generateInfo(obj[key], objKey, objField.content, (mapEntry as ObjectProp).properties));
    }
    else if (mapEntry.type === 'array') {
        const objField = objectField(label);

        if (!(mapEntry.min && mapEntry.max && mapEntry.min === mapEntry.max)) {
            generateAddRemoveButtons(
                objField.content,
                arrayAddCallback(tags, objField.content, obj, key, mapEntry),
                arrayRemoveCallback(objField.content, obj, key, mapEntry)
            );
        }

        parentElement.appendChild(objField.button);
        parentElement.appendChild(objField.content);

        let maxMin = obj[key].length;
        if (mapEntry.min && mapEntry.min > maxMin)
            maxMin = mapEntry.min;

        const list = [];
        for (let index = maxMin - 1; index >= 0; index--) {
            if (mapEntry.override && index in mapEntry.override)
                list.push(generateInfo(obj[key], index + '', objField.content, mapEntry.override));
            else
                list.push(generateInfo(obj[key], index + '', objField.content, mapEntry.entry));
        }
        return list;
    }
    else if (mapEntry.type === "selector") {
        parentElement.appendChild(selectField(
            label,
            maybeFromSave(mapEntry, obj[key]),
            mapEntry.options,
            setSelectorCallback(obj, key, mapEntry.options.toSave)
        ));
    }
    else if (mapEntry.type === "string") {
        parentElement.appendChild(stringField(
            label,
            obj[key],
            setStringCallback(obj, key)
        ));
    }
    else if (mapEntry.type === "number") {
        parentElement.appendChild(stringField(
            label,
            obj[key],
            setNumberCallback(obj, key)
        ));
    }
    else if (mapEntry.type === "boolean") {
        parentElement.appendChild(booleanField(
            label,
            obj[key],
            setBooleanCallback(obj, key)
        ));
    }
    return;
}

function generateValue(map: AnyProp) {
    if (map.type === 'object') {
        return {};
    }
    else if (map.type === 'array') {
        return [];
    }
    else if (map.type === 'multioption') {
        return [];
    }
    else if (map.type === 'selector') {
        if (map.options.toSave)
            return map.options.toSave(map.options.list[0]);
        else
            return map.options.list[0];
    }
    else if (map.type === 'boolean') {
        return map.default || false;
    }
    else if (map.type === 'number') {
        return map.default || 0;
    }
    else if (map.type === 'string') {
        return map.default || '';
    }
    throw new Error('Unknown map type');
}

function maybeFromSave(map: SelectorProp | MultiOptionProp, value: any) {
    if (map.options && map.options.fromSave)
        if (map.type === 'multioption')
            value = value.map((v: any) => map.options.fromSave!(v));
        else
            value = map.options!.fromSave(value);

    return value;
}

function objectAddCallback(tags: Tags, parent: HTMLElement, obj: Record<string, any>, key: string, map: ObjectProp) {
    return () => {
        if (obj[key] == null) {
            // Add value here to force display
            obj[key] = generateValue(map);
            generateMappedFields(tags, Object.keys(map.properties).reverse().map((mapKey) =>
                generateInfo(obj[key], mapKey, parent, map.properties)
            ));
        }
    };
}
function objectRemoveCallback(parent: HTMLElement, obj: Record<string, any>, key: string) {
    return () => {
        if (obj[key]) {
            while (parent.lastChild && parent.lastChild !== parent.firstChild) {
                parent.removeChild(parent.lastChild);
            }
            obj[key] = null;
        }
    };
}

function arrayAddCallback(tags: Tags, parent: HTMLElement, obj: Record<string, any>, key: string, map: ArrayProp) {
    return () => {
        if (!map.max || (map.max && obj[key].length < map.max)) {
            const objKey = (typeof obj[key] === 'object' ? Object.keys(obj[key]).length : obj[key].length) + '';
            if (map.override && objKey in map.override)
                generateMappedFields(tags, processInfo(tags, generateInfo(obj[key], objKey, parent, map.override)));
            else
                generateMappedFields(tags, processInfo(tags, generateInfo(obj[key], objKey, parent, map.entry)));
        }
    };
}

function arrayRemoveCallback(parent: HTMLElement, obj: Record<string, any>, key: string, map: ArrayProp) {
    return () => {
        if (obj[key]) {
            if (obj[key].length > (map.min ? map.min : 0) && parent.lastChild) {
                parent.removeChild(parent.lastChild);
                if (typeof obj[key].pop() === "object")
                    parent.removeChild(parent.lastChild);
            }
        }
    };
}

function generateAddRemoveButtons(panel: HTMLElement, addCallback: () => void, removeCallback: () => void) {
    const addRemoveButtons = document.createElement('div');
    addRemoveButtons.className = 'add-remove-buttons';
    const add = document.createElement('button');
    add.textContent = '+';
    add.className = 'button-pair dark';
    add.addEventListener('click', addCallback);
    const remove = document.createElement('button');
    remove.textContent = '–';
    remove.className = 'button-pair dark';
    remove.addEventListener('click', removeCallback);
    addRemoveButtons.appendChild(add);
    addRemoveButtons.appendChild(remove);
    panel.appendChild(addRemoveButtons);
}
