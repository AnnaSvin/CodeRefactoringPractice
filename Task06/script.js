class Notification {
    // Константи для часу автозакриття та затримки видалення
    static AUTO_CLOSE_TIME = 3000;  // час в мс до автозакриття
    static REMOVE_TIMEOUT = 500;    // час в мс для затримки перед видаленням

    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    createNotification(message, type = "success") {
        const notification = this.buildNotification(message, type);
        this.addCloseButton(notification);
        this.container.appendChild(notification);
        this.setAutoClose(notification);
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
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => this.closeNotification(notification));
        notification.appendChild(closeButton);
    }

    setAutoClose(notification) {
        setTimeout(() => this.closeNotification(notification), Notification.AUTO_CLOSE_TIME);
    }

    closeNotification(notification) {
        notification.classList.add("hide");
        setTimeout(() => {
            notification.remove();
        }, Notification.REMOVE_TIMEOUT);
    }
}

const notifications = new Notification("notification-container");

document.getElementById("success-btn").onclick = () => notifications.createNotification("Операція успішна!", "success");
document.getElementById("error-btn").onclick = () => notifications.createNotification("Сталася помилка!", "error");
document.getElementById("info-btn").onclick = () => notifications.createNotification("Це інформаційне повідомлення.", "info");
document.getElementById("warning-btn").onclick = () => notifications.createNotification("Це попередження!", "warning");
