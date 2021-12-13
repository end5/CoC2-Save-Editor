import { globalKeys } from "../GameData/GlobalKeys";

export type RaceTypes = typeof globalKeys.Race[number]['value'];
export type TaxonTypes = typeof globalKeys.Taxon[number]['value'];
export type ClassTypes = typeof globalKeys.Class[number]['value'];
export type BackgroundTypes = typeof globalKeys.Background[number]['value'];
export type TFTypes = typeof globalKeys.TFType[number]['value'];
export type BodyTypes = typeof globalKeys.BodyType[number]['value'];
export type BodyTags = typeof globalKeys.BodyTag[number]['value'];
export type FluidTypes = typeof globalKeys.FluidType[number]['value'];
export type SkinTypes = typeof globalKeys.SkinType[number]['value'];
export type NippleTypes = typeof globalKeys.NippleType[number]['value'];
export type HairTypes = typeof globalKeys.HairType[number]['value'];

export type WeaponsKeys = typeof globalKeys.Weapons[number]['value'];
export type OffhandKeys = typeof globalKeys.Offhand[number]['value'];
export type ItemHeadKeys = typeof globalKeys.ItemHead[number]['value'];
export type ItemNeckKeys = typeof globalKeys.ItemNeck[number]['value'];
export type ItemShouldersKeys = typeof globalKeys.ItemShoulders[number]['value'];
export type ArmorSetKeys = typeof globalKeys.ArmorSet[number]['value'];
export type ItemHandsKeys = typeof globalKeys.ItemHands[number]['value'];
export type ItemWaistKeys = typeof globalKeys.ItemWaist[number]['value'];
export type ItemFeetKeys = typeof globalKeys.ItemFeet[number]['value'];
export type RingKeys = typeof globalKeys.Rings[number]['value'];
export type TopGarbKeys = typeof globalKeys.TopGarb[number]['value'];
export type BottomGarbKeys = typeof globalKeys.BottomGarb[number]['value'];
export type TFKeys = typeof globalKeys.TFs[number]['value'];
export type MiscKeys = typeof globalKeys.Misc[number]['value'];
export type ConsumableKeys = typeof globalKeys.Consumable[number]['value'];
export type SetKeys = typeof globalKeys.Set[number]['value'];
export type ItemKeys = WeaponsKeys |
    OffhandKeys |
    ItemHeadKeys |
    ItemNeckKeys |
    ItemShouldersKeys |
    ArmorSetKeys |
    ItemHandsKeys |
    ItemWaistKeys |
    ItemFeetKeys |
    RingKeys |
    TopGarbKeys |
    BottomGarbKeys |
    TFKeys |
    MiscKeys |
    ConsumableKeys |
    SetKeys;

export type KeyItemKeys = typeof globalKeys.KeyItems[number]['value'];

export type BoonKeys = typeof globalKeys.Boon[number]['value'];
export type StatusEffectKeys = typeof globalKeys.StatusEffect[number]['value'];
export type CombatEffectKeys = typeof globalKeys.CombatEffect[number]['value'];
export type PowerKeys = typeof globalKeys.Powers[number]['value'];
export type PerkKeys = typeof globalKeys.Perks[number]['value'];

