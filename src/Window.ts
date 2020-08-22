import { state } from "./Data/State";
import { diffChar } from "./UI/EditorContent/SaveLoadBar";
import { charDefaults } from "./GameData/CharDefaults";

if (window) {
    const editor: any = (window as any).editor = {};
    editor.state = state;
    editor.diffChar = (key: keyof typeof charDefaults) => diffChar(charDefaults[key], state.editObj.chars[key]);
    editor.charDefaults = charDefaults;
}
