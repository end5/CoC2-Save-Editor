function generateFields(obj, element) {
    Object.keys(obj).forEach(function fieldKeys(key) {
        switch (typeof obj[key]) {
            case "string": {
                element.appendChild(stringField(key, obj[key], setStringCallback(obj, key)));
                break;
            }
            case "number": {
                element.appendChild(stringField(key, obj[key], setNumberCallback(obj, key)));
                break;
            }
            case "boolean": {
                element.appendChild(booleanField(key, obj[key], setBooleanCallback(obj, key)));
                break;
            }
            case "object": {
                if (obj[key] === null)
                    break;
                var panel = createPanel();
                element.appendChild(objectField(key, panel));
                element.appendChild(panel);
                generateFields(obj[key], panel);
            }
        }
    });
}
