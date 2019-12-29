const puppeteer = require('puppeteer');
const prettier = require('prettier');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let contents;
    page.on('response', async (response) => {
        if (response.url().includes('manifest')) {
            contents = await response.text();
        }
    });

    try {
        console.log('Loading game - https://www.fenoxo.com/play/CoC2/release/');
        await page.goto('https://www.fenoxo.com/play/CoC2/release/', { timeout: 0 });
        console.log('Loaded');
    }
    catch (err) { console.log(err); }

    let obj;
    try {
        console.log('Getting data from game');
        obj = await page.evaluate(() => {
            const returnObj = {};
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

            returnObj.globals = JSON.stringify({
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
                Items: [],
            });

            // Pregnancy flags
            returnObj.pregFlagKeys = Object.keys(window.GLOBALS)
                .filter(key => key.startsWith('PREG_'))
                .map(key => window.GLOBALS[key])
                .filter(key => key)
                .sort(key => window.GLOBALS[key])

            // Command for serializing important chars
            returnObj.charDefaults = JSON.stringify(Object.keys(window.CHARS)
                .filter(name => name !== 'champ')
                .reduce((obj, name) => {
                    obj[name] = (new window.CHARS[name].constructor()).serialize();
                    return obj;
                }, {})
            );

            return returnObj;

        });
        console.log('Data acquired');
    }
    catch (err) { console.log(err); }

    console.log('Getting flags');

    var list = [];
    var matches = contents.match(/flags\.[\w_]+/g);
    if (matches && matches.length > 0) {
        list = list.concat(matches.map((value) => value.substr(6)));
    }
    var matches = contents.match(/flags\[['"][\w_]+['"]\]/g);
    if (matches && matches.length > 0) {
        list = list.concat(matches.map((value) => value.substr(7, value.length - 2)));
    }
    var matches = contents.match(/incFlags\('[\w_]+/g);
    if (matches && matches.length > 0) {
        list = list.concat(matches.map((value) => value.substr(10)));
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

    console.log('Writing data');
    fs.writeFileSync('src/GameData/GlobalKeys.ts', format('export const globalKeys = ' + obj.globals + ';\n'));
    fs.writeFileSync('src/GameData/CharDefaults.ts', format('export const charDefaults = ' + obj.charDefaults + ';\n'));
    fs.writeFileSync('src/GameData/Flags.ts', format('export const Flags = ' + JSON.stringify(list) + ';\n'));
    console.log('Finished');

    await browser.close();
})();