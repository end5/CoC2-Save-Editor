import { ItemType } from "../../../Data/CharTypes";
import { globalKeys } from "../../../GameData/GlobalKeys";
import { FieldHTML, Field } from "../../../Display/HTMLGenerics";
import { FilterBarHTML, FilterBar } from "../../../Display/Fields/FilterBar";
import { NumberField } from "../../../Display/Fields/Number";
import { RadioFieldHTML } from "../../../Display/Fields/Radio";
import { Label } from "../../../Display/Fields/Label";
import { MAX_INVENTORY_SLOTS, MAX_ITEM_ATTRS } from "../../../Data/Char";

const ITEM_GROUPS = { Weapons: 'Weapons', ArmorSet: 'Armors', ItemHead: 'Head', ItemNeck: 'Neck', ItemShoulders: 'Shoulders', ItemHands: 'Hands', ItemWaist: 'Waist', ItemFeet: 'Feet', Rings: 'Rings', TopGarb: 'Top Garb', BottomGarb: 'Bottom Garbs', Offhand: 'Offhand', TFs: 'Transforms', Misc: 'Miscellaneous', Consumable: 'Consumable', Set: 'Sets' };

const ITEM_GROUP_KEYS = Object.keys(ITEM_GROUPS) as Extract<keyof typeof globalKeys, keyof typeof ITEM_GROUPS>[];

class InvAccess {
    public slot = 0;
    public constructor(
        private getInv: () => ItemType[]
    ) { }

    public getItem() {
        return this.getInv()[this.slot];
    }

    public setItem(item: ItemType) {
        this.getInv()[this.slot] = item;
    }

    public getItemKey() {
        const item = this.getItem();
        if (item && 'key' in item && typeof item.key === 'string')
            return item.key;
        else
            return undefined;
    }

    public getItemName() {
        const key = this.getItemKey();
        for (const itemType of ITEM_GROUP_KEYS)
            for (const itemInfo of globalKeys[itemType])
                if (itemInfo.value === key)
                    return itemInfo.name;

        return undefined;
    }

    public getItemCount() {
        const item = this.getItem();
        if (item && 'args' in item && Array.isArray(item.args) && typeof item.args[0] === 'number')
            return item.args[0];
        else
            return undefined;
    }
}

class SlotField implements Field {
    public constructor(
        id: string,
        private invAccess: InvAccess,
        onClick: () => void,
        public readonly html = new RadioFieldHTML()
    ) {
        this.html.element.className = 'inv-slot';

        this.html.radio.name = 'slot-field';
        this.html.radio.id = id;
        this.html.radio.addEventListener('click', onClick);

        this.html.label.textContent = 'Empty';
        this.html.label.htmlFor = id;
    }

    public enable() {
        const name = this.invAccess.getItemName();
        const count = this.invAccess.getItemCount();
        this.html.label.textContent = name && count ? name + ' x' + count : 'Empty';
        this.html.radio.disabled = false;
    }

    public disable() {
        this.html.label.textContent = 'Empty';
        this.html.radio.disabled = true;
        this.html.radio.checked = false;
    }
}

class ItemField implements Field {
    public constructor(
        public readonly key: string,
        text: string,
        id: string,
        private invAccess: InvAccess,
        onClick: () => void,
        public readonly html = new RadioFieldHTML()
    ) {
        this.html.element.className = 'inv-item';

        this.html.radio.name = 'item-field';
        this.html.radio.id = id;
        this.html.radio.addEventListener('click', onClick);

        this.html.label.textContent = text;
        this.html.label.htmlFor = id;
    }

    public enable() {
        this.html.radio.checked = this.invAccess.getItemKey() === this.key;
        this.html.radio.disabled = false;
    }

    public disable() {
        this.html.radio.disabled = true;
        this.html.radio.checked = false;
    }
}

