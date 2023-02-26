import { state } from "./Data/State";
import { diffChar, packChar, unpackChar } from "./UI/SaveLoadBar";
import { charDefaults } from "./GameData/CharDefaults";
import { CharNames } from "./Data/GameSave";

if (window) {
    const editor: any = (window as any).editor = {};
    editor.state = state;
    editor.diffChar = (key: CharNames) => diffChar(charDefaults[key], state.editObj!.data.chars[key]);
    editor.packChar = (key: CharNames) => packChar(key, charDefaults[key], state.editObj!.data.chars[key]);
    editor.unpackChar = (key: CharNames) => unpackChar(key, charDefaults[key], state.editObj!.data.chars[key]);
    editor.charDefaults = charDefaults;
}
