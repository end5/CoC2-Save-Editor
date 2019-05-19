import { stringField, booleanField, objectField, setStringCallback, setNumberCallback, setBooleanCallback } from "./Fields";
import { createPanel } from "./Elements";

export function generateFields(obj: any, element: HTMLElement) {
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
                const panel = createPanel();
                element.appendChild(objectField(key, panel));
                element.appendChild(panel);
                generateFields(obj[key], panel);
            }
        }
    });
}
