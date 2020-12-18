export interface GenericInfo<T> {
    name: string;
    value: T;
    desc?: string;
    attr?: string[];
}

export function sortGenericInfo<T extends { name: string }>(infoList: readonly T[]) {
    // return infoList.slice().sort((a, b) => a.name.localeCompare(b.name));
    return infoList.slice().sort((a, b) => {
        if (a.name === 'None') return -1;
        if (b.name === 'None') return 1;

        return a.name.localeCompare(b.name);
    });
}
