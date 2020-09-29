import { displayHeadContent } from "./BodyContent/Head";
import { displayChestContent } from "./BodyContent/Chest";
import { displayBodyContent } from "./BodyContent/Body";
import { displayCrotchContent } from "./BodyContent/Crotch";
import { TabbedContent } from "../../../Display/Fields/TabbedContent";
import { CharType } from "../../../Data/CharTypes";

export function displayCharBodyContent(getChar: () => CharType) {
    return new TabbedContent([{
        key: 'head',
        title: 'Head',
        content: displayHeadContent(getChar),
    }, {
        key: 'chest',
        title: 'Chest',
        content: displayChestContent(getChar),
    }, {
        key: 'body',
        title: 'Body',
        content: displayBodyContent(getChar),
    }, {
        key: 'crotch',
        title: 'Crotch',
        content: displayCrotchContent(getChar),
    }]);
}
