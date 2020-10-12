import { displayCharInfo } from "./CharContent/Info";
import { displayCharEffectsContent } from "./CharContent/Effects";
import { State } from "../../Data/State";
import { displayCharStats } from "./CharContent/Stats";
import { displayCharBodyContent } from "./CharContent/Body";
import { TabbedContent } from "../../Display/Fields/TabbedContent";
import { SelectField, SelectFieldHTML } from "../../Display/Fields/Select";
import { charDefaults } from "../../GameData/CharDefaults";
import { spaceAndCapText } from "../../Display/Input";
import { Field, FieldHTML } from "../../Display/HTMLGenerics";
import { CharNames } from "../../Data/GameSave";
import { TabBarElement, createTabBar } from "../../Display/TabBar";
import { enable, disable } from "../../Display/UIActions";
import { Inventory } from "./CharContent/Inventory";

export class CharContentHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly select: SelectFieldHTML;
    public readonly tabBar: TabBarElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.id = 'char-editor';
        this.element.className = 'content';

        this.select = new SelectFieldHTML();

        this.tabBar = createTabBar('horizontal');

        this.element.appendChild(this.select.element);
        this.element.appendChild(this.tabBar);
    }
}

export class CharContent extends TabbedContent {
    // private selectCharField: SelectField<{ name: string, value: CharNames }>;
    private selectCharField: SelectField<CharNames>;

    public constructor(state: State) {
        const getChar = () => {
            if (!state.editObj) throw new Error('Save not loaded');
            const char = state.editObj.chars[state.activeChar ?? 'pc'];
            if (!char) throw new Error('Char ' + state.activeChar + ' not found');
            return char;
        };

        const tabs: {
            key: string;
            title: string;
            content: Field;
        }[] = [{
            key: 'info',
            title: 'Info',
            content: displayCharInfo(getChar),
        }, {
            key: 'stats',
            title: 'Stats',
            content: displayCharStats(getChar),
        }, {
            key: 'effects',
            title: 'Effects',
            content: displayCharEffectsContent(getChar),
        }, {
            key: 'inv',
            title: 'Inventory',
            content: new Inventory(() => getChar().inventory),
        }, {
            key: 'body',
            title: 'Body',
            content: displayCharBodyContent(getChar),
        }];

        const html = new CharContentHTML();

        const charInfo = Object.keys(charDefaults).map((key) => ({ name: spaceAndCapText(key), value: key as CharNames }));
        const selectCharField = new SelectField(
            charInfo,
            {
                get: () => state.activeChar ?? (state.activeChar = 'pc'),
                set: (value) => {
                    state.activeChar = value;
                    for (const entry of tabs)
                        entry.content.enable();
                }
            },
            html.select
        );

        super(tabs, html);
        this.selectCharField = selectCharField;
    }

    public enable() {
        super.enable();
        enable(this.selectCharField.html.element);
        this.selectCharField.enable();
    }

    public disable() {
        super.disable();
        disable(this.selectCharField.html.element);
        this.selectCharField.disable();
    }
}
