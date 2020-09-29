import { GameSave, CharNames } from "./GameSave";

export interface State {
    file?: File;
    fileReader?: FileReader;
    fileObj?: GameSave;
    editObj?: GameSave;
    activeChar?: CharNames;
}

export const state: State = {};
