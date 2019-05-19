export class PersistantTabMenu {
    protected htmlEl: HTMLDivElement;
    protected tabsEl: HTMLDivElement;
    private pairs: { name: string, button: HTMLButtonElement, content: HTMLDivElement }[] = [];
    private invertColors: boolean;

    public constructor(id?: string, horizontal?: boolean, inverse?: boolean) {
        this.invertColors = !!inverse;
        this.htmlEl = document.createElement('div');
        if (id)
            this.htmlEl.id = id;
        this.htmlEl.classList.add('tabMenu', horizontal ? 'horizontal' : 'vertical');
        this.tabsEl = document.createElement('div');
        this.tabsEl.classList.add('tabs');
        this.htmlEl.appendChild(this.tabsEl);
    }

    public get element(): HTMLDivElement { return this.htmlEl; }

    public getTab(name: string) {
        const element = this.pairs.find((el) => el.name === name);
        if (element)
            return { button: element.button, content: element.content };
        return;
    }

    public removeTab(name: string) {
        const match = this.pairs.find((pair) => pair.name === name);
        if (match) {
            if (match.button.classList.contains('active') && this.pairs.length > 0)
                this.pairs[0].button.click();
            this.tabsEl.removeChild(match.button);
            this.htmlEl.removeChild(match.content);
            this.pairs.splice(this.pairs.findIndex((pair) => pair === match), 1);
        }
    }

    public createTab(name: string, id?: string) {
        const content = this.createContent(id);
        const button = this.createButton(name, content);

        if (this.pairs.length === 0) {
            button.classList.add('active');
            content.classList.add('active');
        }

        this.pairs.push({ name, button, content });
        this.tabsEl.appendChild(button);
        this.htmlEl.appendChild(content);
        return { button, content };
    }

    private createButton(text: string, panelEl: HTMLElement) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'tabbutton collapseButton';
        if (this.invertColors)
            button.classList.add('inverse');
        button.addEventListener('click', () => {
            for (const tab of this.pairs) {
                if (tab.button.classList.contains('active'))
                    tab.button.classList.toggle('active');
                if (tab.content.classList.contains('active'))
                    tab.content.classList.toggle('active');
            }

            button.classList.toggle('active');
            panelEl.classList.toggle('active');
        });
        return button;
    }

    private createContent(id?: string) {
        const content = document.createElement('div');
        content.className = 'tabcontent content collapsible';
        if (this.invertColors)
            content.classList.add('inverse');
        if (id)
            content.id = id;
        return content;
    }
}

export class RedrawingTabMenu {
    protected htmlEl: HTMLDivElement;
    protected tabsEl: HTMLDivElement;
    protected contentEl: HTMLDivElement;
    private pairs: { name: string, button: HTMLButtonElement }[] = [];
    private invertColors: boolean;

    public constructor(id?: string, horizontal?: boolean, invertColors?: boolean) {
        this.invertColors = !!invertColors;
        this.htmlEl = document.createElement('div');
        if (id)
            this.htmlEl.id = id;
        this.htmlEl.className = 'tabMenu ' + (horizontal ? 'horizontal' : 'vertical');
        this.tabsEl = document.createElement('div');
        this.tabsEl.className = 'tabs';
        this.htmlEl.appendChild(this.tabsEl);
        this.contentEl = document.createElement('div');
        this.contentEl.className = 'tabcontent content active';
        if (this.invertColors)
            this.contentEl.classList.add('inverse');

        this.htmlEl.appendChild(this.contentEl);
    }

    public get element(): HTMLDivElement { return this.htmlEl; }
    public get content(): HTMLDivElement { return this.contentEl; }

    public getButton(name: string) {
        const element = this.pairs.find((el) => el.name === name);
        if (element)
            return element.button;
        return;
    }

    public createTab(name: string, redraw: (panelEl: HTMLElement) => void) {
        const button = this.createButton(name);
        button.addEventListener('click', () => {
            while (this.contentEl.firstChild)
                this.contentEl.removeChild(this.contentEl.firstChild);
            redraw(this.contentEl);
        });

        this.pairs.push({ name, button });
        this.tabsEl.appendChild(button);

        return { button, content: this.contentEl };
    }

    private createButton(text: string) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'tabbutton';
        if (this.invertColors)
            button.classList.add('inverse');

        button.addEventListener('click', () => {
            for (const tab of this.pairs)
                if (tab.button.classList.contains('active'))
                    tab.button.classList.toggle('active');

            button.classList.toggle('active');
        });
        return button;
    }
}
