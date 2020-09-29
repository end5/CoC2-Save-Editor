import { CharType } from "./CharTypes";
import { charDefaults } from "../GameData/CharDefaults";
import { Flags } from "../GameData/Flags";

export type FlagNames = typeof Flags[number];
export type FlagType = string | number| boolean;
export type FlagsType = Record<FlagNames, FlagType>;
export type CharNames = keyof typeof charDefaults;
export type CharsType = Record<CharNames, CharType>;
export interface GameSave {
    flags: FlagsType;
    chars: CharsType;
}
