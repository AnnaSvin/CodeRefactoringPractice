class Tab {
    static CONTAINER_CLASS = "container";
    static TABS_PANEL_CLASS = "tabs-panel";
    static TAB_BUTTON_CLASS = "tab-button";
    static TAB_CONTENT_CLASS = "tab-content";
    static ACTIVE_CLASS = "active";

    constructor(containerId) {
        this.container = document.createElement("div");
        this.container.classList.add(Tab.CONTAINER_CLASS);
        this.tabsPanel = document.createElement("div");
        this.tabsPanel.classList.add(Tab.TABS_PANEL_CLASS);
        this.tabButtons = [];
        this.tabContents = [];
        this.activeIndex = 0;
        this.container.appendChild(this.tabsPanel);
        document.body.appendChild(this.container);
    }

    addTab(title, content) {
        const tabIndex = this.tabButtons.length;

        const button = document.createElement("div");
        button.classList.add(Tab.TAB_BUTTON_CLASS);
        button.innerText = title;
        button.addEventListener("click", () => this.switchTab(tabIndex));
        this.tabsPanel.appendChild(button);
        this.tabButtons.push(button);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add(Tab.TAB_CONTENT_CLASS);
        contentDiv.innerHTML = content;
        this.container.appendChild(contentDiv);
        this.tabContents.push(contentDiv);

        if (tabIndex === 0) {
            button.classList.add(Tab.ACTIVE_CLASS);
            contentDiv.classList.add(Tab.ACTIVE_CLASS);
        }
    }

    switchTab(index) {
        this.tabButtons[this.activeIndex].classList.remove(Tab.ACTIVE_CLASS);
        this.tabContents[this.activeIndex].classList.remove(Tab.ACTIVE_CLASS);

        this.tabButtons[index].classList.add(Tab.ACTIVE_CLASS);
        this.tabContents[index].classList.add(Tab.ACTIVE_CLASS);

        this.activeIndex = index;
    }
}

const tabs = new Tab("tabs");
tabs.addTab("Tab 1", "<p>Вміст першої вкладки.</p>");
tabs.addTab("Tab 2", "<p>Вміст другої вкладки.</p>");
tabs.addTab("Tab 3", "<p>Вміст третьої вкладки.</p>");
