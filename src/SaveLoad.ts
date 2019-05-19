import { State } from "./State";
import { charDefaults } from "./CharDefaults";

export function handleFiles(file: File, state: State) {
    state.file = file;
    state.fileReader = new FileReader();
    state.fileReader.readAsText(state.file);
    state.fileReader.addEventListener("loadend", (ev) => {
        let obj;
        try {
            if (!state.fileReader) throw new Error('FileReader disappeared');
            if (typeof state.fileReader.result !== 'string') throw new Error('File read result not a string');
            obj = JSON.parse(state.fileReader.result);
        }
        catch (e) {
            console.error(e);
            alert("Error parsing file");
        }
        if (obj) {
            loadObj(obj, state);
            alert("Load Complete");
        }
    });
    state.fileReader.addEventListener("error", (evnt) => {
        console.log(evnt);
        alert("Error reading file");
    });
}

function loadObj(obj: any, state: State) {
    state.fileObj = obj;
    state.editObj = JSON.parse(JSON.stringify(obj));
    // load char defaults
    (Object.keys(charDefaults) as (keyof typeof charDefaults)[]).forEach((key) => {
        state.editObj.chars[key] = Object.assign(JSON.parse(JSON.stringify(charDefaults[key])), state.editObj.chars[key]);
    });
}

// state.diffChar = (name) => diffChar(charDefaults[name], state.editObj.chars[name]);
// state.charDefaults = charDefaults;

export function saveObj(state: State) {
    const saveCopy = JSON.parse(JSON.stringify(state.fileObj));
    saveCopy.chars = (Object.keys(charDefaults) as (keyof typeof charDefaults)[]).reduce((obj, key) => {
        obj[key] = diffChar(charDefaults[key], state.editObj.chars[key]);
        return obj;
    }, {} as Record<keyof typeof charDefaults, any>);
    return saveCopy;
}

function diffChar(orig: any, edit: any) {
    return Object.keys(orig)
        .filter((key) => JSON.stringify(orig[key]) !== JSON.stringify(edit[key]))
        .reduce((copyObj, key) => {
            copyObj[key] = edit[key];
            return copyObj;
        }, {} as any);
}
