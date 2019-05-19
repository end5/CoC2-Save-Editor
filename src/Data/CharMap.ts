import { globals } from "./Globals";
import { PropDict, PropLabel, ArrayProp } from "../MapProps";

/*
    all
        label - The display name of the variable
        desc - A description of the variable
        type - Variable type (boolean, number, string, array, object, multioption)
        options - List of names or numbers that the variable can be
        groupTag - The display group the variable is part of
    array
        properties - The properties of each array entry
        min - The minimum size of the array
        max - The maximum size of the array
    multioption
        customCallback - Callback function used to change the output
    object
        properties - The properties of the object
        canBeNull - Can the value be null
    string
    boolean
    number
*/

export const charMap: PropDict = {
    // Info
    name: { label: "Name", type: "string", groupTag: "Info" },
    title: { label: "Title", type: "string", groupTag: "Info" },
    taxa: { label: "Taxon", type: "number", options: globals.Taxon, groupTag: "Info" },
    class: { label: "Class", type: "number", options: globals.Class, groupTag: "Info" },
    background: { label: "Background", type: "number", options: globals.Background, groupTag: "Info" },
    genderPref: { label: "Gender Pref", type: "number", groupTag: "Info" },
    level: { label: "Level", type: "number", groupTag: "Info" },
    exp: { label: "Exp", type: "number", groupTag: "Info" },
    orgasms: { label: "Orgasms", type: "number", groupTag: "Info" },
    lastOrgasm: { label: "Last Orgasm", type: "number", groupTag: "Info" },
    // Stats
    hitPoints: { label: "HP", type: "number", groupTag: "Stats" },
    hitPointsMaxMod: { label: "HP Max Mod", type: "number", groupTag: "Stats" },
    resolvePoints: { label: "Resolve Points", type: "number", groupTag: "Stats" },
    resolveMaxMod: { label: "Resolve Points Max Mod", type: "number", groupTag: "Stats" },
    threatMod: { label: "Threat Mod", type: "number", groupTag: "Stats" },
    strengthAlloc: { label: "Strength Level", type: "number", groupTag: "Stats" },
    strengthMod: { label: "Strength Mod", type: "number", groupTag: "Stats" },
    toughnessAlloc: { label: "Toughness Level", type: "number", groupTag: "Stats" },
    toughnessMod: { label: "Toughness Mod", type: "number", groupTag: "Stats" },
    agilityAlloc: { label: "Agility Level", type: "number", groupTag: "Stats" },
    agilityMod: { label: "Agility Mod", type: "number", groupTag: "Stats" },
    cunningAlloc: { label: "Cunning Level", type: "number", groupTag: "Stats" },
    cunningMod: { label: "Cunning Mod", type: "number", groupTag: "Stats" },
    willpowerAlloc: { label: "Willpower Level", type: "number", groupTag: "Stats" },
    willpowerMod: { label: "Willpower Mod", type: "number", groupTag: "Stats" },
    presenceAlloc: { label: "Presence Level", type: "number", groupTag: "Stats" },
    presenceMod: { label: "Presence Mod", type: "number", groupTag: "Stats" },
    libidoMod: { label: "Libido Mod", type: "number", groupTag: "Stats" },
    corruptionMod: { label: "Corruption Mod", type: "number", groupTag: "Stats" },
    exhibRaw: { label: "Exhibition Raw", type: "number", groupTag: "Stats" },
    feracityRaw: { label: "Feracity Raw", type: "number", groupTag: "Stats" },
    feracityMod: { label: "Feracity Mod", type: "number", groupTag: "Stats" },
    fertilityMod: { label: "Fertility Mod", type: "number", groupTag: "Stats" },
    virilityMod: { label: "Virility Mod", type: "number", groupTag: "Stats" },
    penetratingResist: { label: "Penetrating", type: "number", groupTag: "Stats.Resistance" },
    crushingResist: { label: "Crushing", type: "number", groupTag: "Stats.Resistance" },
    holyResist: { label: "Holy", type: "number", groupTag: "Stats.Resistance" },
    blightResist: { label: "Blight", type: "number", groupTag: "Stats.Resistance" },
    acidResist: { label: "Acid", type: "number", groupTag: "Stats.Resistance" },
    fireResist: { label: "Fire", type: "number", groupTag: "Stats.Resistance" },
    frostResist: { label: "Frost", type: "number", groupTag: "Stats.Resistance" },
    stormResist: { label: "Storm", type: "number", groupTag: "Stats.Resistance" },
    teaseResist: { label: "Tease", type: "number", groupTag: "Stats.Resistance" },
    drugResist: { label: "Drug", type: "number", groupTag: "Stats.Resistance" },
    pheromoneResist: { label: "Pheromone", type: "number", groupTag: "Stats.Resistance" },
    fatigueResist: { label: "Fatigue", type: "number", groupTag: "Stats.Resistance" },
    mindResist: { label: "Mind", type: "number", groupTag: "Stats.Resistance" },
    // raceAffinities: {
    //     label: "Race",
    //     type: "multioption",
    //     options: globals.Affinity,
    //     groupTag: "Stats.Affinities",
    //     max: 3,
    // },
    // classAffinities: {
    //     label: "Class",
    //     type: "multioption",
    //     options: globals.Affinity,
    //     groupTag: "Stats.Affinities",
    //     max: 3,
    // },
    // backgroundAffinities: {
    //     label: "Background",
    //     type: "multioption",
    //     options: globals.Affinity,
    //     groupTag: "Stats.Affinities",
    //     max: 3,
    // },
    // Effects
    perks: {
        label: "Perks",
        type: "array",
        groupTag: "Effects",
        entry: {
            type: "object",
            canBeNull: false,
            properties: {
                key: { label: "Key", type: "string", options: globals.Perks },
                values: { label: "Values", type: "array", entry: { type: "number" }, min: 6 }
            }
        }
    },
    statusEffects: {
        label: "Status",
        type: "array",
        groupTag: "Effects",
        entry: {
            type: "object",
            canBeNull: false,
            properties: {
                key: { label: "Key", type: "string", options: globals.StatusEffect },
                duration: { label: "Duration", type: "number" },
                values: { label: "Values", type: "array", entry: { type: "number" } }
            }
        }
    },
    combatEffects: {
        label: "Combat",
        type: "array",
        groupTag: "Effects",
        entry: {
            type: "object",
            canBeNull: false,
            properties: {
                key: { label: "Key", type: "string", options: globals.CombatEffect },
                duration: { label: "Duration", type: "number" },
                values: { label: "Values", type: "array", entry: { type: "number" } }
            }
        }
    },
    boon: {
        label: "Boon",
        type: "object",
        groupTag: "Effects",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.Boon },
            duration: { label: "Duration", type: "number" },
            values: { label: "Values", type: "array", entry: { type: "number" } }
        }
    },
    powers: {
        label: "Powers",
        type: "multioption",
        options: globals.Powers,
        groupTag: "Effects",
        max: 5,
        transform: (value) => ({ key: value }),
    },
    equippedPowers: {
        label: "Equipped Powers",
        type: "multioption",
        options: globals.Powers,
        groupTag: "Effects",
        max: 5,
        transform: (value) => ({ key: value }),
    },
    // Inventory
    credits: { label: "Credits", type: "number", groupTag: "Inventory" },
    weaponPrimary: {
        label: "Primary Weapon",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.Weapons },
            args: createItemArgsMap()
        }
    },
    weaponSecondary: {
        label: "Offhand",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.Offhand },
            args: createItemArgsMap()
        }
    },
    head: {
        label: "Head",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.ItemHead },
            args: createItemArgsMap()
        }
    },
    neck: {
        label: "Neck",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.ItemNeck },
            args: createItemArgsMap()
        }
    },
    shoulders: {
        label: "Shoulders",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.ItemShoulders },
            args: createItemArgsMap()
        }
    },
    armorSet: {
        label: "Armor Set",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.ArmorSet },
            args: createItemArgsMap()
        }
    },
    hands: {
        label: "Hands",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.ItemHands },
            args: createItemArgsMap()
        }
    },
    waist: {
        label: "Waist",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.ItemWaist },
            args: createItemArgsMap()
        }
    },
    feet: {
        label: "Feet",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.ItemFeet },
            args: createItemArgsMap()
        }
    },
    ring1: {
        label: "Ring 1",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.Rings },
            args: createItemArgsMap()
        }
    },
    ring2: {
        label: "Ring 2",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.Rings },
            args: createItemArgsMap()
        }
    },
    topGarment: {
        label: "Top Garment",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.TopGarb },
            args: createItemArgsMap()
        }
    },
    bottomGarment: {
        label: "Bottom Garment",
        type: "object",
        groupTag: "Inventory.Equipment",
        canBeNull: true,
        properties: {
            key: { label: "Key", type: "string", options: globals.BottomGarb },
            args: createItemArgsMap()
        }
    },
    inventory: {
        label: "Items",
        type: "array",
        groupTag: "Inventory",
        entry: {
            type: "object",
            properties: {
                key: { label: "Key", type: "string", options: globals.Items },
                args: createItemArgsMap()
            }
        }
    },
    reagents: {
        label: "Reagents",
        type: "object",
        groupTag: "Inventory",
        canBeNull: false,
        properties: (() => {
            const obj: Record<string, any> = {};
            for (let index = 0; index < globals.TFType.list.length; index++)
                obj[index] = { label: globals.TFType.list[index], type: "number" };
            return obj;
        })()
    },
    keyItems: {
        label: "Key Items",
        type: "array",
        groupTag: "Inventory",
        entry: {
            type: "object",
            properties: {
                key: { label: "Key", type: "string", options: globals.KeyItems }
            }
        }
    },
    // Body
    _race: { label: "Race", type: "string", options: globals.Race, groupTag: "Body" },
    originalRace: { label: "Original Race", type: "string", groupTag: "Body" },
    femininity: { label: "Feminitity", type: "number", groupTag: "Body" },
    tallness: { label: "Tallness", type: "number", groupTag: "Body" },
    tone: { label: "Tone", type: "number", groupTag: "Body" },
    thickness: { label: "Thickness", type: "number", groupTag: "Body" },
    skinType: { label: "Type", type: "number", options: globals.SkinType, groupTag: "Body.Skin" },
    skinTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Skin" },
    skinColor: { label: "Skin Color", type: "string", groupTag: "Body.Skin" },
    furColor: { label: "Fur Color", type: "string", groupTag: "Body.Skin" },
    scaleColor: { label: "Scale Color", type: "string", groupTag: "Body.Skin" },
    isVirgin: { label: "Virgin", type: "boolean", groupTag: "Body.Virginity" },
    vaginalVirgin: { label: "Vaginal", type: "boolean", groupTag: "Body.Virginity" },
    cockVirgin: { label: "Cock", type: "boolean", groupTag: "Body.Virginity" },
    analVirgin: { label: "Anal", type: "boolean", groupTag: "Body.Virginity" },
    pregnancySpeedRaw: { label: "Speed Raw", type: "number", groupTag: "Body.Pregnancy" },
    pregnancySpeedMod: { label: "Speed Mod", type: "number", groupTag: "Body.Pregnancy" },
    // Head
    horns: { label: "Count", type: "number", groupTag: "Body.Head.Horns" },
    hornType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Head.Horns" },
    hornLength: { label: "Length", type: "number", groupTag: "Body.Head.Horns" },
    hairColor: { label: "Color", type: "string", groupTag: "Body.Head.Hair" },
    hairLength: { label: "Length", type: "number", groupTag: "Body.Head.Hair" },
    hairStyle: { label: "Style", type: "string", groupTag: "Body.Head.Hair" },
    hairType: { label: "Type", type: "number", options: globals.HairType, groupTag: "Body.Head.Hair" },
    earType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Head.Ears" },
    earTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Head.Ears" },
    earLength: { label: "Count", type: "number", groupTag: "Body.Head.Ears" },
    faceType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Head.Face" },
    faceTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Head.Face" },
    eyeType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Head.Eyes" },
    eyeTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Head.Eyes" },
    eyeColor: { label: "Color", type: "string", groupTag: "Body.Head.Eyes" },
    lipMod: { label: "Mod", type: "number", groupTag: "Body.Head.Lips" },
    lipColor: { label: "Color", type: "string", groupTag: "Body.Head.Lips" },
    tongueType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Head.Tongue" },
    tongueTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Head.Tongue" },
    // Torso
    wingType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Wings" },
    wingCount: { label: "Count", type: "number", groupTag: "Body.Wings" },
    armType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Arms" },
    armTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Arms" },
    breastRows: {
        label: "Row",
        type: "array",
        groupTag: "Body.Breasts",
        min: 1,
        entry: {
            type: "object",
            canBeNull: false,
            properties: {
                breasts: { label: "Count", type: "number" },
                sizeRaw: { label: "Size Raw", type: "number" },
                sizeMod: { label: "Size Mod", type: "number" },
            }
        }
    },
    nippleColor: { label: "Color", type: "string", groupTag: "Body.Breasts.Nipples" },
    nipplesPerBreast: { label: "Per Breast", type: "number", groupTag: "Body.Breasts.Nipples" },
    nippleSizeRatio: { label: "Size Ratio", type: "number", groupTag: "Body.Breasts.Nipples" },
    nippleWidthRatio: { label: "Width Ratio", type: "number", groupTag: "Body.Breasts.Nipples" },
    nippleType: { label: "Type", type: "number", options: globals.NippleType, groupTag: "Body.Breasts.Nipples" },
    breastTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Breasts" },
    milkType: { label: "Type", type: "number", options: globals.FluidType, groupTag: "Body.Breasts.Milk" },
    milkMultiplierRaw: { label: "Multiplier", type: "number", groupTag: "Body.Breasts.Milk" },
    milkStorageMultiplierRaw: { label: "Storage Multiplier", type: "number", groupTag: "Body.Breasts.Milk" },
    milkFullnessRaw: { label: "Fullness", type: "number", groupTag: "Body.Breasts.Milk" },
    milkRateRaw: { label: "Rate", type: "number", groupTag: "Body.Breasts.Milk" },
    bellyRatingRaw: { label: "Rating Raw", type: "number", groupTag: "Body.Belly" },
    bellyRatingMod: { label: "Rating Mod", type: "number", groupTag: "Body.Belly" },
    // Lower Torso
    hipRatingRaw: { label: "Rating Raw", type: "number", groupTag: "Body.Hips" },
    hipRatingMod: { label: "Rating Mod", type: "number", groupTag: "Body.Hips" },
    tailType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Tails" },
    numTails: { label: "Count", type: "number", groupTag: "Body.Tails" },
    tailTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Tails" },
    buttRatingRaw: { label: "Rating Raw", type: "number", groupTag: "Body.Butt" },
    buttRatingMod: { label: "Rating Mod", type: "number", groupTag: "Body.Butt" },
    ass: {
        label: "Butt",
        type: "object",
        groupTag: "Body.Butt",
        canBeNull: false,
        properties: {
            type: { label: "Type", type: "number", options: globals.BodyType },
            hymen: { label: "Hymen", type: "boolean" },
            clits: { label: "Clits", type: "number" },
            _color: { label: "Color", type: "string" },
            wetnessRaw: { label: "Wetness Raw", type: "number" },
            wetnessMod: { label: "Wetness Mod", type: "number" },
            loosenessRaw: { label: "Looseness Raw", type: "number" },
            loosenessMod: { label: "Looseness Mod", type: "number" },
            bonusCapacity: { label: "Bonus Capacity", type: "number" },
            stretchCounter: { label: "Stretch Counter", type: "number" },
            tags: { label: "Tags", type: "multioption", options: globals.BodyTag }
        }
    },
    legType: { label: "Type", type: "number", options: globals.BodyType, groupTag: "Body.Legs" },
    legTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Legs" },
    legCount: { label: "Count", type: "number", groupTag: "Body.Legs" },
    // Genitals
    girlCumType: { label: "Girl Cum Type", type: "number", options: globals.FluidType, groupTag: "Body.Genitals.Cum" },
    cumType: { label: "Cum Type", type: "number", options: globals.FluidType, groupTag: "Body.Genitals.Cum" },
    cumMultiplierRaw: { label: "Cum Multiplier Raw", type: "number", groupTag: "Body.Genitals.Cum" },
    cumMultiplierMod: { label: "Cum Multiplier Mod", type: "number", groupTag: "Body.Genitals.Cum" },
    cocks: {
        label: "Cocks",
        type: "array",
        groupTag: "Body.Genitals",
        entry: {
            type: "object",
            canBeNull: false,
            properties: {
                type: { label: "Type", type: "number", options: globals.BodyType },
                virgin: { label: "Virgin", type: "boolean" },
                tags: { label: "Tags", type: "multioption", options: globals.BodyTag },
                lengthRaw: { label: "Length Raw", type: "number" },
                lengthMod: { label: "Length Mod", type: "number" },
                thicknessRatioRaw: { label: "Thickness Ratio Raw", type: "number" },
                thicknessRatioMod: { label: "Thickness Ratio Mod", type: "number" },
                flaccidRatio: { label: "Flaccid Ratio", type: "number" },
                _knotRatio: { label: "Knot Ratio", type: "number" },
                pierced: { label: "Pierced", type: "number" },
                _color: { label: "Color", type: "string" },
            }
        }
    },
    _balls: { label: "Count", type: "number", groupTag: "Body.Genitals.Balls" },
    ballTags: { label: "Tags", type: "multioption", options: globals.BodyTag, groupTag: "Body.Genitals.Balls" },
    ballEfficiency: { label: "Efficiency", type: "number", groupTag: "Body.Genitals.Balls" },
    ballSizeRaw: { label: "Size Raw", type: "number", groupTag: "Body.Genitals.Balls" },
    ballSizeMod: { label: "Size Mod", type: "number", groupTag: "Body.Genitals.Balls" },
    ballFullness: { label: "Fullness", type: "number", groupTag: "Body.Genitals.Balls" },
    clitLength: { label: "Length", type: "number", groupTag: "Body.Genitals.Clit" },
    vagina: {
        label: "Vagina",
        type: "object",
        groupTag: "Body.Genitals",
        canBeNull: true,
        properties: {
            type: { label: "Type", type: "number", options: globals.BodyType },
            hymen: { label: "Hymen", type: "boolean" },
            clits: { label: "Clits", type: "number" },
            _color: { label: "Color", type: "string" },
            wetnessRaw: { label: "Wetness Raw", type: "number" },
            wetnessMod: { label: "Wetness Mod", type: "number" },
            loosenessRaw: { label: "Looseness Raw", type: "number" },
            loosenessMod: { label: "Looseness Mod", type: "number" },
            bonusCapacity: { label: "Bonus Capacity", type: "number" },
            stretchCounter: { label: "Stretch Counter", type: "number" },
            tags: { label: "Tags", type: "multioption", options: globals.BodyTag }
        }
    },
};

function createItemArgsMap(): PropLabel & ArrayProp {
    return {
        label: "Args",
        type: "array",
        min: 1,
        entry: {
            type: "number"
        },
        override: {
            0: { label: "Count", type: "number", default: 1 },
            1: { label: "TF Type", type: "number", options: globals.TFType },
        }
    };
}
