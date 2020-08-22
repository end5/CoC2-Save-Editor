import { NumberField, createCategory } from "../../../Display/Fields";
import { CharAccessor } from "../../../Data/CharAccessor";

export function displayCharStats(char: CharAccessor) {
    const element = document.createElement('div');
    element.className = 'content wrap';

    const categories = [{
        title: 'General',
        list: [
            new NumberField("HP", () => char.get().hitPoints, (value) => char.get().hitPoints = value),
            new NumberField("HP Max Mod", () => char.get().hitPointsMaxMod, (value) => char.get().hitPointsMaxMod = value),
            new NumberField("Resolve Points", () => char.get().resolvePoints, (value) => char.get().resolvePoints = value),
            new NumberField("Resolve Points Max Mod", () => char.get().resolveMaxMod, (value) => char.get().resolveMaxMod = value),
            new NumberField("Threat Mod", () => char.get().threatMod, (value) => char.get().threatMod = value),
            new NumberField("Strength Level", () => char.get().strengthAlloc, (value) => char.get().strengthAlloc = value),
            new NumberField("Strength Mod", () => char.get().strengthMod, (value) => char.get().strengthMod = value),
            new NumberField("Toughness Level", () => char.get().toughnessAlloc, (value) => char.get().toughnessAlloc = value),
            new NumberField("Toughness Mod", () => char.get().toughnessMod, (value) => char.get().toughnessMod = value),
            new NumberField("Agility Level", () => char.get().agilityAlloc, (value) => char.get().agilityAlloc = value),
            new NumberField("Agility Mod", () => char.get().agilityMod, (value) => char.get().agilityMod = value),
            new NumberField("Cunning Level", () => char.get().cunningAlloc, (value) => char.get().cunningAlloc = value),
            new NumberField("Cunning Mod", () => char.get().cunningMod, (value) => char.get().cunningMod = value),
            new NumberField("Willpower Level", () => char.get().willpowerAlloc, (value) => char.get().willpowerAlloc = value),
            new NumberField("Willpower Mod", () => char.get().willpowerMod, (value) => char.get().willpowerMod = value),
            new NumberField("Presence Level", () => char.get().presenceAlloc, (value) => char.get().presenceAlloc = value),
            new NumberField("Presence Mod", () => char.get().presenceMod, (value) => char.get().presenceMod = value),
            new NumberField("Libido Mod", () => char.get().libidoMod, (value) => char.get().libidoMod = value),
            new NumberField("Corruption Mod", () => char.get().corruptionMod, (value) => char.get().corruptionMod = value),
            new NumberField("Exhibition Raw", () => char.get().exhibRaw, (value) => char.get().exhibRaw = value),
            new NumberField("Feracity Raw", () => char.get().feracityRaw, (value) => char.get().feracityRaw = value),
            new NumberField("Feracity Mod", () => char.get().feracityMod, (value) => char.get().feracityMod = value),
            new NumberField("Fertility Mod", () => char.get().fertilityMod, (value) => char.get().fertilityMod = value),
            new NumberField("Virility Mod", () => char.get().virilityMod, (value) => char.get().virilityMod = value)
        ]
    }, {
        title: 'Resistance',
        list: [
            new NumberField("Penetrating", () => char.get().penetratingResist, (value) => char.get().penetratingResist = value),
            new NumberField("Crushing", () => char.get().crushingResist, (value) => char.get().crushingResist = value),
            new NumberField("Holy", () => char.get().holyResist, (value) => char.get().holyResist = value),
            new NumberField("Blight", () => char.get().blightResist, (value) => char.get().blightResist = value),
            new NumberField("Acid", () => char.get().acidResist, (value) => char.get().acidResist = value),
            new NumberField("Fire", () => char.get().fireResist, (value) => char.get().fireResist = value),
            new NumberField("Frost", () => char.get().frostResist, (value) => char.get().frostResist = value),
            new NumberField("Storm", () => char.get().stormResist, (value) => char.get().stormResist = value),
            new NumberField("Tease", () => char.get().teaseResist, (value) => char.get().teaseResist = value),
            new NumberField("Drug", () => char.get().drugResist, (value) => char.get().drugResist = value),
            new NumberField("Pheromone", () => char.get().pheromoneResist, (value) => char.get().pheromoneResist = value),
            new NumberField("Fatigue", () => char.get().fatigueResist, (value) => char.get().fatigueResist = value),
            new NumberField("Mind", () => char.get().mindResist, (value) => char.get().mindResist = value)
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
