document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Загальна функція для збереження і відновлення значень
    function handleInputValue(input, action) {
        const savedValue = localStorage.getItem(input.name);

        // Збереження значення
        if (action === 'save') {
            let value;
            if (input.type === 'checkbox' || input.type === 'radio') {
                value = input.checked ? input.value : null;
            } else if (input.tagName === 'SELECT') {
                value = JSON.stringify(Array.from(input.selectedOptions).map(option => option.value));
            } else {
                value = input.value;
            }
            if (value !== null) {
                localStorage.setItem(input.name, value);
            }
        }

        // Відновлення значення
        if (action === 'restore' && savedValue !== null) {
            if (input.type === 'checkbox') {
                input.checked = savedValue === 'true';
            } else if (input.type === 'radio') {
                input.checked = input.value === savedValue;
            } else if (input.tagName === 'SELECT') {
                const selectedValues = JSON.parse(savedValue);
                Array.from(input.options).forEach(option => {
                    option.selected = selectedValues.includes(option.value);
                });
            } else {
                input.value = savedValue;
            }
        }
    }

    // Подія для збереження значень
    form.addEventListener('input', (event) => {
        handleInputValue(event.target, 'save');
    });

    // Відновлення значень після завантаження
    Array.from(form.elements).forEach(input => {
        handleInputValue(input, 'restore');
    });

    // Очистка localStorage при скиданні форми
    form.addEventListener('reset', () => {
        Array.from(form.elements).forEach(input => localStorage.removeItem(input.name));
    });
});
