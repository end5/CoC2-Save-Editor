import { State } from "./State";
import { charDefaults } from "../GameData/CharDefaults";
import { CharType } from "../GameData/CharTypes";

export class CharAccessor {
    public constructor(private state: State) { }
    public get(): CharType & Record<string, never> { return this.state.editObj?.chars[this.state.activeChar || 'pc']; }
    public set(key: keyof typeof charDefaults) { this.state.activeChar = key; }
}
