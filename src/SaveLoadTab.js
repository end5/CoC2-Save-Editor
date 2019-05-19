function loadSaveLoadTab(content) {
    var background = document.createElement('div');
    background.className = 'content inverse';
    content.appendChild(background);

    var saveInput = document.createElement('input');
    saveInput.type = 'text';
    saveInput.placeholder = file && file.name ? file.name : 'default.coc2';

    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'tabbutton';

    var saveLink = document.createElement('a');
    saveLink.style.display = 'none';

    var loadButton = document.createElement('button');
    loadButton.textContent = 'Load';
    loadButton.className = 'tabbutton';

    background.appendChild(saveInput);
    background.appendChild(saveLink);
    background.appendChild(saveButton);
    background.appendChild(loadButton);

    saveButton.addEventListener('click', () => {
        if (fileReader) {
            var filename = saveInput.value && saveInput.value !== file.name ? saveInput.value : file.name;
            if (!filename.endsWith('.coc2')) filename += '.coc2';
            var blob = new Blob([JSON.stringify(saveObj())], { type: 'text/json' });
            if (!!window.StyleMedia) // IE Edge
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
        input.addEventListener("change", (event) => {
            if (!event.target.files || event.target.files.length === 0) {
                alert("Error in file loading");
            }
            else {
                saveInput.placeholder = event.target.files[0].name;
                handleFiles(event);
            }
        });
        input.click();
    });
}
