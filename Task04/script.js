const INPUT_TYPES = {
    TEXT: "text",
    EMAIL: "email",
    PASSWORD: "password"
};

class FormValidator {
    constructor(inputs) {
        this.inputs = inputs;
    }

    validate() {
        let isValid = true;

        this.inputs.forEach((input) => {
            if (input.required && !input.value) {
                isValid = this.handleValidationError(input.name, `${input.name} is required!`, isValid);
            } else if (input.validationType === INPUT_TYPES.EMAIL && !this.isValidEmail(input.value)) {
                isValid = this.handleValidationError(input.name, `${input.name} must be a valid email address!`, isValid);
            }
        });

        return isValid;
    }

    handleValidationError(name, message, isValid) {
        alert(message);
        return false;
    }

    isValidEmail(email) {
        const emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(email);
    }
}

class FormButtonHandler {
    constructor(form, validator) {
        this.form = form;
        this.validator = validator;
    }

    addButton(label, submitCallback) {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = label;

        button.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.validator.validate()) {
                submitCallback();
            }
        });

        this.form.appendChild(button);
    }
}

class FormInputManager {
    constructor(form) {
        this.form = form;
        this.inputs = [];
    }

    addInput(name, placeholder = "", type = INPUT_TYPES.TEXT, required = false, validationType = null) {
        const input = this.createInput(name, placeholder, type, required, validationType);
        this.inputs.push(input);
    }

    createInput(name, placeholder, type, required, validationType) {
        const label = document.createElement("label");
        label.textContent = name;

        const input = document.createElement("input");
        input.name = name;
        input.type = type;
        input.placeholder = placeholder;
        input.required = required;
        input.validationType = validationType;

        this.form.appendChild(label);
        this.form.appendChild(input);
        return input;
    }

    getInputs() {
        return this.inputs;
    }
}

class Form {
    constructor(name) {
        this.form = document.createElement("form");
        this.form.classList.add("form");
        this.formName = document.createElement("h3");
        this.formName.textContent = name;
        this.form.appendChild(this.formName);
        document.body.appendChild(this.form);

        this.inputManager = new FormInputManager(this.form);
        this.validator = null;
        this.buttonHandler = null;
    }

    addInput(name, placeholder = "", type = INPUT_TYPES.TEXT, required = false, validationType = null) {
        this.inputManager.addInput(name, placeholder, type, required, validationType);
    }

    initializeValidator() {
        this.validator = new FormValidator(this.inputManager.getInputs());
        this.buttonHandler = new FormButtonHandler(this.form, this.validator);
    }

    addButton(label) {
        if (this.buttonHandler) {
            this.buttonHandler.addButton(label, () => this.submit());
        }
    }

    submit() {
        alert(`${this.formName.textContent} submitted successfully!`);
        console.log(`${this.formName.textContent} submitted successfully!`);
        this.inputManager.getInputs().forEach((input) => {
            console.log(`${input.name}: ${input.value}`);
            input.value = "";
        });
    }
}

let form = new Form("Form");

form.addInput("Login", "Enter your login", INPUT_TYPES.TEXT, true);
form.addInput("Email", "Enter your email", INPUT_TYPES.EMAIL, true, INPUT_TYPES.EMAIL);
form.addInput("Password", "Enter your password", INPUT_TYPES.PASSWORD, true);

form.initializeValidator();
form.addButton("Submit");