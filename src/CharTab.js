function generateCharList(obj, el) {
    var charsMenu = new RedrawingTabMenu('charMenu', true, true);
    el.appendChild(charsMenu.element);

    if (!saveEdit.editObj)
        alert("No Save loaded");
    else if (!saveEdit.editObj.chars)
        alert("No Characters in save");
    else {
        var charKeys = Object.keys(obj.chars).filter((key) => key in charDefaults);
        for (var index = 0; index < charKeys.length; index++) {
            var charKey = charKeys[index];
            if (!saveEdit.editObj.chars[charKey])
                alert("Character " + charKey + " not found");
            else {
                charsMenu.createTab(charKey, ((charKey) => (parentEl) => {
                        var infoMenu = new PersistantTabMenu('charInfoMenu');
                        parentEl.appendChild(infoMenu.element);
                        var tags = {};
                        var starterTags = ["Info", "Stats", "Effects", "Inventory", "Body"];
                        for (var index = 0; index < starterTags.length; index++)
                            tags[starterTags[index]] = infoMenu.createTab(starterTags[index]);

                        generateMappedFields(tags, Object.keys(charMap).reverse().map((key) => generateInfo(saveEdit.editObj.chars[charKey], key, infoMenu.element, charMap)));
                        var infoButton = infoMenu.getTab('Info');
                        if (infoButton)
                            infoButton.button.click();
                    }
                )(charKey));
            }
        }
    }
}

function generateAddRemoveButtons(panel, addCallback, removeCallback) {
    var addRemoveButtons = document.createElement("div");
    addRemoveButtons.className = "addRemoveButtons";
    var add = document.createElement("div");
    add.textContent = "+";
    add.className = "addRemoveButton";
    add.addEventListener("click", addCallback);
    var remove = document.createElement("div");
    remove.textContent = "–";
    remove.className = "addRemoveButton";
    remove.addEventListener("click", removeCallback);
    addRemoveButtons.appendChild(add);
    addRemoveButtons.appendChild(remove);
    panel.appendChild(addRemoveButtons);
}

function generateInfo(obj, key, element, map) {
    return {
        obj: obj,
        key: key,
        element: element,
        map: map,
    }
}

function generateValue(map, value, canBeNull) {
    if (map.type === "object") {
        if (typeof value !== "object" || value == null) value = {};
        return Object.keys(map.properties).reduce((obj, key) => {
            obj[key] = generateValue(map.properties[key], value[key]);
            return obj;
        }, {});
    }
    if (map.type === "array") {
        if (!Array.isArray(value)) value = [];
        return value.map(entry => generateValue(map.entry, entry));
    }
    if (map.type === "multioption") {
        if (!Array.isArray(value)) value = [];
        return value;
    }
    if (map.type === "boolean") return !!value;
    if (map.type === "number") return typeof value === "number" ? value : (map.default ? map.default : 0);
    if (map.type === "string") {
        if (typeof value === 'string')
            return value;
        else if (map.default)
            return map.default;
        else if (map.options && map.options.list.length > 0)
            return map.options.list[0];
        else
            return '';
    }
}

