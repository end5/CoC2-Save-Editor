import { State } from "../Data/State";
import { CharContent } from "./EditorContent/Char";
import { FlagContent } from "./EditorContent/Flags";
import { TabbedContent } from "../Display/Fields/TabbedContent";

export function displayEditorContent(state: State) {
    return new TabbedContent([{
        key: 'chars',
        title: 'Character',
        content: new CharContent(state),
    }, {
        key: 'flags',
        title: 'Flags',
        content: new FlagContent(
            (key) => state.editObj?.data.flags[key],
            (key, value) => {
                if (state.editObj)
                    if (!value)
                        delete state.editObj.data.flags[key];
                    else
                        state.editObj.data.flags[key] = value;
            }),
    }]);
}
