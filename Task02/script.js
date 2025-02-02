class Slider {
    createElement(tag, options = {}) {
        const el = document.createElement(tag);
        if (options.classes) {
          options.classes.forEach(cls => el.classList.add(cls));
        }
        if (options.styles) {
          Object.assign(el.style, options.styles);
        }
        if (options.id) {
          el.id = options.id;
        }
        return el;
    }

    constructor(direction = 'horizontal') {
        this.direction = direction;
        this.slides = [];
        this.currentIndex = 0;

        this.block = this.createElement("div", { classes: ["block"] });
        
        this.slider = this.createElement("div", { classes: ["slider", this.direction === 'vertical' ? "vertical" : "horizontal"] });
        
        this.container = this.createElement("div", { classes: ["container"] });
        
        this.sliderWrapper = this.createElement("div", { classes: ["wrapper", this.direction === 'vertical' ? "vertical" : "horizontal"] });
        
        this.panel = this.createElement("div", { classes: [this.direction === 'horizontal' ? 'horizontalPanel' : 'verticalPanel'] });

        this.prevButton = this.createElement("button", { classes: ["prevBtn"] });
        this.prevButton.textContent = "Prev";

        const uniqueId = 'fileInput_' + Math.random().toString(36).substr(2, 9);
        this.fileInput = this.createElement("input", { id: uniqueId });
        this.fileInput.type = 'file';
        this.fileInput.id = 'fileInput';
        this.fileInput.accept = 'image/*';
        this.fileInput.multiple = true;
        this.fileInput.addEventListener('change', (event) => this.uploadImages(event.target.files));

        this.nextButton = this.createElement("button", { classes: ["nextBtn"] });
        this.nextButton.textContent = "Next";

        this.prevButton.addEventListener("click", (event) => { this.prevSlide() });
        this.nextButton.addEventListener("click", (event) => { this.nextSlide() });

        this.container.appendChild(this.sliderWrapper);
        this.panel.appendChild(this.prevButton);
        this.panel.appendChild(this.nextButton);

        this.slider.appendChild(this.container);
        this.slider.appendChild(this.panel);
        this.block.appendChild(this.fileInput);
        this.block.appendChild(this.slider);
        document.body.appendChild(this.block);
    }

    addSlide(content) {
        const slide = document.createElement('div');

        slide.classList.add('slide');

        // Додає зображення або інший вміст
        if (typeof content === 'string') {
            slide.innerHTML = content;
        }
        else {
            slide.appendChild(content);
        }

        this.slides.push(slide);
        this.sliderWrapper.appendChild(slide);
    }

    nextSlide() {
        if (this.slides.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSliderPosition();
      }
    
    prevSlide() {
        if (this.slides.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSliderPosition();
    }

    updateSliderPosition() {
        const offset = -this.currentIndex * 200 + 'px';

        if (this.direction === 'horizontal') {
            this.sliderWrapper.style.transform = `translateX(${offset})`;
        } else {
            this.sliderWrapper.style.transform = `translateY(${offset})`;
        }
    }

    uploadImages = (files) => {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Uploaded Image';
                img.style.width = '100%';
                this.addSlide(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

const slider_one = new Slider('horizontal');
const slider_two = new Slider('vertical');

slider_one.addSlide('<img src="images/Mountain1.jpg" alt="Image 1">');
slider_one.addSlide('<img src="images/Mountain2.jpeg" alt="Image 2">');
slider_one.addSlide('<img src="images/Mountain3.jpeg" alt="Image 3">');
slider_one.addSlide('<img src="images/Mountain4.jpeg" alt="Image 4">');

slider_two.addSlide('<img src="images/Mountain1.jpg" alt="Image 1">');
slider_two.addSlide('<img src="images/Mountain2.jpeg" alt="Image 2">');
slider_two.addSlide('<img src="images/Mountain3.jpeg" alt="Image 3">');
slider_two.addSlide('<img src="images/Mountain4.jpeg" alt="Image 4">');
