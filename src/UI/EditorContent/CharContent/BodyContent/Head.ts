import { globalKeys } from "../../../../GameData/GlobalKeys";
import { Category } from "../../../../Display/Fields/Category";
import { NumberField } from "../../../../Display/Fields/Number";
import { SelectField } from "../../../../Display/Fields/Select";
import { StringField } from "../../../../Display/Fields/String";
import { MultiOptionField } from "../../../../Display/Fields/MultiOption";
import { Label } from "../../../../Display/Fields/Label";
import { createValueLookup } from "../../../../Data/ValueLookup";
import { CharType } from "../../../../Data/CharTypes";

export function displayHeadContent(getChar: () => CharType) {
    const getCosmetics = () => getChar().cosmetics;
    return new Category([{
        title: 'Horns',
        list: [
            new Label('Amount', new NumberField(createValueLookup(getChar, 'horns'))),
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'hornType'))),
            new Label('Length', new NumberField(createValueLookup(getChar, 'hornLength')))
        ]
    }, {
        title: 'Hair',
        list: [
            new Label('Type', new SelectField(globalKeys.HairType, createValueLookup(getChar, 'hairType'))),
            new Label('Style', new StringField(createValueLookup(getChar, 'hairStyle'))),
            new Label('Color', new StringField(createValueLookup(getChar, 'hairColor'))),
            new Label('Length', new NumberField(createValueLookup(getChar, 'hairLength')))
        ]
    }, {
        title: 'Ears',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'earType'))),
            new Label('Length', new NumberField(createValueLookup(getChar, 'earLength'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'earTags'))),
        ]
    }, {
        title: 'Face',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'faceType'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'faceTags')))
        ]
    }, {
        title: 'Eyes',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'eyeType'))),
            new Label('Color', new StringField(createValueLookup(getChar, 'eyeColor'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'eyeTags'))),
            new Label('Eyeshadow', new StringField(createValueLookup(getCosmetics, 1))),
        ]
    }, {
        title: 'Lips',
        list: [
            new Label('Size Mod', new NumberField(createValueLookup(getChar, 'lipMod'))),
            new Label('Color', new StringField(createValueLookup(getChar, 'lipColor'))),
            new Label('Lipstick', new StringField(createValueLookup(getCosmetics, 0))),
        ]
    }, {
        title: 'Tongue',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'tongueType'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'tongueTags'))),
        ]
    }]);
}
