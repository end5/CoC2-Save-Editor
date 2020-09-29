import { globalKeys } from "../../../../GameData/GlobalKeys";
import { CharType } from "../../../../Data/CharTypes";
import { Category } from "../../../../Display/Fields/Category";
import { SingleObjectField } from "../../../../Display/Fields/SingleObject";
import { SelectField } from "../../../../Display/Fields/Select";
import { NumberField } from "../../../../Display/Fields/Number";
import { Field } from "../../../../Display/HTMLGenerics";
import { Label } from "../../../../Display/Fields/Label";
import { createValueLookup } from "../../../../Data/ValueLookup";
import { Effect, MAX_EFFECT_VALUES } from "../../../../Data/Char";

export function displayBoon(getChar: () => CharType) {
    return new Category([{
        title: 'Boon',
        list: [
            new SingleObjectField(
                createValueLookup(getChar, 'boon'),
                Effect,
                (createKeyLookup) => {
                    const fields: Field[] = [
                        new Label('Key', new SelectField(globalKeys.Boon, createKeyLookup('key')))
                    ];

                    const values = createKeyLookup('values');

                    for (let index = 0; index < MAX_EFFECT_VALUES; index++)
                        fields.push(
                            new Label('Value ' + (index + 1),
                                new NumberField({
                                    get: () => values.get()[index] ?? 0,
                                    set: (value) => values.get()[index] = value
                                })));

                    return fields;
                }
            )
        ]
    }]);
}