export class InventoryHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly slotList: HTMLUListElement;
    public readonly itemContent: HTMLDivElement;
    public readonly filterBar: FilterBarHTML;
    public readonly itemList: HTMLUListElement;
    public readonly itemAttrList: HTMLDivElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.id = 'inv';
        this.element.className = 'content wrap';

        this.slotList = document.createElement('ul');
        this.slotList.className = 'inv-list';

        this.itemContent = document.createElement('div');
        this.itemContent.className = 'items';

        this.filterBar = new FilterBarHTML();

        this.itemList = document.createElement('ul');
        this.itemList.className = 'item-list';

        this.itemAttrList = document.createElement('div');
        this.itemAttrList.className = 'item-attr';

        this.itemContent.appendChild(this.filterBar.element);
        this.itemContent.appendChild(this.itemList);
        this.itemContent.appendChild(this.itemAttrList);

        this.element.appendChild(this.slotList);
        this.element.appendChild(this.itemContent);
    }
}

export class Inventory implements Field {
    private selectedSlot?: SlotField;
    private selectedItem?: ItemField;

    private filterBar: FilterBar;

    private slotFields: SlotField[] = [];
    private itemFields: ItemField[] = [];
    private itemAttrFields: Label[] = [];

    public constructor(
        getInv: () => ItemType[],
        public readonly html = new InventoryHTML()
    ) {
        const invAccess = new InvAccess(getInv);
        // Inventory Slots
        for (let index = 0; index < MAX_INVENTORY_SLOTS; index++) {
            const slot = new SlotField(
                'slot' + index,
                invAccess,
                () => {
                    invAccess.slot = index;
                    this.selectedSlot = slot;

                    const itemMatch = this.itemFields.find((field) => invAccess.getItemKey() === field.key);
                    // Changing from <ItemName> to <ItemName>
                    // No need to deselect first <ItemName>
                    if (itemMatch) {
                        this.selectedItem = itemMatch;
                        itemMatch.enable();
                    }
                    // Changing from <ItemName> to <Empty>
                    // Need to deselect <ItemName>
                    else if (this.selectedItem) {
                        this.selectedItem.html.radio.checked = false;
                        this.selectedItem = undefined;
                    }

                    for (const itemAttrField of this.itemAttrFields)
                        itemAttrField.enable();
                });

            this.html.slotList.appendChild(slot.html.element);

            this.slotFields.push(slot);
        }

        let counter = 0;
        for (const itemType of ITEM_GROUP_KEYS) {
            // Item Group Label
            const itemGroupLabel = document.createElement('h4');
            itemGroupLabel.textContent = ITEM_GROUPS[itemType];
            this.html.itemList.appendChild(itemGroupLabel);

            for (const itemInfo of globalKeys[itemType]) {
                // Item Field
                const itemField = new ItemField(
                    itemInfo.value,
                    itemInfo.name,
                    'item' + counter,
                    invAccess,
                    () => {
                        this.selectedItem = itemField;

                        invAccess.setItem({
                            key: itemField.key,
                            args: [1]
                        });

                        // Refresh slot text
                        this.selectedSlot?.enable();
                        for (const itemAttrField of this.itemAttrFields)
                            itemAttrField.enable();
                    });

                counter++;

                this.html.itemList.appendChild(itemField.html.element);

                this.itemFields.push(itemField);
            }
        }

        const filterList = this.itemFields.map((entry) => ({ key: entry.key, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);

        for (let index = 0; index < MAX_ITEM_ATTRS; index++) {
            // Item Attribute
            const name = index === 0 ? 'Amount' : 'Value' + (index + 1);
            const itemAttr = new Label(name,
                new NumberField({
                    get: () => invAccess.getItem()?.args?.[index] ?? 0,
                    set: (value) => {
                        const item = invAccess.getItem();
                        if (item && item.args)
                            item.args[index] = value;

                        // Refresh slot text
                        this.selectedSlot?.enable();
                    }
                }));

            this.html.itemAttrList.appendChild(itemAttr.html.element);
            this.itemAttrFields.push(itemAttr);
        }
    }

    public enable() {
        this.filterBar.enable();

        for (const slot of this.slotFields)
            slot.enable();

        for (const item of this.itemFields)
            item.enable();

        for (const itemAttr of this.itemAttrFields)
            itemAttr.enable();

        this.slotFields[0].html.radio.click();
    }

    public disable() {
        this.filterBar.disable();

        for (const slot of this.slotFields)
            slot.disable();

        for (const item of this.itemFields)
            item.disable();

        for (const itemAttr of this.itemAttrFields)
            itemAttr.disable();
    }
}