export interface CharType {
    name: string;
    cName: string;
    soloCombatPrefix: string;
    taxa: TaxonTypes;
    class: ClassTypes;
    background: BackgroundTypes;
    genderPref: number;
    isPlural: boolean;
    partyLeader: boolean;
    level: number;
    exp: number;
    canGainExp: boolean;
    compTags: [];
    actionPoints: number;
    ultimateUsed: number;
    hitPoints: number;
    hitPointsMaxMod: number;
    resolvePoints: number;
    resolveMaxMod: number;
    threatMod: number;
    strengthAlloc: number;
    strengthMod: number;
    toughnessAlloc: number;
    toughnessMod: number;
    agilityAlloc: number;
    agilityMod: number;
    cunningAlloc: number;
    cunningMod: number;
    willpowerAlloc: number;
    willpowerMod: number;
    presenceAlloc: number;
    presenceMod: number;
    libidoMod: number;
    corruptionMod: number;
    isLustImmune: boolean;
    isDisarmImmune: boolean;
    penetratingResist: number;
    crushingResist: number;
    holyResist: number;
    blightResist: number;
    acidResist: number;
    fireResist: number;
    frostResist: number;
    stormResist: number;
    teaseResist: number;
    drugResist: number;
    pheromoneResist: number;
    fatigueResist: number;
    mindResist: number;
    perks: PerkType<PerkKeys>[];
    powers: (PowerType | undefined)[];
    equippedPowers: [PowerType?, PowerType?, PowerType?, PowerType?, PowerType?];
    combatEffects: EffectType<CombatEffectKeys>[];
    statusEffects: EffectType<StatusEffectKeys>[];
    likes: number[];
    dislikes: number[];
    boon?: EffectType<BoonKeys>;
    credits: number;
    weaponPrimary?: ItemType<WeaponsKeys>;
    weaponSecondary?: ItemType<OffhandKeys>;
    head?: ItemType<ItemHeadKeys>;
    neck?: ItemType<ItemNeckKeys>;
    shoulders?: ItemType<ItemShouldersKeys>;
    armorSet?: ItemType<ArmorSetKeys>;
    hands?: ItemType<ItemHandsKeys>;
    waist?: ItemType<ItemWaistKeys>;
    feet?: ItemType<ItemFeetKeys>;
    ring1?: ItemType<RingKeys>;
    ring2?: ItemType<RingKeys>;
    topGarment?: ItemType<TopGarbKeys>;
    bottomGarment?: ItemType<BottomGarbKeys>;
    inventory: ItemType<ItemKeys>[];
    keyItems: ItemType<KeyItemKeys>[];
    set?: ItemType<SetKeys>;
    originalRace: string;
    _race: { key: RaceTypes } | undefined;
    femininity: number;
    tallness: number;
    tone: number;
    thickness: number;
    hipRatingRaw: number;
    hipRatingMod: number;
    buttRatingRaw: number;
    buttRatingMod: number;
    bellyRatingRaw: number;
    bellyRatingMod: number;
    lipMod: number;
    hairColor: string;
    skinColor: string;
    furColor: string;
    scaleColor: string;
    lipColor: string;
    hairLength: number;
    hairStyle: string;
    hairType: HairTypes;
    hairTags: BodyTags[];
    horns: number;
    hornType: BodyTypes;
    hornLength: number;
    wingType: BodyTypes;
    wingCount: number;
    skinType: SkinTypes;
    skinTags: BodyTags[];
    tailType: BodyTypes;
    numTails: number;
    tailTags: BodyTags[];
    armType: BodyTypes;
    armTags: BodyTags[];
    legCount: number;
    legType: BodyTypes;
    legTags: BodyTags[];
    tongueType: BodyTypes;
    tongueTags: BodyTags[];
    faceType: BodyTypes;
    faceTags: BodyTags[];
    earType: BodyTypes;
    earTags: BodyTags[];
    earLength: number;
    eyeType: BodyTypes;
    eyeTags: BodyTags[];
    eyeColor: string;
    orgasms: number;
    lastOrgasm: number;
    lastMilked: number;
    exhibRaw: number;
    isVirgin: boolean;
    vaginalVirgin: boolean;
    cockVirgin: boolean;
    analVirgin: boolean;
    pregnancySpeedRaw: number;
    pregnancySpeedMod: number;
    breastRows: BreastRowType[];
    nippleColor: string;
    nipplesPerBreast: number;
    nippleSizeRatio: number;
    nippleWidthRatio: number;
    nippleType: NippleTypes;
    breastTags: BodyTags[];
    milkType: FluidTypes;
    milkMultiplierRaw: number;
    milkStorageMultiplierRaw: number;
    milkFullnessRaw: number;
    milkRateRaw: number;
    _balls: number;
    ballTags: BodyTags[];
    ballEfficiency: number;
    ballSizeRaw: number;
    ballSizeMod: number;
    ballFullness: number;
    cocks: CockType[];
    feracityRaw: number;
    feracityMod: number;
    fertilityMod: number;
    virilityMod: number;
    vagina?: VaginaType;
    clitLength: number;
    girlCumType: FluidTypes;
    cumType: FluidTypes;
    cumMultiplierRaw: number;
    cumMultiplierMod: number;
    ass: VaginaType;
    reagents: {
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number,
        "6": number,
        "7": number,
        "8": number,
        "9": number,
        "10": number,
        "11": number,
        "12": number,
        "13": number
    };
    defaultCockIdx: number;
    lastRingSlotEquipped: number;
    lastRechargeEquipped: number;
    title: string;
    wyldMark: number;
    drinks: [];
    customImage?: object;
    pendingLoot: [];
    sensed: [];
    storage: [];
}

export interface VaginaType {
    type: BodyTypes;
    hymen: boolean;
    clits: number;
    wetnessRaw: number;
    wetnessMod: number;
    loosenessRaw: number;
    loosenessMod: number;
    bonusCapacity: number;
    stretchCounter: number;
    tags: BodyTags[];
    _color: string;
}

export interface CockType {
    type: BodyTypes;
    virgin: boolean;
    tags: BodyTags[];
    lengthRaw: number;
    lengthMod: number;
    thicknessRatioRaw: number;
    thicknessRatioMod: number;
    flaccidRatio: number;
    _knotRatio: number;
    pierced: number;
    _color: string;
}

export interface BreastRowType {
    breasts: number;
    sizeRaw: number;
    sizeMod: number;
}

export interface ItemType<Key extends string> {
    key: Key;
    args: [number?, number?, number?, number?, number?, number?];
}

export interface PerkType<Key extends string> {
    key: Key;
    values: [number?, number?, number?, number?, number?, number?];
}

export interface EffectType<Key extends string> {
    key: Key;
    duration: number | null;
    values: [number?, number?, number?, number?, number?, number?];
}

export interface PowerType {
    key: PowerKeys;
}