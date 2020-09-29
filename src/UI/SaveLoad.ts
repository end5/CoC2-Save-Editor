import { state } from "../Data/State";
import { FieldHTML } from "../Display/HTMLGenerics";
import { SaveLoadBarHTML, SaveLoadBar } from "./SaveLoadBar";
import { displayEditorContent } from "./EditorContent";

export class SaveLoadContentHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly saveLoadBar: SaveLoadBarHTML;

    public constructor() {
        this.element = document.createElement('div');
        this.element.className = 'content';

        this.saveLoadBar = new SaveLoadBarHTML();

        this.element.appendChild(this.saveLoadBar.element);
    }
}

export class SaveLoadContent {
    public constructor(
        public readonly html = new SaveLoadContentHTML()
    ) {
        const editor = displayEditorContent(state);
        editor.disable();

        html.element.appendChild(editor.html.element);

        new SaveLoadBar(
            state,
            () => editor.enable(),
            () => editor.disable(),
            html.saveLoadBar
        );
    }
}
