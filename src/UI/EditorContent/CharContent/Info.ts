import { StringField, SelectField, NumberField, createCategory } from "../../../Display/Fields";
import { CharAccessor } from "../../../Data/CharAccessor";
import { globalKeys } from "../../../GameData/GlobalKeys";

export function displayCharInfo(char: CharAccessor) {
    const element = document.createElement('div');
    element.className = 'content wrap';

    const categories = [{
        title: 'General',
        list: [
            new StringField("Name", () => char.get().name, (value) => char.get().name = value),
            new StringField("Title", () => char.get().title, (value) => char.get().title = value),
            new SelectField("Taxon", globalKeys.Taxon, () => char.get().taxa, (value) => char.get().taxa = value),
            new SelectField("Class", globalKeys.Class, () => char.get().class, (value) => char.get().class = value),
            new SelectField("Background", globalKeys.Background, () => char.get().background, (value) => char.get().background = value),
            new NumberField("Gender Pref", () => char.get().genderPref, (value) => char.get().genderPref = value),
            new NumberField("Level", () => char.get().level, (value) => char.get().level = value),
            new NumberField("Exp", () => char.get().exp, (value) => char.get().exp = value),
            new NumberField("Orgasms", () => char.get().orgasms, (value) => char.get().orgasms = value),
            new NumberField("Last Orgasm", () => char.get().lastOrgasm, (value) => char.get().lastOrgasm = value),
        ]
    }];

    for (const category of categories) {
        const categoryEl = createCategory(category.title);
        element.appendChild(categoryEl);
        for (const field of category.list)
            categoryEl.appendChild(field.element);
    }

    const load = () => {
        for (const category of categories)
            for (const field of category.list)
                field.load();
    };

    return { element, load };
}
