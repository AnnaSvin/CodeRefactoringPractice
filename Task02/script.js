class Slider {
    static DIRECTION = {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical"
    };

    static CLASS_NAMES = {
        BLOCK: "block",
        SLIDER: "slider",
        CONTAINER: "container",
        WRAPPER: "wrapper",
        HORIZONTAL_PANEL: "horizontalPanel",
        VERTICAL_PANEL: "verticalPanel",
        PREV_BUTTON: "prevBtn",
        NEXT_BUTTON: "nextBtn",
        SLIDE: "slide"
    };

    static BUTTON_TEXT = {
        PREV: "Prev",
        NEXT: "Next"
    };

    static FILE_INPUT = {
        ID: "fileInput",
        ACCEPT: "image/*"
    };

    static SLIDE_WIDTH = 200;

    constructor(direction = Slider.DIRECTION.HORIZONTAL) {
        this.direction = direction;
        this.slides = [];
        this.currentIndex = 0;

        this.block = document.createElement("div");
        this.block.classList.add(Slider.CLASS_NAMES.BLOCK);

        this.slider = document.createElement("div");
        this.slider.classList.add(Slider.CLASS_NAMES.SLIDER);
        if (this.direction === Slider.DIRECTION.VERTICAL) {
            this.slider.style.flexDirection = "row";
        }

        this.container = document.createElement("div");
        this.container.classList.add(Slider.CLASS_NAMES.CONTAINER);

        this.sliderWrapper = document.createElement("div");
        this.sliderWrapper.classList.add(Slider.CLASS_NAMES.WRAPPER);
        if (this.direction === Slider.DIRECTION.VERTICAL) {
            this.sliderWrapper.style.flexDirection = "column";
        }

        this.panel = document.createElement("div");
        this.panel.classList.add(
            this.direction === Slider.DIRECTION.HORIZONTAL
                ? Slider.CLASS_NAMES.HORIZONTAL_PANEL
                : Slider.CLASS_NAMES.VERTICAL_PANEL
        );

        this.prevButton = this.createButton(
            Slider.BUTTON_TEXT.PREV,
            Slider.CLASS_NAMES.PREV_BUTTON,
            () => this.prevSlide()
        );
        this.nextButton = this.createButton(
            Slider.BUTTON_TEXT.NEXT,
            Slider.CLASS_NAMES.NEXT_BUTTON,
            () => this.nextSlide()
        );

        this.fileInput = this.createFileInput();

        this.container.appendChild(this.sliderWrapper);
        this.panel.append(this.prevButton, this.nextButton);
        this.slider.append(this.container, this.panel);
        this.block.append(this.fileInput, this.slider);
        document.body.appendChild(this.block);
    }

    createButton(text, className, callback) {
        const button = document.createElement("button");
        button.classList.add(className);
        button.textContent = text;
        button.addEventListener("click", callback);
        return button;
    }

    createFileInput() {
        const input = document.createElement("input");
        input.type = "file";
        input.id = Slider.FILE_INPUT.ID;
        input.accept = Slider.FILE_INPUT.ACCEPT;
        input.multiple = true;
        input.addEventListener("change", (event) => this.uploadImages(event.target.files));
        return input;
    }

    addSlide(content) {
        const slide = document.createElement("div");
        slide.classList.add(Slider.CLASS_NAMES.SLIDE);

        if (typeof content === "string") {
            slide.innerHTML = content;
        } else {
            slide.appendChild(content);
        }

        this.slides.push(slide);
        this.sliderWrapper.appendChild(slide);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSliderPosition();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSliderPosition();
    }

    updateSliderPosition() {
        const offset = -this.currentIndex * Slider.SLIDE_WIDTH + "px";
        this.sliderWrapper.style.transform =
            this.direction === Slider.DIRECTION.HORIZONTAL
                ? `translateX(${offset})`
                : `translateY(${offset})`;
    }

    uploadImages(files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.alt = "Uploaded Image";
                img.style.width = "100%";
                this.addSlide(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

const IMAGE_PATHS = [
    "images/Mountain1.jpg",
    "images/Mountain2.jpeg",
    "images/Mountain3.jpeg",
    "images/Mountain4.jpeg"
];

const slider_one = new Slider(Slider.DIRECTION.HORIZONTAL);
const slider_two = new Slider(Slider.DIRECTION.VERTICAL);

IMAGE_PATHS.forEach(imgSrc => {
    slider_one.addSlide(`<img src="${imgSrc}" alt="Image">`);
    slider_two.addSlide(`<img src="${imgSrc}" alt="Image">`);
});
