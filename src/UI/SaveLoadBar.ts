import { State } from "../Data/State";
import { charDefaults } from "../GameData/CharDefaults";
import 'file-saver';
import '../../external/FileSaver.js';
import { FieldHTML } from "../Display/HTMLGenerics";
import { GameSaveRaw, CharNames, FlagNames, GameSaveData, GameSaveState } from "../Data/GameSave";
import { Flags } from "../GameData/Flags";
import { createChar } from "../Data/Char";
import { CharType } from "../Data/CharTypes";

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

        document.body.addEventListener("dragenter", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        document.body.addEventListener("dragleave", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        document.body.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        document.body.addEventListener("drop", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!e.dataTransfer || !e.dataTransfer.files || e.dataTransfer.files.length === 0) {
                alert("Error in file loading");
            }
            else {
                this.html.saveInput.placeholder = e.dataTransfer.files[0].name;
                handleFiles(e.dataTransfer.files[0], state, (filename) => {
                    this.html.saveInput.placeholder = filename;
                    this.html.saveInput.value = filename;
                    this.html.saveInput.disabled = false;
                    onSuccess();
                }, () => {

                });
            }
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
            state.editObj = unpackSave(saveObj);
        }
        catch (err) {
            alert('Loading save failed - ' + err);
            throw err;
        }

        alert("Load Complete");
        onSuccess(file.name);
    });
    state.fileReader.addEventListener("error", (evnt) => {
        console.log(evnt);
        alert("Error reading file");
    });
}

function createSaveState(saveObj: GameSaveRaw): GameSaveState {
    if ('data' in saveObj) {
        const data = JSON.parse(saveObj.data) as GameSaveData;
        return { version: '0.5.33', raw: saveObj, data };
    }
    else {
        const data = JSON.parse(JSON.stringify(saveObj)) as GameSaveData;
        return { version: '0.5.29', raw: saveObj, data };
    }
}

export function unpackSave(saveObj?: GameSaveRaw) {
    if (!saveObj) throw new Error('Missing save object');

    const saveCopy = JSON.parse(JSON.stringify(saveObj)) as GameSaveRaw;
    const saveState = createSaveState(saveCopy);

    if (!saveState.data.chars) throw new Error('Missing chars');
    // for (const key of Object.keys(charDefaults))
    //     if (!(key in saveObj.chars)) throw new Error('Missing char ' + key);

    if (!saveState.data.flags) throw new Error('Missing flags');

    for (const key of Object.keys(saveState.data.flags) as FlagNames[])
        if (!Flags.includes(key))
            console.log('Missing flag ' + key);

    // This is unsafe. No values are being verified they are correct.
    const charKeys = Object.keys(charDefaults) as CharNames[];
    for (const key of charKeys)
        saveState.data.chars[key] = unpackChar(key, charDefaults[key], saveState.data.chars[key]);

    return saveState;
}

export function packSave(saveState: GameSaveState) {
    let saveDataCopy = JSON.parse(JSON.stringify(saveState.data)) as GameSaveData;

    const charKeys = Object.keys(charDefaults) as CharNames[];
    for (const key of charKeys)
        saveDataCopy.chars[key] = packChar(key, charDefaults[key], saveDataCopy.chars[key]);

    let saveRaw: GameSaveRaw;
    if (saveState.version == '0.5.33') {
        saveRaw = JSON.parse(JSON.stringify(saveState.raw)) as typeof saveState.raw;
        saveRaw.data = JSON.stringify(saveDataCopy);
    }
    else {
        saveRaw = saveDataCopy;
    }

    return saveRaw;
}

export function unpackChar<K extends keyof typeof charDefaults>(key: K, charDefault: typeof charDefaults[K], charType: CharType) {
    let char = Object.assign(createChar(), JSON.parse(JSON.stringify(charDefault)), charType);
    if ('_hairColor' in char) char.hairColor = char._hairColor;
    if (key == 'cait') {
        if ('_thickness' in char) char.thickness = char._thickness;
        if ('_hipRatingRaw' in char) char.hipRatingRaw = char._hipRatingRaw;
        if ('_buttRatingRaw' in char) char.buttRatingRaw = char._buttRatingRaw;
        if ('_bellyRatingRaw' in char) char.bellyRatingRaw = char._bellyRatingRaw;
    }
    return char;
}

export function packChar<K extends keyof typeof charDefaults>(key: K, charDefault: typeof charDefaults[K], charType: CharType) {
    if (key == 'cait') {
        (charType as any)._thickness = charType.thickness;
        (charType as any)._hipRatingRaw = charType.hipRatingRaw;
        (charType as any)._buttRatingRaw = charType.buttRatingRaw;
        (charType as any)._bellyRatingRaw = charType.bellyRatingRaw;
    }
    (charType as any)._hairColor = charType.hairColor;

    return diffChar(charDefault, charType);
}

export function diffChar<A extends Record<string, any>, B extends Record<string, any>>(packed: A, expanded: B): B {
    let copyObj: any = {};
    for (let key of Object.keys(expanded)) {
        if (key in packed && JSON.stringify(packed[key]) !== JSON.stringify(expanded[key]))
            copyObj[key] = expanded[key];
    }
    return copyObj;

    // return Object.keys(expanded)
    //     .filter((key) => JSON.stringify(packed[key]) !== JSON.stringify(expanded[key]))
    //     .reduce((copyObj, key) => {
    //         copyObj[key] = expanded[key];
    //         return copyObj;
    //     }, {} as any);
}
