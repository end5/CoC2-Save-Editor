function getGlobalsByPrefix(prefix) {
    return Object.keys(window.GLOBALS)
        .filter(key => key.startsWith(prefix))
        .sort(key => window.GLOBALS[key])
        .map(key => key
            .slice(prefix.length)
            .split('_')
            .map(str => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()).join(' '));
}

function getItemsByType(type) {
    return Object.keys(window.ITEMS)
        .map(key => [key, new window.ITEMS[key]()])
        .filter(item => item[1].type === type)
        .map(item => item[0])
}

function stringifyGlobals(obj) {
    return '{\n' + Object.keys(obj).map(key => key + ': [' + (obj[key].length > 0 ? '"' + obj[key].join('", "') + '"' : '') + '],\n').join('') + '}';
}

// Command for getting all items
stringifyGlobals({
    Race: Object.keys(window.RACES),
    Taxon: getGlobalsByPrefix('TAXA_'),
    Class: getGlobalsByPrefix('CLASS_'),
    Background: getGlobalsByPrefix('BG_'),
    Affinity: window.GLOBALS.AFFINITY,
    TFType: Object.keys(window.GLOBALS.TF_TYPE_PARTS).sort(key => +key).map(key => window.GLOBALS.TF_TYPE_PARTS[key]),
    BodyType: getGlobalsByPrefix('BODY_TYPE_')
        .filter((value) => value !== 'Sylvan')
        .map((value) => value === 'Elf' ? 'Elf/Sylvan' : value),
    BodyTag: getGlobalsByPrefix('BODY_TAG_'),
    FluidType: getGlobalsByPrefix('FLUID_TYPE_'),
    SkinType: getGlobalsByPrefix('SKIN_TYPE_'),
    NippleType: getGlobalsByPrefix('NIPPLE_TYPE_'),
    HairType: getGlobalsByPrefix('HAIR_TYPE_'),
    Weapons: getItemsByType(window.GLOBALS.ITEM_PRIMARY),
    ArmorSet: getItemsByType(window.GLOBALS.ITEM_ARMORSET),
    ItemHead: getItemsByType(window.GLOBALS.ITEM_HEAD),
    ItemNeck: getItemsByType(window.GLOBALS.ITEM_NECK),
    ItemShoulders: getItemsByType(window.GLOBALS.ITEM_SHOULDERS),
    ItemHands: getItemsByType(window.GLOBALS.ITEM_HANDS),
    ItemWaist: getItemsByType(window.GLOBALS.ITEM_WAIST),
    ItemFeet: getItemsByType(window.GLOBALS.ITEM_FEET),
    Rings: getItemsByType(window.GLOBALS.ITEM_RING),
    TopGarb: getItemsByType(window.GLOBALS.ITEM_TOPGARB),
    BottomGarb: getItemsByType(window.GLOBALS.ITEM_BOTGARB),
    Offhand: getItemsByType(window.GLOBALS.ITEM_OFFHAND),
    TFs: getItemsByType(window.GLOBALS.ITEM_TF),
    Misc: getItemsByType(window.GLOBALS.ITEM_MISC),
    Consumable: getItemsByType(window.GLOBALS.ITEM_CONSUMABLE),
    Set: getItemsByType(window.GLOBALS.ITEM_SET),
    KeyItems: Object.keys(window.KEYITEMS),
    Boon: Object.keys(window.BOONS),
    StatusEffect: Object.keys(window.SEFFECTS),
    CombatEffect: Object.keys(window.CEFFECTS),
    Powers: Object.keys(window.POWERS),
    Perks: Object.keys(window.PERKS).filter(key => key !== 'default'),
});

// Pregnancy flags
Object.keys(window.GLOBALS)
    .filter(key => key.startsWith('PREG_'))
    .map(key => window.GLOBALS[key])
    .filter(key => key)
    .sort(key => window.GLOBALS[key])

// Command for serializing important chars
JSON.stringify(Object.keys(window.CHARS)
    .filter(name => name !== 'champ')
    .reduce((obj, name) => {
        obj[name] = (new window.CHARS[name].constructor()).serialize();
        return obj;
    }, {})
);

// Code for getting flags

// For file
var fs = require('fs');
var contents = fs.readFileSync('./source.js', 'utf8');

// For file open in browser
var contents = document.body.getElementsByTagName('pre')[0].textContent;

var list = [];
var matches = contents.match(/flags\.[\w_]+/g);
if (matches && matches.length > 0) {
    list = list.concat(matches.map((value) => value.substr(6)));
}
var matches = contents.match(/incFlags\('[\w_]+/g);
if (matches && matches.length > 0) {
    list = list.concat(matches.map((value) => value.substr(10)));
}

// This needs to be filled in from pregnancy flags above
const pregFlagKeys = ["WINGLEADER_PREG", "KASYRRA_PC_PREG", "IMP_PC_PREG", "ALRAUNE_PC_PREG", "HORNET_PC_PREG", "GWYN_PREG", "WYVERN_PREG", "OVILIXER_PC_PREG", "SHAR_OVILIXER_PREG", "LUPINE_PC_PREG", "BRINT_PC_PREG", "HRETHA_PREG", "ZUZAAN_PREG"];

const expandedPregFlags = [];
for (const flag of pregFlagKeys) {
    expandedPregFlags.push(flag + '_TIMER');
    expandedPregFlags.push(flag + '_EGG_LAID');
    expandedPregFlags.push(flag + '_NUM_BIRTHS');
    expandedPregFlags.push(flag + '_NUM_KIDS');
}

list = list.concat(
    expandedPregFlags,
    [
        'HORNET_PC_PREG_EGGS',
        'GWYN_PREG_LITTER',
        'WYVERN_PREG_BAB',
        'WYVERN_PREG_GOT_EGG',
        'OVILIXER_PC_PREG_BAB',
        'OVILIXER_PC_PREG_OVIP',
        'LUPINE_PC_PREG_LITTER',
        'LUPINE_PC_PREG_GARRET',
        'LUPINE_PC_PREG_GARRET_TOTAL',
        'BRINT_PC_PREG_TALKED',
        'BRINT_PC_PREG_LITTER',
    ]
);

list = list
    .filter((value, index, self) => self.indexOf(value) === index && value.toUpperCase() === value)
    .sort();

const listStr = JSON.stringify(list);

// For file
fs.writeFile('./Flags.ts', 'export const Flags = ' + listStr + ';\n', function (err) {
    if (err) return console.log(err);

    console.log(list.length + " flags were saved!");
});
