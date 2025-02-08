class Slider {
    constructor(direction = 'horizontal') {
        this.direction = direction;
        this.slides = [];
        this.currentIndex = 0;

        this.block = document.createElement("div");
        this.block.classList.add("block");

        this.slider = this.createElement("div", "slider");
        this.setDirectionStyles(this.slider);

        this.container = this.createElement("div", "container");
        this.sliderWrapper = this.createElement("div", "wrapper");
        this.setWrapperDirection(this.sliderWrapper);

        this.panel = this.createPanel();
        this.fileInput = this.createFileInput();

        this.block.appendChild(this.fileInput);
        this.block.appendChild(this.slider);
        document.body.appendChild(this.block);
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        element.classList.add(className);
        return element;
    }

    setDirectionStyles(sliderElement) {
        // Задаємо напрямок для слайдера в залежності від параметра direction
        if (this.direction === 'vertical') {
            sliderElement.style.flexDirection = 'column';
        } else {
            sliderElement.style.flexDirection = 'row';  // 'horizontal' напрямок за замовчуванням
        }
    }

    setWrapperDirection(wrapperElement) {
        // Задаємо напрямок для контейнера слайдів
        if (this.direction === 'vertical') {
            wrapperElement.style.flexDirection = 'column';
        } else {
            wrapperElement.style.flexDirection = 'row';
        }
    }

    createPanel() {
        const panel = document.createElement("div");
        panel.classList.add(this.direction === 'horizontal' ? 'horizontalPanel' : 'verticalPanel');

        const prevButton = this.createButton("Prev", () => this.prevSlide());
        const nextButton = this.createButton("Next", () => this.nextSlide());

        panel.appendChild(prevButton);
        panel.appendChild(nextButton);
        return panel;
    }

    createButton(text, onClick) {
        const button = document.createElement("button");
        button.classList.add(`${text.toLowerCase()}Btn`);
        button.textContent = text;
        button.addEventListener("click", onClick);
        return button;
    }

    createFileInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.addEventListener('change', (event) => this.uploadImages(event.target.files));
        return input;
    }

    addSlide(content) {
        const slide = this.createElement('div', 'slide');
        slide.innerHTML = typeof content === 'string' ? content : '';
        slide.appendChild(content);
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
        const offset = -this.currentIndex * 200 + 'px';
        const transformValue = this.direction === 'horizontal' ? `translateX(${offset})` : `translateY(${offset})`;
        this.sliderWrapper.style.transform = transformValue;
    }

    uploadImages(files) {
        Array.from(files).forEach(file => this.readFile(file));
    }

    readFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Uploaded Image';
            img.style.width = '100%';
            this.addSlide(img);
        };
        reader.readAsDataURL(file);
    }
}