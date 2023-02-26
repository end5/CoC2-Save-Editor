import { CharNames, GameSaveState } from "./GameSave";

export interface State {
    file?: File;
    fileReader?: FileReader;
    editObj?: GameSaveState;
    activeChar?: CharNames;
}

export const state: State = {};
