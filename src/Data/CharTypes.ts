export interface CharType {
    name: string;
    cName: string;
    soloCombatPrefix: string;
    taxa: number;
    class: number;
    background: number;
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
    perks: EffectType[];
    powers: (PowerType | undefined)[];
    equippedPowers: [PowerType?, PowerType?, PowerType?, PowerType?, PowerType?];
    combatEffects: EffectType[];
    statusEffects: EffectType[];
    likes: number[];
    dislikes: number[];
    boon?: EffectType;
    credits: number;
    weaponPrimary?: ItemType;
    weaponSecondary?: ItemType;
    head?: ItemType;
    neck?: ItemType;
    shoulders?: ItemType;
    armorSet?: ItemType;
    hands?: ItemType;
    waist?: ItemType;
    feet?: ItemType;
    ring1?: ItemType;
    ring2?: ItemType;
    topGarment?: ItemType;
    bottomGarment?: ItemType;
    inventory: ItemType[];
    keyItems: ItemType[];
    set?: ItemType;
    originalRace: string;
    _race: { key: string } | undefined;
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
    hairType: number;
    hairTags: number[];
    horns: number;
    hornType: number;
    hornLength: number;
    wingType: number;
    wingCount: number;
    skinType: number;
    skinTags: number[];
    tailType: number;
    numTails: number;
    tailTags: number[];
    armType: number;
    armTags: number[];
    legCount: number;
    legType: number;
    legTags: number[];
    tongueType: number;
    tongueTags: number[];
    faceType: number;
    faceTags: number[];
    earType: number;
    earTags: number[];
    earLength: number;
    eyeType: number;
    eyeTags: number[];
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
    nippleType: number;
    breastTags: number[];
    milkType: number;
    milkMultiplierRaw: number;
    milkStorageMultiplierRaw: number;
    milkFullnessRaw: number;
    milkRateRaw: number;
    _balls: number;
    ballTags: number[];
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
    girlCumType: number;
    cumType: number;
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
    type: number;
    hymen: boolean;
    clits: number;
    wetnessRaw: number;
    wetnessMod: number;
    loosenessRaw: number;
    loosenessMod: number;
    bonusCapacity: number;
    stretchCounter: number;
    tags: number[];
    _color: string;
}

export interface CockType {
    type: number;
    virgin: boolean;
    tags: number[];
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

export interface ItemType {
    key: string;
    args: [number?, number?, number?, number?, number?, number?];
}

export interface EffectType {
    key: string;
    values: [number?, number?, number?, number?, number?, number?];
}

export interface PowerType {
    key: string;
}
