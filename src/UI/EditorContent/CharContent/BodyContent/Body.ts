import { globalKeys } from "../../../../GameData/GlobalKeys";
import { Category } from "../../../../Display/Fields/Category";
import { SelectField } from "../../../../Display/Fields/Select";
import { StringField } from "../../../../Display/Fields/String";
import { NumberField } from "../../../../Display/Fields/Number";
import { MultiOptionField } from "../../../../Display/Fields/MultiOption";
import { BooleanField } from "../../../../Display/Fields/Boolean";
import { Label } from "../../../../Display/Fields/Label";
import { createValueLookup } from "../../../../Data/ValueLookup";
import { CharType } from "../../../../Data/CharTypes";

export function displayBodyContent(getChar: () => CharType) {
    const getButt = () => getChar().ass;
    const getCosmetics = () => getChar().cosmetics;
    return new Category([{
        title: 'General',
        list: [
            new Label('Race', new SelectField(globalKeys.Race, {
                get: () => getChar()._race?.key,
                set: (value) => getChar()._race = { key: value }
            })),
            new Label('Original Race', new StringField(createValueLookup(getChar, 'originalRace'))),
            new Label('Femininity', new NumberField(createValueLookup(getChar, 'femininity'))),
            new Label('Height', new NumberField(createValueLookup(getChar, 'tallness'))),
            new Label('Tone', new NumberField(createValueLookup(getChar, 'tone'))),
            new Label('Thickness', new NumberField(createValueLookup(getChar, 'thickness'))),
        ]
    }, {
        title: 'Skin',
        list: [
            new Label('Type', new SelectField(globalKeys.SkinType, createValueLookup(getChar, 'skinType'))),
            new Label('Color', new StringField(createValueLookup(getChar, 'skinColor'))),
            new Label('Fur Color', new StringField(createValueLookup(getChar, 'furColor'))),
            new Label('Scale Color', new StringField(createValueLookup(getChar, 'scaleColor'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'skinTags'))),
        ]
    }, {
        title: 'Wings',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'wingType'))),
            new Label('Amount', new NumberField(createValueLookup(getChar, 'wingCount'))),
        ]
    }, {
        title: 'Arms',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'armType'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'armTags'))),
            new Label('Nail Polish', new StringField(createValueLookup(getCosmetics, 2))),
        ]
    }, {
        title: 'Belly',
        list: [
            new Label('Size Raw', new NumberField(createValueLookup(getChar, 'bellyRatingRaw'))),
            new Label('Size Mod', new NumberField(createValueLookup(getChar, 'bellyRatingMod'))),
        ]
    }, {
        title: 'Hips',
        list: [
            new Label('Size Raw', new NumberField(createValueLookup(getChar, 'hipRatingRaw'))),
            new Label('Size Mod', new NumberField(createValueLookup(getChar, 'hipRatingMod'))),
        ]
    }, {
        title: 'Tails',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'tailType'))),
            new Label('Amount', new NumberField(createValueLookup(getChar, 'numTails'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'tailTags'))),
        ]
    }, {
        title: 'Butt',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getButt, 'type'))),
            new Label('Virgin', new BooleanField({
                get: () => getChar().analVirgin,
                set: (value) => {
                    getChar().analVirgin = value;
                    getChar().isVirgin = getChar().vaginalVirgin && getChar().cockVirgin && getChar().analVirgin;
                }
            })),
            new Label('Color', new StringField(createValueLookup(getButt, '_color'))),
            new Label('Size Raw', new NumberField(createValueLookup(getChar, 'buttRatingRaw'))),
            new Label('Size Mod', new NumberField(createValueLookup(getChar, 'buttRatingMod'))),
            new Label('Wetness Raw', new NumberField(createValueLookup(getButt, 'wetnessRaw'))),
            new Label('Wetness Mod', new NumberField(createValueLookup(getButt, 'wetnessMod'))),
            new Label('Looseness Raw', new NumberField(createValueLookup(getButt, 'loosenessRaw'))),
            new Label('Looseness Mod', new NumberField(createValueLookup(getButt, 'loosenessMod'))),
            new Label('Bonus Capacity', new NumberField(createValueLookup(getButt, 'bonusCapacity'))),
            new Label('Stretch Counter', new NumberField(createValueLookup(getButt, 'stretchCounter'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getButt, 'tags'))),
        ]
    }, {
        title: 'Legs',
        list: [
            new Label('Type', new SelectField(globalKeys.BodyType, createValueLookup(getChar, 'legType'))),
            new Label('Amount', new NumberField(createValueLookup(getChar, 'legCount'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'legTags'))),
        ]
    }, {
        title: 'Tattoos',
        list: [
            new Label('Ass', new StringField(createValueLookup(getCosmetics, 3))),
            new Label('Back', new StringField(createValueLookup(getCosmetics, 4))),
            new Label('Chest', new StringField(createValueLookup(getCosmetics, 5))),
            new Label('Collar', new StringField(createValueLookup(getCosmetics, 6))),
            new Label('Leg', new StringField(createValueLookup(getCosmetics, 7))),
            new Label('Shoulder', new StringField(createValueLookup(getCosmetics, 8))),
            new Label('Sleeve', new StringField(createValueLookup(getCosmetics, 9))),
            new Label('Womb', new StringField(createValueLookup(getCosmetics, 10))),
        ]
    }]);
}
