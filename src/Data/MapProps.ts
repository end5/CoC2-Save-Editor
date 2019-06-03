import { GlobalOptions } from './Globals';

/*
    all
        label - The display name of the variable
        desc - A description of the variable
        type - Varialbe type (boolean, number, string, array, object, multioption)
        options - List of names or numbers that the variable can be
        groupTag - The display group the variable is part of
    array
        properties - The properties of each array entry
        min - The minimum size of the array
        max - The maximum size of the array
    multioption
        customCallback - Callback function used to change the output
    object
        properties - The properties of the object
        canBeNull - Can the value be null
        create - Function to create a new value
    string
    boolean
    number
        default - The default value if it doesn't exist
*/

export type AnyLabeledProp = AnyProp & PropLabel;
export type AnyProp = ValueProp | SelectorProp | ArrayProp | ObjectProp | MultiOptionProp;

export interface PropDict {
    [x: string]: AnyLabeledProp;
}

export interface PropLabel {
    label: string;
    desc?: string;
    groupTag?: string;
}

export interface ValueProp {
    type: 'boolean' | 'number' | 'string';
    default?: boolean | number | string;
}

export interface SelectorProp {
    type: 'selector';
    options: GlobalOptions;
    default?: any;
}

export interface ObjectProp {
    type: 'object';
    properties: PropDict;
    canBeNull?: boolean;
}

export interface ArrayProp {
    type: 'array';
    min?: number;
    max?: number;
    entry: AnyProp;
    // Override by array position
    override?: Record<number, AnyLabeledProp>;
}

export interface MultiOptionProp {
    type: 'multioption';
    options: GlobalOptions;
    max?: number;
}

export function hasPropLabel(prop: AnyProp): prop is AnyLabeledProp {
    return (prop as AnyLabeledProp).label !== undefined;
}
