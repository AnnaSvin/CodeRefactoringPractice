class Slider {
    constructor(direction = 'horizontal') {
        this.direction = direction;
        this.slides = [];
        this.currentIndex = 0;

        this.block = document.createElement("div");
        this.block.classList.add("block");

        this.slider = document.createElement("div");
        this.slider.classList.add("slider");
        if (this.direction === 'vertical') {
            this.slider.style.flexDirection = 'row';
        }

        this.container = document.createElement("div");
        this.container.classList.add("container");

        this.sliderWrapper = document.createElement("div");
        this.sliderWrapper.classList.add("wrapper");
        if (this.direction === 'vertical') {
            this.sliderWrapper.style.flexDirection = 'column';
        }

        this.panel = document.createElement("div");
        this.panel.classList.add(this.direction === 'horizontal' ? 'horizontalPanel' : 'verticalPanel');

        this.prevButton = this.createButton("Prev", "prevBtn", () => this.prevSlide());
        this.nextButton = this.createButton("Next", "nextBtn", () => this.nextSlide());

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
        input.id = "fileInput";
        input.accept = "image/*";
        input.multiple = true;
        input.addEventListener("change", (event) => this.uploadImages(event.target.files));
        return input;
    }

    addSlide(content) {
        const slide = document.createElement("div");
        slide.classList.add("slide");

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
        const offset = -this.currentIndex * 200 + "px";
        this.sliderWrapper.style.transform = this.direction === "horizontal" ?
            `translateX(${offset})` :
            `translateY(${offset})`;
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

const slider_one = new Slider("horizontal");
const slider_two = new Slider("vertical");

IMAGE_PATHS.forEach(imgSrc => {
    slider_one.addSlide(`<img src="${imgSrc}" alt="Image">`);
    slider_two.addSlide(`<img src="${imgSrc}" alt="Image">`);
});
