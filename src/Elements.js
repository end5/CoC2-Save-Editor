function createTextInput(initialValue, className, changeFunc) {
    var textAreaEl = document.createElement("input");
    textAreaEl.type = "text";
    textAreaEl.className = className;
    textAreaEl.value = initialValue;
    if (changeFunc)
        textAreaEl.addEventListener("change", changeFunc(textAreaEl));
    return textAreaEl;
}

function createCheckBox(checked, className, changeFunc) {
    var checkBoxEl = document.createElement("input");
    checkBoxEl.className = className;
    checkBoxEl.checked = checked;
    checkBoxEl.type = "checkbox";
    if (changeFunc)
        checkBoxEl.addEventListener("change", changeFunc(checkBoxEl));
    return checkBoxEl;
}

function createPanel() {
    var panel = document.createElement("div");
    panel.className = "panel";
    return panel;
}

function createAccordButton(text, panelEl, onClickFunc) {
    var accordButton = document.createElement("button");
    accordButton.textContent = text;
    accordButton.addEventListener("click", function accordClick() {
        this.classList.toggle('active');
        panelEl.classList.toggle('active');
        if (onClickFunc)
            onClickFunc(panelEl);
    });
    return accordButton;
}
