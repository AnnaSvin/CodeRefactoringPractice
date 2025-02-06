class Tab {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with ID "${containerId}" not found.`);
        }

        this.tabsPanel = document.createElement("div");
        this.tabsPanel.classList.add("tabs-panel");

        this.contentWrapper = document.createElement("div");
        this.contentWrapper.classList.add("tabs-content-wrapper");

        this.tabButtons = [];
        this.tabContents = [];
        this.activeIndex = 0;

        this.container.appendChild(this.tabsPanel);
        this.container.appendChild(this.contentWrapper);
    }

    addTab(title, content) {
        const tabIndex = this.tabButtons.length;

        const button = document.createElement("button");
        button.classList.add("tab-button");
        button.textContent = title;
        button.dataset.index = tabIndex;
        this.tabsPanel.appendChild(button);
        this.tabButtons.push(button);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("tab-content");

        if (typeof content === "string") {
            contentDiv.textContent = content;
        } else if (content instanceof Node) {
            contentDiv.appendChild(content);
        }

        this.contentWrapper.appendChild(contentDiv);
        this.tabContents.push(contentDiv);

        if (tabIndex === 0) {
            button.classList.add("active");
            contentDiv.classList.add("active");
        }
    }

    switchTab(index) {
        if (index < 0 || index >= this.tabButtons.length) return;

        this.tabButtons[this.activeIndex].classList.remove("active");
        this.tabContents[this.activeIndex].classList.remove("active");

        this.tabButtons[index].classList.add("active");
        this.tabContents[index].classList.add("active");

        this.activeIndex = index;
    }

    init() {
        this.tabsPanel.addEventListener("click", (event) => {
            if (event.target.classList.contains("tab-button")) {
                const index = parseInt(event.target.dataset.index);
                this.switchTab(index);
            }
        });
    }
}

const tabs = new Tab("tabs-container");
tabs.addTab("Tab 1", "Вміст першої вкладки.");
tabs.addTab("Tab 2", "Вміст другої вкладки.");
tabs.addTab("Tab 3", "Вміст третьої вкладки.");
tabs.init();