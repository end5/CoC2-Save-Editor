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
    BodyType: getGlobalsByPrefix('BODY_TYPE_'),
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

// Command for serializing important chars
JSON.stringify(Object.keys(window.CHARS)
    .filter(name => name !== 'champ')
    .reduce((obj, name) => {
        obj[name] = (new window.CHARS[name].constructor()).serialize();
        return obj;
    }, {})
);
