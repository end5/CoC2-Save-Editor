import { CharType } from "./CharTypes";
import { charDefaults } from "../GameData/CharDefaults";
import { Flags } from "../GameData/Flags";

export type FlagNames = typeof Flags[number];
export type FlagType = string | number| boolean;
export type FlagsType = Record<FlagNames, FlagType>;
export type CharNames = keyof typeof charDefaults;
export type CharsType = Record<CharNames, CharType>;

export interface GameSaveData {
    flags: FlagsType;
    chars: CharsType;
}

export interface GameSave_0_5_29 {
    version: '0.5.29';
    raw: GameSaveData;
    data: GameSaveData;
}
export interface GameSave_0_5_33 {
    version: '0.5.33';
    raw: {
        data: string;
        icon: string;
    }
    data: GameSaveData;
}

export type GameSaveState = GameSave_0_5_33 | GameSave_0_5_29;
export type GameSaveRaw = GameSaveState['raw'];
export type GameSaveVersion = GameSaveState['version'];
