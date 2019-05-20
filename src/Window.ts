import { state } from "./Data/State";
import { diffChar } from "./SaveLoadBar";
import { charDefaults } from "./Data/CharDefaults";

if (window) {
    const editor: any = (window as any).editor = {};
    editor.state = state;
    editor.diffChar = (name: keyof typeof charDefaults) => diffChar(charDefaults[name], state.editObj.chars[name]);
    editor.charDefaults = charDefaults;
}
