class Notification {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with ID "${containerId}" not found.`);
        }
    }

    createNotification(message, type = "success", duration = 3000) {
        if (!message) return;

        const notification = this.buildNotification(message, type);
        this.addCloseButton(notification);
        this.container.appendChild(notification);
        this.setAutoClose(notification, duration);
    }

    buildNotification(message, type) {
        const notification = document.createElement("div");
        notification.classList.add("notification", type);
        notification.textContent = message;
        return notification;
    }

    addCloseButton(notification) {
        const closeButton = document.createElement("button");
        closeButton.classList.add("close-btn");
        closeButton.textContent = "×"; // Avoiding innerHTML
        closeButton.setAttribute("aria-label", "Close notification");
        closeButton.addEventListener("click", () => this.closeNotification(notification));
        notification.appendChild(closeButton);
    }

    setAutoClose(notification, duration) {
        setTimeout(() => this.closeNotification(notification), duration);
    }

    closeNotification(notification) {
        notification.classList.add("hide");
        const animationDuration = parseFloat(getComputedStyle(notification).transitionDuration) * 1000 || 500;
        setTimeout(() => notification.remove(), animationDuration);
    }
}


const notifications = new Notification("notification-container");

document.getElementById("success-btn")?.addEventListener("click", () =>
    notifications.createNotification("Операція успішна!", "success", 3000));

document.getElementById("error-btn")?.addEventListener("click", () =>
    notifications.createNotification("Сталася помилка!", "error", 4000));

document.getElementById("info-btn")?.addEventListener("click", () =>
    notifications.createNotification("Це інформаційне повідомлення.", "info", 5000));

document.getElementById("warning-btn")?.addEventListener("click", () =>
    notifications.createNotification("Це попередження!", "warning", 3500));