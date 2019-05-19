export function setNumberCallback(obj: any, key: string, modFunc?: (value: any) => any) {
    return (element: HTMLInputElement | HTMLSelectElement) => () => {
        if (modFunc && !isNaN(+element.value))
            obj[key] = modFunc(+element.value);
        else
            obj[key] = +element.value;
    };
}

export function setStringCallback(obj: any, key: string) {
    return (element: HTMLInputElement) => () => { obj[key] = element.value; };
}

export function setSelectorStringCallback(obj: any, key: string, modFunc?: (value: any) => any) {
    return (element: HTMLSelectElement) => () => {
        if (element[+element.value].textContent !== 'None') {
            if (modFunc)
                obj[key] = modFunc(element[+element.value].textContent);
            else
                obj[key] = element[+element.value].textContent;
        }
    };
}

export function setBooleanCallback(obj: any, key: string) {
    return (element: HTMLInputElement) => () => { obj[key] = element.checked; };
}
