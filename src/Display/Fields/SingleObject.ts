import { FieldHTML, Field } from "../HTMLGenerics";
import { ValueLookup } from "../../Data/ValueLookup";

class SingleObjectHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly addItemButton: HTMLButtonElement;
    public readonly removeItemButton: HTMLButtonElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.className = 'category';

        this.addItemButton = document.createElement('button');
        this.addItemButton.textContent = 'Add';
        this.element.appendChild(this.addItemButton);

        this.removeItemButton = document.createElement('button');
        this.removeItemButton.textContent = 'Remove';
        this.element.appendChild(this.removeItemButton);

        this.element.appendChild(document.createElement('hr'));
    }
}

export class SingleObjectField<T> implements Field {
    public readonly fields: Field[];

    public constructor(
        private value: ValueLookup<T | undefined>,
        private itemConstr: new () => T,
        // fields: (getKey: <K extends keyof T>(key: K) => T[K] | undefined, setKey: <K extends keyof T>(key: K, value: T[K]) => void) => Field[],
        // fields: (getObj: () => T) => Field[],
        fields: (createKeyLookup: <K extends keyof T>(key: K) => ValueLookup<T[K]>) => Field[],
        public readonly html = new SingleObjectHTML()
    ) {
        this.html.addItemButton.addEventListener('click', () => {
            this.value.set(new this.itemConstr());

            this.enable();
        });

        this.html.removeItemButton.addEventListener('click', () => {
            this.value.set(undefined);

            this.enable();
        });

        const defaultObj = new itemConstr();
        this.fields = fields((key) => ({
            get: () => (this.value.get() ?? defaultObj)[key],
            set: (newValue) => (this.value.get() ?? defaultObj)[key] = newValue
        }));

        for (const field of this.fields)
            this.html.element.appendChild(field.html.element);
    }

    public enable() {
        const value = this.value.get() != null;
        this.html.addItemButton.disabled = !!value;
        this.html.removeItemButton.disabled = !value;

        for (const field of this.fields)
            value ? field.enable() : field.disable();
    }

    public disable() {
        this.html.addItemButton.disabled = true;
        this.html.removeItemButton.disabled = true;

        for (const field of this.fields)
            field.disable();
    }
}
