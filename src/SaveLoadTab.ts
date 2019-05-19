import { State } from "./Data/State";
import { charDefaults } from "./Data/CharDefaults";

export function loadSaveLoadTab(content: HTMLElement, state: State) {
    const background = document.createElement('div');
    background.className = 'content inverse';
    content.appendChild(background);

    const saveInput = document.createElement('input');
    saveInput.type = 'text';
    saveInput.placeholder = state.file && state.file.name ? state.file.name : 'default.coc2';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'tabbutton';

    const saveLink = document.createElement('a');
    saveLink.style.display = 'none';

    const loadButton = document.createElement('button');
    loadButton.textContent = 'Load';
    loadButton.className = 'tabbutton';

    background.appendChild(saveInput);
    background.appendChild(saveLink);
    background.appendChild(saveButton);
    background.appendChild(loadButton);

    saveButton.addEventListener('click', () => {
        if (state.fileReader && state.file) {
            let filename = (saveInput.value && saveInput.value) !== state.file.name ? saveInput.value : state.file.name;
            if (!filename.endsWith('.coc2')) filename += '.coc2';
            const blob = new Blob([JSON.stringify(saveObj(state))], { type: 'text/json' });
            if ('StyleMedia' in (window as any)) // IE Edge
                window.navigator.msSaveBlob(blob, filename);
            else
                saveLink.href = window.URL.createObjectURL(blob);
            saveLink.download = filename;
            saveLink.click();
        }
        else {
            alert("No Save File loaded");
        }
    });

    loadButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.id = 'load';
        input.type = 'file';
        input.accept = '.coc2';
        input.style.display = 'none';
        input.addEventListener("change", () => {
            if (!input.files || input.files.length === 0) {
                alert("Error in file loading");
            }
            else {
                saveInput.placeholder = input.files[0].name;
                handleFiles(input.files[0], state);
            }
        });
        input.click();
    });
}

function handleFiles(file: File, state: State) {
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

function saveObj(state: State) {
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
