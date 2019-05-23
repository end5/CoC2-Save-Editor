(function () {
    'use strict';

    var charDefaults = {
        pc: { name: "Unnamed", cName: "", soloCombatPrefix: "", taxa: 1, class: 0, background: 0, isPlural: false, partyLeader: true, level: 1, exp: 0, canGainExp: false, compTags: [], actionPoints: 1, hitPoints: 100, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 0, strengthMod: 0, toughnessAlloc: 0, toughnessMod: 0, agilityAlloc: 0, agilityMod: 0, cunningAlloc: 0, cunningMod: 0, willpowerAlloc: 0, willpowerMod: 0, presenceAlloc: 0, presenceMod: 0, libidoMod: 0, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [], powers: [], equippedPowers: [null, null, null, null, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [], dislikes: [], boon: null, credits: 0, weaponPrimary: { key: "RustyKnife", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: null, armorSet: { key: "ComfortableClothes", args: [1] }, hands: null, waist: null, feet: { key: "LeatherBoots", args: [1] }, ring1: null, ring2: null, topGarment: null, bottomGarment: { key: "PlainUnderwear", args: [1] }, inventory: [], keyItems: [], set: null, originalRace: "human", femininity: 50, tallness: 66, tone: 50, thickness: 50, hipRatingRaw: 0, hipRatingMod: 0, buttRatingRaw: 0, buttRatingMod: 0, bellyRatingRaw: 0, bellyRatingMod: 0, lipMod: 0, hairColor: "brown", skinColor: "pale", furColor: "brown", scaleColor: "", lipColor: "peach", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [], tailType: -1, numTails: 0, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 1, faceTags: [], earType: 1, earTags: [], earLength: 0, eyeType: 1, eyeTags: [], eyeColor: "brown", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: true, vaginalVirgin: true, cockVirgin: true, analVirgin: true, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 0, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 0, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: null, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2, title: "Adventurer", wyldMark: -1, drinks: [], customImage: null, pendingLoot: [], sensed: [], storage: [] },
        cait: { name: "Cait", cName: "", soloCombatPrefix: "", taxa: 1, class: 3, background: 10, genderPref: 1, isPlural: false, partyLeader: false, level: 1, exp: 0, canGainExp: true, compTags: [4, 1], actionPoints: 1, hitPoints: 105, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 0, strengthMod: 0, toughnessAlloc: 0, toughnessMod: 1, agilityAlloc: 0, agilityMod: 1, cunningAlloc: 0, cunningMod: 0, willpowerAlloc: 0, willpowerMod: 2, presenceAlloc: 0, presenceMod: 0, libidoMod: 15, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [{ key: "StartingAttributeBonuses", values: [0, 0, 1, 0, 1, 1] }, { key: "HealersHands", values: [] }], powers: [{ key: "NormalAttack" }, { key: "SpiritVeil" }, { key: "Heal" }, { key: "WhiteFire" }], equippedPowers: [{ key: "Heal" }, { key: "WhiteFire" }, null, { key: "SpiritVeil" }, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [-14, -16, -17, -9], dislikes: [-4, -8], boon: null, credits: 0, weaponPrimary: { key: "CaitsStaff", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: { key: "PriestessCloak", args: [1] }, armorSet: { key: "PassionPriestessGarb", args: [1] }, hands: { key: "SilverBracelets", args: [1] }, waist: { key: "PotionBelt", args: [1] }, feet: { key: "CaitsKneeBoots", args: [1] }, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: { key: "PassionSet", args: [1] }, originalRace: "catfolk", _race: { key: "Catfolk" }, femininity: 85, tallness: 66, tone: 40, thickness: 30, hipRatingRaw: 12, hipRatingMod: 0, buttRatingRaw: 12, buttRatingMod: 0, bellyRatingRaw: 7, bellyRatingMod: 0, lipMod: 0, hairColor: "pink", skinColor: "fair", furColor: "brown", scaleColor: "", lipColor: "peach", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [], tailType: 4, numTails: 1, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 1, faceTags: [], earType: 1, earTags: [], earLength: 0, eyeType: 1, eyeTags: [], eyeColor: "blue", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: false, vaginalVirgin: false, cockVirgin: true, analVirgin: true, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 6, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 0, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: { type: 1, hymen: false, clits: 1, wetnessRaw: 1, wetnessMod: 0, loosenessRaw: 1.5, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 1 },
        berwyn: { name: "Berwyn", cName: "", soloCombatPrefix: "", taxa: 1, class: 4, background: 6, genderPref: 0, isPlural: false, partyLeader: false, level: 3, exp: 0, canGainExp: true, compTags: [4], actionPoints: 1, hitPoints: 170, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 0, strengthMod: 0, toughnessAlloc: 0, toughnessMod: 2, agilityAlloc: 0, agilityMod: 1, cunningAlloc: 2, cunningMod: 0, willpowerAlloc: 2, willpowerMod: 1, presenceAlloc: 2, presenceMod: 0, libidoMod: 0, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [{ key: "StartingAttributeBonuses", values: [0, 0, 0, 1, 1, 1] }, { key: "ArcaneAttunement", values: [] }, { key: "JourneymanSummoner", values: [] }], powers: [{ key: "NormalAttack" }, { key: "FireBolt" }, { key: "CharmSpell" }, { key: "GroupHeal" }, { key: "SummonStoneElemental" }], equippedPowers: [{ key: "FireBolt" }, { key: "CharmSpell" }, { key: "GroupHeal" }, { key: "SummonStoneElemental" }, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [-14, -10, -17, -9], dislikes: [-4, -8], boon: null, credits: 0, weaponPrimary: { key: "BirchStaff", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: null, armorSet: { key: "SummonersRobes", args: [1] }, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: { key: "SummonerSet", args: [1] }, originalRace: "half-lupine", femininity: 70, tallness: 66, tone: 30, thickness: 5, hipRatingRaw: 10, hipRatingMod: 0, buttRatingRaw: 10, buttRatingMod: 0, bellyRatingRaw: 2, bellyRatingMod: 0, lipMod: 0, hairColor: "white", skinColor: "brown", furColor: "brown", scaleColor: "", lipColor: "peach", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [], tailType: -1, numTails: 0, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 1, faceTags: [], earType: 1, earTags: [], earLength: 0, eyeType: 1, eyeTags: [], eyeColor: "blue", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: false, vaginalVirgin: true, cockVirgin: false, analVirgin: false, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 0, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 2, ballTags: [], ballEfficiency: 1, ballSizeRaw: 10, ballSizeMod: 0, ballFullness: 100, cocks: [{ type: 0, virgin: true, tags: [], lengthRaw: 20, lengthMod: 0, thicknessRatioRaw: 1, thicknessRatioMod: 0, flaccidRatio: 0.4, _knotRatio: 1.5, pierced: 0, _color: "" }], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: null, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 2, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2 },
        arona: { name: "Arona", cName: "", soloCombatPrefix: "", taxa: 1, class: 1, background: 5, genderPref: 1, isPlural: false, partyLeader: true, level: 3, exp: 100, canGainExp: true, compTags: [2], actionPoints: 1, hitPoints: 200, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 2, strengthMod: 0, toughnessAlloc: 2, toughnessMod: 1, agilityAlloc: 0, agilityMod: 0, cunningAlloc: 1, cunningMod: 2, willpowerAlloc: 1, willpowerMod: 1, presenceAlloc: 0, presenceMod: 0, libidoMod: 10, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [{ key: "WarPaint", values: [] }, { key: "StartingAttributeBonuses", values: [0, 3, 0, 0, 0, 0] }], powers: [{ key: "NormalAttack" }, { key: "GuardedStance" }, { key: "AmazonStrike" }, { key: "Cleave" }, { key: "PrimeTarget" }], equippedPowers: [{ key: "GuardedStance" }, { key: "AmazonStrike" }, { key: "Cleave" }, { key: "PrimeTarget" }, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [-9, -4], dislikes: [-8, -3], boon: null, credits: 60, weaponPrimary: { key: "Mastbreaker", args: [1] }, weaponSecondary: { key: "HoplonShield", args: [1] }, head: null, neck: null, shoulders: null, armorSet: { key: "AronasWarhides", args: [1] }, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: null, originalRace: "orc", _race: { key: "Orc" }, femininity: 70, tallness: 94, tone: 80, thickness: 30, hipRatingRaw: 12, hipRatingMod: 0, buttRatingRaw: 8, buttRatingMod: 0, bellyRatingRaw: 8, bellyRatingMod: 0, lipMod: 0, hairColor: "black", skinColor: "green", furColor: "brown", scaleColor: "", lipColor: "black", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [], tailType: -1, numTails: 0, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 2, faceTags: [27], earType: 5, earTags: [3], earLength: 1, eyeType: 1, eyeTags: [], eyeColor: "brown", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: false, vaginalVirgin: true, cockVirgin: false, analVirgin: false, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 5, sizeMod: 0 }], nippleColor: "black", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 0, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [{ type: 1, virgin: true, tags: [], lengthRaw: 12, lengthMod: 0, thicknessRatioRaw: 1, thicknessRatioMod: 0, flaccidRatio: 0.4, _knotRatio: 1.5, pierced: 0, _color: "" }], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: { type: 1, hymen: true, clits: 1, wetnessRaw: 1, wetnessMod: 0, loosenessRaw: 1.5, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "black" }, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2 },
        brint: { name: "Brint", cName: "", soloCombatPrefix: "", taxa: 2, class: 1, background: 3, genderPref: 0, isPlural: false, partyLeader: false, level: 1, exp: 0, canGainExp: true, compTags: [2], actionPoints: 1, hitPoints: 110, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 0, strengthMod: 2, toughnessAlloc: 0, toughnessMod: 1, agilityAlloc: 0, agilityMod: 1, cunningAlloc: 0, cunningMod: 0, willpowerAlloc: 0, willpowerMod: 0, presenceAlloc: 0, presenceMod: 0, libidoMod: 15, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: -75, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: -75, fatigueResist: 0, mindResist: 0, perks: [{ key: "StartingAttributeBonuses", values: [2, 1, 0, 0, 0, 0] }, { key: "RendingStrike", values: [] }], powers: [{ key: "NormalAttack" }, { key: "GiantsReach" }, { key: "Cleave" }, { key: "Frenzy" }], equippedPowers: [{ key: "GiantsReach" }, { key: "Cleave" }, null, { key: "Frenzy" }, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [-14, -10, -17, -9], dislikes: [-1, -7], boon: null, credits: 0, weaponPrimary: { key: "Poleaxe", args: [1] }, weaponSecondary: { key: "Mace", args: [1] }, head: null, neck: null, shoulders: null, armorSet: { key: "LoinclothAndGuards", args: [1] }, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: { key: "LoinSet", args: [1] }, originalRace: "minotaur", _race: { key: "Minotaur" }, femininity: 5, tallness: 102, tone: 80, thickness: 5, hipRatingRaw: 2, hipRatingMod: 0, buttRatingRaw: 3, buttRatingMod: 0, bellyRatingRaw: 1, bellyRatingMod: 0, lipMod: 0, hairColor: "dark brown", skinColor: "brown", furColor: "brown", scaleColor: "", lipColor: "black", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 2, hornType: 22, hornLength: 18, wingType: -1, wingCount: 0, skinType: 4, skinTags: [], tailType: 22, numTails: 1, tailTags: [26], armType: 1, armTags: [], legCount: 2, legType: 22, legTags: [26, 34, 37], tongueType: 22, tongueTags: [], faceType: 22, faceTags: [24], earType: 22, earTags: [], earLength: 3, eyeType: 1, eyeTags: [], eyeColor: "brown", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: false, vaginalVirgin: true, cockVirgin: false, analVirgin: false, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 0, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 2, ballTags: [], ballEfficiency: 1, ballSizeRaw: 30, ballSizeMod: 0, ballFullness: 100, cocks: [{ type: 6, virgin: true, tags: [4, 38], lengthRaw: 24, lengthMod: 0, thicknessRatioRaw: 1, thicknessRatioMod: 0, flaccidRatio: 0.4, _knotRatio: 1.5, pierced: 0, _color: "brown" }], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: null, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 4.5, cumMultiplierMod: 0, ass: { type: 6, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 1 },
        kiyoko: { name: "Kiyoko", cName: "", soloCombatPrefix: "", taxa: 1, class: 4, background: 4, genderPref: 1, isPlural: false, partyLeader: false, level: 1, exp: 0, canGainExp: true, compTags: [4], actionPoints: 1, hitPoints: 105, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 0, strengthMod: 0, toughnessAlloc: 0, toughnessMod: 1, agilityAlloc: 0, agilityMod: 1, cunningAlloc: 0, cunningMod: 1, willpowerAlloc: 0, willpowerMod: 1, presenceAlloc: 0, presenceMod: 0, libidoMod: 15, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [{ key: "StartingAttributeBonuses", values: [0, 0, 0, 1, 2, 0] }], powers: [{ key: "NormalAttack" }], equippedPowers: [null, null, null, null, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [-14, -16, -17, -9], dislikes: [-4, -8], boon: null, credits: 0, weaponPrimary: { key: "RustyKnife", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: null, armorSet: null, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: null, originalRace: "kitsune", femininity: 90, tallness: 66, tone: 25, thickness: 15, hipRatingRaw: 3, hipRatingMod: 0, buttRatingRaw: 3, buttRatingMod: 0, bellyRatingRaw: 1, bellyRatingMod: 0, lipMod: 0, hairColor: "orange", skinColor: "pale", furColor: "brown", scaleColor: "", lipColor: "peach", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [], tailType: -1, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 1, faceTags: [], earType: 1, earTags: [], earLength: 0, eyeType: 1, eyeTags: [], eyeColor: "green", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: false, vaginalVirgin: false, cockVirgin: true, analVirgin: true, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 1, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 0, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: { type: 1, hymen: false, clits: 1, wetnessRaw: 1, wetnessMod: 0, loosenessRaw: 1.5, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2 },
        etheryn: { name: "Etheryn", cName: "", soloCombatPrefix: "", taxa: 1, class: 2, background: 2, genderPref: 1, isPlural: false, partyLeader: false, level: 3, exp: 0, canGainExp: true, compTags: [3], actionPoints: 1, hitPoints: 170, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 0, strengthMod: 1, toughnessAlloc: 0, toughnessMod: 2, agilityAlloc: 2, agilityMod: 0, cunningAlloc: 2, cunningMod: 0, willpowerAlloc: 2, willpowerMod: 0, presenceAlloc: 0, presenceMod: 0, libidoMod: 8, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [{ key: "StartingAttributeBonuses", values: [0, 0, 1, 0, 1, 1] }, { key: "Chastity", values: [] }, { key: "TwistTheKnife", values: [] }, { key: "RangersQuarry", values: [] }], powers: [{ key: "NormalAttack" }, { key: "FrostArrow" }, { key: "EntropicWinds" }, { key: "GroupHeal" }, { key: "CallFalcon" }], equippedPowers: [{ key: "FrostArrow" }, { key: "EntropicWinds" }, { key: "GroupHeal" }, { key: "CallFalcon" }, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [-3, -16, -15, -6], dislikes: [-14, -4], boon: null, credits: 0, weaponPrimary: { key: "HuntingBow", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: null, armorSet: { key: "OutridersLeathers", args: [1] }, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: { key: "OutriderSet", args: [1] }, originalRace: "pale elf", _race: { key: "Elf" }, femininity: 65, tallness: 67, tone: 10, thickness: 5, hipRatingRaw: 2, hipRatingMod: 0, buttRatingRaw: 3, buttRatingMod: 0, bellyRatingRaw: 1, bellyRatingMod: 0, lipMod: 0, hairColor: "blonde", skinColor: "white", furColor: "brown", scaleColor: "", lipColor: "pink", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [11], tailType: -1, numTails: 0, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 1, faceTags: [28], earType: 5, earTags: [3], earLength: 4, eyeType: 1, eyeTags: [], eyeColor: "blue", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: true, vaginalVirgin: true, cockVirgin: true, analVirgin: true, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 1, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 3, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 2, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [{ type: 1, virgin: true, tags: [], lengthRaw: 4, lengthMod: 0, thicknessRatioRaw: 1, thicknessRatioMod: 0, flaccidRatio: 0.4, _knotRatio: 1.5, pierced: 0, _color: "pale" }], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: null, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2 },
        gwyn: { name: "", cName: "", soloCombatPrefix: "", taxa: 1, class: 0, background: 0, isPlural: false, partyLeader: false, level: 1, exp: 0, canGainExp: false, compTags: [], actionPoints: 1, hitPoints: 100, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 0, strengthMod: 0, toughnessAlloc: 0, toughnessMod: 0, agilityAlloc: 0, agilityMod: 0, cunningAlloc: 0, cunningMod: 0, willpowerAlloc: 0, willpowerMod: 0, presenceAlloc: 0, presenceMod: 0, libidoMod: 0, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [], powers: [{ key: "NormalAttack" }], equippedPowers: [null, null, null, null, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [], dislikes: [], boon: null, credits: 0, weaponPrimary: { key: "RustyKnife", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: null, armorSet: null, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: null, originalRace: "human", _race: { key: "Human" }, femininity: 50, tallness: 66, tone: 50, thickness: 50, hipRatingRaw: 0, hipRatingMod: 0, buttRatingRaw: 0, buttRatingMod: 0, bellyRatingRaw: 0, bellyRatingMod: 0, lipMod: 0, hairColor: "brown", skinColor: "pale", furColor: "brown", scaleColor: "", lipColor: "peach", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [], tailType: -1, numTails: 0, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 1, faceTags: [], earType: 1, earTags: [], earLength: 0, eyeType: 1, eyeTags: [], eyeColor: "brown", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: true, vaginalVirgin: true, cockVirgin: true, analVirgin: true, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 0, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 0, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [], feracityRaw: 1, feracityMod: 0, fertilityMod: 2, virilityMod: 0, vagina: null, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2 },
        kinu: { name: "Kinu", cName: "", soloCombatPrefix: "", taxa: 1, class: 0, background: 0, isPlural: false, partyLeader: false, level: 1, exp: 0, canGainExp: false, compTags: [], actionPoints: 1, hitPoints: 100, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 0, strengthMod: 0, toughnessAlloc: 0, toughnessMod: 0, agilityAlloc: 0, agilityMod: 0, cunningAlloc: 0, cunningMod: 0, willpowerAlloc: 0, willpowerMod: 0, presenceAlloc: 0, presenceMod: 0, libidoMod: 0, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [], powers: [{ key: "NormalAttack" }], equippedPowers: [null, null, null, null, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [], dislikes: [], boon: null, credits: 0, weaponPrimary: { key: "RustyKnife", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: null, armorSet: null, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: null, originalRace: "human", _race: { key: "Human" }, femininity: 50, tallness: 66, tone: 50, thickness: 50, hipRatingRaw: 0, hipRatingMod: 0, buttRatingRaw: 0, buttRatingMod: 0, bellyRatingRaw: 0, bellyRatingMod: 0, lipMod: 0, hairColor: "brown", skinColor: "pale", furColor: "brown", scaleColor: "", lipColor: "peach", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [], tailType: -1, numTails: 0, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 1, faceTags: [], earType: 1, earTags: [], earLength: 0, eyeType: 1, eyeTags: [], eyeColor: "brown", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: true, vaginalVirgin: true, cockVirgin: true, analVirgin: true, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 0, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 0, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: null, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2 },
        eryka: { name: "Eryka", cName: "", soloCombatPrefix: "", taxa: 1, class: 1, background: 3, genderPref: 1, isPlural: false, partyLeader: false, level: 3, exp: 130, canGainExp: false, compTags: [], actionPoints: 2, hitPoints: 180, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 2, strengthMod: 0, toughnessAlloc: 1, toughnessMod: 1, agilityAlloc: 1, agilityMod: 0, cunningAlloc: 2, cunningMod: 0, willpowerAlloc: 0, willpowerMod: 0, presenceAlloc: 0, presenceMod: 0, libidoMod: 25, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [{ key: "StartingAttributeBonuses", values: [1, 1, 0, 0, 0, 1] }], powers: [{ key: "NormalAttack" }, { key: "Tackle" }, { key: "PocketSand" }, { key: "Cleave" }], equippedPowers: [null, null, null, null, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [-9, -4, -17, -16, -14], dislikes: [-8, -3, -15], boon: null, credits: 65, weaponPrimary: { key: "SanctifiedGladius", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: null, armorSet: { key: "MailCuirass", args: [1] }, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: null, originalRace: "human", _race: { key: "Human" }, femininity: 80, tallness: 72, tone: 90, thickness: 20, hipRatingRaw: 12, hipRatingMod: 0, buttRatingRaw: 4, buttRatingMod: 0, bellyRatingRaw: 2, bellyRatingMod: 0, lipMod: 0, hairColor: "red", skinColor: "pale", furColor: "brown", scaleColor: "", lipColor: "peach", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 6, skinTags: [], tailType: -1, numTails: 0, tailTags: [], armType: 1, armTags: [], legCount: 2, legType: 1, legTags: [], tongueType: 1, tongueTags: [], faceType: 1, faceTags: [], earType: 1, earTags: [], earLength: 0, eyeType: 1, eyeTags: [], eyeColor: "brown", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: true, vaginalVirgin: true, cockVirgin: true, analVirgin: true, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 4, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 0, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [{ type: 1, virgin: true, tags: [], lengthRaw: 10, lengthMod: 0, thicknessRatioRaw: 1, thicknessRatioMod: 0, flaccidRatio: 0.4, _knotRatio: 1.5, pierced: 0, _color: "" }], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: null, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2 },
        garret: { name: "Garret", cName: "", soloCombatPrefix: "", taxa: 1, class: 1, background: 5, genderPref: 0, isPlural: false, partyLeader: false, level: 3, exp: 0, canGainExp: false, compTags: [], actionPoints: 1, hitPoints: 195, hitPointsMaxMod: 0, resolvePoints: 100, resolveMaxMod: 0, threatMod: 10, strengthAlloc: 2, strengthMod: 0, toughnessAlloc: 2, toughnessMod: 1, agilityAlloc: 0, agilityMod: 0, cunningAlloc: 1, cunningMod: 2, willpowerAlloc: 1, willpowerMod: 1, presenceAlloc: 0, presenceMod: 0, libidoMod: 10, corruptionMod: 0, isLustImmune: false, penetratingResist: 0, crushingResist: 0, holyResist: 0, blightResist: 0, acidResist: 0, fireResist: 0, frostResist: 0, stormResist: 0, teaseResist: 0, drugResist: 0, pheromoneResist: 0, fatigueResist: 0, mindResist: 0, perks: [{ key: "StartingAttributeBonuses", values: [1, 2, 0, 0, 0, 0] }], powers: [{ key: "NormalAttack" }, { key: "GuardedStance" }, { key: "AmazonStrike" }, { key: "Cleave" }, { key: "PrimeTarget" }], equippedPowers: [null, null, null, null, null], stance: null, multiTurnAttack: null, combatEffects: [], statusEffects: [], likes: [-9, -4], dislikes: [-8, -3], boon: null, credits: 60, weaponPrimary: { key: "ShortSword", args: [1] }, weaponSecondary: null, head: null, neck: null, shoulders: null, armorSet: null, hands: null, waist: null, feet: null, ring1: null, ring2: null, topGarment: null, bottomGarment: null, inventory: [], keyItems: [], set: null, originalRace: "lupine", _race: { key: "Lupine" }, femininity: 0, tallness: 94, tone: 80, thickness: 30, hipRatingRaw: 8, hipRatingMod: 0, buttRatingRaw: 8, buttRatingMod: 0, bellyRatingRaw: 8, bellyRatingMod: 0, lipMod: 0, hairColor: "black", skinColor: "black", furColor: "black", scaleColor: "", lipColor: "black", hairLength: 2, hairStyle: "", hairType: 1, hairTags: [], horns: 0, hornType: -1, hornLength: 0, wingType: -1, wingCount: 0, skinType: 4, skinTags: [], tailType: 23, numTails: 1, tailTags: [15, 17], armType: 1, armTags: [], legCount: 2, legType: 23, legTags: [26], tongueType: 23, tongueTags: [], faceType: 23, faceTags: [24], earType: 23, earTags: [], earLength: 0, eyeType: 23, eyeTags: [], eyeColor: "brown", orgasms: 0, lastOrgasm: 0, lastMilked: 0, exhibRaw: 0, isVirgin: false, vaginalVirgin: true, cockVirgin: false, analVirgin: false, pregnancySpeedRaw: 1, pregnancySpeedMod: 0, breastRows: [{ breasts: 2, sizeRaw: 0, sizeMod: 0 }], nippleColor: "pink", nipplesPerBreast: 1, nippleSizeRatio: 1, nippleType: 7, breastTags: [], milkType: 4, milkMultiplierRaw: 0, milkStorageMultiplierRaw: 1, milkFullnessRaw: 0, milkRateRaw: 10, _balls: 0, ballTags: [], ballEfficiency: 1, ballSizeRaw: 3, ballSizeMod: 0, ballFullness: 100, cocks: [{ type: 3, virgin: true, tags: [1, 3, 38], lengthRaw: 12, lengthMod: 0, thicknessRatioRaw: 1, thicknessRatioMod: 0, flaccidRatio: 0.4, _knotRatio: 1.5, pierced: 0, _color: "red" }], feracityRaw: 1, feracityMod: 0, fertilityMod: 0, virilityMod: 0, vagina: null, clitLength: 0.5, girlCumType: 1, cumType: 2, cumMultiplierRaw: 1, cumMultiplierMod: 0, ass: { type: 1, hymen: false, clits: 0, wetnessRaw: 0, wetnessMod: 0, loosenessRaw: 1, loosenessMod: 0, bonusCapacity: 0, stretchCounter: 0, tags: [], _color: "" }, reagents: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }, defaultCockIdx: 0, lastRingSlotEquipped: 2, lastRechargeEquipped: 2 }
    };

    var globalKeys = {
        Race: ["Human", "Chimera", "Elf", "Catfolk", "Lupine", "Orc", "Minotaur", "Cowgirl", "Taeleer", "Sheepfolk", "Foxmorph", "Harpy", "Manticore", "Gnoll"],
        Taxon: ["Humanoid", "Beast", "Demon", "Plant", "Ethereal", "Undead", "Construct", "Fey"],
        Class: ["None", "Warrior", "Thief", "Wmage", "Bmage", "Charmer"],
        Background: ["None", "Noblescion", "Minstrel", "Soldier", "Arcanist", "Barbarian", "Scholar", "Slumrat", "Acolyte", "Hunter", "Courtesan"],
        Affinity: ["Strength", "Toughness", "Agility", "Cunning", "Willpower", "Presence"],
        TFType: ["Everything", "Body", "Limbs", "Face", "Head", "Tail", "Cock", "Milk", "Balls", "Breasts", "Butt", "Pussy", "Cum", "Feracity"],
        BodyType: ["None", "Unspecified", "Human", "Orc", "Canine", "Feline", "Sylvan", "Elf", "Equine", "Vulpine", "Snake", "Mothrine", "Goat", "Swine", "Shark", "Bee", "Draconic", "Kangaroo", "Anemone", "Avian", "Tentacle", "Demonic", "Frog", "Gooey", "Bovine", "Lupine", "Mouse", "Sheep", "Lapine", "Arachnid", "Succubus", "Dove", "Cuntsnake", "Hyena"],
        BodyTag: ["Internal", "Knotted", "Gooey", "Tapered", "Flared", "Blunt", "Prehensile", "Stinger Based", "Stinger Tipped", "Nubby", "Amorphous", "Smooth", "Ribbed", "Foreskinned", "Double Headed", "Thick", "Sticky", "Fluffy", "Lubricated", "Long", "Hollow", "Squishy", "Angular", "Freckled", "Muzzled", "Beak", "Furred", "Tusked", "Refined", "Scaled", "Feathered", "Chitinous", "Aphrodisiac Laced", "Paws", "Digitigrade", "Plantigrade", "Heels", "Hooves", "Sheathed", "Pumped", "Slightly Pumped", "Spiked", "Magicock", "Arctic", "Maned", "Floppy", "Wooly"],
        FluidType: ["None", "Unspecified", "Girlcum", "Cum", "Honey", "Milk", "Chocolate Milk", "Strawberry Milk"],
        SkinType: ["None", "Unspecified", "Latex", "Plant", "Bark", "Fur", "Feathers", "Skin", "Scales", "Chitin", "Goo"],
        NippleType: ["None", "Unspecified", "Fuckable", "Flat", "Inverted", "Lipples", "Tentacled", "Dick", "Normal"],
        HairType: ["None", "Unspecified", "Hair", "Plant", "Quills", "Feathers", "Goo", "Tentacles", "Transparent"],
        Weapons: ["CaitsStaff", "Fist", "RustyKnife", "Dagger", "ShortSword", "CurvedBlade", "Spear", "Pike", "Poleaxe", "Battleaxe", "Francisca", "Javelin", "Quarterstaff", "BladeStaff", "HuntingBow", "WarBow", "Sling", "Mace", "Mastbreaker", "BeastKiller", "SanctifiedGladius", "SpiraledStaff", "SpiraledBlade", "BirchStaff", "WhitewoodBow"],
        ArmorSet: ["ComfortableClothes", "ScaleArmor", "MailCuirass", "Breastplate", "ApprenticeRobes", "LeatherJerkin", "LeatherCoat", "PassionPriestessGarb", "AronasWarhides", "LoinclothAndGuards", "MailBikini", "SummonersRobes", "WitchsCorset", "OutridersLeathers"],
        ItemHead: ["WitchsHat"],
        ItemNeck: ["WardAmulet", "AmuletOfTransference", "AmuletOfUnion"],
        ItemShoulders: ["FlameCape", "PriestessCloak", "HirrudsCloak"],
        ItemHands: ["Gauntlets", "ArmGuards", "SilverBracelets", "ArmLeatherGloves"],
        ItemWaist: ["PotionBelt", "HipQuiver"],
        ItemFeet: ["IronGreaves", "LeatherBoots", "CaitsKneeBoots", "ThighLeatherBoots"],
        Rings: ["WizardRing"],
        TopGarb: [],
        BottomGarb: ["PlainUnderwear"],
        Offhand: ["HoplonShield", "TowerShield", "WickerShield", "LynxTotem"],
        TFs: ["Wolfsboon", "FoxBerry", "CatsTongueBerry", "RootOfMan", "PinkEgg", "BlueEgg", "PurpleEgg", "TanEgg", "GoldEgg", "BruteBeet", "IceShard", "MinoBloodwine", "BovumSherry", "BaadClover", "CarrotCumpcake", "ManticoreNip", "VirilityBooster", "CackleBerry"],
        Misc: ["CampingSupplies", "SilverSphere", "SmallSilverSphere", "LargeSilverSphere", "PristineWood", "MetalParts", "SturdyStone"],
        Consumable: ["EffigySeed", "WyvernVenom"],
        Set: ["PassionSet", "LoinSet", "SummonerSet", "OutriderSet"],
        KeyItems: ["BlueGemstoneStud", "BerwynsPanties", "AlchemistKit"],
        Boon: ["VelunsBlessing", "FountainsBounty", "HoneyMead", "SpicedWine", "RyeBeer", "AppleCider", "MonasteryWine", "LoversDry"],
        StatusEffect: ["AnallyFilled", "OrallyFilled", "VaginallyFilled", "Armorer", "SharpenBlades", "PrayerOfWarding", "ArcaneAttunement", "FocusingPerformance", "WarPaint", "EyeOfTheStorm", "RangersQuarry", "Enervation", "AphrodisiacCovered", "WellFed", "BlueBalled", "VenomHigh", "Fatigued", "Overburdened", "Heat", "Rut", "StudStatuesGift", "MatronStatuesGift", "CumCovered", "Drained"],
        CombatEffect: ["Prone", "Bleeding", "Sundered", "Obscured", "Staggered", "Burning", "Terrified", "Poisoned", "Frigid", "Stunned", "Aroused", "Disarmed", "Blinded", "Blessed", "SpiritVeil", "MirrorImage", "RhythmicFocus", "Resistance", "WeaponBuff", "FeatherDance", "WarlordsCry", "TaintedBulwark", "FirstStrike", "Focused", "Covered", "Shielded", "Restrained", "Bloodlust"],
        Powers: ["BaseTease", "AssTease", "CrotchTease", "ChestTease", "Allure", "FeatherDance", "ChainmailJiggle", "BreastPlate", "CumSpray", "WyvernVenom", "HoneySlather", "AphrodisiacSting", "GuardedStance", "RangersStance", "RhythmicFocus", "SpiritVeil", "MirrorImage", "ControlPheromones", "BolsteringDance", "Flight", "Frenzy", "AuraOfDesire", "PipersSong", "VineRestraints", "HarpySong", "Pollination", "Heal", "GroupHeal", "CommandPheromones", "WarlordsCry", "SmokeBomb", "PocketSand", "TaintedBulwark", "Blessing", "Grease", "SongOfStorms", "BlindingBeauty", "TentacleShield", "Warcry", "RagingThurible", "ButtStomp", "AerialDrop", "Quake", "Rush", "Grapple", "Tackle", "Trample", "ShieldBash", "WarStomp", "Charge", "CentaurTrample", "PussyTailTease", "HarpyButtTease", "EffigyBoobTease", "EarthFist", "TentacleSlap", "BellyDance", "DickWobble", "ImpDirtyTrick", "TentacleLash", "MerielleChest", "MerielleAss", "MerielleCrotch", "FritteChest", "FritteAss", "FritteCrotch", "ElarilChest", "ElarilCrotch", "ManticoreTail", "JenExecute", "JenThunderStrike", "WargClaw", "BleedingBite", "SpearThrust", "VaushAttack", "HealingThurible", "ApprenticeAttack", "LustfulImages", "BlightOrb", "WhiteFire", "WitheringBolt", "LightningSpike", "WarSong", "EntropicWinds", "ShadowMagic", "CharmSpell", "SunOfJassira", "FireBolt", "PollenSpray", "Foxfire", "Trick", "Fireball", "DarkThoughts", "Leech", "CarnalHex", "ColdSnap", "VileMiasma", "Jolt", "SummonFlameSpirit", "SummonStoneElemental", "SummonEffigy", "SummonKiyoko", "SummonShadowClone", "CallFalcon", "MercReinforcements", "NormalAttack", "Rend", "FadingStrike", "DirtyTrick", "ThunderStrike", "BleedingCut", "AmazonStrike", "Cleave", "ShellCracker", "ShadowStrike", "MarkForDeath", "PrimeTarget", "GiantsReach", "Execute", "LustyTentacles", "Envenom", "TrickShot", "Shatterstrike", "WyvernSting", "CrowdControl", "StickAndMove", "SuppressiveFire", "NervesOfSteel", "TripleThreat", "CracklePowder", "FrostArrow", "BloodLet", "Enrage"],
        Perks: ["TwistTheKnife", "SharpenBlades", "Veteran", "Armorer", "HealersHands", "PrayerOfWarding", "ArcaneStrike", "ArcaneAttunement", "Stylish", "FocusingPerformance", "WarPaint", "RendingStrike", "EyeOfTheStorm", "JourneymanSummoner", "RangersQuarry", "StartingAttributeBonuses", "Leftovers", "WellHung", "Buxom", "Stretchy", "SizeMonarch", "Breeder", "Sterile", "Milky", "Libidinous", "Reserved", "MessyOrgasm", "BubbleButt", "Chastity"],
        Items: []
    };
    var globals = {
        Race: {
            toSave: function (n) { return ({ key: n }); },
            fromSave: function (n) { return n.key; },
            list: globalKeys.Race
        },
        Taxon: {
            toSave: function (n) { return globalKeys.Taxon.indexOf(n) + 1; },
            fromSave: function (n) { return globalKeys.Taxon[n - 1]; },
            list: globalKeys.Taxon
        },
        Class: {
            toSave: function (n) { return globalKeys.Class.indexOf(n); },
            fromSave: function (n) { return globalKeys.Class[n]; },
            list: globalKeys.Class
        },
        Background: {
            toSave: function (n) { return globalKeys.Background.indexOf(n); },
            fromSave: function (n) { return globalKeys.Background[n]; },
            list: globalKeys.Background
        },
        Affinity: {
            toSave: function (n) { return globalKeys.Affinity.indexOf(n); },
            fromSave: function (n) { return globalKeys.Affinity[n]; },
            list: globalKeys.Affinity
        },
        TFType: {
            toSave: function (n) { return globalKeys.TFType.indexOf(n); },
            fromSave: function (n) { return globalKeys.TFType[n]; },
            list: globalKeys.TFType
        },
        // None = -1
        BodyType: {
            toSave: function (n) { return globalKeys.BodyType.indexOf(n) - 1; },
            fromSave: function (n) { return globalKeys.BodyType[n + 1]; },
            list: globalKeys.BodyType
        },
        BodyTag: {
            toSave: function (n) { return globalKeys.BodyTag.indexOf(n); },
            fromSave: function (n) { return globalKeys.BodyTag[n]; },
            list: globalKeys.BodyTag
        },
        // None = -1
        FluidType: {
            toSave: function (n) { return globalKeys.FluidType.indexOf(n) - 1; },
            fromSave: function (n) { return globalKeys.FluidType[n + 1]; },
            list: globalKeys.FluidType
        },
        // None = -1
        SkinType: {
            toSave: function (n) { return globalKeys.SkinType.indexOf(n) - 1; },
            fromSave: function (n) { return globalKeys.SkinType[n + 1]; },
            list: globalKeys.SkinType
        },
        // None = -1
        NippleType: {
            toSave: function (n) { return globalKeys.NippleType.indexOf(n) - 1; },
            fromSave: function (n) { return globalKeys.NippleType[n + 1]; },
            list: globalKeys.NippleType
        },
        // None = -1
        HairType: {
            toSave: function (n) { return globalKeys.HairType.indexOf(n) - 1; },
            fromSave: function (n) { return globalKeys.HairType[n + 1]; },
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
            toSave: function (v) { return ({ key: v }); },
            fromSave: function (v) { return v ? v.key : undefined; },
            list: globalKeys.Powers
        },
        Perks: { list: globalKeys.Perks },
        Items: {
            list: globalKeys.Weapons.concat(globalKeys.ArmorSet, globalKeys.ItemHead, globalKeys.ItemNeck, globalKeys.ItemShoulders, globalKeys.ItemHands, globalKeys.ItemWaist, globalKeys.ItemFeet, globalKeys.Rings, globalKeys.TopGarb, globalKeys.BottomGarb, globalKeys.Offhand, globalKeys.TFs, globalKeys.Misc, globalKeys.Set)
        },
    };

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
    var charMap = {
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
            max: 5
        },
        equippedPowers: {
            label: "Equipped Powers",
            type: "multioption",
            options: globals.Powers,
            groupTag: "Effects",
            max: 5
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
            properties: (function () {
                var obj = {};
                for (var index = 0; index < globals.TFType.list.length; index++)
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
    function createItemArgsMap() {
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

    function createTextInput(initialValue, className, changeFunc) {
        var textAreaEl = document.createElement('input');
        textAreaEl.type = 'text';
        textAreaEl.className = className;
        textAreaEl.value = initialValue;
        if (changeFunc)
            textAreaEl.addEventListener('change', changeFunc(textAreaEl));
        return textAreaEl;
    }
    function createCheckBox(checked, className, changeFunc) {
        var checkBoxEl = document.createElement('input');
        checkBoxEl.className = className;
        checkBoxEl.checked = checked;
        checkBoxEl.type = 'checkbox';
        if (changeFunc)
            checkBoxEl.addEventListener('change', changeFunc(checkBoxEl));
        return checkBoxEl;
    }
    function createFilterBar() {
        var el = document.createElement('input');
        el.className = 'filter-bar';
        el.type = 'text';
        el.placeholder = 'Filter...';
        return el;
    }

    function fieldTitle(key) {
        var title = document.createElement('div');
        title.className = 'title';
        title.textContent = key;
        return title;
    }
    function fieldLabel(key) {
        var entry = document.createElement('label');
        entry.className = 'field dark';
        var title = fieldTitle(key);
        entry.appendChild(title);
        return entry;
    }
    function objectField(text) {
        var button = document.createElement('button');
        button.className = 'collapsing-button title dark';
        button.textContent = '⬥';
        if (text)
            button.textContent += ' ' + text;
        var content = document.createElement('div');
        content.className = 'field-content collapsed light';
        button.addEventListener('click', function () {
            if (content.classList.contains('collapsed')) {
                button.classList.replace('dark', 'light');
                content.classList.remove('collapsed');
                button.textContent = '⬦';
            }
            else {
                button.classList.replace('light', 'dark');
                content.classList.add('collapsed');
                button.textContent = '⬥';
            }
            if (text)
                button.textContent += ' ' + text;
        });
        return { button: button, content: content };
    }
    function stringField(name, initialValue, changeFunc) {
        var div = fieldLabel(name);
        var input = createTextInput(initialValue, 'value', changeFunc);
        div.appendChild(input);
        return div;
    }
    function booleanField(name, initialValue, changeFunc) {
        var div = fieldLabel(name);
        var input = createCheckBox(initialValue, 'value', changeFunc);
        div.appendChild(input);
        return div;
    }
    function selectField(name, initialValue, options, changeFunc) {
        var div = fieldLabel(name);
        var selector = document.createElement('select');
        selector.className = 'value';
        options.list.forEach(function (value, index) {
            var option = document.createElement('option');
            option.value = index + '';
            option.textContent = value;
            option.selected = initialValue === value;
            selector.appendChild(option);
        });
        selector.addEventListener('change', changeFunc(selector));
        div.appendChild(selector);
        return div;
    }
    function multiOptionField(label, initialValues, mapValue, changeFunc) {
        // Taken directly from fieldLabel
        var div = document.createElement('label');
        div.className = 'field dark';
        var title = fieldTitle(label);
        div.appendChild(title);
        var listEl = document.createElement('ul');
        listEl.className = 'multioption-list';
        var options = mapValue.options.list.map(function (value) {
            return ({
                key: value,
                selected: !!~initialValues.indexOf(value)
            });
        });
        // Counter on max number of selections
        if (mapValue.max)
            title.textContent += ' (' + options.filter(function (option) { return option.selected; }).length + '/' + mapValue.max + ')';
        var _loop_1 = function (option) {
            var listItem = document.createElement('li');
            listItem.className = 'multioption';
            listItem.textContent = option.key;
            if (option.selected)
                listItem.className += ' selected';
            listItem.addEventListener('click', function () {
                var selectedList = options.filter(function (item) { return item.selected; });
                // On
                if (!option.selected && (!mapValue.max || (mapValue.max && selectedList.length < mapValue.max))) {
                    listItem.classList.add('selected');
                    option.selected = true;
                }
                // Off
                else if (option.selected) {
                    listItem.classList.remove('selected');
                    option.selected = false;
                }
                // Filter again to have the correct items in a sorted order
                selectedList = options.filter(function (item) { return item.selected; });
                // Redraw the counter if there is a max
                if (mapValue.max) {
                    title.textContent = label + ' (' + selectedList.length + '/' + mapValue.max + ')';
                }
                changeFunc(mapValue, selectedList.map(function (value) { return value.key; }));
            });
            listEl.appendChild(listItem);
        };
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            _loop_1(option);
        }
        div.appendChild(listEl);
        return div;
    }
    function setNumberCallback(obj, key, modFunc) {
        return function (element) { return function () {
            if (modFunc && !isNaN(+element.value))
                obj[key] = modFunc(+element.value);
            else
                obj[key] = +element.value;
        }; };
    }
    function setStringCallback(obj, key, modFunc) {
        return function (inputElement) { return function () {
            if (modFunc)
                obj[key] = modFunc(inputElement.value);
            else
                obj[key] = inputElement.value;
        }; };
    }
    function setSelectorStringCallback(obj, key, modFunc) {
        return function (inputElement) { return function () {
            if (modFunc)
                obj[key] = modFunc(inputElement[+inputElement.value].textContent);
            else
                obj[key] = inputElement[+inputElement.value].textContent;
        }; };
    }
    function setBooleanCallback(obj, key, modFunc) {
        return function (inputElement) { return function () {
            if (modFunc)
                obj[key] = modFunc(inputElement.checked);
            else
                obj[key] = inputElement.checked;
        }; };
    }

    function hasPropLabel(prop) {
        return prop.label !== undefined;
    }

    var TabMenu = /** @class */ (function () {
        function TabMenu(options) {
            this.options = {
                tabsPos: 'top',
                inactiveStyle: 'dark',
                activeStyle: 'light'
            };
            this.pairs = [];
            if (options) {
                if (options.tabsPos)
                    this.options.tabsPos = options.tabsPos;
                if (options.inactiveStyle)
                    this.options.inactiveStyle = options.inactiveStyle;
                if (options.activeStyle)
                    this.options.activeStyle = options.activeStyle;
            }
            var direction = this.options.tabsPos === 'left' ? ' vertical ' : ' horizontal ';
            this.parentEl = document.createElement('div');
            this.parentEl.className = 'tab-menu ' + this.options.tabsPos;
            this.tabsEl = document.createElement('ul');
            this.tabsEl.className = 'tabs' + direction + this.options.inactiveStyle;
            this.contentEl = document.createElement('div');
            this.contentEl.className = 'contents' + direction + this.options.activeStyle;
            this.redrawContentEl = this.createContent();
            this.parentEl.appendChild(this.tabsEl);
            this.parentEl.appendChild(this.contentEl);
            this.contentEl.appendChild(this.redrawContentEl);
        }
        Object.defineProperty(TabMenu.prototype, "element", {
            get: function () { return this.parentEl; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabMenu.prototype, "content", {
            get: function () { return this.contentEl; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabMenu.prototype, "redrawContent", {
            get: function () {
                if (!this.redrawContentEl)
                    this.redrawContentEl = this.createContent();
                return this.redrawContentEl;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Get a tag and its content by name
         * @param name
         */
        TabMenu.prototype.getTab = function (name) {
            var element = this.pairs.find(function (el) { return el.name === name; });
            if (element)
                return { button: element.button, content: element.content };
            return;
        };
        /**
         * Remove a tab and its contents by tab name
         * @param name
         */
        TabMenu.prototype.removeTab = function (name) {
            var match = this.pairs.find(function (pair) { return pair.name === name; });
            if (match) {
                // If hidden, switch to the first tab
                if (!match.button.classList.contains('collapsed') && this.pairs.length > 0)
                    this.pairs[0].button.click();
                if (!match.button.parentElement)
                    throw new Error('No parent element on tab button');
                this.tabsEl.removeChild(match.button.parentElement);
                // Don't remove the redraw content element
                if (match.content !== this.redrawContentEl)
                    this.contentEl.removeChild(match.content);
                this.pairs.splice(this.pairs.findIndex(function (pair) { return pair === match; }), 1);
            }
        };
        /**
         * Creates a new tab.
         * All tabs that supply a redraw function use the same content element.
         * Returns html element for the button and content.
         * @param name
         * @param redraw
         */
        TabMenu.prototype.createTab = function (name, redraw) {
            var li = document.createElement('li');
            var content = redraw ? this.redrawContent : this.createContent();
            var button = this.createButton(name, content, redraw);
            this.pairs.push({ name: name, button: button, content: content });
            li.appendChild(button);
            this.tabsEl.appendChild(li);
            this.contentEl.appendChild(content);
            return { button: button, content: content };
        };
        TabMenu.prototype.createButton = function (text, contentEl, redraw) {
            var _this = this;
            var button = document.createElement('button');
            button.textContent = text;
            button.className = 'tab ' + this.options.inactiveStyle;
            button.addEventListener('click', function () {
                for (var _i = 0, _a = _this.pairs; _i < _a.length; _i++) {
                    var pair = _a[_i];
                    pair.button.classList.replace(_this.options.activeStyle, _this.options.inactiveStyle);
                    if (!pair.content.classList.contains('collapsed'))
                        pair.content.classList.add('collapsed');
                }
                button.classList.replace(_this.options.inactiveStyle, _this.options.activeStyle);
                contentEl.classList.remove('collapsed');
                if (redraw)
                    redraw(contentEl);
            });
            return button;
        };
        TabMenu.prototype.createContent = function () {
            var content = document.createElement('div');
            content.className = 'content ' + this.options.activeStyle + ' collapsed';
            return content;
        };
        return TabMenu;
    }());

    function loadCharTab(charContent, save) {
        while (charContent.firstChild)
            charContent.removeChild(charContent.firstChild);
        generateCharList(charContent, save.chars);
    }
    function generateCharList(el, charObj) {
        var menu = new TabMenu({ tabsPos: 'left', inactiveStyle: 'light', activeStyle: 'dark' });
        var charKeys = Object.keys(charObj).filter(function (key) { return key in charDefaults; });
        var firstTab;
        var name;
        for (var _i = 0, charKeys_1 = charKeys; _i < charKeys_1.length; _i++) {
            var charKey = charKeys_1[_i];
            name = charKey;
            if (charObj[charKey].name)
                name = charObj[charKey].name;
            if (!firstTab)
                firstTab = menu.createTab(name, generateCharInfo(charObj[charKey]));
            else
                menu.createTab(name, generateCharInfo(charObj[charKey]));
        }
        el.appendChild(menu.element);
        if (firstTab)
            firstTab.button.click();
    }
    function generateCharInfo(char) {
        return function (charsContentEl) {
            while (charsContentEl.firstChild)
                charsContentEl.removeChild(charsContentEl.firstChild);
            var infoMenu = new TabMenu({ tabsPos: 'top', inactiveStyle: 'dark', activeStyle: 'light' });
            var starterTags = ['Info', 'Stats', 'Effects', 'Inventory', 'Body'];
            var _loop_1 = function (starterTag) {
                infoMenu.createTab(starterTag, function (charContentEl) {
                    var _a;
                    while (charContentEl.firstChild)
                        charContentEl.removeChild(charContentEl.firstChild);
                    try {
                        generateMappedFields((_a = {}, _a[starterTag] = { button: undefined, content: charContentEl }, _a), Object.keys(charMap).reverse()
                            // Filter out tags not in this group
                            .filter(function (key) { return charMap[key].groupTag && charMap[key].groupTag.startsWith(starterTag); })
                            .map(function (key) { return generateInfo(char, key, charContentEl, charMap[key]); }));
                    }
                    catch (e) {
                        alert(e);
                    }
                });
            };
            for (var _i = 0, starterTags_1 = starterTags; _i < starterTags_1.length; _i++) {
                var starterTag = starterTags_1[_i];
                _loop_1(starterTag);
            }
            var infoButton = infoMenu.getTab('Info');
            if (infoButton)
                infoButton.button.click();
            charsContentEl.appendChild(infoMenu.element);
        };
    }
    function generateInfo(obj, key, element, map) {
        return {
            obj: obj,
            key: key,
            element: element,
            map: map,
        };
    }
    function generateMappedFields(tags, startInfo) {
        if (!startInfo)
            return;
        var queue = Array.isArray(startInfo) ? startInfo : [startInfo];
        tags = tags ? tags : {};
        while (queue.length > 0) {
            var results = processInfo(tags, queue.pop());
            if (results)
                queue = queue.concat(results);
        }
    }
    function processInfo(tags, info) {
        var obj = info.obj;
        var key = info.key;
        var mapEntry = info.map[key];
        var parentElement = info.element;
        var label = key;
        if (!mapEntry) {
            mapEntry = info.map;
        }
        if (hasPropLabel(mapEntry)) {
            label = mapEntry.label;
        }
        if (!obj[key] && (mapEntry.type !== 'object' || (mapEntry.type === 'object' && !mapEntry.canBeNull)))
            obj[key] = transformValue(mapEntry, obj[key]);
        if (hasPropLabel(mapEntry) && mapEntry.groupTag) {
            mapEntry.groupTag.split(".").reduce(function (parentTag, curTag) {
                if (!parentTag[curTag])
                    parentTag[curTag] = { button: undefined, content: undefined };
                if (!parentTag[curTag].content) {
                    var objField = objectField(curTag);
                    parentElement.appendChild(objField.button);
                    parentElement.appendChild(objField.content);
                    parentTag[curTag] = objField;
                }
                parentElement = parentTag[curTag].content;
                return parentTag[curTag];
            }, tags);
        }
        if (mapEntry.type === 'multioption') {
            parentElement.appendChild(multiOptionField(label, transformValue(mapEntry, obj[key]), mapEntry, function (multiMapEntry, selValues) {
                if (multiMapEntry.options.toSave)
                    obj[key] = selValues.map(function (value) { return multiMapEntry.options.toSave(value); });
                else
                    obj[key] = selValues;
            }));
        }
        else if (mapEntry.type === 'object') {
            var objField_1 = objectField(label);
            if (mapEntry.canBeNull) {
                generateAddRemoveButtons(objField_1.content, objectAddCallback(tags, objField_1.content, obj, key, mapEntry), objectRemoveCallback(objField_1.content, obj, key));
            }
            parentElement.appendChild(objField_1.button);
            parentElement.appendChild(objField_1.content);
            if (obj[key])
                return Object.keys(obj[key]).reverse().map(function (objKey) { return generateInfo(obj[key], objKey, objField_1.content, mapEntry.properties); });
        }
        else if (mapEntry.type === 'array') {
            var objField_2 = objectField(label);
            if (mapEntry.min)
                while (obj[key].length < mapEntry.min) {
                    if (mapEntry.override && obj[key].length in mapEntry.override)
                        obj[key].push(transformValue(mapEntry.override[obj[key].length], obj[key][obj[key].length]));
                    else
                        obj[key].push(transformValue(mapEntry.entry, obj[key][obj[key].length]));
                }
            if (!(mapEntry.min && mapEntry.max && mapEntry.min === mapEntry.max)) {
                generateAddRemoveButtons(objField_2.content, arrayAddCallback(tags, objField_2.content, obj, key, mapEntry), arrayRemoveCallback(objField_2.content, obj, key, mapEntry));
            }
            parentElement.appendChild(objField_2.button);
            parentElement.appendChild(objField_2.content);
            if (obj[key])
                return Object.keys(obj[key]).reverse().map(function (objKey) {
                    if (mapEntry.type !== 'array')
                        throw new Error('Changed from Array type');
                    if (mapEntry.override && objKey in mapEntry.override)
                        return generateInfo(obj[key], objKey, objField_2.content, mapEntry.override);
                    else
                        return generateInfo(obj[key], objKey, objField_2.content, mapEntry.entry);
                });
        }
        if (mapEntry.type === "string") {
            if (mapEntry.options)
                parentElement.appendChild(selectField(label, transformValue(mapEntry, obj[key]), mapEntry.options, setSelectorStringCallback(obj, key, mapEntry.options.toSave)));
            else
                parentElement.appendChild(stringField(label, transformValue(mapEntry, obj[key]), setStringCallback(obj, key)));
        }
        else if (mapEntry.type === "number") {
            if (mapEntry.options)
                parentElement.appendChild(selectField(label, transformValue(mapEntry, obj[key]), mapEntry.options, setSelectorStringCallback(obj, key, mapEntry.options.toSave)));
            else
                parentElement.appendChild(stringField(label, transformValue(mapEntry, obj[key]), setNumberCallback(obj, key)));
        }
        else if (mapEntry.type === "boolean") {
            parentElement.appendChild(booleanField(label, transformValue(mapEntry, obj[key]), setBooleanCallback(obj, key)));
        }
        return;
    }
    function transformValue(map, value) {
        if (map.type === 'object') {
            if (value == null)
                value = {};
            return Object.keys(map.properties).reduce(function (obj, key) {
                obj[key] = transformValue(map.properties[key], value[key]);
                return obj;
            }, {});
        }
        if (map.type === 'array') {
            if (value == null)
                value = [];
            return value.map(function (entry) { return transformValue(map.entry, entry); });
        }
        if (map.type === 'multioption') {
            if (value == null)
                value = [];
            if (map.options && map.options.fromSave)
                value = value.map(function (v) { return map.options.fromSave(v); });
            return value;
        }
        if (map.type === "boolean") {
            if (value == null)
                value = map.default || false;
        }
        if (map.type === "number") {
            if (value == null)
                value = map.default || 0;
        }
        if (map.type === "string") {
            if (value == null)
                if (map.default)
                    value = map.default;
                else if (map.options && map.options.list.length > 0)
                    value = map.options.list[0];
                else
                    value = '';
        }
        if (map.options && map.options.fromSave)
            value = map.options.fromSave(value);
        return value;
    }
    function objectAddCallback(tags, parent, obj, key, map) {
        return function () {
            if (obj[key] == null) {
                // Add value here to force display
                obj[key] = transformValue(map, obj[key]);
                generateMappedFields(tags, Object.keys(map.properties).reverse().map(function (mapKey) {
                    return generateInfo(obj[key], mapKey, parent, map.properties);
                }));
            }
        };
    }
    function objectRemoveCallback(parent, obj, key) {
        return function () {
            if (obj[key]) {
                while (parent.lastChild && parent.lastChild !== parent.firstChild) {
                    parent.removeChild(parent.lastChild);
                }
                obj[key] = null;
            }
        };
    }
    function arrayAddCallback(tags, parent, obj, key, map) {
        return function () {
            if (!map.max || (map.max && obj[key].length < map.max)) {
                var objKey = (typeof obj[key] === 'object' ? Object.keys(obj[key]).length : obj[key].length) + '';
                if (map.override && objKey in map.override)
                    generateMappedFields(tags, processInfo(tags, generateInfo(obj[key], objKey, parent, map.override)));
                else
                    generateMappedFields(tags, processInfo(tags, generateInfo(obj[key], objKey, parent, map.entry)));
            }
        };
    }
    function arrayRemoveCallback(parent, obj, key, map) {
        return function () {
            if (obj[key]) {
                if (obj[key].length > (map.min ? map.min : 0) && parent.lastChild) {
                    parent.removeChild(parent.lastChild);
                    if (typeof obj[key].pop() === "object")
                        parent.removeChild(parent.lastChild);
                }
            }
        };
    }
    function generateAddRemoveButtons(panel, addCallback, removeCallback) {
        var addRemoveButtons = document.createElement('div');
        addRemoveButtons.className = 'add-remove-buttons';
        var add = document.createElement('button');
        add.textContent = '+';
        add.className = 'button-pair dark';
        add.addEventListener('click', addCallback);
        var remove = document.createElement('button');
        remove.textContent = '–';
        remove.className = 'button-pair dark';
        remove.addEventListener('click', removeCallback);
        addRemoveButtons.appendChild(add);
        addRemoveButtons.appendChild(remove);
        panel.appendChild(addRemoveButtons);
    }

    /*
    * FileSaver.js
    * A saveAs() FileSaver implementation.
    *
    * By Eli Grey, http://eligrey.com
    *
    * License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
    * source  : http://purl.eligrey.com/github/FileSaver.js
    */

    // The one and only way of getting global scope in all environments
    // https://stackoverflow.com/q/3277182/1008999
    var _global = typeof window === 'object' && window.window === window
      ? window : typeof self === 'object' && self.self === self
      ? self : typeof global === 'object' && global.global === global
      ? global
      : undefined;

    function bom (blob, opts) {
      if (typeof opts === 'undefined') opts = { autoBom: false };
      else if (typeof opts !== 'object') {
        console.warn('Deprecated: Expected third argument to be a object');
        opts = { autoBom: !opts };
      }

      // prepend BOM for UTF-8 XML and text/* types (including HTML)
      // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
      if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
      }
      return blob
    }

    function download (url, name, opts) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        saveAs$1(xhr.response, name, opts);
      };
      xhr.onerror = function () {
        console.error('could not download file');
      };
      xhr.send();
    }

    function corsEnabled (url) {
      var xhr = new XMLHttpRequest();
      // use sync to avoid popup blocker
      xhr.open('HEAD', url, false);
      try {
        xhr.send();
      } catch (e) {}
      return xhr.status >= 200 && xhr.status <= 299
    }

    // `a.click()` doesn't work for all browsers (#465)
    function click (node) {
      try {
        node.dispatchEvent(new MouseEvent('click'));
      } catch (e) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                              20, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
      }
    }

    var saveAs$1 = _global.saveAs || (
      // probably in some web worker
      (typeof window !== 'object' || window !== _global)
        ? function saveAs () { /* noop */ }

      // Use download attribute first if possible (#193 Lumia mobile)
      : 'download' in HTMLAnchorElement.prototype
      ? function saveAs (blob, name, opts) {
        var URL = _global.URL || _global.webkitURL;
        var a = document.createElement('a');
        name = name || blob.name || 'download';

        a.download = name;
        a.rel = 'noopener'; // tabnabbing

        // TODO: detect chrome extensions & packaged apps
        // a.target = '_blank'

        if (typeof blob === 'string') {
          // Support regular links
          a.href = blob;
          if (a.origin !== location.origin) {
            corsEnabled(a.href)
              ? download(blob, name, opts)
              : click(a, a.target = '_blank');
          } else {
            click(a);
          }
        } else {
          // Support blobs
          a.href = URL.createObjectURL(blob);
          setTimeout(function () { URL.revokeObjectURL(a.href); }, 4E4); // 40s
          setTimeout(function () { click(a); }, 0);
        }
      }

      // Use msSaveOrOpenBlob as a second approach
      : 'msSaveOrOpenBlob' in navigator
      ? function saveAs (blob, name, opts) {
        name = name || blob.name || 'download';

        if (typeof blob === 'string') {
          if (corsEnabled(blob)) {
            download(blob, name, opts);
          } else {
            var a = document.createElement('a');
            a.href = blob;
            a.target = '_blank';
            setTimeout(function () { click(a); });
          }
        } else {
          navigator.msSaveOrOpenBlob(bom(blob, opts), name);
        }
      }

      // Fallback to using FileReader and a popup
      : function saveAs (blob, name, opts, popup) {
        // Open a popup immediately do go around popup blocker
        // Mostly only available on user interaction and the fileReader is async so...
        popup = popup || open('', '_blank');
        if (popup) {
          popup.document.title =
          popup.document.body.innerText = 'downloading...';
        }

        if (typeof blob === 'string') return download(blob, name, opts)

        var force = blob.type === 'application/octet-stream';
        var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;
        var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

        if ((isChromeIOS || (force && isSafari)) && typeof FileReader === 'object') {
          // Safari doesn't allow downloading of blob URLs
          var reader = new FileReader();
          reader.onloadend = function () {
            var url = reader.result;
            url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
            if (popup) popup.location.href = url;
            else location = url;
            popup = null; // reverse-tabnabbing #460
          };
          reader.readAsDataURL(blob);
        } else {
          var URL = _global.URL || _global.webkitURL;
          var url = URL.createObjectURL(blob);
          if (popup) popup.location = url;
          else location.href = url;
          popup = null; // reverse-tabnabbing #460
          setTimeout(function () { URL.revokeObjectURL(url); }, 4E4); // 40s
        }
      }
    );

    _global.saveAs = saveAs$1.saveAs = saveAs$1;

    if (typeof module !== 'undefined') {
      module.exports = saveAs$1;
    }

    function loadSaveLoadBar(content, state, button) {
        var background = document.createElement('div');
        background.className = 'content light';
        background.id = 'save-load-bar';
        var loadButton = document.createElement('button');
        loadButton.textContent = 'Load';
        loadButton.className = 'tab dark';
        var saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.className = 'tab dark';
        var saveInput = document.createElement('input');
        saveInput.type = 'text';
        if (state.file && state.file.name)
            saveInput.placeholder = state.file.name;
        else
            saveInput.disabled = true;
        background.appendChild(loadButton);
        background.appendChild(saveButton);
        background.appendChild(saveInput);
        content.appendChild(background);
        saveButton.addEventListener('click', function () {
            if (state.fileReader && state.file) {
                var filename = saveInput.value !== saveInput.placeholder ? saveInput.value : saveInput.placeholder;
                if (!filename.endsWith('.coc2'))
                    filename += '.coc2';
                var blob = new Blob([JSON.stringify(saveObj(state))], { type: 'text/json' });
                saveAs(blob, filename);
            }
            else {
                alert("No Save File loaded");
            }
        });
        loadButton.addEventListener('click', function () {
            var input = document.createElement('input');
            input.id = 'load';
            input.type = 'file';
            input.accept = '.coc2';
            input.style.display = 'none';
            input.addEventListener("change", function () {
                if (!input.files || input.files.length === 0) {
                    alert("Error in file loading");
                }
                else {
                    saveInput.placeholder = input.files[0].name;
                    handleFiles(input.files[0], state, function (filename) {
                        saveInput.placeholder = filename;
                        saveInput.value = filename;
                        saveInput.disabled = false;
                        button.click();
                    });
                }
            });
            input.click();
        });
    }
    function handleFiles(file, state, onSuccess) {
        state.file = file;
        state.fileReader = new FileReader();
        state.fileReader.readAsText(state.file);
        state.fileReader.addEventListener("loadend", function (ev) {
            var obj;
            try {
                if (!state.fileReader)
                    throw new Error('FileReader disappeared');
                if (typeof state.fileReader.result !== 'string')
                    throw new Error('File read result not a string');
                obj = JSON.parse(state.fileReader.result);
            }
            catch (e) {
                console.error(e);
                alert("Error parsing file");
            }
            if (obj) {
                loadObj(obj, state);
                alert("Load Complete");
                onSuccess(file.name);
            }
        });
        state.fileReader.addEventListener("error", function (evnt) {
            console.log(evnt);
            alert("Error reading file");
        });
    }
    function loadObj(obj, state) {
        state.fileObj = obj;
        state.editObj = JSON.parse(JSON.stringify(obj));
        // load char defaults
        Object.keys(charDefaults).forEach(function (key) {
            state.editObj.chars[key] = Object.assign(JSON.parse(JSON.stringify(charDefaults[key])), state.editObj.chars[key]);
        });
    }
    function saveObj(state) {
        var saveCopy = JSON.parse(JSON.stringify(state.fileObj));
        saveCopy.chars = Object.keys(charDefaults).reduce(function (obj, key) {
            obj[key] = diffChar(charDefaults[key], state.editObj.chars[key]);
            return obj;
        }, {});
        return saveCopy;
    }
    function diffChar(orig, edit) {
        return Object.keys(edit)
            .filter(function (key) { return JSON.stringify(orig[key]) !== JSON.stringify(edit[key]); })
            .reduce(function (copyObj, key) {
            copyObj[key] = edit[key];
            return copyObj;
        }, {});
    }

    var Flags = ["AHMRI_BLOWJOB", "AHMRI_CUDDLEBATED", "AHMRI_ENCOUNTERED", "AHMRI_FUCKED", "AHMRI_MUNCHED", "AHMRI_SAVED", "AHMRI_SEX_WAIT", "AHMRI_TALK_CAMP", "AHMRI_TEASED", "AHMRI_TITFUCKED", "ALRAUNE_DEFEATED", "ALRAUNE_DOM", "ALRAUNE_KILLED", "ALRAUNE_PC_PREG_FERTILIZED", "ALRAUNE_PC_PREG_NUM_KIDS", "ALRAUNE_SEEDED", "ALRAUNE_SEED_TS", "ANAL_PROBING", "ARONA_ENCOUNTERED", "ARONA_FUCKED", "ARONA_INTERROGATED", "ARONA_MET", "ARONA_PCWINS", "ARONA_RECRUITED", "ARONA_SLEEPING_WITH_PLACEHOLDER", "ARONA_SUBMISSION", "ARONA_WINS", "ARONA_WON_LAST", "ATUGIA_ALEWDIA", "ATUGIA_RECRUITED", "ATUGIA_TALKED_RUNES", "BEAT_TOLLUS", "BERWYN_CAIT_TALK_HAD", "BERWYN_DEFEATED", "BERWYN_FUCKED", "BERWYN_FUCKED_ANAL", "BERWYN_MET", "BERWYN_NICE", "BERWYN_QUEST_COMPLETE", "BERWYN_QUEST_DECLINED", "BERWYN_RECRUITED", "BERWYN_SPANKED", "BERWYN_TOWER_COMMON_VISITED", "BERWYN_TOWER_FOUND_LAB", "BERWYN_TOWER_INFUSION_DONE", "BERWYN_UNREC_BAR", "BRINT_ALL_NIGHT", "BRINT_ANAL", "BRINT_APP_BIMBO", "BRINT_CONTRA", "BRINT_ETHERYN_3SUM", "BRINT_FUCKED", "BRINT_FUCKED_ARONA", "BRINT_GREAT", "BRINT_IS_BRIENNE", "BRINT_MET", "BRINT_ORAL", "BRINT_RECRUITED", "BRINT_RIMMED", "BRINT_ROUGH", "BRINT_TALKED_FATHER", "BRINT_TALKED_LEAVE", "BRINT_TALKED_SEX", "BRINT_TALKED_VILLAGE", "BRINT_TOPPED", "BRINT_UNDERTABLE", "BRINT_VAG", "CAIT_ARONA_3SUM", "CAIT_BERWYN_3SUM", "CAIT_BREASTPLAY", "CAIT_BRINT_3SUM", "CAIT_DAD_FOUND", "CAIT_FUCKED", "CAIT_LOADED", "CAIT_MET_FROSTHOUND", "CAIT_MILK_SCORE", "CAIT_MINO_MILKED", "CAIT_RECRUITED", "CAIT_SCRITCHED", "CAIT_SEXABLE", "CAIT_TALKED", "CAIT_TALKED_FAITH", "CAIT_TALKED_FAM", "CAIT_TALKED_FM", "CENTAUR_CHIEF_DEFEATED", "CENTAUR_MARAUDERS_ASSFUCKED_LEADER", "CENTAUR_MARAUDERS_COCK_STAGE", "CENTAUR_MARAUDERS_ENCOUNTERED", "CENTAUR_MARAUDERS_KILLED", "CENTAUR_MARAUDERS_RIDDEN_LEADER", "CENTAUR_MARAUDERS_TIMES_LOSSES", "CENTAUR_MARAUDERS_TIMES_LOSSES_CONSEC", "CENTAUR_MARAUDERS_VAG_STAGE", "CENTAUR_MARAUDER_BLOWN", "CUMPCAKES_USED", "DOG_DAYS_AFTERMATH_FH_PROCS", "DOG_DAYS_FINISH_DAY", "DOG_DAYS_GARRET_CAGE", "DOG_DAYS_GARRET_ELF", "DOG_DAYS_GARRET_GARRET", "DOG_DAYS_GARRET_RESCUED", "DOG_DAYS_GARRET_TALKED", "DOG_DAYS_GARRET_WORKERS", "DOG_DAYS_GARTH_GARRET", "DOG_DAYS_GARTH_GARRET_2", "DOG_DAYS_GARTH_LOCATION", "DOG_DAYS_GARTH_TROUBLES", "DOG_DAYS_LONGHOUSE_APPROACHED", "DOG_DAYS_PEACEFUL_RESOLUTION", "DOG_DAYS_SANDERS_AFTERMATH", "EFFIGIES_MET", "EFFIGIES_TALK", "ELF_TROUPE_MET", "ERYKA_GREETED", "ERYKA_HELPED", "ERYKA_MET", "ERYKA_WON_LAST", "ETHERYN_APPROACHED", "ETHERYN_AT_CASTLE", "ETHERYN_CONFESSED", "ETHERYN_CONFIDENCE", "ETHERYN_FUCKED", "ETHERYN_MET", "ETHERYN_RECRUITED", "ETHERYN_TALK_BIRD", "ETHERYN_TALK_HER", "ETHERYN_TALK_HER_CONF", "EVELYN_INTRO_FUCKED", "EVELYN_INTRO_LEFT", "EVERGREEN_MET", "FLUFFSNEK_ENCOUNTERED", "FLUFFSNEK_INVESTIGATED", "FOREST_KITSUNE_OPINION", "FOREST_X34_EN", "FOUND_ORC_CAMP", "FOUNTAIN_GODDESS_DIPPED", "FOUNTAIN_GODDESS_ENCOUNTERED", "FOUNTAIN_GODDESS_LAST_USE", "GARRET_FROSTHOUND_APPROACHED", "GARRET_FROSTHOUND_FRIENDS_TALK", "GARRET_FUCKED", "GARRET_PC_IS_BITCH", "GARRET_PREG_REVEAL", "GARRET_REJECTED_PLAYER", "GARTH_STORAGE_UPGRADE", "GARTH_TALK_ADV", "GARTH_TRAIN", "GATEGUARD_ASKED_ENTRANCE", "GATEGUARD_ENCOUNTERED", "GIRTH_EQUIPPED", "GNOLL_RAIDERS_ENCOUNTERED", "GWYN_FUCKED", "GWYN_PREG_NUM_KIDS", "HARPIES_MET", "HORNETS_MET", "HRETHA_MET", "HWEEN_WITCH_TOUCH", "IVRIS_ALCHEMY", "IVRIS_MET", "IVRIS_TRAIN", "JEN_FOUGHT", "JEN_FUCKED", "JEN_FUCKED_LAST", "JEN_MET", "JEN_MET_LEOFRIC", "JEN_OGRISH_TS", "JEN_PCWINS", "JEN_RAN", "JEN_TALKED_BELT", "JEN_TALKED_FEELINGS", "JEN_TALKED_LEOFRIC", "KASYRRA_DREAM1", "KASYRRA_FW_FUCKED", "KASYRRA_IMP_LOSS", "KASYRRA_PC_PREG_NUM_BIRTHS", "KASYRRA_PREG_TIMER", "KINU_ADULT_PERSONALITY", "KINU_BEAUTY_ADVICE", "KINU_BIG_SISTER", "KINU_BIRDS", "KINU_CHILD_PERSONALITY", "KINU_CONT_HAPPY", "KINU_DECORATION", "KINU_EDU_HELP", "KINU_EVENT_DONE", "KINU_FLOOF_PROBLEMS", "KINU_FLOWERS", "KINU_FOOD_THIEF", "KINU_GIFTED", "KINU_IM_PRETTY", "KINU_LADYS_ARMS", "KINU_MATH", "KINU_MET", "KINU_MUSHROOMS", "KINU_MUSIC_PERF", "KINU_NIGHT_DONE", "KINU_PRODIGY", "KINU_ROMANCE_MATTERS", "KINU_SCARF", "KINU_SWEET_POTATO", "KINU_TO_GOOD_HP", "KINU_WEAPON", "KIYOKO_AMULET", "KIYOKO_DIV_TS", "KIYOKO_ENCOUNTER", "KIYOKO_FUCKED", "KIYOKO_MEAL_TS", "KIYOKO_NEWYEARS", "KIYOKO_NUM_KITS", "KIYOKO_PREG_REVEALED", "KIYOKO_PREG_STAGE", "KIYOKO_RECRUITED", "KIYOKO_TALK_FREE", "LADYS_ARMS_DAY", "LAST_STATUE_SEX", "LEORAH_CHAT_VENOM", "LEORAH_FUCKED", "LEORAH_MET", "LEORAH_PEEPED", "LEORAH_TALK_CAPARISON", "LUPSCOUTS_FUCKED_LAST", "LUPSCOUTS_MET", "LUPSCOUTS_SUBMITTED_LAST", "LUPSCOUTS_WON_LAST", "LUSINA_ANAL", "LUSINA_ENCOUNTERED", "LUSINA_FUCKED", "LUSINA_MET", "LUSINA_MILKY", "MANTICORE_ENCOUNTERED", "MEOW_INTRODUCED", "MEOW_SPRING_ORGY", "MERCS_MET", "MERC_BOOMER_FUCKED", "MERC_CAIT_TS", "MERC_DALE_FUCKED", "MERC_JAN_FUCKED", "MERC_LUSA_FUCKED", "MERC_PCWINS", "MERC_WINS", "MOTHERS_DAY", "NAV_DISABLED", "NURSERY_CONSTRUCTION_TS", "NURSERY_DONATED", "NURSERY_UPGRADES", "NURSERY_VISITED", "OGRISH_MET", "OVERWORLD_LOCATION", "OVILIXER_PC_PREG_FERTILIZED", "RIVER_CULTIST_PCWINS", "RIVER_FORDED", "SANDERS_MET", "SECOND_LAST_STATUE_SEX", "SHAR_COURAGE", "SHAR_EGG_COLOR", "SHAR_FUCKED", "SHAR_GIVE_OVI", "SHAR_GROPE", "SHAR_MET", "SHAR_PERVERSION", "SHAR_PLAY", "SHAR_PLAY_TIMES", "SHAR_SAW_BIRTH", "SHAR_STORY_ALRAUNE", "SHAR_STORY_TOLLUS", "SHRINE_LOOTED", "SHRINE_PUZZLE", "SHRINE_PUZZLE_ATTEMPTS", "SLIMES_CUMMIED", "SLIMES_ENCOUNTERED", "SLIMES_HERM_RIDE", "SLIMES_OUTCOME", "SLIMES_WINS", "SNEK_FUCKED", "STATUES_SEXED", "STATUES_VISITED", "STATUE_MFH", "SUGO_BRINT_TS", "SUGO_CAP", "SUGO_FOREST", "SUGO_FUCKED", "SUGO_HAWK_MET", "SUGO_MET", "SUGO_Q1CHOICE", "SUGO_QUEST_DELIVERY_DATE", "SUGO_RIDE", "SUGO_SUCKED_NUTS", "SUGO_TALK_CLOTHES", "SUGO_USED_STALL", "TODO_ARONA_CHIEF", "TODO_BARON_DISPOSED", "TODO_BARON_MARRIED", "TODO_BARON_QUEST", "TODO_BED_MATE", "TODO_BRINT_IS_BRIENNE", "TODO_CENTAUR_CAMP_BEATEN", "TODO_CENTAUR_QUEST", "TODO_CENTAUR_QUEST_DONE", "TODO_CODEX_TIRA", "TODO_CODEX_TRONARII", "TODO_ELF_QUEEN_BEATEN", "TODO_ETHERYN_CONFIDENT", "TODO_GATEGUARD_OPENED", "TODO_KHORMINOS_VISITED", "TODO_ORC_DUNGEON_COMPLETE", "TODO_WINTER_CITY_VISITED", "TUT_STATUS", "VALLEY_DRAWBRIDGE", "VALLEY_VISITS", "VAUSH_CUMMED", "VAUSH_ENCOUNTERED", "VAUSH_ENCOUNTERED_NH", "VAUSH_FUCKED", "VAUSH_INTERACTED", "VAUSH_MET", "VAUSH_PITCHED", "VAUSH_SPURNED", "VAUSH_TALKED_HIM", "WAYSTONE_GARDEN", "WINGLEADER_BIRTH_VIEWED", "WINGLEADER_NUM_BABIES", "WINGLEADER_PREG_NUM_KIDS", "WINGLEADER_PREG_TIMER", "WINGLEADER_STATE", "WINTER_CITY", "WITCH_CORSET_FOUND", "WITCH_CORSET_USED", "WITCH_TOUCH_PROC", "WOLVES_MET", "WYLD_ELVES_FOUGHT", "WYLD_ELVES_MET", "WYLD_ELVES_TS", "WYLD_ELVES_WINS", "WYVERN_MET"];

    function loadFlagTab(flagContent, save) {
        while (flagContent.firstChild)
            flagContent.removeChild(flagContent.firstChild);
        var filterBarDiv = document.createElement('div');
        filterBarDiv.className = 'filter-div dark';
        var filterBar = createFilterBar();
        var ulEl = document.createElement('ul');
        ulEl.className = 'flags';
        // Assume they are all strings or numbers
        var flagNameElPairs = Flags.map(function (name) {
            var el = stringField(name, save.flags[name] || '', booleanStringOrNumber(save.flags, name));
            ulEl.appendChild(el);
            return { name: name, el: el };
        });
        filterBar.addEventListener('keyup', function () {
            for (var _i = 0, flagNameElPairs_1 = flagNameElPairs; _i < flagNameElPairs_1.length; _i++) {
                var pair = flagNameElPairs_1[_i];
                if (pair.name.toLocaleLowerCase().startsWith(filterBar.value.toLocaleLowerCase())) {
                    if (pair.el.classList.contains('collapsed')) {
                        pair.el.classList.toggle('collapsed');
                    }
                }
                else if (!pair.el.classList.contains('collapsed')) {
                    pair.el.classList.toggle('collapsed');
                }
            }
        });
        filterBarDiv.appendChild(filterBar);
        flagContent.appendChild(filterBarDiv);
        flagContent.appendChild(ulEl);
    }
    function booleanStringOrNumber(obj, key) {
        return function (element) { return function () {
            if (element.value === '' || element.value === undefined)
                delete obj[key];
            else if (element.value.toLocaleLowerCase() === 'true')
                obj[key] = true;
            else if (element.value.toLocaleLowerCase() === 'false')
                obj[key] = false;
            else if (!isNaN(+element.value))
                obj[key] = +element.value;
            else
                obj[key] = element.value;
        }; };
    }

    // import { loadRawTab } from "./RawTab";
    function loadEditor(element, state) {
        while (element.lastChild)
            element.removeChild(element.lastChild);
        var mainScreen = new TabMenu({ tabsPos: 'top', activeStyle: 'light', inactiveStyle: 'dark' });
        mainScreen.element.id = 'main';
        var charTab = mainScreen.createTab('Characters', function (content) {
            if (!state.editObj)
                alert("No Save File loaded");
            else
                loadCharTab(content, state.editObj);
        });
        mainScreen.createTab('Flags', function (content) {
            if (!state.editObj)
                alert("No Save File loaded");
            else if (!state.editObj.flags)
                alert("No Flags in save file");
            else
                loadFlagTab(content, state.editObj);
        });
        // mainScreen.createTab('Raw', (content) => {
        //     if (!state.editObj)
        //         alert("No Save File loaded");
        //     else
        //         loadRawTab(content, state.editObj);
        // });
        loadSaveLoadBar(element, state, charTab.button);
        element.appendChild(mainScreen.element);
    }

    var state = {};

    if (window) {
        var editor = window.editor = {};
        editor.state = state;
        editor.diffChar = function (name) { return diffChar(charDefaults[name], state.editObj.chars[name]); };
        editor.charDefaults = charDefaults;
    }

    var editorVersion = "26";
    var gameVersion = "0.1.17";
    var lastBreakingVersion = "25";
    document.addEventListener("DOMContentLoaded", function () {
        var disclaimer = document.createElement("div");
        disclaimer.className = "disclaimer content dark";
        disclaimer.innerHTML = "<h2>CoC2 Save Editor v" + editorVersion + "</h2><h4>For use with versions of CoC2 " + gameVersion + " or higher</h4><p>Disclaimer: Editing any saves may permanently mess up the save or cause unusual bugs or errors in the game. Edit at your own risk and remember to back up your saves.</p><p>Saves edited with v" + lastBreakingVersion + " or earlier will not work.</p>";
        document.body.appendChild(disclaimer);
        var ok = document.createElement("button");
        ok.textContent = "Accept";
        ok.className = "tab dark";
        disclaimer.appendChild(ok);
        ok.addEventListener("click", function () { return loadEditor(document.body, state); });
    });

}());
