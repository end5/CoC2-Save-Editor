const puppeteer = require('puppeteer');
const prettier = require('prettier');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let urls = [];
    let contents = [];
    page.on('response', async (response) => {
        const url = response.url();
        if (url.endsWith('.js')) {
            urls.push(url);
            contents.push(await response.text());
        }
    });

    try {
        console.log('Loading game - https://www.fenoxo.com/play/CoC2/release/');
        await page.goto('https://www.fenoxo.com/play/CoC2/release/', { timeout: 0 });
        console.log('Loaded');
    }
    catch (err) {
        console.log(err);
        await browser.close();
        return;
    }

    console.log('urls', urls);

    let obj;
    try {
        console.log('Getting data from game');
        obj = await page.evaluate(() => {
            let log = '';
            function start(msg) { log += msg + '\n' }

            try {
                function getGlobalsByPrefix(prefix) {
                    return Object.keys(window.GLOBALS)
                        .filter(key => key.startsWith(prefix))
                        .sort(key => window.GLOBALS[key])
                        .map(key => ({
                            name: key.slice(prefix.length)
                                .split('_')
                                .map(str => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()).join(' '),
                            value: window.GLOBALS[key]
                        }));
                }

                function getName(obj) {
                    return getMemberValue(obj, ['name', '_name']).replace(/(^\w|\s\w)/g, m => m.toUpperCase());
                }

                // function getDesc(obj) {
                //     return getMemberValue(obj, ['desc', 'description', '_desc', '_description']);
                // }

                function getMemberValue(obj, keys) {
                    for (const key of keys)
                        if (key in obj)
                            return typeof obj[key] === 'function' ? obj[key]() : obj[key];
                }

                start('Getting items');
                const items = Object.keys(window.ITEMS).map(key => [key, new window.ITEMS[key]()]);
                function getItemsByType(type, attr) {
                    const filtered = items.filter(tuple => tuple[1].type === type);
                    if (!attr)
                        return processArr(filtered.map(tuple => ({ name: getName(tuple[1]), value: tuple[0] })));
                    else
                        return processArr(filtered.map(tuple => ({ name: getName(tuple[1]), value: tuple[0], attr })));
                }

                function processArr(arr) {
                    fixMissingNames(arr);
                    renameDups(arr);
                    fixNamesForDisplay(arr);
                    return arr;
                }

                function fixMissingNames(arr) {
                    for (let index = 0; index < arr.length; index++) {
                        const info = arr[index];
                        if (!info.name) info.name = info.value;
                    }
                }

                function compareNameValue(name, value) {
                    return name.toLowerCase().replace(/ /g, '').trim() === value.toLowerCase().replace(' ', '').trim();
                }

                function renameDups(arr) {
                    for (let index = 0; index < arr.length; index++) {
                        const info = arr[index];
                        const dups = arr.filter(item => item.name === info.name);
                        if (dups.length > 1) {
                            let base = dups.find(item => compareNameValue(item.name, item.value));

                            for (let dupIndex = 0; dupIndex < dups.length; dupIndex++) {
                                const dupInfo = dups[dupIndex];
                                if (!base || (base && base !== dupInfo))
                                    dupInfo.name = dupInfo.value;
                            }
                        }
                    }
                }

                function fixNamesForDisplay(arr) {
                    for (let index = 0; index < arr.length; index++) {
                        const info = arr[index];
                        info.name = info.name[0].toLocaleUpperCase() + info.name.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2').trim();
                    }
                }

                function getThingFromWindow(name, ...args) {
                    return processArr(Object.keys(window[name]).map(key => {
                        const thing = new window[name][key](...args);
                        return { name: getName(thing) || key, value: key }
                    }));
                }

                start('Generating globals');
                let globalsObj;
                {
                    start('Generating Race');
                    const Race = Object.keys(window.RACES).map(v => ({ name: v, value: v }));
                    start('Generating Taxon');
                    const Taxon = getGlobalsByPrefix('TAXA_');
                    start('Generating Class');
                    const Class = getGlobalsByPrefix('CLASS_');
                    start('Generating Background');
                    const Background = getGlobalsByPrefix('BG_');
                    // start('Generating Affinity');
                    // const Affinity = window.GLOBALS.AFFINITY.map((v, i) => ({ name: v, value: i }));
                    start('Generating TFType');
                    const TFType = Object.keys(window.GLOBALS.TF_TYPE_PARTS).map(key => ({ name: window.GLOBALS.TF_TYPE_PARTS[key], value: +key }));
                    start('Generating BodyType');
                    const BodyType = getGlobalsByPrefix('BODY_TYPE_');
                    start('Generating BodyTag');
                    const BodyTag = getGlobalsByPrefix('BODY_TAG_');
                    start('Generating FluidType');
                    const FluidType = getGlobalsByPrefix('FLUID_TYPE_');
                    start('Generating SkinType');
                    const SkinType = getGlobalsByPrefix('SKIN_TYPE_');
                    start('Generating NippleType');
                    const NippleType = getGlobalsByPrefix('NIPPLE_TYPE_');
                    start('Generating HairType');
                    const HairType = getGlobalsByPrefix('HAIR_TYPE_');
                    start('Generating Cup');
                    const Cup = window.GLOBALS.CUP.map((v, i) => ({ name: v, value: i }));
                    start('Generating Weapons');
                    const Weapons = getItemsByType(window.GLOBALS.ITEM_PRIMARY);
                    start('Generating ArmorSet');
                    const ArmorSet = getItemsByType(window.GLOBALS.ITEM_ARMORSET);
                    start('Generating ItemHead');
                    const ItemHead = getItemsByType(window.GLOBALS.ITEM_HEAD);
                    start('Generating ItemNeck');
                    const ItemNeck = getItemsByType(window.GLOBALS.ITEM_NECK);
                    start('Generating ItemShoulders');
                    const ItemShoulders = getItemsByType(window.GLOBALS.ITEM_SHOULDERS);
                    start('Generating ItemHands');
                    const ItemHands = getItemsByType(window.GLOBALS.ITEM_HANDS);
                    start('Generating ItemWaist');
                    const ItemWaist = getItemsByType(window.GLOBALS.ITEM_WAIST);
                    start('Generating ItemFeet');
                    const ItemFeet = getItemsByType(window.GLOBALS.ITEM_FEET);
                    start('Generating Rings');
                    const Rings = getItemsByType(window.GLOBALS.ITEM_RING);
                    start('Generating TopGarb');
                    const TopGarb = getItemsByType(window.GLOBALS.ITEM_TOPGARB);
                    start('Generating BottomGarb');
                    const BottomGarb = getItemsByType(window.GLOBALS.ITEM_BOTGARB);
                    start('Generating Offhand');
                    const Offhand = getItemsByType(window.GLOBALS.ITEM_OFFHAND);
                    start('Generating TFs');
                    const TFs = getItemsByType(window.GLOBALS.ITEM_TF, { 1: { text: "TF Type", type: "select", group: "TFType" } });
                    start('Generating Misc');
                    const Misc = getItemsByType(window.GLOBALS.ITEM_MISC);
                    start('Generating Consumable');
                    const Consumable = getItemsByType(window.GLOBALS.ITEM_CONSUMABLE);
                    start('Generating Set');
                    const Set = getItemsByType(window.GLOBALS.ITEM_SET);
                    start('Generating KeyItems');
                    const KeyItems = getThingFromWindow('KEYITEMS');
                    start('Generating Boon');
                    const Boon = getThingFromWindow('BOONS', pc);
                    start('Generating StatusEffect');
                    const StatusEffect = getThingFromWindow('SEFFECTS', pc);
                    start('Generating CombatEffect');
                    const CombatEffect = getThingFromWindow('CEFFECTS', pc);
                    start('Generating Powers');
                    const Powers = getThingFromWindow('POWERS', pc).filter(v => v.name !== 'Unnamed');
                    start('Generating Perks');
                    const Perks = getThingFromWindow('PERKS', pc);
                    // start('Generating Items');
                    // const Items = items.map(tuple => ({ name: getName(tuple[1]), value: tuple[0], desc: getDesc(tuple[1]) })).filter(v => v.name !== 'Unnamed');
                    // const Items = items.map(tuple => ({ name: getName(tuple[1]), value: tuple[0] })).filter(v => v.name !== 'Unnamed');

                    globalsObj = { Race, Taxon, Class, Background, TFType, BodyType, BodyTag, FluidType, SkinType, NippleType, HairType, Cup, Weapons, ArmorSet, ItemHead, ItemNeck, ItemShoulders, ItemHands, ItemWaist, ItemFeet, Rings, TopGarb, BottomGarb, Offhand, TFs, Misc, Consumable, Set, KeyItems, Boon, StatusEffect, CombatEffect, Powers, Perks, };
                }

                start('Generating globals string');
                const globals = JSON.stringify(globalsObj);

                // Pregnancy flags
                start('Generating pregnancy flag keys');
                const pregFlagKeys = Object.keys(window.GLOBALS)
                    .filter(key => key.startsWith('PREG_'))
                    .map(key => window.GLOBALS[key])
                    .filter(key => key)
                    .sort(key => window.GLOBALS[key]);

                // Command for serializing important chars
                start('Generating character defaults');
                const charDefaults = JSON.stringify(Object.keys(window.CHARS)
                    .filter(name => name !== 'champ')
                    .reduce((obj, name) => {
                        obj[name] = (new window.CHARS[name].constructor()).serialize();
                        return obj;
                    }, {})
                );

                return { globals, pregFlagKeys, charDefaults, log };
            }
            catch (err) {
                return { log, err: err + '' };
            }
        });
        console.log('Data acquired');
    }
    catch (err) {
        console.log(err);
        await browser.close();
        return;
    }

    console.log(obj.log);

    if (obj.err) {
        console.log('Error:' + obj.err + '');
        await browser.close();
        return;
    }

    console.log('Getting flags');

    var list = [];
    for (var index = 0; index < contents.length; ++index) {
        var content = contents[index];
        var matches = content.match(/flags\.[\w_]+/g);
        if (matches && matches.length > 0) {
            list = list.concat(matches.map((value) => value.substr(6)));
        }
        var matches = content.match(/flags\[['"][\w_]+['"]\]/g);
        if (matches && matches.length > 0) {
            list = list.concat(matches.map((value) => value.substr(7, value.length - 2)));
        }
        var matches = content.match(/incFlags\('[\w_]+/g);
        if (matches && matches.length > 0) {
            list = list.concat(matches.map((value) => value.substr(10)));
        }
    }

    const expandedPregFlags = [];
    for (const flag of obj.pregFlagKeys) {
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

    console.log('Flags acquired');

    const format = str => prettier.format(str, { parser: 'babel', tabWidth: 4 });
    const asConst = str => str.slice(0, str.length - 2) + ' as const' + str.slice(str.length - 2);

    console.log('Writing data');
    fs.writeFileSync('src/GameData/GlobalKeys.ts', asConst(format('export const globalKeys = ' + obj.globals)));
    fs.writeFileSync('src/GameData/CharDefaults.ts', format('export const charDefaults = ' + obj.charDefaults));
    fs.writeFileSync('src/GameData/Flags.ts', asConst(format('export const Flags = ' + JSON.stringify(list))));
    console.log('Finished');

    await browser.close();
})();

// const fs = require('fs');
// const prettier = require('prettier');

// const asConst = str => str.slice(0, str.length - 2) + ' as const' + str.slice(str.length - 2);
// const format = (str) => prettier.format(str, { parser: 'babel', tabWidth: 4 })

// const text = fs.readFileSync('scripts/main.js').toString();
// const newText = format(text);

// fs.writeFileSync('scripts/main2.js', newText);
