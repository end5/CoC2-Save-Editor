import { RedrawingTabMenu, PersistantTabMenu } from "./Display/Menus";
import { charDefaults } from "./Data/CharDefaults";
import { charMap } from "./Data/CharMap";
import { createPanel } from "./Display/Elements";
import { objectField, multiOptionField, selectField, stringField, booleanField, setSelectorStringCallback, setStringCallback, setNumberCallback, setBooleanCallback } from "./Display/Fields";
import { State } from "./Data/State";
import { PropDict, AnyProp, AnyLabeledProp, hasPropLabel, isObjectProp, ObjectProp, ArrayProp, isArrayProp } from "./Data/MapProps";

export function generateCharList(obj: any, el: HTMLElement, state: State) {
    const charsMenu = new RedrawingTabMenu('charMenu', true, true);
    el.appendChild(charsMenu.element);

    if (!state.editObj)
        alert("No Save loaded");
    else if (!state.editObj.chars)
        alert("No Characters in save");
    else {
        const charKeys = Object.keys(obj.chars).filter((key) => key in charDefaults);
        for (const charKey of charKeys) {
            if (!state.editObj.chars[charKey])
                alert("Character " + charKey + " not found");
            else {
                charsMenu.createTab(charKey, ((charName) => (parentEl: HTMLElement) => {
                    const infoMenu = new PersistantTabMenu('charInfoMenu');
                    parentEl.appendChild(infoMenu.element);
                    const tags = {} as Record<string, any>;
                    const starterTags = ["Info", "Stats", "Effects", "Inventory", "Body"];
                    for (const startTag of starterTags)
                        tags[startTag] = infoMenu.createTab(startTag);

                    generateMappedFields(tags, Object.keys(charMap).reverse().map((key) => generateInfo(state.editObj.chars[charName], key, infoMenu.element, charMap)));
                    const infoButton = infoMenu.getTab('Info');
                    if (infoButton)
                        infoButton.button.click();
                }
                )(charKey));
            }
        }
    }
}

function generateAddRemoveButtons(panel: HTMLElement, addCallback: () => void, removeCallback: () => void) {
    const addRemoveButtons = document.createElement("div");
    addRemoveButtons.className = "addRemoveButtons";
    const add = document.createElement("div");
    add.textContent = "+";
    add.className = "addRemoveButton";
    add.addEventListener("click", addCallback);
    const remove = document.createElement("div");
    remove.textContent = "–";
    remove.className = "addRemoveButton";
    remove.addEventListener("click", removeCallback);
    addRemoveButtons.appendChild(add);
    addRemoveButtons.appendChild(remove);
    panel.appendChild(addRemoveButtons);
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

function generateValue(map: AnyProp, value: any) {
    if (map.type === "object") {
        if (typeof value !== "object" || value == null) value = {};
        return Object.keys(map.properties).reduce((obj, key) => {
            obj[key] = generateValue(map.properties[key], value[key]);
            return obj;
        }, {} as Record<string, any>);
    }
    if (map.type === "array") {
        if (!Array.isArray(value)) value = [];
        return value.map((entry: any) => generateValue(map.entry, entry));
    }
    if (map.type === "multioption") {
        if (!Array.isArray(value)) value = [];
        return value;
    }
    if (map.type === "boolean") return !!value;
    if (map.type === "number") return typeof value === "number" ? value : (map.default ? map.default : 0);
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

    if (!obj[key] && (!isObjectProp(mapEntry) || (isObjectProp(mapEntry) && !mapEntry.canBeNull))) {
        obj[key] = generateValue(mapEntry, obj[key]);
    }

    // tag = { button, content }
    if (hasPropLabel(mapEntry) && mapEntry.groupTag) {
        mapEntry.groupTag.split(".").reduce((parentTag, curTag) => {
            if (!parentTag[curTag])
                parentTag[curTag] = { button: undefined, content: undefined };
            if (!parentTag[curTag].content) {
                const panel = createPanel();
                const button = objectField(curTag, panel);
                parentElement.appendChild(button);
                parentElement.appendChild(panel);
                parentTag[curTag].button = button;
                parentTag[curTag].content = panel;
            }
            parentElement = (parentTag[curTag] as Tag).content!;
            return parentTag[curTag] as TagDict;
        }, tags as TagDict);
    }

    if (mapEntry.type === "multioption" && mapEntry.options) {
        const panel = createPanel();
        panel.appendChild(multiOptionField(obj, key, mapEntry));
        parentElement.appendChild(objectField(label, panel));
        parentElement.appendChild(panel);
    }
    else if (mapEntry.type === "object") {
        const panel = createPanel();
        if (mapEntry.canBeNull) {
            generateAddRemoveButtons(
                panel,
                objectAddCallback(tags, panel, obj, key, mapEntry),
                objectRemoveCallback(panel, obj, key)
            );
        }

        parentElement.appendChild(objectField(label, panel));
        parentElement.appendChild(panel);

        if (obj[key])
            return Object.keys(obj[key]).reverse().map((objKey) => generateInfo(obj[key], objKey, panel, (mapEntry as ObjectProp).properties));
    }
    else if (mapEntry.type === "array") {
        const panel = createPanel();
        if (mapEntry.min)
            while (obj[key].length < mapEntry.min) {
                if (mapEntry.override && obj[key].length in mapEntry.override)
                    obj[key].push(generateValue(mapEntry.override[obj[key].length], obj[key]));
                else
                    obj[key].push(generateValue(mapEntry.entry, obj[key]));
            }

        if (!(mapEntry.min && mapEntry.max && mapEntry.min === mapEntry.max)) {
            generateAddRemoveButtons(
                panel,
                arrayAddCallback(tags, panel, obj, key, mapEntry),
                arrayRemoveCallback(panel, obj, key, mapEntry)
            );
        }

        parentElement.appendChild(objectField(label, panel));
        parentElement.appendChild(panel);

        if (obj[key])
            return Object.keys(obj[key]).reverse().map((objKey) => {
                if (!isArrayProp(mapEntry)) throw new Error('Changed from Array type');
                if (mapEntry.override && objKey in mapEntry.override!)
                    return generateInfo(obj[key], objKey, panel, mapEntry.override!);
                else
                    return generateInfo(obj[key], objKey, panel, mapEntry.entry);
            });
    }
    else if (mapEntry.type === "string") {
        if (mapEntry.options)
            parentElement.appendChild(selectField(label, generateValue(mapEntry, obj[key]), mapEntry.options, setSelectorStringCallback(obj, key, mapEntry.options.toSave)));
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

function objectAddCallback(tags: Tags, parent: HTMLElement, obj: any, key: string, map: ObjectProp) {
    return () => {
        if (obj[key] == null) {
            obj[key] = generateValue(map, obj[key]);
            generateMappedFields(tags, Object.keys(map.properties).reverse().map((mapKey) =>
                generateInfo(obj[key], mapKey, parent, map.properties)
            ));
        }
    };
}
function objectRemoveCallback(parent: HTMLElement, obj: any, key: string) {
    return () => {
        if (obj[key]) {
            while (parent.lastChild && parent.lastChild !== parent.firstChild) {
                parent.removeChild(parent.lastChild);
            }
            obj[key] = null;
        }
    };
}

function arrayAddCallback(tags: Tags, parent: HTMLElement, obj: any, key: string, map: ArrayProp) {
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

function arrayRemoveCallback(parent: HTMLElement, obj: any, key: string, map: ArrayProp) {
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
