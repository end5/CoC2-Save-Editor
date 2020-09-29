import { globalKeys } from "../../../GameData/GlobalKeys";
import { Category } from "../../../Display/Fields/Category";
import { StringField } from "../../../Display/Fields/String";
import { SelectField } from "../../../Display/Fields/Select";
import { NumberField } from "../../../Display/Fields/Number";
import { Label } from "../../../Display/Fields/Label";
import { createValueLookup } from "../../../Data/ValueLookup";
import { CharType } from "../../../Data/CharTypes";

export function displayCharInfo(getChar: () => CharType) {
    return new Category([{
        title: 'General',
        list: [
            new Label('Name', new StringField(createValueLookup(getChar, 'name'))),
            new Label('Title', new StringField(createValueLookup(getChar, 'title'))),
            new Label('Taxon', new SelectField(globalKeys.Taxon, createValueLookup(getChar, 'taxa'))),
            new Label('Class', new SelectField(globalKeys.Class, createValueLookup(getChar, 'class'))),
            new Label('Background', new SelectField(globalKeys.Background, createValueLookup(getChar, 'background'))),
            new Label('Gender Pref', new NumberField(createValueLookup(getChar, 'genderPref'))),
            new Label('Level', new NumberField(createValueLookup(getChar, 'level'))),
            new Label('Exp', new NumberField(createValueLookup(getChar, 'exp'))),
            new Label('Orgasms', new NumberField(createValueLookup(getChar, 'orgasms'))),
            new Label('Last Orgasm', new NumberField(createValueLookup(getChar, 'lastOrgasm'))),
        ]
    }]);
}
