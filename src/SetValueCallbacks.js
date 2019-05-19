function setNumberCallback(obj, key, modFunc) {
    return (element) => () => { 
        if (modFunc && !isNaN(+element.value))
            obj[key] = modFunc(+element.value);
        else
            obj[key] = +element.value;
    }
}

function setStringCallback(obj, key) {
    return (element) => () => { obj[key] = element.value; }
}

function setSelectorStringCallback(obj, key, modFunc) {
    return (element) => () => {
        if (element[+element.value].textContent !== 'None') {
            if (modFunc)
                obj[key] = modFunc(element[+element.value].textContent);
            else
                obj[key] = element[+element.value].textContent;
        }
    }
}

function setBooleanCallback(obj, key) {
    return (element) => () => { obj[key] = element.checked; };
}

