import { stringField, booleanField, objectField, setStringCallback, setNumberCallback, setBooleanCallback } from "./Display/Fields";

export function loadRawTab(content: HTMLElement, save: any) {
    while (content.firstChild)
        content.removeChild(content.firstChild);

    generateFields(content, save);
}

export function generateFields(element: HTMLElement, obj: any) {
    Object.keys(obj).forEach(function fieldKeys(key) {
        switch (typeof obj[key]) {
            case "string": {
                element.appendChild(stringField(key, obj[key], setStringCallback(obj, key)));
                break;
            }
            case "number": {
                element.appendChild(stringField(key, obj[key], setNumberCallback(obj, key)));
                break;
            }
            case "boolean": {
                element.appendChild(booleanField(key, obj[key], setBooleanCallback(obj, key)));
                break;
            }
            case "object": {
                if (obj[key] === null)
                    break;
                const objField = objectField(key);
                element.appendChild(objField.button);
                element.appendChild(objField.content);
                generateFields(obj[key], objField.content);
            }
        }
    });
}
