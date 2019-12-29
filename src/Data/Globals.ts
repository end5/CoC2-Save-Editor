import { globalKeys } from "./GlobalKeys";

export interface GlobalOptions {
    // Convert to serialized from display
    toSave?: (n: string) => any;
    // Convert from serialized to display
    fromSave?: (n: any) => string;
    // List of options
    list: string[];
}

export const globals: Record<keyof typeof globalKeys, GlobalOptions> = {
    Race: {
        toSave: (n) => ({ key: n }),
        fromSave: (n) => n.key,
        list: globalKeys.Race
    },
    Taxon: {
        toSave: (n) => globalKeys.Taxon.indexOf(n) + 1,
        fromSave: (n) => globalKeys.Taxon[n - 1],
        list: globalKeys.Taxon
    },
    Class: {
        toSave: (n) => globalKeys.Class.indexOf(n),
        fromSave: (n) => globalKeys.Class[n],
        list: globalKeys.Class
    },
    Background: {
        toSave: (n) => globalKeys.Background.indexOf(n),
        fromSave: (n) => globalKeys.Background[n],
        list: globalKeys.Background
    },
    Affinity: {
        toSave: (n) => globalKeys.Affinity.indexOf(n),
        fromSave: (n) => globalKeys.Affinity[n],
        list: globalKeys.Affinity
    },
    TFType: {
        toSave: (n) => globalKeys.TFType.indexOf(n),
        fromSave: (n) => globalKeys.TFType[n],
        list: globalKeys.TFType
    },
    // None = -1
    BodyType: {
        toSave: (n) => globalKeys.BodyType.indexOf(n) - 1,
        fromSave: (n) => globalKeys.BodyType[n + 1],
        list: globalKeys.BodyType
    },
    BodyTag: {
        toSave: (n) => globalKeys.BodyTag.indexOf(n),
        fromSave: (n) => globalKeys.BodyTag[n],
        list: globalKeys.BodyTag
    },
    // None = -1
    FluidType: {
        toSave: (n) => globalKeys.FluidType.indexOf(n) - 1,
        fromSave: (n) => globalKeys.FluidType[n + 1],
        list: globalKeys.FluidType
    },
    // None = -1
    SkinType: {
        toSave: (n) => globalKeys.SkinType.indexOf(n) - 1,
        fromSave: (n) => globalKeys.SkinType[n + 1],
        list: globalKeys.SkinType
    },
    // None = -1
    NippleType: {
        toSave: (n) => globalKeys.NippleType.indexOf(n) - 1,
        fromSave: (n) => globalKeys.NippleType[n + 1],
        list: globalKeys.NippleType
    },
    // None = -1
    HairType: {
        toSave: (n) => globalKeys.HairType.indexOf(n) - 1,
        fromSave: (n) => globalKeys.HairType[n + 1],
        list: globalKeys.HairType
    },
    Weapons: { list: globalKeys.Weapons },
    ArmorSet: { list: globalKeys.ArmorSet },
    ItemHead: { list: globalKeys.ItemHead },
    ItemNeck: { list: globalKeys.ItemNeck },
    ItemShoulders: { list: globalKeys.ItemShoulders },
    ItemHands: { list: globalKeys.ItemHands },
    ItemWaist: { list: globalKeys.ItemWaist },
    ItemFeet: { list: globalKeys.ItemFeet },
    Rings: { list: globalKeys.Rings },
    TopGarb: { list: globalKeys.TopGarb },
    BottomGarb: { list: globalKeys.BottomGarb },
    Offhand: { list: globalKeys.Offhand },
    TFs: { list: globalKeys.TFs },
    Misc: { list: globalKeys.Misc },
    Consumable: { list: globalKeys.Consumable },
    Set: { list: globalKeys.Set },
    KeyItems: { list: globalKeys.KeyItems },
    Boon: { list: globalKeys.Boon },
    StatusEffect: { list: globalKeys.StatusEffect },
    CombatEffect: { list: globalKeys.CombatEffect },
    Powers: {
        toSave: (v) => ({ key: v }),
        fromSave: (v) => v ? v.key : undefined,
        list: globalKeys.Powers
    },
    Perks: { list: globalKeys.Perks },
    Items: {
        list: globalKeys.Weapons.concat(
            globalKeys.ArmorSet,
            globalKeys.ItemHead,
            globalKeys.ItemNeck,
            globalKeys.ItemShoulders,
            globalKeys.ItemHands,
            globalKeys.ItemWaist,
            globalKeys.ItemFeet,
            globalKeys.Rings,
            globalKeys.TopGarb,
            globalKeys.BottomGarb,
            globalKeys.Offhand,
            globalKeys.TFs,
            globalKeys.Misc,
            globalKeys.Set
        )
    },
};
