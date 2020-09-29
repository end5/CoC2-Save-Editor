import { state } from "./Data/State";
import { diffChar } from "./UI/SaveLoadBar";
import { charDefaults } from "./GameData/CharDefaults";
import { CharNames } from "./Data/GameSave";

if (window) {
    const editor: any = (window as any).editor = {};
    editor.state = state;
    editor.diffChar = (key: CharNames) => diffChar(charDefaults[key], state.editObj!.chars[key]);
    editor.charDefaults = charDefaults;
}
