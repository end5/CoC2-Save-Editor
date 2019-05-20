export interface TabMenuOptions {
    /**
     * Option to display the tabs above the content horizontally
     * or to the left of the content vertically.
     */
    tabsPos: 'top' | 'left';
    /**
     * CSS style for inactive elements
     * Switches with activeStyle
     * Default is 'dark'
     */
    inactiveStyle: string;
    /**
     * CSS Style for active elements
     * Switches with inactiveStyle
     * Default is 'light'
     */
    activeStyle: string;
}

export class TabMenu {
    protected parentEl: HTMLDivElement;
    protected tabsEl: HTMLUListElement;
    protected contentEl: HTMLDivElement;
    protected redrawContentEl: HTMLDivElement;

    protected options: TabMenuOptions = {
        tabsPos: 'top',
        inactiveStyle: 'dark',
        activeStyle: 'light'
    };

    private pairs: { name: string, button: HTMLButtonElement, content: HTMLDivElement }[] = [];

    public constructor(options: TabMenuOptions) {
        if (options) {
            if (options.tabsPos)
                this.options.tabsPos = options.tabsPos;

            if (options.inactiveStyle)
                this.options.inactiveStyle = options.inactiveStyle;

            if (options.activeStyle)
                this.options.activeStyle = options.activeStyle;
        }

        const direction = this.options.tabsPos === 'left' ? ' vertical ' : ' horizontal ';

        this.parentEl = document.createElement('div');
        this.parentEl.className = 'tab-menu ' + this.options.tabsPos;

        this.tabsEl = document.createElement('ul');
        this.tabsEl.className = 'tabs' + direction + this.options.inactiveStyle;

        this.contentEl = document.createElement('div');
        this.contentEl.className = 'contents' + direction + this.options.activeStyle;

        this.redrawContentEl = this.createContent();

        this.parentEl.appendChild(this.tabsEl);
        this.parentEl.appendChild(this.contentEl);
        this.contentEl.appendChild(this.redrawContentEl);
    }

    public get element() { return this.parentEl; }
    public get content() { return this.contentEl; }
    public get redrawContent() {
        if (!this.redrawContentEl)
            this.redrawContentEl = this.createContent();
        return this.redrawContentEl;
    }

    /**
     * Get a tag and its content by name
     * @param name
     */
    public getTab(name: string) {
        const element = this.pairs.find((el) => el.name === name);
        if (element)
            return { button: element.button, content: element.content };
        return;
    }

    /**
     * Remove a tab and its contents by tab name
     * @param name
     */
    public removeTab(name: string) {
        const match = this.pairs.find((pair) => pair.name === name);
        if (match) {
            // If hidden, switch to the first tab
            if (!match.button.classList.contains('collapsed') && this.pairs.length > 0)
                this.pairs[0].button.click();

            if (!match.button.parentElement) throw new Error('No parent element on tab button');
            this.tabsEl.removeChild(match.button.parentElement);

            // Don't remove the redraw content element
            if (match.content !== this.redrawContentEl)
                this.contentEl.removeChild(match.content);

            this.pairs.splice(this.pairs.findIndex((pair) => pair === match), 1);
        }
    }

    /**
     * Creates a new tab.
     * All tabs that supply a redraw function use the same content element.
     * Returns html element for the button and content.
     * @param name
     * @param redraw
     */
    public createTab(name: string, redraw?: (contentEl: HTMLElement) => void) {
        const li = document.createElement('li');

        const content = redraw ? this.redrawContent : this.createContent();

        const button = this.createButton(name, content, redraw);

        this.pairs.push({ name, button, content });
        li.appendChild(button);
        this.tabsEl.appendChild(li);
        this.contentEl.appendChild(content);
        return { button, content };
    }

    private createButton(text: string, contentEl: HTMLElement, redraw?: (panelEl: HTMLElement) => void) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = 'tab ' + this.options.inactiveStyle;

        button.addEventListener('click', () => {
            for (const pair of this.pairs) {
                pair.button.classList.replace(this.options.activeStyle, this.options.inactiveStyle);
                if (!pair.content.classList.contains('collapsed'))
                    pair.content.classList.add('collapsed');
            }

            button.classList.replace(this.options.inactiveStyle, this.options.activeStyle);
            contentEl.classList.remove('collapsed');

            if (redraw)
                redraw(contentEl);
        });
        return button;
    }

    private createContent() {
        const content = document.createElement('div');
        content.className = 'content ' + this.options.activeStyle + ' collapsed';
        return content;
    }
}
