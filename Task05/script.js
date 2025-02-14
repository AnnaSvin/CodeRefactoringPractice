class Tab {
    constructor(containerId) {
        this.container = document.createElement("div");
        this.container.classList.add("container");

        this.tabsPanel = document.createElement("div");
        this.tabsPanel.classList.add("tabs-panel");

        this.tabButtons = [];
        this.tabContents = [];
        this.activeIndex = 0;

        this.container.appendChild(this.tabsPanel);
        document.body.appendChild(this.container);
    }

    addTab(title, content) {
        const tabIndex = this.tabButtons.length;

        const button = this.createTabButton(title, tabIndex);
        const contentDiv = this.createTabContent(content, tabIndex);

        this.tabsPanel.appendChild(button);
        this.container.appendChild(contentDiv);

        if (tabIndex === 0) {
            this.setActiveTab(tabIndex);
        }
    }

    // Метод для створення кнопки вкладки
    createTabButton(title, index) {
        const button = document.createElement("div");
        button.classList.add("tab-button");
        button.innerText = title;
        button.addEventListener("click", () => { this.switchTab(index); });

        this.tabButtons.push(button);
        return button;
    }

    // Метод для створення вмісту вкладки
    createTabContent(content, index) {
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("tab-content");
        contentDiv.innerHTML = content;

        this.tabContents.push(contentDiv);
        return contentDiv;
    }

    // Перемикання вкладок
    switchTab(index) {
        this.removeActiveState();
        this.setActiveTab(index);
    }

    // Видалення активного класу з попередньої вкладки
    removeActiveState() {
        const currentButton = this.tabButtons[this.activeIndex];
        const currentContent = this.tabContents[this.activeIndex];

        if (currentButton && currentContent) {
            currentButton.classList.remove("active");
            currentContent.classList.remove("active");
        }
    }

    // Додавання активного класу до нової вкладки
    setActiveTab(index) {
        const newButton = this.tabButtons[index];
        const newContent = this.tabContents[index];

        if (newButton && newContent) {
            newButton.classList.add("active");
            newContent.classList.add("active");
            this.activeIndex = index;
        }
    }
}

const tabs = new Tab("tabs");
tabs.addTab("Tab 1", "<p>Вміст першої вкладки.</p>");
tabs.addTab("Tab 2", "<p>Вміст другої вкладки.</p>");
tabs.addTab("Tab 3", "<p>Вміст третьої вкладки.</p>");
