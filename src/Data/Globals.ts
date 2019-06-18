const globalKeys = {
    Race: ["Human", "Chimera", "Elf", "Catfolk", "Lupine", "Orc", "Minotaur", "Cowgirl", "Taeleer", "Sheepfolk", "Foxmorph", "Harpy", "Manticore", "Gnoll", "Salamander", "Goblin", "Tanuki"],
    Taxon: ["Humanoid", "Beast", "Demon", "Plant", "Ethereal", "Undead", "Construct", "Fey"],
    Class: ["None", "Warrior", "Thief", "Wmage", "Bmage", "Charmer"],
    Background: ["None", "Noblescion", "Minstrel", "Soldier", "Arcanist", "Barbarian", "Scholar", "Slumrat", "Acolyte", "Hunter", "Courtesan"],
    Affinity: ["Strength", "Toughness", "Agility", "Cunning", "Willpower", "Presence"],
    TFType: ["Everything", "Body", "Limbs", "Face", "Head", "Tail", "Cock", "Milk", "Balls", "Breasts", "Butt", "Pussy", "Cum", "Feracity"],
    BodyType: ["None", "Unspecified", "Human", "Orc", "Canine", "Feline", "Elf/Sylvan", "Equine", "Vulpine", "Snake", "Mothrine", "Goat", "Swine", "Shark", "Bee", "Draconic", "Kangaroo", "Anemone", "Avian", "Tentacle", "Demonic", "Frog", "Gooey", "Bovine", "Lupine", "Mouse", "Sheep", "Lapine", "Arachnid", "Succubus", "Dove", "Cuntsnake", "Hyena", "Salamander", "Tanuki", "Humanmasked"],
    BodyTag: ["Internal", "Knotted", "Gooey", "Tapered", "Flared", "Blunt", "Prehensile", "Stinger Based", "Stinger Tipped", "Nubby", "Amorphous", "Smooth", "Ribbed", "Foreskinned", "Double Headed", "Thick", "Sticky", "Fluffy", "Lubricated", "Long", "Hollow", "Squishy", "Angular", "Freckled", "Muzzled", "Beak", "Furred", "Tusked", "Refined", "Scaled", "Feathered", "Chitinous", "Aphrodisiac Laced", "Paws", "Digitigrade", "Plantigrade", "Heels", "Hooves", "Sheathed", "Pumped", "Slightly Pumped", "Spiked", "Magicock", "Arctic", "Maned", "Floppy", "Wooly", "Ignan"],
    FluidType: ["None", "Unspecified", "Girlcum", "Cum", "Honey", "Milk", "Chocolate Milk", "Strawberry Milk"],
    SkinType: ["None", "Unspecified", "Latex", "Plant", "Bark", "Fur", "Feathers", "Skin", "Scales", "Chitin", "Goo"],
    NippleType: ["None", "Unspecified", "Fuckable", "Flat", "Inverted", "Lipples", "Tentacled", "Dick", "Normal"],
    HairType: ["None", "Unspecified", "Hair", "Plant", "Quills", "Feathers", "Goo", "Tentacles", "Transparent"],
    Weapons: ["CaitsStaff", "Fist", "RustyKnife", "Dagger", "ShortSword", "CurvedBlade", "Spear", "Pike", "Poleaxe", "Battleaxe", "Francisca", "Javelin", "Quarterstaff", "BladeStaff", "HuntingBow", "WarBow", "Sling", "Mace", "Mastbreaker", "AronasMastbreaker", "BeastKiller", "SanctifiedGladius", "SpiraledStaff", "SpiraledBlade", "BirchStaff", "WhitewoodBow", "BelharanClaymore", "GirthyRod"],
    ArmorSet: ["ComfortableClothes", "ScaleArmor", "MailCuirass", "Breastplate", "ApprenticeRobes", "LeatherJerkin", "LeatherCoat", "PassionPriestessGarb", "AronasWarhides", "Warhides", "LoinclothAndGuards", "MailBikini", "SummonersRobes", "WitchsCorset", "OutridersLeathers"],
    ItemHead: ["WitchsHat"],
    ItemNeck: ["WardAmulet", "AmuletOfTransference", "AmuletOfUnion", "Maidenshield"],
    ItemShoulders: ["FlameCape", "PriestessCloak", "HirrudsCloak"],
    ItemHands: ["Gauntlets", "ArmGuards", "SilverBracelets", "ArmLeatherGloves"],
    ItemWaist: ["PotionBelt", "HipQuiver", "ChampionsBelt"],
    ItemFeet: ["IronGreaves", "LeatherBoots", "CaitsKneeBoots", "ThighLeatherBoots"],
    Rings: ["WizardRing", "RoguesRing"],
    TopGarb: [],
    BottomGarb: ["PlainUnderwear"],
    Offhand: ["HoplonShield", "TowerShield", "WickerShield", "LynxTotem"],
    TFs: ["FoxBerry", "CatsTongueBerry", "RootOfMan", "PinkEgg", "BlueEgg", "PurpleEgg", "TanEgg", "GoldEgg", "BruteBeet", "IceShard", "MinoBloodwine", "BovumSherry", "BaadClover", "CarrotCumpcake", "ManticoreNip", "VirilityBooster", "CackleBerry", "Wolfsboon", "Cinderleaf", "Frostleaf", "Grottato", "RingPeach"],
    Misc: ["CampingSupplies", "SilverSphere", "SmallSilverSphere", "LargeSilverSphere", "PristineWood", "MetalParts", "SturdyStone"],
    Consumable: ["EffigySeed", "WyvernVenom", "Ovilixer", "BrownLeaf", "BlankPowder", "BloodIris", "FreshMilk", "CreamyCheddar", "BaconStrips", "PupperPaleAle", "BrazenberryAle", "ConjurersConcoction", "Leananstone", "Naptha", "SteadfastTonic", "OilOfOliban", "Remedy", "Vulnerary", "Winterstem", "TrailRations", "KaelirrasTears", "RazorcupNectar", "LeyCrystalGrenade", "Wyldsap"],
    Set: ["PassionSet", "LoinSet", "SummonerSet", "OutriderSet"],
    KeyItems: ["BlueGemstoneStud", "BerwynsPanties", "AlchemistKit", "BasketOfJavelins", "OrcDisguise"],
    Boon: ["VelunsBlessing", "FountainsBounty", "HoneyMead", "SpicedWine", "RyeBeer", "AppleCider", "MonasteryAle", "LoversDry", "PaleAle"],
    StatusEffect: ["AnallyFilled", "OrallyFilled", "VaginallyFilled", "Armorer", "SharpenBlades", "PrayerOfWarding", "ArcaneAttunement", "FocusingPerformance", "WarPaint", "EyeOfTheStorm", "RangersQuarry", "Enervation", "AphrodisiacCovered", "WellFed", "BlueBalled", "VenomHigh", "Fatigued", "Overburdened", "Heat", "Rut", "TemporaryInfertility", "TemporarySterility", "StudStatuesGift", "MatronStatuesGift", "CumCovered", "Drained"],
    CombatEffect: ["Prone", "Bleeding", "Sundered", "Obscured", "Staggered", "Burning", "Terrified", "Poisoned", "Frigid", "Stunned", "Aroused", "Disarmed", "Silenced", "Blinded", "Blessed", "SpiritVeil", "MirrorImage", "RhythmicFocus", "Resistance", "WeaponBuff", "FeatherDance", "WarlordsCry", "TaintedBulwark", "FirstStrike", "Focused", "Covered", "Inspired", "Shielded", "Restrained", "Bloodlust", "HeightenedSenses", "Vanguard", "ShieldOfLight", "SongOfSplendor", "SongOfCourage", "BrazenberryAle", "ConjurersConcoction", "SteadfastTonic", "Winterstem"],
    Powers: ["BaseTease", "AssTease", "CrotchTease", "ChestTease", "Allure", "FeatherDance", "ChainmailJiggle", "BreastPlate", "CumSpray", "WyvernVenom", "HoneySlather", "AphrodisiacSting", "GuardedStance", "RangersStance", "DuelistsStance", "ChargeWeapon", "RhythmicFocus", "SpiritVeil", "MirrorImage", "ControlPheromones", "BolsteringDance", "SongOfCourage", "Flight", "Frenzy", "AuraOfDesire", "PipersSong", "VineRestraints", "HarpySong", "Pollination", "Heal", "GroupHeal", "CommandPheromones", "WarlordsCry", "MegaHeal", "SmokeBomb", "PocketSand", "TaintedBulwark", "Blessing", "Grease", "SongOfStorms", "BlindingBeauty", "TentacleShield", "Warcry", "RagingThurible", "WarSong", "Vanguard", "ShieldOfLight", "SoothingDance", "SongOfSplendor", "BloodIris", "BrazenberryAle", "ConjurersConcoction", "Naptha", "SteadfastTonic", "OilOfOliban", "Remedy", "Vulnerary", "Winterstem", "KaelirrasTears", "LeyCrystalGrenade", "Wyldsap", "Punch", "ButtStomp", "AerialDrop", "Quake", "Rush", "Grapple", "Tackle", "Trample", "ShieldBash", "WarStomp", "Charge", "CentaurTrample", "AmazonStrike", "Garrote", "Overbear", "PussyTailTease", "HarpyButtTease", "EffigyBoobTease", "EarthFist", "TentacleSlap", "BellyDance", "DickWobble", "ImpDirtyTrick", "TentacleLash", "MerielleChest", "MerielleAss", "MerielleCrotch", "FritteChest", "FritteAss", "FritteCrotch", "ElarilChest", "ElarilCrotch", "ManticoreTail", "JenExecute", "JenThunderStrike", "WargClaw", "BleedingBite", "SpearThrust", "VaushAttack", "HealingThurible", "ApprenticeAttack", "SlimeGlomp", "MatihaFireball", "ZippingHarrassment", "MagicalFlash", "UnintentionalTease", "LustfulImages", "BlightOrb", "WhiteFire", "WitheringBolt", "LightningSpike", "EntropicWinds", "ShadowMagic", "CharmSpell", "SunOfJassira", "FireBolt", "PollenSpray", "Foxfire", "Trick", "Fireball", "DarkThoughts", "Leech", "CarnalHex", "ColdSnap", "VileMiasma", "Jolt", "GropingTentacles", "RayOfFrost", "SoulArrow", "Leananstone", "SummonFlameSpirit", "SummonStoneElemental", "SummonEffigy", "SummonKiyoko", "SummonShadowClone", "CallFalcon", "MercReinforcements", "NormalAttack", "Rend", "FadingStrike", "DirtyTrick", "ThunderStrike", "BleedingCut", "Cleave", "ShellCracker", "ShadowStrike", "MarkForDeath", "PrimeTarget", "GiantsReach", "Execute", "LustyTentacles", "Envenom", "TrickShot", "Shatterstrike", "WyvernSting", "CrowdControl", "StickAndMove", "SuppressiveFire", "NervesOfSteel", "TripleThreat", "CracklePowder", "FrostArrow", "BloodLet", "Enrage", "FanOfBlades", "SteadyStrike", "DualBlitz", "DastardlyTrick", "SmiteEvil", "PoisonEdge", "OverhandSmash", "SureShot", "AimWeapon", "ArcaneShot"],
    Perks: ["TwistTheKnife", "SharpenBlades", "Veteran", "Armorer", "HealersHands", "PrayerOfWarding", "ArcaneStrike", "ArcaneAttunement", "Stylish", "FocusingPerformance", "WarPaint", "RendingStrike", "EyeOfTheStorm", "JourneymanSummoner", "RangersQuarry", "StartingAttributeBonuses", "Leftovers", "LightSensitivity", "WellHung", "Buxom", "Stretchy", "SizeMonarch", "Breeder", "Sterile", "Milky", "Libidinous", "Reserved", "MessyOrgasm", "BubbleButt", "Chastity", "Oviparous", "NukiNuts", "CumCascades"],
    Items: []
};

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
