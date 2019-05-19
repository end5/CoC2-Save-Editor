var PersistantTabMenu = /** @class */ (function () {
    function PersistantTabMenu(id, horizontal, inverse) {
        this.pairs = [];
        this.invertColors = !!inverse;
        this.htmlEl = document.createElement('div');
        if (id)
            this.htmlEl.id = id;
        this.htmlEl.classList.add('tabMenu', horizontal ? 'horizontal' : 'vertical');
        this.tabsEl = document.createElement('div');
        this.tabsEl.classList.add('tabs');
        this.htmlEl.appendChild(this.tabsEl);
    }
    Object.defineProperty(PersistantTabMenu.prototype, "element", {
        get: function () { return this.htmlEl; },
        enumerable: true,
        configurable: true
    });
    PersistantTabMenu.prototype.getTab = function (name) {
        var element = this.pairs.find(function (el) { return el.name === name; });
        if (element)
            return { button: element.button, content: element.content };
        return;
    };
    PersistantTabMenu.prototype.removeTab = function (name) {
        var match = this.pairs.find(function (pair) { return pair.name === name; });
        if (match) {
            if (match.button.classList.contains('active') && this.pairs.length > 0)
                this.pairs[0].button.click();
            this.tabsEl.removeChild(match.button);
            this.htmlEl.removeChild(match.content);
            this.pairs.splice(this.pairs.findIndex(function (pair) { return pair === match; }), 1);
        }
    };
    PersistantTabMenu.prototype.createTab = function (name, id) {
        var content = this.createContent(id);
        var button = this.createButton(name, content);
        if (this.pairs.length === 0) {
            button.classList.add('active');
            content.classList.add('active');
        }
        this.pairs.push({ name: name, button: button, content: content });
        this.tabsEl.appendChild(button);
        this.htmlEl.appendChild(content);
        return { button: button, content: content };
    };
    PersistantTabMenu.prototype.createButton = function (text, panelEl) {
        var _this = this;
        var button = document.createElement('button');
        button.textContent = text;
        button.className = 'tabbutton';
        if (this.invertColors)
            button.classList.add('inverse');
        button.addEventListener('click', function () {
            for (var _i = 0, _a = _this.pairs; _i < _a.length; _i++) {
                var tab = _a[_i];
                tab.button.className = tab.button.className.replace(' active', '');
                tab.content.className = tab.content.className.replace(' active', '');
            }
            button.classList.toggle('active');
            panelEl.classList.toggle('active');
        });
        return button;
    };
    PersistantTabMenu.prototype.createContent = function (id) {
        var content = document.createElement('div');
        content.className = 'tabcontent content';
        if (this.invertColors)
            content.classList.add('inverse');
        if (id)
            content.id = id;
        return content;
    };
    return PersistantTabMenu;
}());

var RedrawingTabMenu = /** @class */ (function () {
    function RedrawingTabMenu(id, horizontal, invertColors) {
        this.pairs = [];
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
    Object.defineProperty(RedrawingTabMenu.prototype, "element", {
        get: function () { return this.htmlEl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RedrawingTabMenu.prototype, "content", {
        get: function () { return this.contentEl; },
        enumerable: true,
        configurable: true
    });
    RedrawingTabMenu.prototype.getButton = function (name) {
        var element = this.pairs.find(function (el) { return el.name === name; });
        if (element)
            return element.button;
        return;
    };
    RedrawingTabMenu.prototype.createTab = function (name, redraw) {
        var _this = this;
        var button = this.createButton(name);
        button.addEventListener('click', function () {
            while (_this.contentEl.firstChild)
                _this.contentEl.removeChild(_this.contentEl.firstChild);
            redraw(_this.contentEl);
        });
        this.pairs.push({ name: name, button: button });
        this.tabsEl.appendChild(button);
        return { button: button, content: this.contentEl };
    };
    RedrawingTabMenu.prototype.createButton = function (text) {
        var _this = this;
        var button = document.createElement('button');
        button.textContent = text;
        button.className = 'tabbutton';
        if (this.invertColors)
            button.classList.add('inverse');
        button.addEventListener('click', function () {
            for (var _i = 0, _a = _this.pairs; _i < _a.length; _i++) {
                var tab = _a[_i];
                tab.button.className = tab.button.className.replace(' active', '');
            }
            button.classList.toggle('active');
        });
        return button;
    };
    return RedrawingTabMenu;
}());
