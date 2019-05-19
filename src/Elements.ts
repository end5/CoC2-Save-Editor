export function createTextInput(initialValue: string, className: string, changeFunc?: (element: HTMLInputElement) => () => void) {
    const textAreaEl = document.createElement("input");
    textAreaEl.type = "text";
    textAreaEl.className = className;
    textAreaEl.value = initialValue;
    if (changeFunc)
        textAreaEl.addEventListener("change", changeFunc(textAreaEl));
    return textAreaEl;
}

export function createCheckBox(checked: boolean, className: string, changeFunc?: (element: HTMLInputElement) => () => void) {
    const checkBoxEl = document.createElement("input");
    checkBoxEl.className = className;
    checkBoxEl.checked = checked;
    checkBoxEl.type = "checkbox";
    if (changeFunc)
        checkBoxEl.addEventListener("change", changeFunc(checkBoxEl));
    return checkBoxEl;
}

export function createPanel() {
    const panel = document.createElement("div");
    panel.className = "panel";
    return panel;
}

export function createAccordButton(text: string, panelEl: HTMLElement, onClickFunc?: (element: HTMLElement) => void) {
    const accordButton = document.createElement("button");
    accordButton.textContent = text;
    accordButton.addEventListener("click", function accordClick() {
        this.classList.toggle('active');
        panelEl.classList.toggle('active');
        if (onClickFunc)
            onClickFunc(panelEl);
    });
    return accordButton;
}
