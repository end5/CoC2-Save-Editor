import { Quests } from "../../GameData/Quests";
import { FieldHTML, Field, createTextInput } from "../../Display/HTMLGenerics";
import { FilterBarHTML, FilterBar } from "../../Display/Fields/FilterBar";
import { disable, enable } from "../../Display/UIActions";
import { QuestType } from "../../Data/GameSave";

export type Quest = typeof Quests[number];

class QuestFieldHTML implements FieldHTML<HTMLTableRowElement> {
    public readonly element: HTMLTableRowElement;
    public readonly title: HTMLTableDataCellElement;
    public readonly input: HTMLInputElement;
    public readonly current: HTMLTableCellElement;
    public readonly complete: HTMLTableCellElement;
    public readonly failure: HTMLTableCellElement;
    public readonly states: HTMLTableCellElement;

    public constructor() {
        this.element = document.createElement('tr');

        this.title = document.createElement('td');
        this.element.appendChild(this.title);

        const state = document.createElement('td');
        this.element.appendChild(state);
        this.input = createTextInput();
        state.appendChild(this.input);

        this.current = document.createElement('td');
        this.element.appendChild(this.current);

        this.complete = document.createElement('td');
        this.element.appendChild(this.complete);

        this.failure = document.createElement('td');
        this.element.appendChild(this.failure);

        this.states = document.createElement('td');
        this.element.appendChild(this.states);
    }
}
class QuestField implements Field {
    public readonly html: QuestFieldHTML;

    public constructor(public readonly quest: Quest, private readonly getValue: () => number[], setValue: (value: number[]) => void) {
        this.html = new QuestFieldHTML();
        this.html.title.textContent = quest.name;
        const currentState = this.html.current;
        this.html.input.addEventListener('change', function () {
            let res = this.value.split(',').filter(v => v.length > 0).map(Number);
            setValue(res);
            currentState.textContent = (res[res.length - 1] ?? '') + '';
        });
        this.html.current.textContent = '';
        this.html.complete.textContent = quest.comp + '';
        this.html.failure.textContent = quest.fail + '';
        this.html.states.textContent = [...Array(quest.states)].map((_, i) => i) + '';
    }
    
    public enable() {
        this.html.input.disabled = false;
        let value = this.getValue();
        this.html.input.value = value + '';
        this.html.current.textContent = (value[value.length - 1] ?? '') + '';
    }
    
    public disable() {
        this.html.input.disabled = true;
        this.html.input.value = '';
        this.html.current.textContent = '';
    }
}

export class QuestContentHTML implements FieldHTML<HTMLDivElement> {
    public readonly element: HTMLDivElement;
    public readonly filterBar: FilterBarHTML;
    public readonly tableBody: HTMLTableSectionElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.id = 'quest-editor';
        this.element.className = 'content boxed';

        this.filterBar = new FilterBarHTML();
        this.element.appendChild(this.filterBar.element);

        const tableScroll = document.createElement('div');
        tableScroll.className = 'table-scroll';
        this.element.appendChild(tableScroll);

        const tableEl = document.createElement('table');
        tableScroll.appendChild(tableEl);

        // Table Head
        const tableHead = document.createElement('thead');
        tableEl.appendChild(tableHead);

        const labelRow = document.createElement('tr');
        tableHead.appendChild(labelRow);

        const equippedLabel = document.createElement('th');
        equippedLabel.textContent = 'Name';
        labelRow.appendChild(equippedLabel);

        const dataLabel = document.createElement('th');
        dataLabel.textContent = 'Data';
        labelRow.appendChild(dataLabel);

        const currentLabel = document.createElement('th');
        currentLabel.textContent = 'Current';
        labelRow.appendChild(currentLabel);

        const successLabel = document.createElement('th');
        successLabel.textContent = 'Success';
        labelRow.appendChild(successLabel);

        const failureLabel = document.createElement('th');
        failureLabel.textContent = 'Failure';
        labelRow.appendChild(failureLabel);

        const statesLabel = document.createElement('th');
        statesLabel.textContent = 'All States';
        labelRow.appendChild(statesLabel);
        //

        this.tableBody = document.createElement('tbody');
        tableEl.appendChild(this.tableBody);
    }
}

export class QuestContent implements Field {
    private fields: QuestField[] = [];
    private filterBar: FilterBar;

    public constructor(
        getQuestState: (key: number) => QuestType | undefined,
        setQuestState: (key: number, value: QuestType) => void,
        public readonly html = new QuestContentHTML()
    ) {
        this.fields = Quests.map((quest, index) => {
            const field = new QuestField(
                quest,
                () => getQuestState(index) ?? [],
                (value) => setQuestState(index, value)
            );
            this.html.tableBody.appendChild(field.html.element);
            return field;
        });

        const filterList = this.fields.map((entry) => ({ key: entry.quest.name, element: entry.html.element }));
        this.filterBar = new FilterBar(filterList, this.html.filterBar);
    }

    public enable() {
        enable(this.filterBar.html.element);
        enable(this.html.tableBody);
        for (const field of this.fields)
            field.enable();
        this.filterBar.enable();
    }

    public disable() {
        disable(this.filterBar.html.element);
        disable(this.html.tableBody);
        for (const field of this.fields)
            field.disable();
        this.filterBar.disable();
    }
}
