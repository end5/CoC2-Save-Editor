export interface ValueLookup<T, U = T> {
    get: () => T;
    set: (value: U) => void;
}

export type NullableValueLookup<T> = ValueLookup<T | undefined, T>;

export function createValueLookup<O, K extends keyof O>(getObj: () => O, key: K): ValueLookup<O[K]> {
    return {
        get: () => getObj()[key],
        set: (value) => getObj()[key] = value,
    };
}
