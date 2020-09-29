import { globalKeys } from "../../../../GameData/GlobalKeys";
import { Category } from "../../../../Display/Fields/Category";
import { ArrayField } from "../../../../Display/Fields/Array";
import { SelectField } from "../../../../Display/Fields/Select";
import { BooleanField } from "../../../../Display/Fields/Boolean";
import { MultiOptionField } from "../../../../Display/Fields/MultiOption";
import { NumberField } from "../../../../Display/Fields/Number";
import { StringField } from "../../../../Display/Fields/String";
import { SingleObjectField } from "../../../../Display/Fields/SingleObject";
import { Label } from "../../../../Display/Fields/Label";
import { CharType } from "../../../../Data/CharTypes";
import { createValueLookup } from "../../../../Data/ValueLookup";
import { Cock, Vagina } from "../../../../Data/Char";

function describeCock(color?: string, length?: number, type?: number) {
    return (color != null ? color.toLocaleLowerCase() + ' ' : '') +
        (length != null ? length + '-inch ' : '') +
        (globalKeys.BodyType.find((info) => info.value === type)?.name ?? 'Unknown').toLocaleLowerCase() +
        ' cock';
}

export function displayCrotchContent(getChar: () => CharType) {
    return new Category([{
        title: 'Cocks',
        list: [
            new ArrayField(
                'cocks',
                createValueLookup(getChar, 'cocks'),
                Cock,
                (getObj) => describeCock(getObj()._color, getObj().lengthRaw, getObj().type),
                (createKeyLookup) => [
                    new Label('Type', new SelectField(globalKeys.BodyType, createKeyLookup('type'))),
                    new Label('Virgin', new BooleanField(
                        ((lookup) => ({
                            get: lookup.get,
                            set: (value) => {
                                lookup.set(value);
                                getChar().cockVirgin = value;
                                getChar().isVirgin = getChar().vaginalVirgin && getChar().cockVirgin && getChar().analVirgin;
                            }
                        } as typeof lookup))(createKeyLookup('virgin'))
                    )),
                    new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createKeyLookup('tags'))),
                    new Label('Length Raw', new NumberField(createKeyLookup('lengthRaw'))),
                    new Label('Length Mod', new NumberField(createKeyLookup('lengthMod'))),
                    new Label('Thickness Ratio Raw', new NumberField(createKeyLookup('thicknessRatioRaw'))),
                    new Label('Thickness Ratio Mod', new NumberField(createKeyLookup('thicknessRatioMod'))),
                    new Label('Flaccid Ratio', new NumberField(createKeyLookup('flaccidRatio'))),
                    new Label('Knot Ratio', new NumberField(createKeyLookup('_knotRatio'))),
                    new Label('Piercings', new NumberField(createKeyLookup('pierced'))),
                    new Label('Color', new StringField(createKeyLookup('_color'))),
                ])
        ]
    }, {
        title: 'Vagina',
        list: [
            new SingleObjectField(
                createValueLookup(getChar, 'vagina'),
                Vagina,
                (createKeyLookup) => [
                    new Label('Type', new SelectField(globalKeys.BodyType, createKeyLookup('type'))),
                    new Label('Virgin', new BooleanField(
                        ((lookup) => ({
                            get: lookup.get,
                            set: (value) => {
                                lookup.set(value);
                                getChar().vaginalVirgin = value;
                                getChar().isVirgin = getChar().vaginalVirgin && getChar().cockVirgin && getChar().analVirgin;
                            }
                        } as typeof lookup))(createKeyLookup('hymen'))
                    )),
                    new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createKeyLookup('tags'))),
                    new Label('Clit Count', new NumberField(createKeyLookup('clits'))),
                    new Label('Color', new StringField(createKeyLookup('_color'))),
                    new Label('Wetness Raw', new NumberField(createKeyLookup('wetnessRaw'))),
                    new Label('Wetness Mod', new NumberField(createKeyLookup('wetnessMod'))),
                    new Label('Looseness Raw', new NumberField(createKeyLookup('loosenessRaw'))),
                    new Label('Looseness Mod', new NumberField(createKeyLookup('loosenessMod'))),
                    new Label('Bonus Capacity', new NumberField(createKeyLookup('bonusCapacity'))),
                    new Label('Stretch Counter', new NumberField(createKeyLookup('stretchCounter'))),
                ])
        ]
    }, {
        title: 'Balls',
        list: [
            new Label('Amount', new NumberField(createValueLookup(getChar, '_balls'))),
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'ballTags'))),
            new Label('Efficiency', new NumberField(createValueLookup(getChar, 'ballEfficiency'))),
            new Label('Size Raw', new NumberField(createValueLookup(getChar, 'ballSizeRaw'))),
            new Label('Size Mod', new NumberField(createValueLookup(getChar, 'ballSizeMod'))),
            new Label('Fullness', new NumberField(createValueLookup(getChar, 'ballFullness'))),
        ]
    }, {
        title: 'Clit',
        list: [
            new Label('Length', new NumberField(createValueLookup(getChar, 'clitLength'))),
        ]
    }, {
        title: 'Cum',
        list: [
            new Label('Girl Type', new SelectField(globalKeys.FluidType, createValueLookup(getChar, 'girlCumType'))),
            new Label('Type', new SelectField(globalKeys.FluidType, createValueLookup(getChar, 'cumType'))),
            new Label('Multipier Raw', new NumberField(createValueLookup(getChar, 'cumMultiplierRaw'))),
            new Label('Multipier Mod', new NumberField(createValueLookup(getChar, 'cumMultiplierMod'))),
        ]
    }, {
        title: 'Pregnancy',
        list: [
            new Label('Speed Raw', new NumberField(createValueLookup(getChar, 'pregnancySpeedRaw'))),
            new Label('Speed Mod', new NumberField(createValueLookup(getChar, 'pregnancySpeedMod'))),
        ]
    }]);
}
