import { createFilterBar } from "../../../Display/FilterBar";
import { NumberField } from "../../../Display/Fields";
import { CharAccessor } from "../../../Data/CharAccessor";
import { select, deselect } from "../../../Display/UIActions";
import { ItemType } from "../../../GameData/CharTypes";
import { globalKeys } from "../../../GameData/GlobalKeys";

class InvAccess {
    public constructor(private char: CharAccessor) { }

    public getItemAt(index: number): Partial<ItemType> | undefined {
        if ('inventory' in this.char.get() && Array.isArray(this.char.get().inventory))
            return this.char.get().inventory[index];
        else
            return undefined;
    }

    public setItemAt(index: number, value: ItemType) {
        if ('inventory' in this.char.get() && Array.isArray(this.char.get().inventory))
            this.char.get().inventory[index] = value;
    }

    public getItemNameAt(index: number) {
        const item = this.getItemAt(index);
        if (item && 'key' in item && typeof item.key === 'string')
            return item.key;
        else
            return undefined;
    }

    public getItemCountAt(index: number) {
        const item = this.getItemAt(index);
        if (item && 'args' in item && Array.isArray(item.args) && typeof item.args[0] === 'number')
            return item.args[0];
        else
            return undefined;
    }

    public getSlotTextAt(index: number) {
        const name = this.getItemNameAt(index);
        const count = this.getItemCountAt(index);
        return name && count ? name + ' x' + count : 'Empty';
    }

}

class InvSelected {
    public slotField?: SlotField;
    public itemField?: ItemField;
}

const MAX_INVENTORY_SLOTS = 20;
const MAX_ITEM_ATTRS = 6;

const ITEM_GROUPS = { Weapons: 'Weapons', ArmorSet: 'Armors', ItemHead: 'Head', ItemNeck: 'Neck', ItemShoulders: 'Shoulders', ItemHands: 'Hands', ItemWaist: 'Waist', ItemFeet: 'Feet', Rings: 'Rings', TopGarb: 'Top Garb', BottomGarb: 'Bottom Garbs', Offhand: 'Offhand', TFs: 'Transforms', Misc: 'Miscellaneous', Consumable: 'Consumable', Set: 'Sets' };

export function displayCharInventory(char: CharAccessor) {
    // Equipment and Inventory on the left
    // Searchable item list on the right
    //   Search bar at the top
    //   Have categories
    //   Panel at the bottom for item attribute editing

    //
    // Values for logic
    const invAccess = new InvAccess(char);
    const selected = new InvSelected();

    const slotFields: SlotField[] = [];
    const itemFields: ItemField[] = [];
    const itemAttrFields: NumberField[] = [];
    const itemTable: Record<string, ItemField> = {};
    //
    //

    // Element creation
    const element = document.createElement('div');
    element.id = 'inv';
    element.className = 'content wrap';

    // Inventory Slot List
    const slotList = document.createElement('ul');
    slotList.className = 'inv-list';
    element.appendChild(slotList);

    // Inventory Slots
    for (let index = 0; index < MAX_INVENTORY_SLOTS; index++) {
        const slot = new SlotField(index);
        slot.element.addEventListener('click', slotFieldOnClick(slot, itemFields, itemAttrFields, selected, invAccess));
        slotList.appendChild(slot.element);

        slotFields.push(slot);
    }

    // Item Content
    const itemContent = document.createElement('div');
    itemContent.className = 'items';
    element.appendChild(itemContent);

    // Filter Bar
    const filterBar = createFilterBar(itemTable);
    itemContent.appendChild(filterBar);

    // Item List
    const itemList = document.createElement('ul');
    itemList.className = 'item-list';
    itemContent.appendChild(itemList);

    for (const itemType of Object.keys(ITEM_GROUPS) as Extract<keyof typeof globalKeys, keyof typeof ITEM_GROUPS>[]) {
        // Item Group Label
        const itemGroupLabel = document.createElement('h4');
        itemGroupLabel.textContent = ITEM_GROUPS[itemType];
        itemList.appendChild(itemGroupLabel);

        for (const itemInfo of globalKeys[itemType]) {
            // Item Field
            const itemField = new ItemField(itemInfo.name);
            itemField.element.addEventListener('click', itemFieldOnClick(itemField, itemAttrFields, selected, invAccess));
            itemList.appendChild(itemField.element);

            itemFields.push(itemField);
            itemTable[itemInfo.name] = itemField;
        }
    }

    // Item Attribute List
    const itemAttrList = document.createElement('div');
    itemAttrList.className = 'item-attr';
    itemContent.appendChild(itemAttrList);

    for (let index = 0; index < MAX_ITEM_ATTRS; index++) {
        // Item Attribute
        const itemAttr = new NumberField('Value ' + (index + 1),
            () => {
                if (selected.slotField) {
                    const item = invAccess.getItemAt(selected.slotField.index);
                    if (item && item.args)
                        return item.args[index];
                }
                return 0;
            },
            (value) => {
                if (selected.slotField) {
                    const slot = selected.slotField;
                    const item = invAccess.getItemAt(slot.index);
                    if (item && item.args)
                        item.args[index] = value;

                    // Refresh name as typing
                    slot.set(invAccess.getItemNameAt(slot.index), invAccess.getItemCountAt(slot.index));
                }
            });
        itemAttrList.appendChild(itemAttr.element);

        itemAttrFields.push(itemAttr);
    }

    const load = () => {
        for (const slot of slotFields)
            slot.set(invAccess.getItemNameAt(slot.index), invAccess.getItemCountAt(slot.index));

        for (const itemAttr of itemAttrFields)
            itemAttr.load();
    };

    return { element, load };
}

