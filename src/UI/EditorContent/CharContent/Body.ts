import { createTabBar } from "../../../Display/TabBar";
import { SelectField, StringField, createCategory, NumberField, MultiOptionField, BooleanField, ArrayField } from "../../../Display/Fields";
import { CharAccessor } from "../../../Data/CharAccessor";
import { globalKeys } from "../../../GameData/GlobalKeys";
import { hide, select, toggleSelection, ButtonContentPair } from "../../../Display/UIActions";

export function displayCharBodyContent(char: CharAccessor) {
    const element = document.createElement('div');
    element.className = 'content';

    const tabBar = createTabBar('horizontal', { head: 'Head', chest: 'Chest', body: 'Body', crotch: 'Crotch' });

    // { skin: 'Skin', virginity: 'Virginity', pregnancy: 'Pregnancy', horns: 'Horns', hair: 'Hair', ears: 'Ears', face: 'Face', eyes: 'Eyes', lips: 'Lips', tongue: 'Tongue', wings: 'Wings', arms: 'Arms', breasts: 'Breasts', nipples: 'Nipples', milk: 'Milk', belly: 'Belly', hips: 'Hips', tails: 'Tails', butt: 'Butt', legs: 'Legs', cum: 'Cum', cocks: 'Cocks', balls: 'Balls', clit: 'Clit', vagina: 'Vagina' }

    // Head -   horns: 'Horns',     hair: 'Hair',       ears: 'Ears',   face: 'Face',   eyes: 'Eyes',       lips: 'Lips',           tongue: 'Tongue'
    // Chest -  breasts: 'Breasts', nipples: 'Nipples', milk: 'Milk'
    // Body -   skin: 'Skin',       wings: 'Wings',     arms: 'Arms',   belly: 'Belly', hips: 'Hips',       tails: 'Tails',         butt: 'Butt',           legs: 'Legs'
    // Crotch - cum: 'Cum',         cocks: 'Cocks',     balls: 'Balls', clit: 'Clit',   vagina: 'Vagina',   virginity: 'Virginity', pregnancy: 'Pregnancy',

    element.appendChild(tabBar.element);

    const tabs = [{
        key: 'head',
        categories: [{
            title: 'Horns',
            list: [
                new NumberField('Amount', () => char.get().horns, (value) => char.get().horns = value),
                new SelectField('Type', globalKeys.BodyType, () => char.get().hornType, (value) => char.get().hornType = value),
                new NumberField('Length', () => char.get().hornLength, (value) => char.get().hornLength = value)
            ]
        }, {
            title: 'Hair',
            list: [
                new SelectField('Type', globalKeys.HairType, () => char.get().hairType, (value) => char.get().hairType = value),
                new StringField('Style', () => char.get().hairStyle, (value) => char.get().hairStyle = value),
                new StringField('Color', () => char.get().hairColor, (value) => char.get().hairColor = value),
                new NumberField('Length', () => char.get().hairLength, (value) => char.get().hairLength = value)
            ]
        }, {
            title: 'Ears',
            list: [
                new SelectField('Type', globalKeys.BodyType, () => char.get().earType, (value) => char.get().earType = value),
                new NumberField('Length', () => char.get().earLength, (value) => char.get().earLength = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().earTags, (value) => char.get().earTags = value),
            ]
        }, {
            title: 'Face',
            list: [
                new SelectField('Type', globalKeys.BodyType, () => char.get().faceType, (value) => char.get().faceType = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().faceTags, (value) => char.get().faceTags = value)
            ]
        }, {
            title: 'Eyes',
            list: [
                new SelectField('Type', globalKeys.BodyType, () => char.get().eyeType, (value) => char.get().eyeType = value),
                new StringField('Color', () => char.get().eyeColor, (value) => char.get().eyeColor = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().eyeTags, (value) => char.get().eyeTags = value),
            ]
        }, {
            title: 'Lips',
            list: [
                new NumberField('Size Mod', () => char.get().lipMod, (value) => char.get().lipMod = value),
                new StringField('Color', () => char.get().lipColor, (value) => char.get().lipColor = value)
            ]
        }, {
            title: 'Tongue',
            list: [
                new SelectField('Type', globalKeys.BodyType, () => char.get().tongueType, (value) => char.get().tongueType = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().tongueTags, (value) => char.get().tongueTags = value),
            ]
        }]
    }, {
        key: 'chest',
        categories: [
        ]
    }, {
        key: 'body',
        categories: [{
            title: 'Skin',
            list: [
                new SelectField('Type', globalKeys.SkinType, () => char.get().skinType, (value) => char.get().skinType = value),
                new StringField('Color', () => char.get().skinColor, (value) => char.get().skinColor = value),
                new StringField('Fur Color', () => char.get().furColor, (value) => char.get().furColor = value),
                new StringField('Scale Color', () => char.get().scaleColor, (value) => char.get().scaleColor = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().skinTags, (value) => char.get().skinTags = value),
            ]
        }, {
            title: 'Wings',
            list: [
                new SelectField('Type', globalKeys.BodyType, () => char.get().wingType, (value) => char.get().wingType = value),
                new NumberField('Amount', () => char.get().wingCount, (value) => char.get().wingCount = value),
            ]
        }, {
            title: 'Arms',
            list: [
                new SelectField('Type', globalKeys.SkinType, () => char.get().armType, (value) => char.get().armType = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().armTags, (value) => char.get().armTags = value),
            ]
        }, {
            title: 'Belly',
            list: [
                new NumberField('Size Raw', () => char.get().bellyRatingRaw, (value) => char.get().bellyRatingRaw = value),
                new NumberField('Size Mod', () => char.get().bellyRatingMod, (value) => char.get().bellyRatingMod = value),
            ]
        }, {
            title: 'Hips',
            list: [
                new NumberField('Size Raw', () => char.get().hipRatingRaw, (value) => char.get().hipRatingRaw = value),
                new NumberField('Size Mod', () => char.get().hipRatingMod, (value) => char.get().hipRatingMod = value),
            ]
        }, {
            title: 'Tails',
            list: [
                new SelectField('Type', globalKeys.SkinType, () => char.get().tailType, (value) => char.get().tailType = value),
                new NumberField('Amount', () => char.get().numTails, (value) => char.get().numTails = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().tailTags, (value) => char.get().tailTags = value),
            ]
        }, {
            title: 'Butt',
            list: [
                new SelectField('Type', globalKeys.SkinType, () => char.get().ass.type, (value) => char.get().ass.type = value),
                new StringField('Color', () => char.get().ass._color, (value) => char.get().ass._color = value),
                new NumberField('Wetness Raw', () => char.get().ass.wetnessRaw, (value) => char.get().ass.wetnessRaw = value),
                new NumberField('Wetness Mod', () => char.get().ass.wetnessMod, (value) => char.get().ass.wetnessMod = value),
                new NumberField('Looseness Raw', () => char.get().ass.loosenessRaw, (value) => char.get().ass.loosenessRaw = value),
                new NumberField('Looseness Mod', () => char.get().ass.loosenessMod, (value) => char.get().ass.loosenessMod = value),
                new NumberField('Bonus Capacity', () => char.get().ass.bonusCapacity, (value) => char.get().ass.bonusCapacity = value),
                new NumberField('Stretch Counter', () => char.get().ass.stretchCounter, (value) => char.get().ass.stretchCounter = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().ass.tags, (value) => char.get().ass.tags = value),
            ]
        }, {
            title: 'Legs',
            list: [
                new SelectField('Type', globalKeys.SkinType, () => char.get().legType, (value) => char.get().legType = value),
                new NumberField('Amount', () => char.get().legCount, (value) => char.get().legCount = value),
                new MultiOptionField('Tags', globalKeys.BodyTag, () => char.get().legTags, (value) => char.get().legTags = value),
            ]
        }]
    }, {
        key: 'crotch',
        categories: [{
            title: 'Cocks',
            list: (() => {
                const arrField = new ArrayField(
                    'Cock',
                    () => char.get().cocks,
                    () => ({
                        type: globalKeys.BodyType[0].value,
                        virgin: true,
                        tags: [],
                        lengthRaw: 10,
                        lengthMod: 0,
                        thicknessRatioRaw: 1,
                        thicknessRatioMod: 1,
                        flaccidRatio: 0,
                        _knotRatio: 0,
                        pierced: 0,
                        _color: 'pink'
                    }),
                    (getObj) => [
                        new SelectField('Type', globalKeys.BodyType, () => getObj()?.type, (value) => { const obj = getObj(); if (obj) obj.type = value; }),
                        new BooleanField('Virgin', () => getObj()?.virgin, (value) => { const obj = getObj(); if (obj) obj.virgin = value; })
                    ]);
                return [arrField, ...arrField.fields];
            })()
        }]
    }];

    const list: ButtonContentPair[] = [];

    for (const tab of tabs) {
        const content = document.createElement('div');
        content.className = 'content wrap';

        list.push({ button: tabBar.buttons[tab.key], content });

        tabBar.buttons[tab.key].addEventListener('click', () => toggleSelection(tabBar.buttons[tab.key], list));

        for (const category of tab.categories) {
            const categoryEl = createCategory(category.title);

            for (const field of category.list)
                categoryEl.appendChild(field.element);

            content.appendChild(categoryEl);
        }

        // Hide everything but the first one
        if (tab !== tabs[0])
            hide(content);
        else {
            select(tabBar.buttons[tab.key]);
        }

        element.appendChild(content);
    }

    const load = () => {
        for (const tab of tabs)
            for (const category of tab.categories)
                for (const field of category.list)
                    field.load();
    };

    return { element, load };
}
