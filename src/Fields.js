function fieldTitle(key) {
    var title = document.createElement("div");
    title.className = "fieldTitle";
    title.textContent = key;
    return title;
}

function fieldLabel(key) {
    var entry = document.createElement("label");
    entry.className = "fieldEntry";
    var title = fieldTitle(key);
    entry.appendChild(title);
    return entry;
}

function objectField(text, panel) {
    var accordButton = createAccordButton("", panel);
    accordButton.className += " fieldTitle";
    accordButton.textContent = "⬥ " + text;
    accordButton.addEventListener("click", {
        open: false,
        fieldName: text,
        button: accordButton,
        handleEvent() {
            this.open = !this.open;
            this.button.textContent = (this.open ? '⬦ ' : '⬥ ') + this.fieldName;
        }
    });
    return accordButton;
}

function stringField(name, initialValue, changeFunc) {
    var div = fieldLabel(name);
    var input = createTextInput(initialValue, "", changeFunc);
    div.appendChild(input);
    return div;
}

function booleanField(name, initialValue, changeFunc) {
    var div = fieldLabel(name);
    var input = createCheckBox(initialValue, "", changeFunc);
    div.appendChild(input);
    return div;
}

function selectField(name, initialValue, options, changeFunc) {
    var div = fieldLabel(name);
    var selector = document.createElement("select");
    options.list.forEach((value, index) => {
        var option = document.createElement("option");
        option.value = index + '';
        option.textContent = value;
        if (options.fromSave && !isNaN(options.fromSave(+initialValue)))
            option.selected = options.fromSave(+initialValue) === index;
        else
            option.selected = initialValue === index || initialValue === value;
        selector.appendChild(option);
    });
    selector.addEventListener("change", changeFunc(selector));
    div.appendChild(selector);
    return div;
}

function multiOptionField(obj, key, mapValue) {
    const listEl = document.createElement('ul');
    const options = mapValue.options;
    options.list.forEach((option, index) => {
        const selected = obj[key].reduce((prev, curr) => prev = prev || (option === curr) || (index === curr), false);
        const label = fieldLabel(option);
        label.className += ' multioption' + (selected ? ' selected' : '');
        label.addEventListener('click', () => {
            const list = Array.from(listEl.getElementsByTagName('label'));
            const selectedList = list.filter((el) => el.classList.contains('selected'));
            // On
            if (!mapValue.max || (mapValue.max && selectedList.length < mapValue.max)) {
                label.classList.toggle('selected');
                selectedList.push(label);
            }
            // Off
            else if (label.classList.contains('selected'))
                label.classList.toggle('selected');

            if (mapValue.transform)
                obj[key] = selectedList.map((el) => mapValue.transform(el.textContent));
            else {
                obj[key] = list.reduce((numList, el, numIndex) => {
                    if (el.classList.contains('selected') && el.textContent)
                        numList.push(numIndex);
                    return numList;
                }, []);
            }
        });
        listEl.appendChild(label);
    });
    return listEl;
}