class SlotField {
    public readonly element: HTMLElement;
    public readonly index: number;
    private key?: string;
    public constructor(index: number) {
        this.element = document.createElement('li');
        this.element.className = 'inv-slot';
        this.index = index;
        this.set();
    }

    public getKey() { return this.key; }

    public set(key?: string, count?: number) {
        this.key = key;
        this.element.textContent = key && count ? key + ' x' + count : 'Empty';
    }
}

function slotFieldOnClick(slotField: SlotField, itemFields: ItemField[], itemAttrFields: NumberField[], invSelect: InvSelected, invAccess: InvAccess) {
    return () => {
        // Handle highlighting
        if (invSelect.slotField) {
            deselect(invSelect.slotField.element);
        }

        select(slotField.element);
        invSelect.slotField = slotField;

        // Zero out item attrs
        // loadItemAttrs(itemAttrFields);

        // Handle highlighting
        if (invSelect.itemField) {
            deselect(invSelect.itemField.element);
        }

        const item = itemFields.find((itemField) => slotField.getKey() === itemField.key);

        if (item) {
            invSelect.itemField = item;
            select(item.element);

            for (const itemAttr of itemAttrFields)
                itemAttr.load();
            // loadItemAttrs(itemAttrFields, invAccess.getItemAt(slot.index)?.args);
        }
    };
}

class ItemField {
    public readonly element: HTMLElement;
    public readonly key: string;
    public constructor(key: string) {
        this.element = document.createElement('li');
        this.element.className = 'multioption';
        this.element.textContent = key;
        this.key = key;
    }
}

function itemFieldOnClick(itemField: ItemField, itemAttrFields: NumberField[], invSelect: InvSelected, invAccess: InvAccess) {
    return () => {

        // Handle highlighting
        if (invSelect.itemField) {
            deselect(invSelect.itemField.element);
        }

        if (invSelect.slotField) {
            invSelect.itemField = itemField;
            select(itemField.element);

            // Todo:
            // Apply properties

            const slot = invSelect.slotField;
            slot.set(itemField.key, 1);

            const itemObject: ItemType = {
                key: itemField.key,
                args: [1]
            };

            invAccess.setItemAt(slot.index, itemObject);

            for (const itemAttr of itemAttrFields)
                itemAttr.load();
            // loadItemAttrs(itemAttrFields, invAccess.getItemAt(slot.index)?.args);
        }
    };
}

// function loadItemAttrs(itemAttrFields: NumberField[], args?: Partial<ItemType['args']>) {
//     // Todo:
//     // Reload attribute names

//     for (let index = 0; index < MAX_ITEM_ATTRS; index++) {
//         const itemAttr = itemAttrFields[index];
//         if (args && args[index]) {
//             itemAttr.input.value = args[index] + '';
//         }
//         else {
//             itemAttr.input.value = '0';
//         }
//     }
// }
