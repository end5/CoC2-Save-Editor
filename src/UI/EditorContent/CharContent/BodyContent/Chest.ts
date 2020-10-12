import { globalKeys } from "../../../../GameData/GlobalKeys";
import { Category } from "../../../../Display/Fields/Category";
import { MultiOptionField } from "../../../../Display/Fields/MultiOption";
import { ArrayField } from "../../../../Display/Fields/Array";
import { NumberField } from "../../../../Display/Fields/Number";
import { SelectField } from "../../../../Display/Fields/Select";
import { StringField } from "../../../../Display/Fields/String";
import { Label } from "../../../../Display/Fields/Label";
import { createValueLookup } from "../../../../Data/ValueLookup";
import { CharType } from "../../../../Data/CharTypes";
import { createBreastRow } from "../../../../Data/Char";

function describeBreastRow(count?: number, size?: number) {
    return (count != null ? count + ' ' : 'Unknown Amount of ') +
        (globalKeys.Cup.find((info) => info.value === size)?.name ?? 'Jacques') +
        (size === 0 ? '' : '-cup') +
        ' breast' +
        (count != null && count !== 1 ? 's' : '');
}

export function displayChestContent(getChar: () => CharType) {
    return new Category([{
        title: 'Breasts',
        list: [
            new Label('Tags', new MultiOptionField(globalKeys.BodyTag, createValueLookup(getChar, 'breastTags'))),
        ]
    }, {
        title: 'Breast Rows',
        list: [
            new ArrayField(
                'breasts',
                createValueLookup(getChar, 'breastRows'),
                createBreastRow,
                (getObj) => describeBreastRow(getObj().breasts, getObj().sizeRaw),
                (createKeyLookup) => [
                    new Label('Amount Per Row', new NumberField(createKeyLookup('breasts'))),
                    new Label('Size Raw', new NumberField(createKeyLookup('sizeRaw'))),
                    new Label('Size Mod', new NumberField(createKeyLookup('sizeMod'))),
                ])
        ]
    }, {
        title: 'Nipples',
        list: [
            new Label('Type', new SelectField(globalKeys.NippleType, createValueLookup(getChar, 'nippleType'))),
            new Label('Color', new StringField(createValueLookup(getChar, 'nippleColor'))),
            new Label('Amount Per Breast', new NumberField(createValueLookup(getChar, 'nipplesPerBreast'))),
            new Label('Size Ratio', new NumberField(createValueLookup(getChar, 'nippleSizeRatio'))),
            new Label('Width Ratio', new NumberField(createValueLookup(getChar, 'nippleWidthRatio'))),
        ]
    }, {
        title: 'Milk',
        list: [
            new Label('Type', new SelectField(globalKeys.FluidType, createValueLookup(getChar, 'milkType'))),
            new Label('Multiplier Raw', new NumberField(createValueLookup(getChar, 'milkMultiplierRaw'))),
            new Label('Storage Multiplier Raw', new NumberField(createValueLookup(getChar, 'milkStorageMultiplierRaw'))),
            new Label('Fullness Raw', new NumberField(createValueLookup(getChar, 'milkFullnessRaw'))),
            new Label('Rate Raw', new NumberField(createValueLookup(getChar, 'milkRateRaw'))),
        ]
    }]);
}
