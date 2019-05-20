import { charDefaults } from "./Data/CharDefaults";
import { charMap } from "./Data/CharMap";
import { objectField, multiOptionField, selectField, stringField, booleanField, setSelectorStringCallback, setStringCallback, setNumberCallback, setBooleanCallback } from "./Display/Fields";
import { PropDict, AnyProp, AnyLabeledProp, hasPropLabel, isObjectProp, ObjectProp, ArrayProp, isArrayProp, isMultiOptionProp } from "./Data/MapProps";
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

                generateMappedFields(
                    { [starterTag]: { button: undefined, content: charContentEl } },
                    Object.keys(charMap).reverse()
                        // Filter out tags not in this group
                        .filter((key) => charMap[key].groupTag && charMap[key].groupTag!.startsWith(starterTag))
                        .map((key) => generateInfo(char, key, charContentEl, charMap[key]))
                );
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

function generateMappedFields(tags?: Tags, startInfo?: Info | Info[]) {
    if (!startInfo)
        return;

    let queue = Array.isArray(startInfo) ? startInfo : [startInfo];
    tags = tags ? tags : {};

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
    }

    if (!obj[key] && (!isObjectProp(mapEntry) || (isObjectProp(mapEntry) && !mapEntry.canBeNull)))
        obj[key] = generateValue(mapEntry, obj[key]);

    if (hasPropLabel(mapEntry) && mapEntry.groupTag) {
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

    if (isMultiOptionProp(mapEntry)) {
        parentElement.appendChild(multiOptionField(label, obj, key, mapEntry));
    }
    else if (mapEntry.type === "object") {
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
            return Object.keys(obj[key]).reverse().map((objKey) => generateInfo(obj[key], objKey, objField.content, (mapEntry as ObjectProp).properties));
    }
    else if (isArrayProp(mapEntry)) {
        const objField = objectField(label);

        if (mapEntry.min)
            while (obj[key].length < mapEntry.min) {
                if (mapEntry.override && obj[key].length in mapEntry.override)
                    obj[key].push(generateValue(mapEntry.override[obj[key].length], obj[key]));
                else
                    obj[key].push(generateValue(mapEntry.entry, obj[key]));
            }

        if (!(mapEntry.min && mapEntry.max && mapEntry.min === mapEntry.max)) {
            generateAddRemoveButtons(
                objField.content,
                arrayAddCallback(tags, objField.content, obj, key, mapEntry),
                arrayRemoveCallback(objField.content, obj, key, mapEntry)
            );
        }

        parentElement.appendChild(objField.button);
        parentElement.appendChild(objField.content);

        if (obj[key])
            return Object.keys(obj[key]).reverse().map((objKey) => {
                if (!isArrayProp(mapEntry)) throw new Error('Changed from Array type');
                if (mapEntry.override && objKey in mapEntry.override!)
                    return generateInfo(obj[key], objKey, objField.content, mapEntry.override!);
                else
                    return generateInfo(obj[key], objKey, objField.content, mapEntry.entry);
            });
    }
    else if (mapEntry.type === "string") {
        if (mapEntry.options)
            parentElement.appendChild(selectField(label, generateValue(mapEntry, obj[key]), mapEntry.options, setSelectorStringCallback(obj, key)));
        else
            parentElement.appendChild(stringField(label, generateValue(mapEntry, obj[key]), setStringCallback(obj, key)));
    }
    else if (mapEntry.type === "number") {
        if (mapEntry.options)
            parentElement.appendChild(selectField(label, generateValue(mapEntry, obj[key]), mapEntry.options, setNumberCallback(obj, key, mapEntry.options.toSave)));
        else
            parentElement.appendChild(stringField(label, generateValue(mapEntry, obj[key]), setNumberCallback(obj, key)));
    }
    else if (mapEntry.type === "boolean") {
        parentElement.appendChild(booleanField(label, generateValue(mapEntry, obj[key]), setBooleanCallback(obj, key)));
    }
    return;
}

function generateValue(map: AnyProp, value: any) {
    if (isObjectProp(map)) {
        if (typeof value !== "object" || value == null)
            value = {};
        return Object.keys(map.properties).reduce((obj, key) => {
            obj[key] = generateValue(map.properties[key], value[key]);
            return obj;
        }, {} as Record<string, any>);
    }
    if (isArrayProp(map)) {
        if (!Array.isArray(value))
            value = [];
        return value.map((entry: any) => generateValue(map.entry, entry));
    }
    if (isMultiOptionProp(map)) {
        if (!Array.isArray(value))
            value = [];
        return value;
    }
    if (map.type === "boolean")
        return !!value;
    if (map.type === "number")
        return typeof value === "number" ? value : map.default || 0;
    if (map.type === "string") {
        if (typeof value === 'string')
            return value;
        else if (map.default)
            return map.default;
        else if (map.options && map.options.list.length > 0)
            return map.options.list[0];
        else
            return '';
    }
}

function objectAddCallback(tags: Tags, parent: HTMLElement, obj: Record<string, any>, key: string, map: ObjectProp) {
    return () => {
        if (obj[key] == null) {
            // Add value here to force display
            obj[key] = generateValue(map, obj[key]);
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
