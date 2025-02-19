class Table {
    constructor(headers = []) {
        this.headers = headers;
        this.rows = [];
    }

    addRow(data) {
        if (data.length !== this.headers.length) {
            console.log("Довжина даних повинна відповідати кількості заголовків.");
        }
        this.rows.push(data);
    }

    addColumn(header, values = [], defaultValue = "") {
        this.headers.push(header);
        this.rows.forEach((row, index) => {
            row.push(values[index] !== undefined ? values[index] : defaultValue);
        });
    }

    createRow(data, isHeader = false) {
        const row = document.createElement("tr");
        data.forEach(cellData => {
            const cell = document.createElement(isHeader ? "th" : "td");
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        return row;
    }

    generateHTML() {
        const table = document.createElement("table");

        // Додаємо заголовки
        table.appendChild(this.createRow(this.headers, true));

        // Додаємо рядки з даними
        this.rows.forEach(rowData => table.appendChild(this.createRow(rowData)));

        return table;
    }
}

const table = new Table(["Name", "Age", "City"]);
table.addRow(["Alice", 25, "New York"]);
table.addRow(["Bob", 30, "Los Angeles"]);
table.addRow(["Charlie", 35, "Toronto"]);
table.addColumn("Country", ["USA", "UK", "Canada"]);

document.body.appendChild(table.generateHTML());