function processInfo(tags, info) {
    var obj = info.obj;
    var key = info.key;
    var mapEntry = info.map[key];
    var parentElement = info.element;
    var label = key;

    if (!mapEntry) {
        mapEntry = info.map;
    }

    if (mapEntry.label) {
        label = mapEntry.label;
    }

    if (!obj[key] && (mapEntry.type !== "object" || (mapEntry.type === "object" && !mapEntry.canBeNull))) {
        obj[key] = generateValue(mapEntry, obj[key]);
    }

    // tag = { button, content }
    if (mapEntry.label && mapEntry.groupTag) {
        mapEntry.groupTag.split(".").reduce((parentTag, curTag) => {
            if (!parentTag[curTag])
                parentTag[curTag] = { button: undefined, content: undefined };
            if (!parentTag[curTag].content) {
                var panel = createPanel();
                var button = objectField(curTag, panel);
                parentElement.appendChild(button);
                parentElement.appendChild(panel);
                parentTag[curTag].button = button;
                parentTag[curTag].content = panel;
            }
            parentElement = parentTag[curTag].content;
            return parentTag[curTag];
        }, tags);
    }

    if (mapEntry.type === "multioption" && mapEntry.options) {
        var panel = createPanel();
        panel.appendChild(multiOptionField(obj, key, mapEntry));
        parentElement.appendChild(objectField(label, panel));
        parentElement.appendChild(panel);
    }
    else if (mapEntry.type === "object") {
        var panel = createPanel();
        if (mapEntry.canBeNull) {
            generateAddRemoveButtons(
                panel,
                objectAddCallback(tags, panel, obj, key, mapEntry),
                objectRemoveCallback(panel, obj, key)
            );
        }

        parentElement.appendChild(objectField(label, panel));
        parentElement.appendChild(panel);

        if (obj[key])
            return Object.keys(obj[key]).reverse().map((objKey) => generateInfo(obj[key], objKey, panel, mapEntry.properties));
    }
    else if (mapEntry.type === "array") {
        var panel = createPanel();
        if (mapEntry.min)
            while (obj[key].length < mapEntry.min) {
                if (mapEntry.override && obj[key].length in mapEntry.override)
                    obj[key].push(generateValue(mapEntry.override[obj[key].length], obj[key]));
                else
                    obj[key].push(generateValue(mapEntry.entry, obj[key]));
            }

        if (!(mapEntry.min && mapEntry.max && mapEntry.min === mapEntry.max)) {
            generateAddRemoveButtons(
                panel,
                arrayAddCallback(tags, panel, obj, key, mapEntry),
                arrayRemoveCallback(panel, obj, key, mapEntry)
            );
        }

        parentElement.appendChild(objectField(label, panel));
        parentElement.appendChild(panel);

        if (obj[key])
            return Object.keys(obj[key]).reverse().map((objKey) => {
                if (mapEntry.override && objKey in mapEntry.override)
                    return generateInfo(obj[key], objKey, panel, mapEntry.override);
                else
                    return generateInfo(obj[key], objKey, panel, mapEntry.entry);
            });
    }
    else if (mapEntry.type === "string") {
        if (mapEntry.options)
            parentElement.appendChild(selectField(label, generateValue(mapEntry, obj[key]), mapEntry.options, setSelectorStringCallback(obj, key, mapEntry.options.toSave)));
        else
            parentElement.appendChild(stringField(label, generateValue(mapEntry, obj[key]), setStringCallback(obj, key)));
    }
    else if (mapEntry.type === "number") {
        if (mapEntry.options)
            parentElement.appendChild(selectField(label, generateValue(mapEntry, obj[key]), mapEntry.options, setNumberCallback(obj, key, mapEntry.options.toSave)));
        else
            parentElement.appendChild(stringField(label, generateValue(mapEntry, obj[key]), setNumberCallback(obj, key)));
    }
    else if (mapEntry.type === "boolean") {
        parentElement.appendChild(booleanField(label, generateValue(mapEntry, obj[key]), setBooleanCallback(obj, key)));
    }
}

function objectAddCallback(tags, parent, obj, key, map) {
    return () => {
        if (obj[key] == null) {
            obj[key] = generateValue(map, obj[key]);
            generateMappedFields(tags, Object.keys(map.properties).reverse().map((mapKey) =>
                generateInfo(obj[key], mapKey, parent, map.properties)
            ));
        }
    };
}
function objectRemoveCallback(parent, obj, key) {
    return () => {
        if (obj[key]) {
            while (parent.lastChild && parent.lastChild !== parent.firstChild) {
                parent.removeChild(parent.lastChild);
            }
            obj[key] = null;
        }
    };
}

function arrayAddCallback(tags, parent, obj, key, map) {
    return () => {
        if (!map.max || (map.max && obj[key].length < map.max)) {
            var objKey = (typeof obj[key] === 'object' ? Object.keys(obj[key]).length : obj[key].length + '');
            if (map.override && objKey in map.override)
                generateMappedFields(tags, processInfo(tags, generateInfo(obj[key], objKey, parent, map.override)));
            else
                generateMappedFields(tags, processInfo(tags, generateInfo(obj[key], objKey, parent, map.entry)));
        }
    };
}

function arrayRemoveCallback(parent, obj, key, map) {
    return () => {
        if (obj[key]) {
            if (obj[key].length > (map.min ? map.min : 0) && parent.lastChild) {
                parent.removeChild(parent.lastChild);
                if (typeof obj[key].pop() === "object")
                    parent.removeChild(parent.lastChild);
            }
        }
    };
}

function generateMappedFields(tags, startInfo) {
    if (!startInfo)
        return;

    var queue = Array.isArray(startInfo) ? startInfo : [startInfo];
    var tags = tags ? tags : {};

    while (queue.length > 0) {
        var results = processInfo(tags, queue.pop());
        if (results)
            queue = queue.concat(results);
    }
}
