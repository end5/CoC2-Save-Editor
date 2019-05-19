var file;
var fileReader;
function handleFiles(event) {
    if (!event.target.files || event.target.files.length === 0) {
        alert("Error in file loading");
    }
    file = event.target.files[0];
    fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener("loadend", function () {
        var obj;
        try {
            obj = JSON.parse(fileReader.result);
        }
        catch (e) {
            console.error(e);
            alert("Error parsing file");
        }
        if (obj) {
            loadObj(obj);
            alert("Load Complete");
        }
    });
    fileReader.addEventListener("error", function (evnt) {
        console.log(evnt);
        alert("Error reading file");
    });
}

var saveEdit = window.saveEdit = {};
function loadObj(obj) {
    saveEdit.fileObj = obj;
    saveEdit.editObj = JSON.parse(JSON.stringify(obj));
    // load char defaults
    Object.keys(charDefaults).forEach(key => {
        saveEdit.editObj.chars[key] = Object.assign(JSON.parse(JSON.stringify(charDefaults[key])), saveEdit.editObj.chars[key]);
    });
}

saveEdit.diffChar = (name) => diffChar(charDefaults[name], saveEdit.editObj.chars[name]);
saveEdit.charDefaults = charDefaults;

function diffChar(orig, edit) {
    return Object.keys(orig)
        .filter((key) => JSON.stringify(orig[key]) !== JSON.stringify(edit[key]))
        .reduce((copyObj, key) => {
            copyObj[key] = edit[key];
            return copyObj;
        }, {});
}

function saveObj() {
    var saveCopy = JSON.parse(JSON.stringify(saveEdit.fileObj));
    saveCopy.chars = Object.keys(charDefaults).reduce((obj, key) => {
        obj[key] = diffChar(charDefaults[key], saveEdit.editObj.chars[key]);
        return obj;
    }, {})
    return saveCopy;
}
