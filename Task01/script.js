class Modal {
    constructor() {
        this.modal = document.createElement("div");
        this.modal.classList.add("modalWindow");
        this.modal.style.display = "none";
        this.modal.style.position = "absolute";

        this.header = document.createElement("div");
        this.header.classList.add("modalHeader");

        this.content = document.createElement("div");
        this.content.classList.add("modalContent");

        this.closeButton = document.createElement("button");
        this.closeButton.classList.add("modalCloseBtn");
        this.closeButton.innerHTML = "&times;";

        this.header.appendChild(this.closeButton);
        this.modal.appendChild(this.header);
        this.modal.appendChild(this.content);
        document.body.appendChild(this.modal);

        this.closeButton.addEventListener("click", () => this.close());
        this.header.addEventListener("mousedown", (event) => this.startDragging(event));

        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;

        this.onDragging = this.onDragging.bind(this);
        this.stopDragging = this.stopDragging.bind(this);
    }

    open(content) {
        this.setContent(content);
        this.modal.style.display = "block";
    }

    close() {
        this.modal.style.display = "none";
    }

    setContent(content) {
        this.content.textContent = "";
        if (typeof content === "string") {
            this.content.textContent = content;
        } else if (content instanceof Node) {
            this.content.appendChild(content);
        }
    }

    startDragging(event) {
        this.isDragging = true;
        this.offsetX = event.clientX - this.modal.getBoundingClientRect().left;
        this.offsetY = event.clientY - this.modal.getBoundingClientRect().top;
        document.addEventListener("mousemove", this.onDragging);
        document.addEventListener("mouseup", this.stopDragging);
    }

    onDragging(event) {
        if (this.isDragging) {
            let x = event.clientX - this.offsetX;
            let y = event.clientY - this.offsetY;
            this.modal.style.left = `${x}px`;
            this.modal.style.top = `${y}px`;
        }
    }

    stopDragging() {
        this.isDragging = false;
        document.removeEventListener("mousemove", this.onDragging);
        document.removeEventListener("mouseup", this.stopDragging);
    }
}

const modal = new Modal();
const openButton = document.querySelector(".open");

if (openButton) {
    openButton.addEventListener("click", () => {
        modal.open("Text В JavaScript є закінчена пропозиція, майже у стандарті, що забезпечує підтримку приватних властивостей та методів на рівні мови. \n" +
            "Приватні властивості і методи повинні починатися з #. Вони доступні лише з класу. \n" +
            "Наприклад, ось приватна властивість #waterLimit та приватний метод, що перевіряє кількість води #fixWaterAmount:\n" +
            "В JavaScript є закінчена пропозиція, майже у стандарті, що забезпечує підтримку приватних властивостей та методів на рівні мови. \n" +
            "Приватні властивості і методи повинні починатися з #. Вони доступні лише з класу. \n" +
            "Наприклад, ось приватна властивість #waterLimit та приватний метод, що перевіряє кількість води #fixWaterAmount:");
    });
}