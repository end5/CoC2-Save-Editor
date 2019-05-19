import { State } from "./State";
import { handleFiles, saveObj } from "./SaveLoad";

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
