import { State } from "../Data/State";
import { charDefaults } from "../GameData/CharDefaults";
import 'file-saver';
import '../../external/FileSaver.js';
import { FieldHTML } from "../Display/HTMLGenerics";
import { GameSave, CharNames, FlagNames } from "../Data/GameSave";
import { Flags } from "../GameData/Flags";
import { createChar } from "../Data/Char";

export class SaveLoadBarHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly loadButton: HTMLButtonElement;
    public readonly saveButton: HTMLButtonElement;
    public readonly saveInput: HTMLInputElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.id = 'save-load-bar';

        this.loadButton = document.createElement('button');
        this.loadButton.textContent = 'Load';
        this.loadButton.className = 'tab';

        this.saveButton = document.createElement('button');
        this.saveButton.textContent = 'Save';
        this.saveButton.className = 'tab';

        this.saveInput = document.createElement('input');
        this.saveInput.type = 'text';

        this.element.appendChild(this.saveInput);
        this.element.appendChild(this.loadButton);
        this.element.appendChild(this.saveButton);
    }
}

export class SaveLoadBar {
    public constructor(state: State, onSuccess: () => void, onFailed: () => void, public readonly html = new SaveLoadBarHTML()) {
        if (state.file?.name)
            this.html.saveInput.placeholder = state.file.name;
        else
            this.html.saveInput.disabled = true;

        this.html.saveButton.addEventListener('click', () => {
            if (state.fileReader && state.file && state.editObj) {
                const saveInput = this.html.saveInput;
                let filename = saveInput.value !== this.html.saveInput.placeholder ? saveInput.value : saveInput.placeholder;
                if (!filename.endsWith('.coc2')) filename += '.coc2';
                try {
                    const blob = new Blob([JSON.stringify(packSave(state.editObj))], { type: 'text/json' });
                    saveAs(blob, filename);
                }
                catch (e) {
                    alert("Problem with saving. Error:" + e);
                }
            }
            else {
                alert("No Save File loaded");
            }
        });

        this.html.loadButton.addEventListener('click', () => {
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
                    this.html.saveInput.placeholder = input.files[0].name;
                    handleFiles(input.files[0], state, (filename) => {
                        this.html.saveInput.placeholder = filename;
                        this.html.saveInput.value = filename;
                        this.html.saveInput.disabled = false;
                        onSuccess();
                    }, () => {

                    });
                }
            });
            input.click();
        });
    }
}

function handleFiles(file: File, state: State, onSuccess: (filename: string) => void, onFailed: () => void) {
    state.file = file;
    state.fileReader = new FileReader();
    state.fileReader.readAsText(state.file);
    state.fileReader.addEventListener("loadend", () => {
        let saveObj;
        if (!state.fileReader) {
            alert('Error reading file');
            throw new Error('FileReader disappeared');
        }

        if (typeof state.fileReader.result !== 'string') {
            alert('Error reading file');
            throw new Error('File read result not a string');
        }

        try {
            saveObj = JSON.parse(state.fileReader.result);
        }
        catch (err) {
            alert("Error parsing file");
            throw err;
        }

        try {
            validateSave(saveObj);
        }
        catch (err) {
            alert('Loading save failed - ' + err);
            throw err;
        }

        state.fileObj = saveObj;
        state.editObj = unpackSave(saveObj);

        alert("Load Complete");
        onSuccess(file.name);
    });
    state.fileReader.addEventListener("error", (evnt) => {
        console.log(evnt);
        alert("Error reading file");
    });
}

function validateSave(saveObj: Partial<GameSave>): asserts saveObj is GameSave {
    if (!saveObj) throw new Error('Missing save object');
    if (!saveObj.chars) throw new Error('Missing chars');
    for (const key of Object.keys(charDefaults))
        if (!(key in saveObj.chars)) throw new Error('Missing char ' + key);

    if (!saveObj.flags) throw new Error('Missing flags');

    for (const key of Object.keys(saveObj.flags) as FlagNames[])
        if (!Flags.includes(key))
            console.log('Missing flag ' + key);
}

export function unpackSave(saveObj: GameSave) {
    const saveCopy = JSON.parse(JSON.stringify(saveObj)) as GameSave;
    const charKeys = Object.keys(charDefaults) as CharNames[];

    // This is unsafe. No values are being verified they are correct.
    for (const key of charKeys)
        saveCopy.chars[key] = Object.assign(createChar(), JSON.parse(JSON.stringify(charDefaults[key])), saveCopy.chars[key]);

    return saveCopy;
}

export function packSave(saveObj: GameSave) {
    const saveCopy: GameSave = JSON.parse(JSON.stringify(saveObj));
    const charKeys = Object.keys(charDefaults) as CharNames[];

    for (const charKey of charKeys)
        saveCopy.chars[charKey] = diffChar(charDefaults[charKey], saveCopy.chars[charKey]);

    return saveCopy;
}

export function diffChar<A extends Record<string, any>, B extends Record<string, any>>(packed: A, expanded: B): B {
    return Object.keys(expanded)
        .filter((key) => JSON.stringify(packed[key]) !== JSON.stringify(expanded[key]))
        .reduce((copyObj, key) => {
            copyObj[key] = expanded[key];
            return copyObj;
        }, {} as any);
}
