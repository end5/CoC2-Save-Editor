import { CharType, VaginaType, EffectType, BreastRowType, CockType, PowerType, PerkType } from "./CharTypes";
import { globalKeys } from "../GameData/GlobalKeys";

export const MAX_INVENTORY_SLOTS = 20;
export const MAX_ITEM_ATTRS = 6;
export const MAX_EFFECT_VALUES = 6;
export const MAX_POWER_EQUIP_SLOTS = 5;

export function createChar(): CharType {
    return {
        name: '',
        cName: '',
        soloCombatPrefix: '',
        taxa: 1,
        class: 0,
        background: 0,
        genderPref: 0,
        isPlural: false,
        partyLeader: false,
        level: 0,
        exp: 0,
        canGainExp: false,
        compTags: [],
        actionPoints: 0,
        ultimateUsed: 0,
        hitPoints: 0,
        hitPointsMaxMod: 0,
        resolvePoints: 0,
        resolveMaxMod: 0,
        threatMod: 0,
        strengthAlloc: 0,
        strengthMod: 0,
        toughnessAlloc: 0,
        toughnessMod: 0,
        agilityAlloc: 0,
        agilityMod: 0,
        cunningAlloc: 0,
        cunningMod: 0,
        willpowerAlloc: 0,
        willpowerMod: 0,
        presenceAlloc: 0,
        presenceMod: 0,
        libidoMod: 0,
        corruptionMod: 0,
        isLustImmune: false,
        isDisarmImmune: false,
        penetratingResist: 0,
        crushingResist: 0,
        holyResist: 0,
        blightResist: 0,
        acidResist: 0,
        fireResist: 0,
        frostResist: 0,
        stormResist: 0,
        teaseResist: 0,
        drugResist: 0,
        pheromoneResist: 0,
        fatigueResist: 0,
        mindResist: 0,
        perks: [],
        powers: [],
        equippedPowers: [],
        combatEffects: [],
        statusEffects: [],
        likes: [],
        dislikes: [],
        boon: undefined,
        credits: 0,
        weaponPrimary: undefined,
        weaponSecondary: undefined,
        head: undefined,
        neck: undefined,
        shoulders: undefined,
        armorSet: undefined,
        hands: undefined,
        waist: undefined,
        feet: undefined,
        ring1: undefined,
        ring2: undefined,
        topGarment: undefined,
        bottomGarment: undefined,
        inventory: [],
        keyItems: [],
        set: undefined,
        originalRace: '',
        _race: undefined,
        femininity: 0,
        tallness: 0,
        tone: 0,
        thickness: 0,
        hipRatingRaw: 0,
        hipRatingMod: 0,
        buttRatingRaw: 0,
        buttRatingMod: 0,
        bellyRatingRaw: 0,
        bellyRatingMod: 0,
        lipMod: 0,
        hairColor: '',
        skinColor: '',
        furColor: '',
        scaleColor: '',
        lipColor: '',
        hairLength: 0,
        hairStyle: '',
        hairType: 0,
        hairTags: [],
        horns: 0,
        hornType: 0,
        hornLength: 0,
        wingType: 0,
        wingCount: 0,
        skinType: 0,
        skinTags: [],
        tailType: 0,
        numTails: 0,
        tailTags: [],
        armType: 0,
        armTags: [],
        legCount: 0,
        legType: 0,
        legTags: [],
        tongueType: 0,
        tongueTags: [],
        faceType: 0,
        faceTags: [],
        earType: 0,
        earTags: [],
        earLength: 0,
        eyeType: 0,
        eyeTags: [],
        eyeColor: '',
        orgasms: 0,
        lastOrgasm: 0,
        lastMilked: 0,
        exhibRaw: 0,
        isVirgin: false,
        vaginalVirgin: false,
        cockVirgin: false,
        analVirgin: false,
        pregnancySpeedRaw: 0,
        pregnancySpeedMod: 0,
        breastRows: [],
        nippleColor: '',
        nipplesPerBreast: 0,
        nippleSizeRatio: 0,
        nippleWidthRatio: 0,
        nippleType: 0,
        breastTags: [],
        milkType: 0,
        milkMultiplierRaw: 0,
        milkStorageMultiplierRaw: 0,
        milkFullnessRaw: 0,
        milkRateRaw: 0,
        _balls: 0,
        ballTags: [],
        ballEfficiency: 0,
        ballSizeRaw: 0,
        ballSizeMod: 0,
        ballFullness: 0,
        cocks: [],
        feracityRaw: 0,
        feracityMod: 0,
        fertilityMod: 0,
        virilityMod: 0,
        vagina: undefined,
        clitLength: 0,
        girlCumType: 0,
        cumType: 0,
        cumMultiplierRaw: 0,
        cumMultiplierMod: 0,
        ass: createVagina(),
        cosmetics: ['', '', '', '', '', '', '', '', '', '', ''],
        reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, },
        defaultCockIdx: 0,
        lastRingSlotEquipped: 0,
        lastRechargeEquipped: 0,
        title: '',
        wyldMark: 0,
        drinks: [],
        customImage: undefined,
        pendingLoot: [],
        sensed: [],
        storage: [],
    };
}

export function createCock(): CockType {
    return {
        type: globalKeys.BodyType[2].value, // Human
        virgin: true,
        tags: [],
        lengthRaw: 10,
        lengthMod: 0,
        thicknessRatioRaw: 1,
        thicknessRatioMod: 1,
        flaccidRatio: 0,
        _knotRatio: 0,
        pierced: 0,
        _color: 'pink',
    };
}

export function createVagina(): VaginaType {
    return {
        type: globalKeys.BodyType[2].value, // Human
        hymen: true,
        tags: [],
        clits: 0,
        _color: 'pink',
        wetnessRaw: 10,
        wetnessMod: 0,
        loosenessRaw: 1,
        loosenessMod: 1,
        bonusCapacity: 0,
        stretchCounter: 0,
    };
}

export function createBreastRow(): BreastRowType {
    return {
        breasts: 2,
        sizeRaw: 2,
        sizeMod: 0,
    };
}

export function createPerk<K extends string>(key: K): PerkType<K> {
    return {
        key,
        values: [0, 0, 0, 0, 0, 0] as PerkType<K>['values'],
    };
}

export function createEffect<K extends string>(key: K): EffectType<K> {
    return {
        key,
        duration: null,
        values: [0, 0, 0, 0, 0, 0] as EffectType<K>['values'],
    };
}

export function createPower(key: typeof globalKeys.Powers[number]['value']): PowerType {
    return { key };
}
